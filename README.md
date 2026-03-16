# Zero Chat UI

A chat interface built with the Zero Foundation design system — Teal (GB) colour tokens and Lexend type scale.

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Deploy

### Vercel (recommended — one command)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Vite. Your app will be live at a `*.vercel.app` URL.

To link a custom domain, run `vercel --prod` after the first deploy, then configure DNS in the Vercel dashboard.

### Netlify

```bash
npm run build
npm install -g netlify-cli
netlify deploy --dir=dist --prod
```

Or drag-and-drop the `dist/` folder at https://app.netlify.com/drop after running `npm run build`.

### GitHub + Vercel (auto-deploy on push)

1. Push this folder to a GitHub repo
2. Go to https://vercel.com/new and import the repo
3. Vercel will auto-deploy on every push to `main`

## Project structure

```
zero-chat-ui/
├── index.html          # Entry HTML (Lexend font loaded here)
├── vite.config.js      # Vite config
├── package.json
└── src/
    ├── main.jsx        # React root
    └── ChatUI.jsx      # Full chat UI component
```

## Design tokens

All colours, type styles, and spacing come from the Zero Foundation:
- Brand colours: Teal (GB) palette, `gb-teal-10` → `gb-teal-100`
- Typeface: Lexend (300 / 400 / 600 / 700)
- Primary action colour: `gb-teal-60` (#03727D)
