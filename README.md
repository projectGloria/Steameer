<div align="center">

<img src="assets/icon128.png" alt="Steameer Icon" width="128" height="128" />

# Steameer

**Your personal Steam inventory and Community Market companion**

*Streamlined bulk selling, accurate inventory valuation, price-aware relisting, and listing management.*

<p>
  <img src="https://img.shields.io/badge/Version-1.0-blue.svg?style=flat-square" alt="Version: 1.0" />
  <img src="https://img.shields.io/badge/Author-NihilGPT-8A2BE2.svg?style=flat-square" alt="Author: NihilGPT" />
  <img src="https://img.shields.io/badge/Platform-Chromium%20(Chrome%20%7C%20Edge%20%7C%20Brave)-0078D4.svg?style=flat-square&logo=googlechrome" alt="Platform: Chromium" />
  <img src="https://img.shields.io/badge/Manifest-V3-orange.svg?style=flat-square" alt="Manifest V3" />
  <img src="https://img.shields.io/badge/Privacy-100%25%20Local-00B074.svg?style=flat-square" alt="Privacy: 100% Local" />
</p>

---

<p>
  <a href="#-about-steameer">About</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-visual-tour">Visual Tour</a> •
  <a href="#-installation--setup">Installation</a> •
  <a href="#-smart-relisting--selling-workflow">Workflows</a> •
  <a href="#-themes--customization">Themes</a> •
  <a href="#-architecture--development">Architecture</a> •
  <a href="#-license--credits">Credits</a>
</p>

<picture>
  <img
    width="860"
    src="Steameer.png"
    alt="Steameer Artwork and Interface Preview"
  />
</picture>

</div>

---

## 🎮 About Steameer

**Steameer** is a lightweight, local-first Chromium browser extension built to give you total control over your Steam Community inventory and Market activities. Whether managing thousands of trading cards, tracking CS2 item prices, or fine-tuning listings to beat shifting market conditions, Steameer brings native-grade desktop tools directly into your Steam web experience.

Designed with privacy and safety as first-class priorities:

- 🛡️ **100% Local & Private**: No third-party servers, remote databases, or analytics trackers. Steameer interacts directly with the official Steam Community APIs using your active browser session.
- ⚡ **Manifest V3 Architecture**: Adheres strictly to the latest Chromium extension standards, injecting encapsulated Shadow DOM controls without disrupting Steam's native DOM or style sheets.
- 💡 **Financial Transparency**: Live fee calculators clearly display seller proceeds vs. buyer prices, taking the guesswork out of Steam's transaction cuts.
- 🎛️ **Non-Destructive Fail-Safes**: All bulk actions include explicit review stages, granular pause/resume controls, and automated rate-limit recovery.

---

## ✨ Key Features

<table>
  <tr>
    <td width="50%">
      <h3>📦 Bulk Inventory Selling</h3>
      <p>Select multiple items across games (CS2, Dota 2, TF2, Steam) and list them at customized prices, matching or undercutting the lowest active market offers.</p>
    </td>
    <td width="50%">
      <h3>🔄 Safe &amp; Smart Relisting</h3>
      <p>Snapshot your inventory, cancel uncompetitive listings, verify item recovery, and automatically relist at reviewed target prices in one seamless workflow.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>💎 Real-Time Inventory Valuation</h3>
      <p>Instant portfolio calculations for any inventory context. View gross value, net proceeds after Steam fees, and per-item median market pricing.</p>
    </td>
    <td width="50%">
      <h3>🚫 Batch Listing Cancellation</h3>
      <p>Quickly search, filter, and cancel multiple active Market listings without clicking through dozens of individual Steam confirmation prompts.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🎨 Dual Theme Engine</h3>
      <p>Switch seamlessly between classic <b>Steam Blue</b> and a bespoke <b>Black</b> theme adapted from <i>Minimal Dark for Steam</i> (with OLED screen support).</p>
    </td>
    <td width="50%">
      <h3>🛡️ Network Error Recovery</h3>
      <p>Built-in handling for Steam HTTP 500 error spikes with countdown retries, preventing lost items or duplicated listings.</p>
    </td>
  </tr>
</table>

---

## 📸 Visual Tour

### 1. In-Page Market Manager
Injects a clean, non-intrusive launcher button directly onto Steam Market and Inventory pages. Opening the manager launches an isolated, high-performance modal window.

<p align="center">
  <img src="Steameer.png" alt="Steameer Showcase Artwork" width="820" />
</p>

### 2. Toolbar Quick-Access Popup
Clicking the toolbar extension icon provides a sleek popup window with instant shortcuts to your inventory, the Community Market, and status overview.

<p align="center">
  <img src="assets/icon128.png" alt="Steameer 128px Icon" width="96" height="96" />
</p>

### 3. Price Review & Batch Confirmation
Before any item is posted or cancelled, Steameer generates a complete preview showing:
- Current lowest market price
- Intended buyer price
- Estimated seller net payout
- Total projected proceeds across the entire batch

---

## 🚀 Installation & Setup

Steameer is distributed as an unpacked local extension, ensuring complete transparency and full user control.

### Step-by-Step Installation

1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/projectGloria/Steameer.git
   ```
   *(Or download and extract the repository ZIP file to your local drive)*

2. **Open Extension Settings**:
   - In **Google Chrome**: navigate to `chrome://extensions`
   - In **Microsoft Edge**: navigate to `edge://extensions`
   - In **Brave**: navigate to `brave://extensions`

