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
      items: []
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            { label: "Overview", to: "/" },
            { label: "Getting Started", to: "/getting-started" },
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
          title: "GitHub",
          items: [
            { label: "specs", href: "https://github.com/csvdatabase/specs" },
            { label: "csdb-javascript", href: "https://github.com/csvdatabase/csdb-javascript" },
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
      respectPrefersColorScheme: true
    }
  }
};

module.exports = config;
