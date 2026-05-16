# How to Host joahsolutions.com

This guide takes you from the React file you just received all the way to a live website at **joahsolutions.com** — step by step.

---

## Overview

Your site is built with **React (JSX)**. To host it, you need to:
1. Set up the project locally
2. Build it into static HTML/CSS/JS
3. Deploy to a hosting platform
4. Point your `joahsolutions.com` domain to the host

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

Vite is the easiest way to build a React site.

```bash
# In your Terminal, run:
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

And clear out `src/index.css` (delete all its contents — the site has its own styles).

---

## Step 3 — Preview Locally

```bash
npm run dev
```

Open your browser to `http://localhost:5173` — you should see the site. ✅

---

## Step 4 — Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized HTML, CSS, and JS files ready to upload.

---

## Step 5 — Deploy (Choose One)

### Option A — Vercel (Recommended, Free)

1. Go to https://vercel.com and sign up (free)
2. Click **"Add New Project"**
3. Import your project folder or connect GitHub
4. Vercel auto-detects Vite — just click **Deploy**
5. Your site goes live at a `*.vercel.app` URL instantly

### Option B — Netlify (Also Free)

1. Go to https://netlify.com and sign up
2. Drag & drop your `dist/` folder onto the Netlify dashboard
3. Done — instant deploy at a `*.netlify.app` URL

### Option C — GitHub Pages (Free, slightly more steps)

1. Push your code to a GitHub repository
2. Install the deploy tool: `npm install gh-pages --save-dev`
3. Add to `package.json` under `"scripts"`:
   ```json
   "deploy": "gh-pages -d dist"
   ```
4. Run `npm run build && npm run deploy`
5. Enable GitHub Pages in your repo Settings → Pages

---

## Step 6 — Connect joahsolutions.com

### If your domain is registered at GoDaddy, Namecheap, Google Domains, or similar:

**On Vercel:**
1. In your Vercel project → Settings → Domains
2. Add `joahsolutions.com` and `www.joahsolutions.com`
3. Vercel shows you DNS records to add (usually an A record and CNAME)
4. Log in to your domain registrar → DNS settings → add those records
5. Wait 10–30 minutes for DNS to propagate

**On Netlify:**
1. Site settings → Domain management → Add custom domain
2. Follow the same DNS instructions shown there

### If you don't own the domain yet:

Register it at:
- https://namecheap.com (~$10/year)
- https://domains.google.com (~$12/year)
- https://www.godaddy.com

---

## Step 7 — Enable HTTPS (SSL)

Both Vercel and Netlify automatically provision free SSL certificates (HTTPS) via Let's Encrypt once your domain is connected. No action needed.

---

## Step 8 — Set Up Contact Form (Optional)

The contact form on the site currently shows a success message but doesn't actually send emails. To make it work:

### Option A — Formspree (Free, no code)
1. Go to https://formspree.io and create a free account
2. Create a new form → get your form endpoint URL
3. In `index.jsx`, find the `<form onSubmit={submit}>` element and add:
   ```jsx
   <form action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
   (Remove the `onSubmit` handler)

### Option B — EmailJS (Free tier)
Connect the form to send emails directly from the browser using https://emailjs.com

---

## Summary Checklist

- [ ] Node.js installed
- [ ] Vite project created and `index.jsx` copied in
- [ ] Site previewed locally (`npm run dev`)
- [ ] Production build created (`npm run build`)
- [ ] Deployed to Vercel or Netlify
- [ ] Custom domain `joahsolutions.com` connected via DNS
- [ ] HTTPS working (auto on Vercel/Netlify)
- [ ] Contact form wired up (optional)

---

## Need Help?

Email: hello@joahsolutions.com  
Or message the team that built this site.

Total estimated time to go live: **~1–2 hours** (most of that is DNS propagation).
