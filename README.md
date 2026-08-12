# Vaibhav Yadav — Portfolio

A Next.js + TypeScript + Tailwind portfolio site with a built-in local edit mode.

## Running it locally

```bash
npm install
npm run dev
```

Open **http://localhost:3000**.

## Editing the site yourself (no code required)

Whenever you run `npm run dev`, a small **"Edit this page"** button appears
in the bottom-right corner. This only works while the site is running
locally on your machine — it is automatically disabled the moment the site
is built for production or visited on a real hosted domain, so it's safe to
publish without exposing an edit button to the public.

1. Run `npm run dev` and open the site.
2. Click **Edit this page**.
3. Anything with a dashed lime outline is clickable — click it, type, then
   click elsewhere (or press Enter) to confirm.
4. Project images: open a project card, hover the image area (or the empty
   placeholder box), and click **Upload**. It saves into `public/uploads/`.
5. Lists (bullet points, tech tags, skills, certifications, links, projects,
   experience roles) get **+ Add** and **×** remove controls while editing.
6. When you're done, click **Save changes** in the toolbar. This writes your
   edits straight into `content/site.json` and `public/uploads/` on disk.
7. Click **Exit edit mode** to go back to the normal view.

### Publishing your edits

Saving in edit mode only updates the files on your own computer. To make
the changes visible on the live, hosted version of the site:

```bash
git add -A
git commit -m "Update portfolio content"
git push
```

If it's connected to Vercel (see below), this automatically triggers a new
deployment within a minute or two.

### Adding a new project, skill, certification, or link

You don't need edit mode for this — open `content/site.json` directly (or
use edit mode's **+ Add** buttons) and add an entry following the shape of
the existing ones. Every section on the page reads straight from this file.

### Adding more "connect" links (GitHub, X, YouTube, blog, etc.)

In edit mode, scroll to **Contact → + Add link**. Pick an icon, then fill in
the label (e.g. "GitHub"), the display value (e.g. "@yourhandle"), and the
full URL. Add as many as you like — the layout adapts automatically.

### Adding a vlog / article / video

Scroll to the **Writing & Vlogs** section → **+ Add post / video** in edit
mode, or add an entry to the `posts` array in `content/site.json` directly:

```json
{ "id": "1", "title": "Post title", "platform": "YouTube", "url": "https://...", "date": "2026" }
```

## Hosting it live

**Recommended: Vercel** — built by the makers of Next.js, free for personal
sites, and it auto-deploys every time you push to GitHub.

1. **Push this project to GitHub.**
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
   (Create the empty repo on github.com first, without a README — this
   project already has one.)

2. **Import it on Vercel.**
   - Go to [vercel.com](https://vercel.com), sign in with GitHub.
   - Click **Add New → Project**, select this repo.
   - Framework preset auto-detects as **Next.js** — leave the defaults.
   - Click **Deploy**.

3. **You're live.** Vercel gives you a free URL like
   `your-portfolio.vercel.app` immediately.

4. **Optional — custom domain.** Buy a domain (Namecheap, GoDaddy, Google
   Domains, etc.), then in the Vercel project go to **Settings → Domains**
   and add it. Vercel walks you through the DNS records to add at your
   registrar. Propagation usually takes minutes to a few hours.

5. **From now on:** edit locally with `npm run dev` → **Save changes** →
   `git add -A && git commit -m "..." && git push`. Vercel redeploys
   automatically every time.

### Why editing only works locally

The edit toolbar writes directly to files on disk (`content/site.json`,
`public/uploads/`). Real hosting platforms like Vercel run your site on
serverless infrastructure with a **read-only** filesystem — there's nowhere
for those writes to durably land in production, and allowing arbitrary file
writes from a public URL would be a serious security hole. So instead: draft
and preview changes locally, then publish with a normal git push, exactly
like any other code change.
