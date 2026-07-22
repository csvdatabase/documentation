const config = {
  title: "CSDB",
  tagline: "Single-file relational databases for TypeScript, Python, SQL, and JSON",
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
            { label: "csdb", href: "https://github.com/csvdatabase/csdb" },
            { label: "specification", href: "https://github.com/csvdatabase/specification" },
            { label: "csdb-typescript", href: "https://github.com/csvdatabase/csdb-typescript" },
            { label: "csdb-python", href: "https://github.com/csvdatabase/csdb-python" },
            { label: "server-typescript", href: "https://github.com/csvdatabase/server-typescript" },
            { label: "api-typescript", href: "https://github.com/csvdatabase/api-typescript" },
            { label: "documentation", href: "https://github.com/csvdatabase/documentation" },
            { label: "website", href: "https://github.com/csvdatabase/website" }
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
          title: "Contributing",
          items: [
            { label: "Roadmap", to: "/contributing/roadmap" },
            { label: "Contributing", to: "/contributing/contributing" },
            { label: "Governance", to: "/contributing/governance" }
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
          title: "CSDB Server",
          items: [
            { label: "Setting Up Server", to: "/server/overview" },
            { label: "Command Requests", to: "/server/requests" },
            { label: "Responses And Persistence", to: "/server/responses" }
          ]
        },
        {
          title: "Specification",
          items: [
            { label: "File Structure", to: "/specification/docs/specification/file-structure" },
            { label: "Database Section", to: "/specification/docs/specification/database-section" },
            { label: "Table Schema", to: "/specification/docs/specification/table-schema" },
            { label: "Table Data", to: "/specification/docs/specification/table-data" },
            { label: "Row Index", to: "/specification/docs/specification/row-index" },
            { label: "Relationships And Joins", to: "/specification/docs/specification/relationships-and-joins" },
            { label: "Types And Values", to: "/specification/docs/specification/types-and-values" },
            { label: "Validation", to: "/specification/docs/specification/validation" },
            { label: "Comments", to: "/specification/docs/specification/comments" },
            { label: "Complete Example", to: "/specification/docs/specification/complete-example" },
            { label: "Machine Sections", to: "/specification/docs/specification/machine-sections" }
          ]
        },
        {
          title: "GitHub",
          items: [
            { label: "csdb", href: "https://github.com/csvdatabase/csdb" },
            { label: "specification", href: "https://github.com/csvdatabase/specification" },
            { label: "csdb-typescript", href: "https://github.com/csvdatabase/csdb-typescript" },
            { label: "csdb-python", href: "https://github.com/csvdatabase/csdb-python" },
            { label: "server-typescript", href: "https://github.com/csvdatabase/server-typescript" },
            { label: "api-typescript", href: "https://github.com/csvdatabase/api-typescript" },
            { label: "documentation", href: "https://github.com/csvdatabase/documentation" },
            { label: "website", href: "https://github.com/csvdatabase/website" }
          ]
        }
      ],
      copyright: `Copyright ${new Date().getFullYear()} CSDB`
    },
    prism: {
      additionalLanguages: ["python", "typescript", "yaml", "sql", "json"]
    },
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
      disableSwitch: true
    }
  }
};

module.exports = config;