3. **Enable Developer Mode**:
   - Toggle the **Developer mode** switch in the top-right corner.

4. **Load Unpacked Extension**:
   - Click the **Load unpacked** button.
   - Select the folder containing `manifest.json`.

5. **Start Using Steameer**:
   - Navigate to [Steam Community Market](https://steamcommunity.com/market/) or your [Steam Inventory](https://steamcommunity.com/my/inventory/).
   - Click the **Market Manager** launch button or click **Check inventories** to get started!

> [!NOTE]
> Ensure you are logged into your Steam account in the browser. Steameer uses your existing Steam Community session cookies and requires no additional API keys or logins.

---

## 🔄 Smart Relisting & Selling Workflow

Steameer follows a structured, multi-stage pipeline designed to protect your items from network interruptions:

```
[ Active Listings ] ──▶ [ Select Items ] ──▶ [ Choose Strategy ]
                                                    │
                                                    ▼
[ Safe Batch Run ] ◀── [ Snapshot Inventory ] ◀── [ Review & Confirm ]
        │
        ├── Match Lowest / Undercut
        ├── Automated Cancel & Return Wait
        └── Post at Target Price
```

### Relisting Steps:

1. **Refresh Active Listings**: Market Manager loads your live listings with item icons, prices, and buyer fee splits.
2. **Select & Filter**: Choose individual listings or entire batches across multiple pages and search results.
3. **Choose Pricing Strategy**:
   - **Match lowest listing**: Positions your item at the current top market price.
   - **Undercut lowest listing**: Lowers price by 1 currency unit for faster transactions.
   - **Fixed buyer price**: Applies a specific price across selected items.
4. **Review Relisting**: Compare your current price against the new buyer price and net proceeds before any cancellation takes place.
5. **Execute Batch**:
   - The engine snapshots your current inventory state.
   - Cancels the original listing.
   - Awaits the item's return to your inventory (excluding identical copies already owned).
   - Submits the new listing at the reviewed price.

> [!IMPORTANT]
> If Steam encounters a temporary service error (e.g., HTTP 500) during a batch, Steameer pauses the affected item with a countdown timer. You can use **Retry inventory check** to resume safely without re-cancelling the listing.

---

## 🎨 Themes & Customization

Switch themes on the fly from the **Theme** picker located in the top-right corner of the Market Manager modal.

| Theme | Description | Aesthetic Details |
| :--- | :--- | :--- |
| **Default** | Classic Steam Community Blue | `#1b2838` background, `#66c0f4` accents, Motiva Sans styling |
| **Black** | Minimal Dark Adaptation | `#121212` main surfaces, `#191919` panels, thin borders, OLED support |

### Minimal Dark Adaptation

The **Black** theme adapts the design language of **Minimal Dark 6.2.5** by **SaiyajinK** (`6a2f10b`):
- Deep OLED-friendly dark surfaces (`#101010` – `#1e1e1e`)
- Dynamic accent inheritance when Steam's `--minimal_dark_*` or `--SystemAccentColor*` variables are available
- High-contrast color indicators: Green for progress & profits, Red for cancellations, Amber for pending confirmations
- Preferences persist locally across page loads and sync across open Steam Community tabs

---

## 🛠️ Architecture & Development

```
Steameer/
├── manifest.json              # Chromium Manifest V3 configuration
├── Steameer.png               # High-resolution branding artwork
├── assets/                    # Extension icons (16px, 32px, 48px, 128px)
├── dist/
│   └── index.html             # Toolbar action popup
├── html/
│   ├── steameer.css           # Styling for toolbar action popup
│   └── tradeoffers.html       # Trade offer interface helpers
├── core.js                    # Fee math, price parser, currency conversions
├── steam.js                   # Steam API client, inventory snapshot, rate limiter
├── app.js                     # Shadow DOM UI, Market Manager dialog & controls
├── js/                        # Compatibility runtime copies
│   ├── clean-market-core.js
│   ├── clean-market-steam.js
│   └── clean-market-app.js
├── RELISTING.md               # Detailed relisting behavior & error handling
└── THEMES.md                  # Theme specifications & CSS mapping
```

### Developer Notes

- **MAIN World Execution**: Content scripts run directly in the `MAIN` world (`world: "MAIN"` in `manifest.json`), allowing direct communication with Steam's in-page JavaScript objects and sessions.
- **Shadow DOM Isolation**: The UI is attached to a closed Shadow Root (`#clean-market-root`), ensuring zero style leakage into native Steam elements.
- **Sync Copies**: When making edits to `core.js`, `steam.js`, or `app.js`, keep the corresponding files in `js/clean-market-*.js` strictly synchronized.

---

## 📜 License & Credits

- **Steameer**: Created by **NihilGPT**.
- **Minimal Dark Adaptation**: Black theme based on *Minimal Dark for Steam* (v6.2.5) by **SaiyajinK**.
- **Steam Community**: Valve, Steam, the Steam logo, and Counter-Strike are trademarks and/or registered trademarks of Valve Corporation. All other trademarks are property of their respective owners. Steameer is an independent companion tool and is not affiliated with or endorsed by Valve Corporation.

---

<div align="center">
  <sub>Crafted for effortless Steam trading • <b>Steameer 1.0</b></sub>
</div>
