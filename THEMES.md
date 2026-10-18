# Market Manager themes

Open Market Manager and use **Theme** in the upper-right corner to choose **Default** or **Black**. The choice applies immediately to the window, menus, launch buttons, and the inventory values added by the extension. Selections and price reviews stay in place when you change themes.

**Default** preserves the existing Steam-blue appearance and is selected initially. **Black** follows the supplied Minimal Dark for Steam theme: neutral dark surfaces, thin grey borders, accent outlines, green sale buttons and progress bars, and distinct success, error, and confirmation colours.

The preference is stored locally as `clean-market-theme` on Steam Community, persists across page reloads, and synchronizes with other open Steam Community pages. If browser storage is unavailable, changing the theme still works for the current page.

## Reference and adaptation

All 274 files in the supplied `Minimal-Dark-for-Steam/` directory were read and analyzed, including 260 stylesheets, 11 scripts, two JSON files, and the README. The supplied version is **Minimal Dark 6.2.5**, by **SaiyajinK**, with source commit `6a2f10be191f8ea7ef8a1ebfc27e4ad86d31f198` recorded in `metadata.json`.

The Black theme adapts the design to the extension's existing controls:

| Reference | Applied design |
| --- | --- |
| `elements/config.css` and `webkit.css` | `#121212` main surfaces, `#191919` panels, `#1e1e1e` raised surfaces, `#262626` borders, `#dcdcdc` text, grey secondary text |
| Market and inventory rules in `webkit.css` | Thin outlined buttons, neutral rows, accent hover states, green sale controls and red cancellation controls |
| `elements/scrollbar.css` | Dark scrollbars with accent hover |
| `skin.json` and `elements/options/global_options/corners/` | Rounded 5 px fallback; the active theme's corner value takes precedence |
| `elements/options/various_options/oled_screens/` | Active OLED palette values are inherited when available |
| Configuration and progress styles | Green progress, green success, red errors, orange confirmations |

When Steam exposes the theme's `--minimal_dark_*` or `--SystemAccentColor*` variables, Black uses the active palette, accent, and corner settings. Otherwise, its local fallback values provide the same dark design. Steam layout scripts and optional fonts are not loaded by the extension.
