# GloriaSetup rollout for Steameer

## Result

Nothing was packed or wired up. No `gloria.toml` was added and `.github/workflows/build-installers.yml` is unchanged.

## Findings

- **Build type:** Steameer is a Manifest V3 Chromium browser extension (plain JavaScript, no build step). It is not a
  Windows application.
- **Main exe:** none. `gloria.toml` requires a `main_exe` that exists inside `app-dir`, and GloriaSetup creates Start
  Menu shortcuts and an uninstall entry for that exe. The extension has no exe and no standalone window.
- **Runtime files:** `manifest.json`, `core.js`, `steam.js`, `app.js`, `assets/`, `dist/`, `html/`, `js/`. These are
  what the existing workflow zips. They only run inside a browser.
- **Settings folder:** none on disk. The extension runs in the browser profile, so there is no `%APPDATA%` folder to
  list in `data_folders`.
- **Icon:** there is no `Steameer.ico` and no `.ico` anywhere in the repo. The largest square icon is
  `assets/icon128.png` at 128x128. GloriaSetup needs a `.png` of at least 256x256. `Steameer.png` is the README
  artwork, not an icon. I did not create or edit icon files.
- **Existing release:** the current tag workflow zips the extension to `steameer-<version>-chromium-any.zip` and
  attaches it to the release. It works, so I left it alone.
- **Catalog:** the GloriaLauncher catalog lists Steameer as "Desktop Apps" with tech stack "JavaScript, Steam API,
  Desktop". That does not match what is in this repo.
- **Version mismatch:** `manifest.json` says `1.0` and the catalog says `0.1.9`.

## Please

1. Decide how Steameer should reach Windows users. The options I see:
   - Keep shipping the extension zip, and make the GloriaLauncher entry point at that release instead of a setup exe.
   - Wrap the extension in a small desktop shell (for example Tauri or Electron) that has an exe, an icon and a
     data folder. Then rerun this rollout. With Tauri, the data folder is its identifier.
2. If you wrap it, add a 256x256 or larger icon (`Steameer.ico` in the repo root is simplest).
3. Fix the version mismatch between `manifest.json` (`1.0`) and the GloriaLauncher catalog (`0.1.9`).
