# Trip Tracker Frontend

Features implemented:
- User authentication via Firebase Auth (Google) with Demo Mode fallback
- Create, edit, view trips
- Dashboard with hero card, KPIs, progress, charts
- Quick add expense modal
- Group balances and settlement suggestions
- Alerts for overspending
- Trip summary with exports (CSV, basic PDF via print)
- Card-based responsive layout with pastel theme
- Demo data seeded into localStorage for easy testing

Environment:
- Copy .env.example to .env and fill Firebase config to enable real sign-in.
- Without .env, app runs in Demo Mode (no backend required).

Routing:
- /login, /dashboard, /trips, /trips/:id, /group, /summary, /flow
