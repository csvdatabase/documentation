# CSDB Documentation

> **Start here:** Project-wide information, planning, and community resources
> live in the [main CSDB repository](https://github.com/csvdatabase/csdb).

## Introduction

This repository builds [docs.csvdatabase.net](https://docs.csvdatabase.net/). It
documents the CSDB format, language APIs, SQL support, and JSON server API.

## Development

The site uses Docusaurus and requires Node.js 18 or newer.

```bash
npm install
npm start
npm run build
```

The specification is included through the `docs/specification` Git submodule. Make format
changes in the specification repository, then update the pinned submodule commit.
