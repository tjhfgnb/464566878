# NOVA Daily on Cloudflare Pages

這是一個可部署到 Cloudflare Pages 的靜態網站，並包含 Pages Function：

- 靜態頁面：`index.html`
- 樣式：`styles.css`
- 互動與每日內容載入：`script.js`
- 每日內容 API：`functions/api/daily.js`

## 部署方式

### 推薦方式：GitHub + Cloudflare Pages

1. 在 GitHub 建立一個新的 repository。
2. 把這個資料夾內的所有檔案放到 repository 根目錄。
3. 到 Cloudflare Dashboard > Workers & Pages > Create application > Pages。
4. 選擇 Connect to Git，連接剛剛的 GitHub repository。
5. Framework preset 選 `None`。
6. Build command 留空。
7. Build output directory 設為 `/`。
8. 部署後網站會自動使用 `/api/daily` 每天更換內容。

## 自動化部署

此專案已包含 GitHub Actions：

```text
.github/workflows/deploy-pages.yml
```

它會在三種情況自動部署到 Cloudflare Pages：

- 推送到 `main` 分支
- 手動在 GitHub Actions 點 `Run workflow`
- 每天 UTC 00:00 執行一次，也就是台北時間 08:00

要讓 GitHub Actions 可以部署到 Cloudflare，請在 GitHub repository 設定兩個 Secrets：

```text
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

Cloudflare API Token 需要有 Cloudflare Pages 編輯/部署權限。Account ID 可在 Cloudflare Dashboard 右側或帳號設定中找到。

### 直接上傳

如果只用 Cloudflare Dashboard 拖拉上傳，`functions` 資料夾不會被編譯成 Pages Functions。這個專案有 `/api/daily`，所以請使用 GitHub 整合或 Wrangler CLI。

### Wrangler CLI

```bash
npm install
npx wrangler login
npm run deploy
```

## 每日更新方式

目前每日內容由 `functions/api/daily.js` 依照 `Asia/Taipei` 日期輪替。若之後要改成真正抓新聞、Notion、Google Sheets 或資料庫，可以把 `/api/daily` 改成讀取外部資料源。
