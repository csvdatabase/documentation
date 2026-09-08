# Releasing

```bash
bash scripts/upsert-branch.sh v1
bash scripts/release.sh 1.0.0 true # dry run
bash scripts/release.sh 1.0.0
```

Pass `true` as the second argument for a dry run; omit it to release. Every release requires its matching major branch (`1.x.x` on `v1`), a clean checkout, and an unused tag. Dry runs validate these conditions and print commands without changing files. Real releases update version metadata, run repo checks, commit changes, push the branch and annotated tag atomically, and create a GitHub release. The release workflow checks the tag, version metadata, and branch ancestry again.

From the central `csdb` repo, run the same scripts across all six versioned repos:

```bash
bash scripts/release-all.sh 1.0.0 true # dry run
bash scripts/release-all.sh 1.0.0
```

Central releases apply the same checks, run sequentially, and stop on the first script failure. They do not wait for publishing workflows; completed releases are not rolled back. Resume by releasing the remaining repos individually. `csdb` and `website` are excluded.

Updates `package.json` and `package-lock.json`, installs dependencies, and builds the site with the matching specification branch. GitHub Releases validate and build the tagged documentation; branch pushes continue to deploy through the existing CI workflow.
