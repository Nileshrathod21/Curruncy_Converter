# AI Currency Converter (scaffold)

This repository contains a small React + Vite scaffold for an AI Currency Converter UI.

Features included:

- Real-time conversion using exchangerate.host (no API key)
- Swap currencies, Save recent conversions (localStorage)
- Dark / Light theme toggle (Tailwind `dark` class)
- Responsive UI with Tailwind and glassmorphism styling

How to run

1. Install dependencies:

```powershell
npm install
```

2. Start dev server:

```powershell
npm run dev
```

Notes

- Tailwind is already listed in package.json. If you run into issues with Tailwind directives, ensure the installed Tailwind version supports `@tailwind base; @tailwind components; @tailwind utilities;` or replace with the appropriate imports for your installed version.
- UI files are under `src/components` and the main page is `src/pages/Home.jsx`.
