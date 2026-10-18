# Relisting items

Refresh the Steam Community Market page, open **Market Manager**, and choose **Relist items**.

1. Click **Refresh active listings**.
2. Select the listings you want to relist. Selection works across pages and search results.
3. Choose **Match lowest listing**, **Undercut lowest listing**, or **Fixed buyer price**.
4. Click **Review relisting**. Compare the current buyer price, new buyer price, and your proceeds after fees.
5. Click **Relist** to start the reviewed batch.

For each listing, the extension snapshots your inventory, cancels the listing, waits for the returned item, and submits that item at the reviewed price. Existing copies in your inventory are excluded. Steam mobile or email confirmations may still be required.

Relisting currently supports individual listings with complete Steam item metadata. Missing details or invalid prices block the review before any cancellation. Steam restrictions, delayed returns, or ambiguous item matches can leave a cancelled item in your inventory. The batch reports that outcome; use **Save batch report** to save the item details. Interrupted or uncertain sale and cancellation requests are never automatically repeated. Check your inventory, active listings, and pending confirmations before acting on them again.

Temporary inventory service errors (including HTTP 500) retry with a countdown. If the service remains unavailable, the batch pauses on the affected item. **Retry inventory check** resumes that item using the original inventory snapshot, without cancelling its listing again. Recovery is available while that batch remains open. If you stopped or reloaded an older batch after an item was cancelled, use **Sell items** to list it from inventory instead.

**Pause** pauses before the next cancellation or submission. **Stop batch** prevents subsequent requests once an in-flight request finishes. If the original listing was already cancelled, the item may remain in inventory.

## Developer checks

Run `npm install` and `npm test` with Node.js 26 (or a supported Node.js version listed in `package.json`). Tests use simulated Steam responses and do not access an account or submit real listings.

The manifest loads `core.js`, `steam.js`, and `app.js`. Their matching copies in `js/clean-market-*.js` must stay identical.
