# Deployment runbook

This repository has two distinct delivery targets. Treat them separately.

| Target | URL | Source / owner | Rule |
| --- | --- | --- | --- |
| Production | `https://samuelalake.com` | GitHub Pages / production branch | Never deploy without Samuel's explicit approval. |
| Development | `https://dev.samuelalake.com` | Vercel project `portfolio-redesign-58d67a` | Use for review builds and annotations. |

## Development deployment

Vercel account scope:

```text
sams-projects-67b5023f
```

Vercel project:

```text
portfolio-redesign-58d67a
```

The remote review branch currently used for handoff is:

```text
claude/portfolio-redesign-58d67a
```

Do not assume pushing that branch will refresh the `dev` domain. The reliable workflow is to create a Vercel deployment and explicitly assign the dev alias.

### 1. Confirm the source state

Deploy only from the intended clean integration worktree.

```sh
git status --short
git branch --show-current
git log -1 --oneline
```

If the worktree contains concurrent or unrelated edits, stop and reconcile them first. Do not reset or discard another agent's work.

### 2. Preserve the review branch

When the reviewed integration commit should become the new shared handoff state:

```sh
git push origin HEAD:claude/portfolio-redesign-58d67a
```

This updates the remote review branch; it is not a production deploy.

### 3. Link the worktree to Vercel

```sh
npx --yes vercel@latest link \
  --project portfolio-redesign-58d67a \
  --scope sams-projects-67b5023f \
  --yes
```

Vercel writes local project metadata under `.vercel/` and may create a local `.env` file. Both are ignored and must never be committed.

### 4. Create a preview deployment

```sh
npx --yes vercel@latest deploy \
  --scope sams-projects-67b5023f \
  --yes
```

Save the deployment URL printed by the command.

### 5. Point dev at that deployment

```sh
npx --yes vercel@latest alias \
  <deployment-url> \
  dev.samuelalake.com \
  --scope sams-projects-67b5023f
```

This changes only the development alias. Do not use `--prod` and do not assign `samuelalake.com` in this workflow.

## Verification checklist

After assigning the alias:

1. Open `https://dev.samuelalake.com/?v=<commit-sha>` to bypass stale browser caches.
2. Open every case study changed in the deployment with the same cache-busting query.
3. Verify both source state and rendered layout. An HTTP 200 alone is not visual verification.
4. Check the browser console for errors and warnings.
5. Confirm animated media loads, loops as intended, and has a reduced-motion fallback where applicable.
6. Confirm `git status --short` is clean.

For the current portfolio redesign, verify at minimum:

- `/` — Facebook, Rem, and Trove cover media.
- `/projects/rem/` — latest reconciled Rem narrative and visual corrections.
- Any other project modified by the deployment.

## Rollback

Every Vercel preview has a stable deployment URL. To roll the dev domain back, reassign the alias to the last known-good deployment:

```sh
npx --yes vercel@latest alias \
  <known-good-deployment-url> \
  dev.samuelalake.com \
  --scope sams-projects-67b5023f
```

Rollback of the dev alias does not change Git history or production.
