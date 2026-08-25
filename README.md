# Samuel Alake portfolio

Static portfolio site for `samuelalake.com` and its development preview.

## Repository map

- `index.html`, `homepage.css`, `homepage.js` — homepage and project-cover motion.
- `projects/<project>/index.html` — individual case studies.
- `projects/product-page.css` — shared product/case-study layout.
- `portfolio-footer.js` — shared footer injected into project pages.
- `case-study-sources/` — narrative sources and SME working documents.
- `CASE-STUDY-SPEC.md` — case-study structure and layout conventions.
- `CASE-STUDY-SME-HANDOFF.md` — handoff expectations for project SMEs.
- `DEPLOYMENT.md` — branch, Vercel, dev-alias, and verification runbook.

There is no build step. Serve the repository root with any static server for local review.

```sh
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Environments

- Production: `https://samuelalake.com` — do not update unless explicitly requested.
- Development: `https://dev.samuelalake.com` — use for portfolio review and annotated feedback.

Read [DEPLOYMENT.md](DEPLOYMENT.md) before changing either environment.
