// Runs in the existing Steam extension's isolated content-script slot.
// Load the tested app in the page world, where Steam's wallet globals exist.
(() => {
  'use strict';
  if (location.hostname !== 'steamcommunity.com' || !/^\/(?:market(?:\/|$)|(?:id|profiles)\/[^/]+\/inventory(?:\/|$))/.test(location.pathname)) return;
  const urls = ['core','steam','app'].map(name => chrome.runtime.getURL(`js/clean-market-${name}.js`));
  const start = async () => {
    if (document.getElementById('clean-market-root') || document.documentElement.dataset.cleanMarketLoading) return;
    document.documentElement.dataset.cleanMarketLoading = 'true';
    try {
      for (const url of urls) await new Promise((resolve, reject) => {
        const script = document.createElement('script'); script.src = url; script.async = false;
        script.onload = () => { script.remove(); resolve(); };
        script.onerror = () => { script.remove(); reject(new Error('Could not load Steameer.')); };
        (document.head || document.documentElement).append(script);
      });
    } catch (error) {
      delete document.documentElement.dataset.cleanMarketLoading;
      const message = document.createElement('div'); message.id = 'clean-market-loader-error';
      message.textContent = 'Steameer could not load. Refresh the page and check that the extension is enabled.';
      message.style.cssText = 'position:fixed;bottom:16px;right:16px;z-index:2147483647;max-width:360px;padding:14px;background:#40252b;color:#fff;font:14px Arial;border-radius:6px';
      document.body.append(message);
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();
