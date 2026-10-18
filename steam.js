(function (root) {
  'use strict';
  if (root.CleanMarketSteam) return;
  const C = root.CleanMarketCore;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const currencies = { 1:'USD',2:'GBP',3:'EUR',4:'CHF',5:'RUB',6:'PLN',7:'BRL',8:'JPY',9:'NOK',10:'IDR',11:'MYR',12:'PHP',13:'SGD',14:'THB',15:'VND',16:'KRW',17:'TRY',18:'UAH',19:'MXN',20:'CAD',21:'AUD',22:'NZD',23:'CNY',24:'INR',25:'CLP',26:'PEN',27:'COP',28:'ZAR',29:'HKD',30:'TWD',31:'SAR',32:'AED',33:'SEK',34:'ARS',35:'ILS',36:'BYN',37:'KZT',38:'KWD',39:'QAR',40:'CRC',41:'UYU' };
  class SteamError extends Error {
    constructor(message, uncertain = false, details = {}) { super(message); this.uncertain = uncertain; Object.assign(this, details); }
  }
  function context({ requireWallet = true } = {}) {
    let user = {};
    try { user = JSON.parse(document.querySelector('#application_config')?.getAttribute('data-userinfo') || '{}'); } catch {}
    const steamid = String(root.g_steamID || user.steamid || '');
    const wallet = root.g_rgWalletInfo;
    if (!/^765\d{14}$/.test(steamid) || (requireWallet && !wallet?.wallet_currency)) throw new SteamError('Sign in to Steam, then open your own inventory or the Market page.');
    const currency = Number(wallet?.wallet_currency || 0), code = currencies[currency];
    if (requireWallet && !code) throw new SteamError('This wallet currency is not supported yet.');
    return { steamid, wallet, currency, code, country: wallet?.wallet_country || 'US' };
  }
  function session() {
    const value = root.g_sessionID || document.cookie.match(/(?:^|;\s*)sessionid=([^;]+)/)?.[1];
    if (!value || !/^[a-zA-Z0-9]+$/.test(value)) throw new SteamError('Steam session is unavailable. Reload and sign in again.');
    return value;
  }
  function feeFunction(ctx, group) {
    const w = ctx.wallet;
    const publisher = Number(group.publisherFee ?? w.wallet_publisher_fee_percent_default);
    const steam = Number(w.wallet_fee_percent);
    if (Number(w.wallet_fee) === 0) return n => n;
    if (!Number.isFinite(publisher) || publisher < 0 || publisher > 1 || !Number.isFinite(steam) || steam < 0 || steam > 1)
      throw new SteamError('Steam fee information is unavailable. Reload the inventory.');
    if (typeof root.GetTotalWithFees === 'function') return n => root.GetTotalWithFees(n, publisher, steam, w);
    if (typeof root.CalculateAmountToSendForDesiredReceivedAmount === 'function') return n => {
      const result = root.CalculateAmountToSendForDesiredReceivedAmount(n, publisher);
      return typeof result === 'number' ? result : result.amount;
    };
    // Fail closed if Steam changes its fee interface; never guess a listing's net amount.
    throw new SteamError('Steam’s fee calculator is not available on this page. Open your inventory and try again.');
  }
  function parseListings(html, assets = {}) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const found = new Map();
    const active = doc.querySelector('#tabContentsMyActiveMarketListingsTable, #tabContentsMyActiveMarketListingsRows, [data-table-id="sell_listings"]') || doc;
    for (const row of active.querySelectorAll('[id^="mylisting_"]')) {
      const id = row.id.match(/^mylisting_(\d+)$/)?.[1];
      if (!id) continue;
      const name = row.querySelector('.market_listing_item_name_link, .market_listing_item_name')?.textContent.trim();
      if (!name) continue;
      const priceNode = row.querySelector('.market_listing_my_price, .market_listing_price');
      const priceText = priceNode?.textContent.replace(/\s+/g, ' ').trim() || '';
      const parts = priceText.match(/^([^()]+?)(?:\s*\(([^()]+)\))?\s*$/);
      const buyerText = (priceNode?.querySelector('.market_listing_price_with_fee')?.textContent || parts?.[1] || '').trim();
      const sellerText = (priceNode?.querySelector('.market_listing_price_without_fee')?.textContent || parts?.[2] || '').replace(/[()]/g,'').trim();
      const parse = text => { try { return text ? C.parseMoney(text) : null; } catch { return null; } };
      const buyer = parse(buyerText), net = parse(sellerText);
      const href=row.querySelector('a[href*="/market/listings/"]')?.getAttribute('href') || '';
      const appid=href.match(/\/market\/listings\/(\d+)\//)?.[1] || '';
      // Read IDs from Steam's remove link without executing page-provided JavaScript.
      let identity = null;
      for (const link of row.querySelectorAll('a[href], [onclick]')) {
        const action = `${link.getAttribute('href') || ''} ${link.getAttribute('onclick') || ''}`;
        const match = action.match(/RemoveMarketListing\(\s*['"]mylisting['"]\s*,\s*['"]?(\d+)['"]?\s*,\s*['"]?(\d+)['"]?\s*,\s*['"]?(\d+)['"]?\s*,\s*['"]?(\d+)['"]?\s*\)/);
        if (match && match[1] === id && (!appid || match[2] === appid)) identity = { appid:match[2], contextid:match[3], assetid:match[4] };
      }
      const asset = identity && assets?.[identity.appid]?.[identity.contextid]?.[identity.assetid];
      const metadata = asset && /^\d+$/.test(String(asset.classid)) && asset.market_hash_name ? {
        ...identity, hash:asset.market_hash_name, classid:String(asset.classid), instanceid:String(asset.instanceid || '0'),
        publisherFee:asset.market_fee, amount:Number(asset.amount || 1)
      } : {};
      found.set(id, { id, key: id, name, appid, ...metadata, gameName:row.querySelector('.market_listing_game_name')?.textContent.trim() || '', image: C.imageUrl(row.querySelector('.market_listing_item_img, img')?.getAttribute('src')),
        priceText, buyerText, sellerText, buyer, seller:buyer !== null && net !== null && net <= buyer ? net : null });
    }
    return [...found.values()];
  }
  class Client {
    constructor({ fetch = root.fetch.bind(root), sleep: wait = sleep, gap = 800, cancelGap = 250, onWait = null } = {}) {
      this.fetch = fetch; this.sleep = wait; this.gap = gap; this.cancelGap = cancelGap; this.onWait = onWait; this.chain = Promise.resolve(); this.prices = new Map();
    }
    request(path, { method = 'GET', data, checkpoint, onWait } = {}) {
      if (!/^\/(?:market\/(?:priceoverview|mylistings|sellitem|removelisting\/\d+)|inventory\/\d+\/\d+\/\d+)\/?(?:\?|$)/.test(path))
        return Promise.reject(new SteamError('Unexpected Steam endpoint.'));
      const isPrice = method === 'GET' && path.startsWith('/market/priceoverview/');
      const step = path.startsWith('/inventory/') ? 'Inventory check' : path.startsWith('/market/removelisting/') ? 'Listing cancellation' : path.startsWith('/market/sellitem') ? 'Listing submission' : 'Market request';
      const check = async () => {
        try {
          if (this.shouldStop?.()) throw new SteamError('Batch stopped.');
          await checkpoint?.();
        } catch (error) { throw new SteamError(error.message); }
      };
      const wait = async (ms, attempt) => {
        for (let remaining = ms; remaining > 0; remaining -= 1000) {
          await check();
          try { (onWait || this.onWait)?.(remaining, attempt, step); } catch {}
          await this.sleep(Math.min(1000, remaining));
        }
        await check();
      };
      const work = async () => {
        for (let attempt = 0; ; attempt++) {
          await check();
          const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 20000);
          try {
            const res = await this.fetch(path, { method, credentials: 'same-origin', cache: 'no-store', signal: controller.signal,
              ...(method === 'POST' ? { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, body: new URLSearchParams(data).toString() } : {}) });
            const rateLimited = res.status === 429 || res.status === 503;
            const temporary = rateLimited || [408,500,502,504].includes(res.status);
            // Only reads may be retried. A failed POST can already have changed Steam's state.
            if (method === 'GET' && temporary && !(isPrice && res.status === 500) && attempt < (rateLimited ? 8 : 4)) {
              clearTimeout(timer); const retry = Number(res.headers.get('Retry-After'));
              const schedule = (rateLimited ? [5000,10000,15000,20000,25000,30000,30000,30000] : [2000,4000,8000,15000])[attempt];
              const waitMs = Math.min(60000, Math.max(schedule, Number.isFinite(retry) ? retry * 1000 : 0));
              await wait(waitMs, attempt + 1);
              continue;
            }
            if (!res.ok) {
              if (isPrice && (res.status === 500 || res.status === 404 || res.status === 400)) throw new SteamError('No lowest sell listing returned for this item.');
              throw new SteamError(`${step}: ${res.status === 429 ? 'Steam rate limit reached. Wait before continuing.' : `Steam returned HTTP ${res.status}.`}`, method === 'POST' && (res.status >= 500 || res.status === 408), { step, status:res.status, retryable:method === 'GET' && temporary });
            }
            const text = await res.text();
            try { return JSON.parse(text); }
            catch { throw new SteamError(`${step}: Steam returned an unexpected response.`, method === 'POST', { step, retryable:method === 'GET' }); }
          } catch (error) {
            if (error instanceof SteamError) throw error;
            if (method === 'GET' && attempt < 2) {
              clearTimeout(timer); await wait(2000 * (attempt + 1), attempt + 1); continue;
            }
            throw new SteamError(`${step}: Connection interrupted. Check Steam before repeating this action.`, method === 'POST', { step, retryable:method === 'GET' });
          } finally { clearTimeout(timer); }
        }
      };
      const result = this.chain.then(work);
      // Cancellation pacing lives here; the batch queue must not add a second delay.
      const gap = method === 'POST' && /^\/market\/removelisting\/\d+$/.test(path) ? this.cancelGap : this.gap;
      this.chain = result.catch(() => {}).then(() => this.sleep(gap));
      return result;
    }
    async inventory(ctx, appid, contextid, progress = () => {}, { checkpoint, onWait } = {}) {
      if (!/^\d+$/.test(String(appid)) || !/^\d+$/.test(String(contextid))) throw new SteamError('Invalid inventory.');
      const assets = [], descriptions = []; const pages = new Set(); let start = '';
      do {
        const p = new URLSearchParams({ l: 'english', count: '2000', ...(start ? { start_assetid: start } : {}) });
        const data = await this.request(`/inventory/${ctx.steamid}/${appid}/${contextid}?${p}`, { checkpoint, onWait });
        if (!data || Number(data.success) !== 1 || (!Array.isArray(data.assets) && Number(data.total_inventory_count) !== 0)) throw new SteamError(data?.Error || data?.error || 'Inventory could not be loaded. It may be empty, private, or unavailable.');
        assets.push(...(data.assets || [])); descriptions.push(...(data.descriptions || [])); progress(assets.length);
        if (!data.more_items) break;
        start = String(data.last_assetid || '');
        if (!/^\d+$/.test(start) || pages.has(start)) throw new SteamError('Steam repeated an inventory page. Reload before selling.');
        pages.add(start);
      } while (pages.size < 1000);
      if (pages.size >= 1000) throw new SteamError('Inventory is too large for a single batch.');
      const seen = new Set();
      return C.groupInventory(assets.filter(a => { if (seen.has(a.assetid)) return false; seen.add(a.assetid); return true; }), descriptions, appid, contextid);
    }
    priceKey(ctx, group) {
      return JSON.stringify([String(group.appid), group.hash, ctx.currency, ctx.country]);
    }
    peekLowest(ctx, group, maxAge = 180000) {
      const cached = this.prices.get(this.priceKey(ctx, group));
      return cached && Date.now() - cached.checked < maxAge ? cached : null;
    }
    touchPrices(ctx, groups) {
      const now = Date.now();
      for (const group of groups || []) {
        const key = this.priceKey(ctx, group);
        const cached = this.prices.get(key);
        if (cached) this.prices.set(key, { ...cached, checked: now });
      }
    }
    async lowest(ctx, group, fresh = false) {
      const key = this.priceKey(ctx, group);
      const cached = !fresh ? this.peekLowest(ctx, group, 180000) : null;
      if (cached) return cached;
      const params = new URLSearchParams({ appid: group.appid, market_hash_name: group.hash, currency: String(ctx.currency), country: ctx.country, l: 'english' });
      const data = await this.request(`/market/priceoverview/?${params}`);
      const rawPrice = data?.lowest_price;
      if (!data?.success || !rawPrice) throw new SteamError(`No lowest sell listing returned for ${group.name}.`);
      const result = { price: C.parseMoney(rawPrice), checked: Date.now() };
      this.prices.set(key, result); return result;
    }
    async listings(progress = () => {}) {
      const found = new Map(); let start = 0;
      for (let page = 0; page < 1000; page++) {
        const data = await this.request(`/market/mylistings/?start=${start}&count=100`);
        if (!data?.success || typeof data.results_html !== 'string') throw new SteamError('Active listings could not be loaded. Open the Market page and sign in.');
        const rows = parseListings(data.results_html, data.assets); const before = found.size;
        for (const r of rows) found.set(r.id, r);
        progress(found.size);
        const total = Number(data.total_count ?? data.num_active_listings);
        if (!Number.isSafeInteger(total) || total < 0) throw new SteamError('Steam returned an unknown listing count.');
        if (found.size >= total) return [...found.values()];
        const step = Number(data.pagesize || 100);
        if (!Number.isSafeInteger(step) || step <= 0 || before === found.size) throw new SteamError('Steam’s listings layout changed. Cancellation is paused.');
        start += step;
      }
      throw new SteamError('Too many listing pages.');
    }
    async sell(job) {
      for (const field of ['appid','contextid','assetid']) if (!/^\d+$/.test(String(job[field]))) throw new SteamError('Invalid sale item.');
      if (!C.integer(job.seller) || !C.integer(job.amount)) throw new SteamError('Sale quantity and price must be positive.');
      const data = await this.request('/market/sellitem/', { method: 'POST', data: { sessionid: session(), appid: job.appid, contextid: job.contextid, assetid: job.assetid, amount: job.amount, price: job.seller } });
      if (data?.success === true || data?.success === 1) return { confirmation: Boolean(data.needs_mobile_confirmation || data.needs_email_confirmation), message: data.needs_mobile_confirmation ? 'Confirm this listing in the Steam mobile app.' : data.needs_email_confirmation ? 'Confirm this listing by email.' : 'Listing submitted.' };
      if (data?.success === false || data?.success === 0) throw new SteamError(typeof data.message === 'string' ? data.message : 'Steam rejected this listing.');
      throw new SteamError('Sale result is unclear. Check inventory and pending confirmations before trying again.', true);
    }
    validateRelist(job) {
      for (const field of ['id','appid','contextid','assetid','classid','instanceid']) {
        if (!/^\d+$/.test(String(job[field]))) throw new SteamError(`Item details are missing for ${job.name}. Refresh active listings before relisting.`);
      }
      if (!job.hash || job.amount !== 1) throw new SteamError(`Only individual listings with complete item details can be relisted: ${job.name}.`);
    }
    async relist(ctx, job, { checkpoint = async () => {}, update = () => {}, onWait } = {}) {
      const resuming = job.cancelled === true && job.phase === 'waiting for item' && Array.isArray(job.inventoryBefore) && !job.sellAttempted && !job.relisted;
      if ((job.phase || job.cancelled || job.sellAttempted) && !resuming) throw new SteamError('This relist request has already started. Check Steam and the batch report before doing anything else.');
      this.validateRelist(job);
      if (!C.integer(job.seller)) throw new SteamError('Relist price must be positive.');
      const matchingAssets = groups => groups.filter(g => g.hash === job.hash).flatMap(g => g.assets)
        .filter(a => a.classid === job.classid && a.instanceid === job.instanceid);
      const inventory = () => this.inventory(ctx, job.appid, job.contextid, () => {}, { checkpoint, onWait });
      if (!resuming) {
        // Retain the pre-cancellation snapshot across a failed read. Replacing it on resume
        // would mistake the returned item for a preexisting copy.
        try { job.inventoryBefore = matchingAssets(await inventory()).map(a => [a.assetid, a.amount]); }
        catch (error) { throw new SteamError(`Inventory check before cancellation failed. Original listing unchanged. ${error.message}`, false, { step:'Inventory check', retryable:Boolean(error.retryable) }); }
        await checkpoint();
        job.phase = 'cancelling'; update();
        await this.cancel(job);
        job.cancelled = true; job.phase = 'waiting for item'; update();
        // Give Steam time to return the asset before asking its inventory service.
        await this.sleep(1500);
      }
      const before = new Map(job.inventoryBefore);
      try {
        for (let attempt = 0; attempt < 8; attempt++) {
          await checkpoint();
          const returned = matchingAssets(await inventory())
            .filter(a => a.amount > (before.get(a.assetid) || 0));
          if (returned.length > 1 || returned.some(a => a.amount - (before.get(a.assetid) || 0) !== 1))
            throw new SteamError('Multiple matching items arrived. Check your inventory before listing manually.');
          if (returned.length === 1) {
            job.returnedAssetid = returned[0].assetid; job.phase = 'listing'; job.message = ''; update();
            await checkpoint();
            job.sellAttempted = true; update();
            const result = await this.sell({ ...job, assetid:job.returnedAssetid });
            job.relisted = true; job.phase = 'submitted'; update();
            return { ...result, message:result.confirmation ? result.message : 'Item relisted.' };
          }
          if (attempt < 7) await this.sleep(1500);
        }
        throw new SteamError('The returned item is not available to sell yet. Check your inventory and any Steam restrictions.', false, { step:'Returned item check', retryable:true });
      } catch (error) {
        const retryable = !job.sellAttempted && job.phase === 'waiting for item' && Boolean(error.retryable);
        throw new SteamError(`Original listing cancelled. ${error.message}${error.uncertain ? ' Check active listings and confirmations before retrying.' : retryable ? ' No sale was submitted. Retry the inventory check to resume this item.' : ' Item was not relisted; review it in your inventory.'}`, Boolean(error.uncertain), { step:error.step || (job.sellAttempted ? 'Listing submission' : 'Returned item check'), retryable });
      }
    }
    async cancel(job) {
      if (!/^\d+$/.test(String(job.id))) throw new SteamError('Invalid listing ID.');
      const data = await this.request(`/market/removelisting/${job.id}`, { method: 'POST', data: { sessionid: session() } });
      // Steam's legacy RemoveListingDialog accepts a JSON response; [] is its empty success payload.
      if (data === true || (Array.isArray(data) && data.length === 0) || data?.success === true || data?.success === 1) return { message: 'Listing cancelled.' };
      if (data?.success === false || data?.success === 0) throw new SteamError(typeof data.message === 'string' ? data.message : 'Steam rejected this cancellation.');
      throw new SteamError('Cancellation result is unclear. Reload active listings to verify it.', true);
    }
  }
  Object.defineProperty(root, 'CleanMarketSteam', { value: Object.freeze({ Client, context, session, feeFunction, parseListings, SteamError }) });
})(globalThis);
