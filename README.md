# Steameer

**Version 1.0 by NihilGPT**

A personal Steam extension using the supplied `Steameer.png` artwork. It supports inventory value checks, bulk selling, cancelling Market listings, and reviewing prices before relisting. The existing Default and Black themes are available in Market Manager.

## Install locally

1. Extract `releases/Steameer-1.0.zip`, or use the prepared `releases/Steameer-1.0` folder.
2. Open `chrome://extensions` in Chrome or `edge://extensions` in Edge.
3. Enable **Developer mode**, choose **Load unpacked**, and select the folder containing `manifest.json`.
4. Refresh your Steam Community inventory or Market page. Open **Market Manager** to begin.

The toolbar icon opens shortcuts to your inventory and the Market. The interface and extension details identify this release as **Steameer — 1.0 by NihilGPT**. This is a local unpacked extension with author attribution; the ZIP is not a browser-store-signed package.

An older Steam embedded-browser installation is recorded separately in `INSTALLATION.json`. Building this release does not replace that installation or change its cached version registration.

## Build and checks

On Windows, run `npm run build` to create the unpacked release folder and ZIP. Building uses PowerShell and requires no npm dependencies. Runtime scripts are included locally; development dependencies are not packaged.

For development checks, use a Node.js version supported by `package.json`, run `npm ci`, then `npm test`. Tests simulate Steam responses without submitting real listings. Keep `core.js`, `steam.js`, and `app.js` identical to their corresponding `js/clean-market-*.js` compatibility copies.

See `RELISTING.md` for relisting behavior and `THEMES.md` for theme details and attribution to Minimal Dark for Steam by SaiyajinK.
