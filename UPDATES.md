# Updates

## Release Workflow

For project changes, use this workflow:

1. Make the code or documentation update locally.
2. Run verification with `npm run lint` and `npm run build`.
3. Commit the verified changes to Git.
4. Push `main` to GitHub manually from this local repository.
5. Redeploy manually to Vercel with `npx vercel deploy --prod --yes`.
6. Verify the live Vercel URL responds successfully.

## 2026-05-09

- Renamed the app to Kanji Match Dojo and updated browser tab metadata.
- Rebuilt the README for GitHub with a clean application screenshot.
- Added the question set dashboard so the current 22-kanji set is selectable and future sets can be added cleanly.
- Added light and dark mode with matching splash screens on reload.
- Fixed matched pairs so both the kanji and meaning disappear after a correct match.
- Removed reading hints from the active pick and answer cards to keep the flow exam-like.
- Fixed wrong-attempt handling so a missed pair explicitly records both selected sides and increments Misses immediately.
