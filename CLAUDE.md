# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OutreachFlow Pro — a CRM and outreach automation platform built as a single-page React app. Originally generated via Google AI Studio. All source code lives in `vibez-test-proj/`.

## Commands

```bash
cd vibez-test-proj
npm install        # install dependencies
npm run dev        # start dev server on port 3000
npm run build      # production build via Vite
npm run preview    # preview production build
```

There are no tests or linting configured.

## Architecture

- **Entry:** `index.html` loads Tailwind CSS via CDN and configures the import map. `index.tsx` mounts the React root.
- **Routing:** No router library. `App.tsx` manages navigation via `useState<ViewState>` and renders pages conditionally. Three views (focus_mode, automation_builder, import) bypass the main shell layout and render their own full-screen UI with an `onExit` callback.
- **Pages:** All in `pages/` — Dashboard, PipelineBoard, PipelineMatrix, Automations, AutomationBuilder, FocusMode, ImportWizard. Each is a self-contained component with hardcoded mock data (no API calls).
- **Types:** `types.ts` defines `Deal`, `Automation`, and `ViewState`. Adding a new page requires extending the `ViewState` union type.
- **Styling:** Tailwind via CDN script tag (not PostCSS). Custom theme colors (`primary`, `primary-dark`, `background-light`, `surface-light`) are configured in `index.html`. Uses Inter font from Google Fonts.
- **Path aliases:** `@/*` maps to the project root via both `tsconfig.json` paths and Vite's `resolve.alias`.

## Key Conventions

- React 19 + TypeScript, JSX transform (`react-jsx`), ES modules
- Dependencies: `recharts` for charts, `lucide-react` for icons
- Environment variable `GEMINI_API_KEY` is exposed as `process.env.API_KEY` and `process.env.GEMINI_API_KEY` via Vite's `define` config
- No state management library — all state is local component state
- No backend or API integration — all data is mocked inline
