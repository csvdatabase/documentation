const sidebars = {
  docs: [
    "intro",
    "getting-started",
    "versioning",
    {
      type: "category",
      label: "Contributing",
      collapsed: true,
      items: [
        "contributing/contributing/roadmap",
        "contributing/contributing/contributing",
        "contributing/contributing/governance"
      ]
    },
    "reference/types",
    "reference/validation",
    {
      type: "category",
      label: "API Reference",
      collapsed: true,
      items: [
        "api/overview",
        "api/database",
        "api/table-query",
        "api/files",
        "api/plans",
        "api/errors"
      ]
    },
    {
      type: "category",
      label: "CSDB Server",
      collapsed: true,
      items: [
        "server/overview",
        "server/requests",
        "server/responses"
      ]
    },
    {
      type: "category",
      label: "Specification",
      collapsed: true,
      items: [
        "specification/docs/specification/file-structure",
        "specification/docs/specification/database-section",
        "specification/docs/specification/table-schema",
        "specification/docs/specification/table-data",
        "specification/docs/specification/row-index",
        "specification/docs/specification/relationships-and-joins",
        "specification/docs/specification/types-and-values",
        "specification/docs/specification/validation",
        "specification/docs/specification/comments",
        "specification/docs/specification/complete-example",
        "specification/docs/specification/machine-sections"
      ]
    }
  ]
};

module.exports = sidebars;
