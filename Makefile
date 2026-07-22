SHELL := /bin/bash
.DEFAULT_GOAL := help

VERSION ?=
DOCS ?= .
SPECIFICATION ?= ../specification
CSDB_TYPESCRIPT ?= ../csdb-typescript
CSDB_PYTHON ?= ../csdb-python

REPO_TARGETS := docs specification csdb-typescript csdb-python
SELECTED_REPOS := $(filter $(REPO_TARGETS),$(MAKECMDGOALS))

.PHONY: help docs cloudflare build dev serve domain version-domain check-version check-version-branch create-version require-version require-selected-repos $(REPO_TARGETS)

help:
	@echo "CSDB documentation commands"
	@echo ""
	@echo "Docs:"
	@echo "  make docs build"
	@echo "  make docs dev"
	@echo ""
	@echo "Version checks:"
	@echo "  make check-version VERSION=v1"
	@echo "  make check-version-branch VERSION=v1"
	@echo ""
	@echo "Version creation:"
	@echo "  make create-version VERSION=v1 docs specification csdb-typescript csdb-python"
	@echo ""
	@echo "Cloudflare:"
	@echo "  make cloudflare domain VERSION=v1"
	@echo ""
	@echo "Path variables:"
	@echo "  DOCS=$(DOCS)"
	@echo "  SPECIFICATION=$(SPECIFICATION)"
	@echo "  CSDB_TYPESCRIPT=$(CSDB_TYPESCRIPT)"
	@echo "  CSDB_PYTHON=$(CSDB_PYTHON)"

build:
	npm run build

dev:
	npm run start

serve:
	npm run serve

cloudflare:
	@:

domain: require-version
	scripts/cloudflare-docs-version-domain.sh "$(VERSION)"

version-domain: domain

require-version:
	@test -n "$(VERSION)" || { echo "Set VERSION, for example: make check-version VERSION=v1"; exit 1; }
	@case "$(VERSION)" in v[0-9]*) true ;; *) echo "VERSION should look like v1, v2, etc."; exit 1 ;; esac

require-selected-repos:
	@test -n "$(SELECTED_REPOS)" || { echo "Choose repos, for example: make create-version VERSION=v1 docs specification csdb-typescript csdb-python"; exit 1; }

check-version: require-version
	@printf "%-16s %-28s %-18s %-3s\n" "Repo" "Path" "Current" "OK"
	@printf "%-16s %-28s %-18s %-3s\n" "----" "----" "-------" "--"
	@for entry in \
		"docs|$(DOCS)" \
		"specification|$(SPECIFICATION)" \
		"csdb-typescript|$(CSDB_TYPESCRIPT)" \
		"csdb-python|$(CSDB_PYTHON)"; do \
		repo="$${entry%%|*}"; \
		path="$${entry#*|}"; \
		if git -C "$$path" rev-parse --is-inside-work-tree >/dev/null 2>&1; then \
			current=$$(git -C "$$path" branch --show-current); \
			test -n "$$current" || current="detached:$$(git -C "$$path" rev-parse --short HEAD)"; \
			if [ "$$current" = "$(VERSION)" ]; then ok="Y"; else ok="N"; fi; \
		else \
			current="missing"; \
			ok="N"; \
		fi; \
		printf "%-16s %-28s %-18s %-3s\n" "$$repo" "$$path" "$$current" "$$ok"; \
	done

check-version-branch: require-version
	@printf "%-16s %-28s %-18s %-3s\n" "Repo" "Path" "Branch" "OK"
	@printf "%-16s %-28s %-18s %-3s\n" "----" "----" "------" "--"
	@for entry in \
		"docs|$(DOCS)" \
		"specification|$(SPECIFICATION)" \
		"csdb-typescript|$(CSDB_TYPESCRIPT)" \
		"csdb-python|$(CSDB_PYTHON)"; do \
		repo="$${entry%%|*}"; \
		path="$${entry#*|}"; \
		if git -C "$$path" rev-parse --is-inside-work-tree >/dev/null 2>&1 && \
			{ git -C "$$path" show-ref --verify --quiet "refs/heads/$(VERSION)" || \
			  git -C "$$path" ls-remote --exit-code --heads origin "$(VERSION)" >/dev/null 2>&1; }; then \
			ok="Y"; \
		else \
			ok="N"; \
		fi; \
		printf "%-16s %-28s %-18s %-3s\n" "$$repo" "$$path" "$(VERSION)" "$$ok"; \
	done

create-version: require-version require-selected-repos
	@for repo in $(SELECTED_REPOS); do \
		case "$$repo" in \
			docs) path="$(DOCS)" ;; \
			specification) path="$(SPECIFICATION)" ;; \
			csdb-typescript) path="$(CSDB_TYPESCRIPT)" ;; \
			csdb-python) path="$(CSDB_PYTHON)" ;; \
		esac; \
		if ! git -C "$$path" rev-parse --is-inside-work-tree >/dev/null 2>&1; then \
			echo "$$repo: missing git repo at $$path"; \
			exit 1; \
		fi; \
		if git -C "$$path" show-ref --verify --quiet "refs/heads/$(VERSION)"; then \
			echo "$$repo: $(VERSION) already exists"; \
		else \
			echo "$$repo: creating $(VERSION)"; \
			git -C "$$path" switch -c "$(VERSION)"; \
		fi; \
	done

$(REPO_TARGETS):
	@:
