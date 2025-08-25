# Trip Tracker Frontend

A modern, responsive React app to plan trip budgets, track spending, split group expenses, and view beautiful summaries.

Quick start:
1) Install dependencies
   npm install

2) Run dev server
   npm start

3) Optional: Enable real auth
   - Copy .env.example to .env
   - Fill Firebase config
   - Sign in with Google
   App works in Demo Mode without .env

Key routes:
- /login: Sign in or toggle Demo Mode
- /dashboard: Trip KPIs, progress bar, charts, quick add expense
- /trips: Create/edit trips, list, open
- /trips/:id: Trip details, expenses CRUD, category pie
- /group: Group balances & suggested settlements
- /summary: Totals, per-category, balances, export CSV/PDF
- /flow: Visual flow summary/diagram

Env variables (see .env.example):
- REACT_APP_FIREBASE_* for Firebase Auth
- REACT_APP_API_BASE_URL (optional) to switch from local storage to a backend
- REACT_APP_SITE_URL for auth redirects

Design:
- Card-based layout with pastel gradients, rounded corners, and soft shadows
- Mobile-first; bottom navigation cards on mobile, navbar on desktop

Notes:
- In Demo Mode, trips and expenses are stored in localStorage with seeded sample data.
- PDF export uses the browser print dialog for simplicity.
