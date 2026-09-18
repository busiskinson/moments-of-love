# Our Monthsary — Setup & Customization Guide

A static, romantic one-page website celebrating your 9 months together. No backend, no build tools — just open it in a browser.

## 1. Project structure

```
monthsary-website/
├── index.html              → all the content and page structure
├── css/
│   └── style.css            → all styling (blue-and-white theme)
├── js/
│   └── script.js             → navigation, scroll animations, lightbox, music button
├── assets/
│   ├── images/
│   │   ├── blue-tulip-bouquet.png → PLACEHOLDER — add your real bouquet photo here
│   │   ├── nov19-01/02/03.jpg → your real Nov 19 photos (already in place)
│   │   ├── dec19-yes.jpg      → your real "he said yes" photo (already in place)
│   │   ├── month-01a/b.jpg    → your real Month 1 photos (already in place)
│   │   ├── month-02a/b.jpg    → your real Month 2 photos (already in place)
│   │   └── month-03.jpg … month-09.jpg → PLACEHOLDERS, not yet added
│   └── music/
│       ├── Daniel Caesar Best Part.mp3   → PLACEHOLDER — add your own copy of this song
│       └── Daniel Caesar Neu Roses.mp3   → PLACEHOLDER — add your own copy of this song
└── README.md
```

## 2. How to run it in VS Code

1. Open the `monthsary-website` folder in VS Code (**File → Open Folder…**).
2. Install the **Live Server** extension (search for it in the Extensions panel, `Ctrl+Shift+X`).
3. Right-click `index.html` in the file explorer → **Open with Live Server**.
4. Your browser opens automatically and reloads every time you save a file.

You can also just double-click `index.html` to open it directly in a browser — everything works without a server, though Live Server gives you auto-refresh while editing.

## 3. Photos already placed for you

Based on what you shared, these real photos are already wired into the site:

| Site slot | File(s) | What it shows |
|---|---|---|
| Hero polaroids + "November 19" memory card | `nov19-01.jpg`, `nov19-02.jpg`, `nov19-03.jpg` | The day you started dating |
| "December 19 — She Asked, He Said Yes" | `dec19-yes.jpg` | The courting photo collage |
| "Month 1" memory card | `month-01a.jpg`, `month-01b.jpg` | Your 1-month photos |
| "Month 2" memory card | `month-02a.jpg`, `month-02b.jpg` | Your 2-month photos |

Each of these cards opens a lightbox — since some dates had more than one photo, clicking the card lets you flip through all of them with the left/right arrows.

**One thing to double-check:** you mentioned the "he said yes" date as December 19, 2026 — since that's in the future relative to your 9-month timeline, I assumed it was meant to be **December 19, 2025** (which lines up with "9 months together" today). If that's not right, just update the date text in `index.html` (search for `December 19`).

## 4. Adding your remaining photos (Months 3–9)

For each month you still want to add:

1. Save your photo as `assets/images/month-03.jpg` (or `month-04.jpg`, etc.) — matching filenames are already referenced as placeholders.
2. Open `index.html` and find the matching placeholder block, e.g.:

```html
<figure class="polaroid-card is-placeholder reveal" style="--r:-3deg" data-caption="Month 3">
  <div class="placeholder-box">
    <i class="fa-regular fa-image"></i>
    <span>assets/images/month-03.jpg</span>
  </div>
  <figcaption>
    <span class="card-title">Month 3</span>
    <span class="card-date">Add your photo</span>
  </figcaption>
</figure>
```

3. Replace the `<div class="placeholder-box">…</div>` with an `<img>` tag, and remove `is-placeholder` from the class list, and add a `data-gallery` attribute so it opens in the lightbox:

```html
<figure class="polaroid-card reveal" style="--r:-3deg"
        data-gallery='["assets/images/month-03.jpg"]'
        data-caption="Month 3 — write your own caption here.">
  <img src="assets/images/month-03.jpg" alt="Month 3 together" loading="lazy">
  <figcaption>
    <span class="card-title">Month 3</span>
    <span class="card-date">Write your own caption</span>
  </figcaption>
</figure>
```

Repeat for Months 4–9.

## 5. Adding the tulip bouquet image

**A note on the current bouquet:** I don't have an image-generation tool in this environment, so I can't produce a real photographic bouquet for you. What's on the hero page right now is a hand-built SVG illustration (gradient tulips, ribbon, wrap) that stands in gracefully so there's never an empty box — but for the premium, photographic look from your reference image, you'll want to drop in a real photo.

To do that:

1. Find a blue tulip bouquet photo — either your own, one you buy, or a free-to-use one from a site like [Unsplash](https://unsplash.com/s/photos/blue-tulips) or [Pexels](https://www.pexels.com/search/blue%20tulips/) (both offer photos free for personal use).
2. Save it as:

```
assets/images/blue-tulip-bouquet.png
```

(portrait orientation, roughly 1200×1500px works best)

3. That's it — no code changes needed. The page checks for this file automatically: the moment it loads successfully, it replaces the illustration; if it's missing, the illustration stays so the layout never breaks.

## 6. Adding music (optional)

1. Save your two MP3 files at exactly these paths (spelling and spaces matter):
   ```
   assets/music/Daniel Caesar Best Part.mp3
   assets/music/Daniel Caesar Neu Roses.mp3
   ```
2. The floating music button (bottom-right, visible on every page) plays them as a little playlist — "Best Part" first, then "Neu Roses (Transgressor's Song)" — looping back to the first once the second ends. It never autoplays — she has to press the button herself.
3. To change the songs, their order, or add more, edit the `playlist` array near the top of the music section in `js/script.js`:
   ```javascript
   const playlist = [
     { src: 'assets/music/Daniel Caesar Best Part.mp3', title: 'Best Part', artist: 'Daniel Caesar' },
     { src: 'assets/music/Daniel Caesar Neu Roses.mp3', title: "Neu Roses (Transgressor's Song)", artist: 'Daniel Caesar' }
   ];
   ```
   Add a new `{ src, title, artist }` entry for each additional song, in the order you want them to play.

## 7. Customizing text

Everything is plain text inside `index.html`, so you can edit it directly:

- **Timeline entries** (Our Journey section) — look for `<div class="timeline-card">` blocks; Months 3–8 still have placeholder copy ("Replace this with your own Month X memory.") for you to personalize.
- **Love letter** (Messages section) — inside `<div class="letter">`.
- **Names/dates** — search for "November 19" and "December 19" if your dates change.

## 8. Publishing it later

Once you're happy with it, you can put it online for free with any of these:

- **GitHub Pages** — push the folder to a GitHub repo, then enable Pages in the repo settings.
- **Netlify Drop** (netlify.com/drop) — drag and drop the whole folder, get a live link instantly.
- **Vercel** — similar drag-and-drop or GitHub-connected deploy.

No backend or database is needed for any of these — it's a fully static site.
