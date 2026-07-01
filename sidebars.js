const sidebars = {
  docs: [
    "intro",
    "getting-started",
    "reference/types",
    "reference/validation",
    {
      type: "category",
      label: "API Reference",
      collapsed: false,
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
      label: "Specification",
      collapsed: false,
      items: [
        "specs/docs/specification/file-structure",
        "specs/docs/specification/database-section",
        "specs/docs/specification/table-schema",
        "specs/docs/specification/table-data",
        "specs/docs/specification/row-index",
        "specs/docs/specification/relationships-and-joins",
        "specs/docs/specification/types-and-values",
        "specs/docs/specification/validation",
        "specs/docs/specification/comments",
        "specs/docs/specification/complete-example",
        "specs/docs/specification/machine-sections"
      ]
    }
  ]
};

module.exports = sidebars;
