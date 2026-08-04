const sidebars = {
  docs: [
    "intro",
    "getting-started",
    "versioning",
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
    }
  ]
};

module.exports = sidebars;
