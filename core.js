(function (root, factory) {
  if (root.CleanMarketCore && !(typeof module === 'object' && module.exports)) return;
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else Object.defineProperty(root, 'CleanMarketCore', { value: api });
})(globalThis, function () {
  'use strict';
  function integer(value, name = 'Amount') {
    const n = Number(value);
    if (!Number.isSafeInteger(n) || n < 0) throw new Error(`${name} must be a non-negative whole number.`);
    return n;
  }
  // Steam expresses wallet amounts in hundredths, including whole-unit currencies.
  function parseMoney(value) {
    let s = String(value).trim().replace(/[\s\u00a0\u202f]/g, '').replace(/[.,]--$/, '.00');
    if (s.includes('-') || !/\d/.test(s)) throw new Error('Price is missing or invalid.');
    s = s.replace(/[^\d.,]/g, '');
    const last = Math.max(s.lastIndexOf('.'), s.lastIndexOf(','));
    const fraction = last < 0 ? '' : s.slice(last + 1);
    const decimal = last >= 0 && fraction.length > 0 && fraction.length <= 2;
    const whole = (decimal ? s.slice(0, last) : s).replace(/[.,]/g, '');
    if (!whole || (last >= 0 && !fraction)) throw new Error('Price is invalid.');
    return integer(Number(whole) * 100 + (decimal ? Number(fraction.padEnd(2, '0')) : 0), 'Price');
  }
  function parseInput(value) {
    const s = String(value).trim().replace(',', '.');
    if (!/^\d+(?:\.\d{1,2})?$/.test(s)) throw new Error('Enter a price with at most two decimal places.');
    const [a, b = ''] = s.split('.');
    return integer(Number(a) * 100 + Number(b.padEnd(2, '0')), 'Price');
  }
  function imageUrl(value) {
    if (!value) return '';
    const text = String(value);
    if (/^[a-zA-Z0-9_-]+$/.test(text)) return `https://community.fastly.steamstatic.com/economy/image/${text}/96fx64f`;
    try {
      const u = new URL(text, 'https://steamcommunity.com');
      if (u.protocol === 'https:' && !u.username && !u.password && !u.port &&
          (u.hostname === 'steamcommunity.com' || /(?:^|\.)steamstatic\.com$/.test(u.hostname) || u.hostname === 'steamcommunity-a.akamaihd.net') &&
          u.pathname.startsWith('/economy/image/')) return u.href;
    } catch {}
    return '';
  }
  function quote(target, totalForSeller, minimum = 1, increment = 1) {
    target = integer(target, 'Buyer price'); minimum = integer(minimum); increment = integer(increment);
    if (!minimum || !increment || !target) throw new Error('Price is below Steam’s minimum.');
    // Search the valid seller-price grid; never silently exceed the chosen buyer price.
    let low = Math.ceil(minimum / increment), high = Math.floor(target / increment), best = null;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2), seller = mid * increment;
      const buyer = integer(totalForSeller(seller), 'Price including fees');
      if (buyer < seller) throw new Error('Steam returned invalid fee information.');
      if (buyer <= target) { best = { seller, buyer, fees: buyer - seller }; low = mid + 1; }
      else high = mid - 1;
    }
    if (!best) throw new Error('Price is below Steam’s minimum after fees.');
    return Object.freeze(best);
  }
  function groupInventory(assets, descriptions, appid, contextid) {
    const desc = new Map(descriptions.map(d => [`${d.classid}_${d.instanceid || '0'}`, d]));
    const groups = new Map();
    for (const a of assets) {
      const d = desc.get(`${a.classid}_${a.instanceid || '0'}`);
      if (!d || Number(d.marketable) !== 1 || !d.market_hash_name) continue;
      const amount = integer(a.amount || 1, 'Item quantity'); if (!amount) continue;
      const key = JSON.stringify([String(appid), String(contextid), d.market_hash_name, d.market_fee ?? null]);
      if (!groups.has(key)) groups.set(key, { key, appid: String(appid), contextid: String(contextid),
        hash: d.market_hash_name, name: d.market_name || d.name || d.market_hash_name,
        publisherFee: d.market_fee, image: imageUrl(d.icon_url || d.icon_url_large),
        nameColor: /^[a-fA-F0-9]{6}$/.test(d.name_color || '') ? `#${d.name_color}` : '', assets: [], available: 0 });
      const g = groups.get(key); g.assets.push({ assetid: String(a.assetid), amount, classid: String(a.classid), instanceid: String(a.instanceid || '0') }); g.available += amount;
    }
    return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name));
  }
  function allocate(group, quantity) {
    quantity = integer(quantity, 'Quantity');
    if (!quantity || quantity > group.available) throw new Error(`Invalid quantity for ${group.name}.`);
    let remaining = quantity; const jobs = [];
    for (const a of group.assets) {
      if (!remaining) break;
      const amount = Math.min(remaining, a.amount); remaining -= amount;
      jobs.push({ assetid: a.assetid, amount, appid: group.appid, contextid: group.contextid, name: group.name });
    }
    if (remaining) throw new Error('Inventory changed. Reload items before continuing.');
    return jobs;
  }
  class Queue {
    constructor({ delay = 1500, sleep = ms => new Promise(r => setTimeout(r, ms)), update = () => {} } = {}) {
      this.delay = delay; this.sleep = sleep; this.update = update; this.running = false; this.paused = false; this.stopped = false;
    }
    pause() { this.paused = true; this.update(); }
    resume() { this.paused = false; this.wake?.(); this.update(); }
    stop() { this.stopped = true; this.wake?.(); this.update(); }
    async gate() { while (this.paused && !this.stopped) await new Promise(r => { this.wake = r; }); }
    async run(jobs, execute, { delay = this.delay } = {}) {
      if (this.running) throw new Error('A batch is already running.');
      this.running = true; this.stopped = false; this.paused = false; this.update();
      try {
        // Steam's legacy page helpers can replace Array.entries() with a values-only method.
        batch: for (let index = 0; index < jobs.length; index++) {
          const job = jobs[index];
          if (job.status && job.status !== 'queued') continue;
          do {
            await this.gate(); if (this.stopped) break batch;
            job.status = 'working'; job.retryable = false; job.failedStep = undefined; job.message = ''; this.update();
            try { const result = await execute(job); job.status = result?.confirmation ? 'confirmation' : 'done'; job.message = result?.message || ''; }
            catch (error) {
              job.status = error.uncertain ? 'unknown' : 'failed'; job.message = error.message; job.failedStep = error.step;
              // Only a known read failure may resume the current job, after the user presses Retry.
              job.retryable = !error.uncertain && Boolean(error.retryable);
              this.paused = true; this.update();
            }
            this.update();
          } while (job.retryable);
          if (!this.stopped && delay > 0 && index < jobs.length - 1) await this.sleep(delay);
        }
      } finally { this.running = false; this.paused = false; this.wake = null; this.update(); }
    }
  }
  return Object.freeze({ integer, parseMoney, parseInput, imageUrl, quote, groupInventory, allocate, Queue });
});
