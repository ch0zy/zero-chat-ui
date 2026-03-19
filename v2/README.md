# Zero Chat UI

A responsive chat interface built with the [Zero Design System](https://www.figma.com/design/48cSN8wRRPb51bvzP6BBBC/Zero-Component-Library) — featuring the full Zero Foundation token set (colour, typography, spacing, elevation, border radius, motion).

## Features

- 💬 Multi-conversation sidebar with unread badges
- 🟢 Online / offline presence indicators
- 🔍 Contact search
- ⌨️ Message composer with Enter-to-send and Shift+Enter for new line
- 🎨 100% Zero Design System tokens (gb-teal palette, Lexend typeface, Zero spacing & elevation)

## Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
zero-chat-ui/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx       # React entry point
    └── ChatUI.jsx     # Main chat component
```

## Deployment

### GitHub Pages

1. Install the gh-pages helper:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add to `package.json` scripts:
   ```json
   "deploy": "gh-pages -d dist"
   ```
3. Set `base` in `vite.config.js` to your repo name:
   ```js
   base: '/zero-chat-ui/'
   ```
4. Run:
   ```bash
   npm run build && npm run deploy
   ```

### Vercel / Netlify

Push to GitHub and import the repo — both platforms auto-detect Vite and configure the build (`npm run build`, output `dist/`) automatically.
