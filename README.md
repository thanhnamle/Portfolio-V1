# Personal Portfolio

Portfolio of **Le Thanh Nam** — a Computer Science student at Swinburne Vietnam focused on backend services and full-stack web apps.

Live site: [portfolio-v1-lemon-rho.vercel.app](https://portfolio-v1-lemon-rho.vercel.app/)

## Design

- **Split sidebar** — profile, section navigation and contact links stay pinned on desktop; on mobile they become a profile card plus a sticky section switcher.
- **Bento grid** — about, education, experience and projects are laid out as tiles of different sizes.
- **System blueprint** — the tech stack is drawn as a request-flow diagram (client → API → services and data) instead of a list of badges.
- Light and dark themes, keyboard focus styles, and `prefers-reduced-motion` support.

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · Lucide icons · Vitest + Testing Library

## Updating content

All content lives in [`src/data/profile.ts`](src/data/profile.ts): profile links, about text, timeline, the stack diagram and projects. Components read from it, so updates never require touching the UI code.

- Optional links (`resumeUrl`, a project's `github` / `live`) are hidden when left empty.
- To add a résumé, place the PDF in `public/` (e.g. `public/resume.pdf`) and set `resumeUrl: "/resume.pdf"`.
- Project images go in `src/assets/` — WebP, about 1200px wide, keeps the page light.

## Getting started

Requires Node.js 18 or later.

```bash
git clone https://github.com/thanhnamle/Portfolio-V1.git
cd Portfolio-V1
npm install
npm run dev        # http://localhost:8080
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build
- `npm run test` — run the test suite
- `npm run lint` — lint the codebase

## Deployment

Deployed on Vercel at the domain root. For a sub-path host such as GitHub Pages, build with `VITE_BASE_PATH=/Portfolio-V1/`.

---

*Designed and developed by [Le Thanh Nam](https://github.com/thanhnamle).*
