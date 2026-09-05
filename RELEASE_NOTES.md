# Legends of Retro Web v0.1.7

Deployment fix:
- Adds an explicit Node build step.
- Copies the static website into `dist/`.
- Configures Vercel to publish `dist/` as the output directory.
- Removes the unnecessary `/ -> /index.html` rewrite; Vercel serves `dist/index.html` as the homepage automatically.
- Keeps `/api` serverless functions at the repository root.

This avoids relying on Vercel's zero-build static auto-detection, which was producing a Ready deployment that returned `404: NOT_FOUND`.
