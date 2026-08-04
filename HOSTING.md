# How to Host joahsolutions.com

This guide takes you from the React file you just received all the way to a live website at **joahsolutions.com** — using GitHub Pages with Cloudflare for CDN, DDoS protection, and free SSL.

---

## Overview

Your site is built with **React (JSX)**. To host it, you need to:
1. Set up the project locally and build it into static HTML/CSS/JS
2. Deploy to GitHub Pages
3. Connect Cloudflare as your DNS and CDN layer
4. Point your `joahsolutions.com` domain to Cloudflare

---

## Step 1 — Install Prerequisites

You'll need **Node.js** installed on your computer.

- Download it from: https://nodejs.org (choose the "LTS" version)
- Verify it worked by opening Terminal (Mac) or Command Prompt (Windows) and running:
  ```
  node -v
  npm -v
  ```

---

## Step 2 — Create a Vite + React Project

```bash
npm create vite@latest joahsolutions -- --template react
cd joahsolutions
npm install
```

Then replace the contents of `src/App.jsx` with the `index.jsx` file you received.

Also replace `src/main.jsx` with:
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

Clear out `src/index.css` (delete all its contents — the site has its own styles).

---

## Step 3 — Preview Locally

```bash
npm run dev
```

Open your browser to `http://localhost:5173` — you should see the site.

---

## Step 4 — Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized HTML, CSS, and JS files.

---

## Step 5 — Deploy to GitHub Pages

### 5a — Push your code to GitHub

1. Create a new GitHub repository named `joahsolutions` at https://github.com/new
2. In your project folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/joahsolutions.git
   git push -u origin main
   ```

### 5b — Install the GitHub Pages deploy tool

```bash
npm install gh-pages --save-dev
```

Add to `package.json` under `"scripts"`:
```json
"deploy": "gh-pages -d dist"
```

### 5c — Deploy

```bash
npm run build && npm run deploy
```

### 5d — Enable GitHub Pages

1. Go to your GitHub repo → **Settings → Pages**
2. Set **Source** to `Deploy from a branch`
3. Set branch to `gh-pages`, folder to `/ (root)` → Save

Your site will be live at `https://YOUR_USERNAME.github.io/joahsolutions/`

### 5e — Add your custom domain in GitHub

1. In GitHub → Settings → Pages → **Custom domain**
2. Type `joahsolutions.com` → Save
3. GitHub will create a `CNAME` file automatically and show a DNS check status

---

## Step 6 — Set Up Cloudflare

Cloudflare sits in front of GitHub Pages and provides free CDN, DDoS protection, and SSL.

### 6a — Add your site to Cloudflare

1. Go to https://dash.cloudflare.com and create a free account
2. Click **Add a Site** → enter `joahsolutions.com`
3. Choose the **Free plan**
4. Cloudflare scans your existing DNS records — review them and click **Continue**
5. Cloudflare gives you two nameservers, for example:
   ```
   aria.ns.cloudflare.com
   bob.ns.cloudflare.com
   ```

### 6b — Update nameservers at your domain registrar

Log in to wherever you bought `joahsolutions.com` (GoDaddy, Namecheap, Google Domains, etc.) and replace the existing nameservers with the two Cloudflare ones from the step above.

This hands DNS control to Cloudflare. Propagation takes 10 minutes to 24 hours.

### 6c — Add DNS records in Cloudflare

In Cloudflare → **DNS** → add the following records:

| Type | Name | Value | Proxy status |
|------|------|-------|--------------|
| `A` | `@` | `185.199.108.153` | Proxied (orange cloud ON) |
| `A` | `@` | `185.199.109.153` | Proxied (orange cloud ON) |
| `A` | `@` | `185.199.110.153` | Proxied (orange cloud ON) |
| `A` | `@` | `185.199.111.153` | Proxied (orange cloud ON) |
| `CNAME` | `www` | `YOUR_USERNAME.github.io` | Proxied (orange cloud ON) |

These A record IPs are GitHub Pages' official addresses.

### 6d — Configure SSL in Cloudflare

1. In Cloudflare → **SSL/TLS** → set encryption mode to **Full**
   (Do not use "Full Strict" — GitHub Pages uses a shared certificate)
2. Go to **SSL/TLS → Edge Certificates** → enable **Always Use HTTPS**

---

## Step 7 — Enforce HTTPS in GitHub

Back in GitHub → Settings → Pages → confirm `joahsolutions.com` is set as your custom domain, then check **"Enforce HTTPS"**.

It may take a few minutes for GitHub to issue the certificate after DNS propagates.

---

## Step 8 — Set Up Contact Form (Optional)

The contact form currently shows a success message but doesn't send emails. To make it work:

### Option A — Formspree (Free, no code)
1. Go to https://formspree.io and create a free account
2. Create a new form → get your form endpoint URL
3. In `index.jsx`, find the `<form onSubmit={submit}>` element and replace with:
   ```jsx
   <form action="https://formspree.io/f/YOUR_ID" method="POST">
   ```

### Option B — EmailJS (Free tier)
Connect the form to send emails directly from the browser using https://emailjs.com

---

## Summary Checklist

- [ ] Node.js installed
- [ ] Vite project created and `index.jsx` copied in
- [ ] Site previewed locally (`npm run dev`)
- [ ] Production build created (`npm run build`)
- [ ] Code pushed to GitHub repository
- [ ] GitHub Pages enabled on the repo (Settings → Pages)
- [ ] Custom domain `joahsolutions.com` added in GitHub Pages settings
- [ ] Cloudflare account created and site added
- [ ] Nameservers updated at domain registrar to Cloudflare's
- [ ] DNS A records (4x GitHub IPs) added in Cloudflare — proxied
- [ ] CNAME `www` record added in Cloudflare — proxied
- [ ] Cloudflare SSL mode set to **Full**
- [ ] **Always Use HTTPS** enabled in Cloudflare
- [ ] **Enforce HTTPS** checked in GitHub Pages settings
- [ ] Contact form wired up (optional)

---

## Need Help?

Email: hello@joahsolutions.com

Total estimated time to go live: **~1–2 hours** (most of that is nameserver propagation).
