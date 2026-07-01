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
    }
  ]
};

module.exports = sidebars;
