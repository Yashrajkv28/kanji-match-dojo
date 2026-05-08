# Kanji Match Dojo

Kanji Match Dojo is a lightweight React game for drilling beginner kanji by matching each character to its English meaning.

## Features

- 22 beginner kanji covering numbers, nature, directions, and common nouns.
- Exam-style matching flow with no reading hints on the active prompt or answer cards.
- Correct pairs disappear from both columns to keep the board focused.
- Miss, match, accuracy, timer, and best-time tracking.
- Light and dark modes with a matching splash screen on every reload.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Motion
- Lucide React

## Run Locally

```bash
npm install
npm run dev
```

The local dev server runs on `http://localhost:3000/`.

## Build

```bash
npm run build
```

The production output is generated in `dist/`.

## Scripts

- `npm run dev` starts the development server.
- `npm run build` creates a production build.
- `npm run preview` serves the production build locally.
- `npm run lint` runs TypeScript checks.
- `npm run clean` removes `dist`.
