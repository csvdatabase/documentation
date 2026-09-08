# CSDB Documentation

Builds [docs.csvdatabase.net](https://docs.csvdatabase.net/) with Docusaurus. Requires Node.js 22 or newer.

```bash
npm ci
npm start
npm run build
```

# Versioning

Every `1.x.x` release must come from `v1`, every `2.x.x` from `v2`, and so on. Individual and central releases apply exactly the same checks.

```bash
# From the central csdb repo (with sibling checkouts):
bash scripts/upsert-branch.sh v1
bash scripts/release-all.sh 1.0.0 true # dry run
bash scripts/release-all.sh 1.0.0
bash scripts/release.sh 1.0.0 true # dry run
```

Pass `true` as the second release argument for a dry run; omit it to release. Scripts resolve repo paths relative to their own location.

The release repos are `csdb-typescript`, `api-typescript`, and `server-typescript`. Python is currently a placeholder without a publisher. Docs deploy on commits; the homepage has its own deployment workflow. Central releases run sequentially and stop on failure; already published releases are not rolled back. To resume, release the remaining repos individually using the same version.

`bash scripts/upsert-branch.sh v1` in a versioned repo requires a clean checkout, switches to the existing branch or creates it from HEAD, fast-forwards from origin when present, and pushes the branch. Only `v` followed by digits is accepted. In `csdb`, this script only calls the versioned sibling repos' Bash scripts; it does not create, switch, or push a branch in `csdb` itself. The central `csdb` repo has no versioned releases. The homepage (`website`) is excluded from these version-branch commands.

## Documentation builds

`npm run build` and `npm start` fetch the specification at build time into the ignored clone `documentation/specification`. Docusaurus renders its `specification/` folder at `/specification/`. Edit source in the specification repo. Local changes in the nested clone stop the build instead of being discarded.

Branch names match exactly: docs `main` fetches specification `main`; docs `v1` fetches specification `v1`. Missing branches fail the build. Version branches continue rebuilding as commits arrive; they are not frozen snapshots. For local feature-branch previews, use `DOCS_BRANCH=main npm run build` (or `v1`). `SPECIFICATION_REPOSITORY` can point to a local Git repo when first creating the clone.

One workflow, `.github/workflows/ci.yml`, builds and deploys every documentation push on `main` and `v<number>`, with pull requests building their base version. Set repository secrets `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, and the repository variable `CLOUDFLARE_PAGES_PROJECT`. Set the Pages production branch to `main`. If Pages Git integration is enabled, disable its automatic builds to avoid duplicate deployments. The specification repo dispatches this same workflow on every matching branch push. Set its `DOCS_WORKFLOW_TOKEN` secret to a token with Actions write access to the documentation repo; the matching docs branch must exist. Manual workflow_dispatch also rebuilds the selected branch.

The version selector navigates between these separately built sites:

- `main`: `https://docs.csvdatabase.net/`
- `v1`: `https://v1.docs.csvdatabase.net/`

Add each available version to `static/versions.json` on `main`, with its exact branch name as the label. After the first deployment of a branch, run `bash scripts/cloudflare-docs-version-domain.sh v1` to configure its custom domain. This also requires `CLOUDFLARE_ZONE_ID` and `CLOUDFLARE_PAGES_PROJECT` environment variables.
