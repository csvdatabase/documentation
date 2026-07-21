const config = {
  title: "CSDB",
  tagline: "Single-file relational databases for TypeScript and Python",
  favicon: "img/csdb-logo.png",

  url: "https://csdb.dev",
  baseUrl: "/",

  organizationName: "csdb",
  projectName: "csdb",

  onBrokenLinks: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn"
    }
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"]
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.js",
          editUrl: undefined
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css"
        }
      }
    ]
  ],

  themeConfig: {
    image: "img/csdb-logo.png",
    navbar: {
      title: "CSDB",
      logo: {
        alt: "CSDB",
        src: "img/csdb-logo.png"
      },
      items: [
        {
          type: "custom-versionRegistry",
          label: "Version",
          position: "right",
          versionsUrl: "https://docs.csvdatabase.net/versions.json"
        },
        { label: "Homepage", href: "https://csvdatabase.net/" },
        {
          type: "dropdown",
          label: "GitHub",
          items: [
            { label: "specs", href: "https://github.com/csvdatabase/specs" },
            { label: "csdb-typescript", href: "https://github.com/csvdatabase/csdb-typescript" },
            { label: "csdb-python", href: "https://github.com/csvdatabase/csdb-python" }
          ]
        }
      ]
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            { label: "Overview", to: "/" },
            { label: "Getting Started", to: "/getting-started" },
            { label: "Versioning", to: "/versioning" },
            { label: "Types", to: "/reference/types" },
            { label: "Validation", to: "/reference/validation" }
          ]
        },
        {
          title: "API Reference",
          items: [
            { label: "API Overview", to: "/api/overview" },
            { label: "CSDBDatabase", to: "/api/database" },
            { label: "TableQuery", to: "/api/table-query" },
            { label: "Files And Serialization", to: "/api/files" },
            { label: "Plans", to: "/api/plans" },
            { label: "Errors", to: "/api/errors" }
          ]
        },
        {
          title: "Specification",
          items: [
            { label: "File Structure", to: "/specs/docs/specification/file-structure" },
            { label: "Database Section", to: "/specs/docs/specification/database-section" },
            { label: "Table Schema", to: "/specs/docs/specification/table-schema" },
            { label: "Table Data", to: "/specs/docs/specification/table-data" },
            { label: "Row Index", to: "/specs/docs/specification/row-index" },
            { label: "Relationships And Joins", to: "/specs/docs/specification/relationships-and-joins" },
            { label: "Types And Values", to: "/specs/docs/specification/types-and-values" },
            { label: "Validation", to: "/specs/docs/specification/validation" },
            { label: "Comments", to: "/specs/docs/specification/comments" },
            { label: "Complete Example", to: "/specs/docs/specification/complete-example" },
            { label: "Machine Sections", to: "/specs/docs/specification/machine-sections" }
          ]
        },
        {
          title: "GitHub",
          items: [
            { label: "specs", href: "https://github.com/csvdatabase/specs" },
            { label: "csdb-typescript", href: "https://github.com/csvdatabase/csdb-typescript" },
            { label: "csdb-python", href: "https://github.com/csvdatabase/csdb-python" },
            { label: "documentation", href: "https://github.com/csvdatabase/documentation" },
            { label: "website", href: "https://github.com/csvdatabase/website" }
          ]
        }
      ],
      copyright: `Copyright ${new Date().getFullYear()} CSDB`
    },
    prism: {
      additionalLanguages: ["python", "typescript", "yaml", "sql"]
    },
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
      disableSwitch: true
    }
  }
};

module.exports = config;
