## Quick orientation for AI coding agents

This is a small React + Vite storefront (BeatStore). Be practical and code against the existing client-only architecture.

- Entry points: `src/main.jsx` mounts the app; `src/App.jsx` contains all `Route` declarations and is the best place to add new pages.
- Styling: global CSS lives in `src/index.css`. Bootstrap is imported in `src/main.jsx` and `src/App.jsx`.
- Data: product catalog is a static array at `src/data/db.js`. Images are referenced relative to `public/img/...`.

Core patterns to follow
- Routing: routes are explicit imports + `<Route path=... element={...} />` in `src/App.jsx` (React Router v7). To add a page, create the component under `src/pages/` and add an import + Route in `App.jsx`.
- Global state: authentication uses `src/hooks/ContextLogin.jsx`. It persists user data with localStorage key `usuarioBeatStore`.
- Cart: cart logic is in `src/hooks/useCarrito.js`. Cart is stored in localStorage under key `cart`. Respect MAX_ITEMS = 5 and MIN_ITEMS = 1 logic when changing cart behavior.
- UI patterns: presentational components live in `src/components/` and page-level components in `src/pages/`. Reuse `NavbarBeatStore.jsx`, `FooterBeatStore.jsx`, and `ToastNotificacion.jsx` for consistent layout and notifications.

Build, run and lint
- Dev server: `npm run dev` (runs `vite`).
- Build: `npm run build`.
- Preview production build: `npm run preview`.
- Lint: `npm run lint` (config in `eslint.config.js`).
- Tests: Jest is listed in devDependencies but there is no `test` script. You can run `npx jest` or add a `test` script to `package.json` if needed.

Integration and constraints
- This is a purely client-side demo: there is no backend. All product data and user session state live in the client (`src/data/db.js`, `localStorage`). Avoid adding server-side assumptions.
- Images referenced in `db.js` expect files under `public/img/...`. When adding products, add images to `public/img/<category>/` and use the same relative path.

Small, actionable examples
- Add a product: edit `src/data/db.js` and append an object { id, name, image: "img/....jpg", description, price }. Then add the image under `public/img/...` and it will appear where the product list component consumes `db`.
- Add a route/page: create `src/pages/foo/Foo.jsx`, export default your component, then in `src/App.jsx` add:
  - `import Foo from "./pages/foo/Foo"` and
  - `<Route path="/foo" element={<Foo/>} />`
- Update auth flow: change `ContextLogin` in `src/hooks/ContextLogin.jsx`. The provider wraps the app in `App.jsx`; updates to login state propagate via `useLogin()`.

When editing
- Keep changes small and focused. Update relevant tests or add a simple smoke test if you change routing or hooks. There are no existing tests to follow; prefer small unit tests using Jest + React Testing Library.
- Respect localStorage keys (`usuarioBeatStore`, `cart`) to avoid breaking persisted data for developers.

Files to inspect first when starting work
- `src/App.jsx` — routes and provider wiring
- `src/hooks/ContextLogin.jsx` — auth provider and localStorage key
- `src/hooks/useCarrito.js` — cart behavior and limits
- `src/data/db.js` — product data and image paths
- `src/components/` and `src/pages/` — UI conventions and composition

If any of the above is unclear, ask the repo owner for: intended checkout/payment integration (currently the repo has a `checkout` UI but no payment backend), and whether persistent storage should be migrated from localStorage to a backend.

Be conservative: change UI copy and styles freely, but avoid data-model changes that require migration unless requested.

-- End of instructions
