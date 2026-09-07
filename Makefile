SHELL := /bin/bash
.DEFAULT_GOAL := help

VERSION ?=
version ?=
DOCS ?= .
SPECIFICATION ?= ../specification
CSDB_JAVASCRIPT ?= ../csdb-javascript
CSDB_TYPESCRIPT ?= $(CSDB_JAVASCRIPT)
CSDB_PYTHON ?= ../csdb-python

RELEASE_VERSION := $(if $(version),$(version),$(VERSION))
LOCAL_VERSION_REPOS := docs=$(DOCS) specification=$(SPECIFICATION) csdb-javascript=$(CSDB_JAVASCRIPT) csdb-python=$(CSDB_PYTHON)
REMOTE_VERSION_REPOS := docs=https://github.com/csvdatabase/documentation.git specification=https://github.com/csvdatabase/specification.git csdb-javascript=https://github.com/csvdatabase/csdb-javascript.git csdb-python=https://github.com/csvdatabase/csdb-python.git

.PHONY: help docs cloudflare build dev serve domain version-domain check-local-version check-remote-version require-version release verify-release-version verify-major-branch verify-clean-tree require-gh

help:
	@echo "CSDB documentation commands"
	@echo ""
	@echo "Docs:"
	@echo "  make docs build"
	@echo "  make docs dev"
	@echo ""
	@echo "Repo release:"
	@echo "  make release version=1.1.1"
	@echo ""
	@echo "Branch checks:"
	@echo "  make check-local-version"
	@echo "  make check-remote-version"
	@echo ""
	@echo "Cloudflare:"
	@echo "  make cloudflare domain VERSION=v1"

build:
	npm run build

dev:
	npm run start

serve:
	npm run serve

release: verify-release-version verify-major-branch require-gh verify-clean-tree
	npm version "$(RELEASE_VERSION)" --no-git-tag-version
	npm install --package-lock-only --ignore-scripts
	npm run build
	git add package.json package-lock.json
	git commit -m "chore: release v$(RELEASE_VERSION)"
	git tag -a "v$(RELEASE_VERSION)" -m "v$(RELEASE_VERSION)"
	git push origin HEAD
	git push origin "v$(RELEASE_VERSION)"
	gh release create "v$(RELEASE_VERSION)" --target "$$(git branch --show-current)" --title "v$(RELEASE_VERSION)" --notes "Release v$(RELEASE_VERSION)"

verify-release-version:
	@test -n "$(RELEASE_VERSION)" || { echo "usage: make release version=1.1.1"; exit 1; }
	@if [[ ! "$(RELEASE_VERSION)" =~ ^[0-9]+\.[0-9]+\.[0-9]+$$ ]]; then \
		echo "version must be semver like 1.1.1"; \
		exit 1; \
	fi

verify-major-branch: verify-release-version
	@if [[ "$(RELEASE_VERSION)" =~ ^([0-9]+)\.0\.0$$ ]]; then \
		expected="v$${BASH_REMATCH[1]}"; \
		current="$$(git branch --show-current)"; \
		if [[ "$$current" != "$$expected" ]]; then \
			echo "major release $(RELEASE_VERSION) must be cut from branch $$expected; current branch is $$current"; \
			exit 1; \
		fi; \
	fi

verify-clean-tree:
	@if ! git diff --quiet || ! git diff --cached --quiet || [[ -n "$$(git ls-files --others --exclude-standard)" ]]; then \
		echo "working tree must be clean before running make release"; \
		exit 1; \
	fi

require-gh:
	@command -v gh >/dev/null 2>&1 || { echo "gh is required to create the GitHub release"; exit 1; }

cloudflare:
	@:

domain: require-version
	scripts/cloudflare-docs-version-domain.sh "$(VERSION)"

version-domain: domain

require-version:
	@test -n "$(VERSION)" || { echo "Set VERSION, for example: make cloudflare domain VERSION=v1"; exit 1; }
	@case "$(VERSION)" in v[0-9]*) true ;; *) echo "VERSION should look like v1, v2, etc."; exit 1 ;; esac

check-local-version:
	@scripts/check-version-branches.py local $(LOCAL_VERSION_REPOS)

check-remote-version:
	@scripts/check-version-branches.py remote $(REMOTE_VERSION_REPOS)
