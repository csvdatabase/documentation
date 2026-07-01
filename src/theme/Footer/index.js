import React from "react";
import clsx from "clsx";
import useIsBrowser from "@docusaurus/useIsBrowser";
import {
  ThemeClassNames,
  useColorMode,
  useThemeConfig
} from "@docusaurus/theme-common";
import FooterCopyright from "@theme/Footer/Copyright";
import FooterLinkItem from "@theme/Footer/LinkItem";
import FooterLayout from "@theme/Footer/Layout";
import FooterLogo from "@theme/Footer/Logo";
import IconDarkMode from "@theme/Icon/DarkMode";
import IconLightMode from "@theme/Icon/LightMode";
import IconSystemColorMode from "@theme/Icon/SystemColorMode";

function getNextColorMode(colorMode, respectPrefersColorScheme) {
  if (!respectPrefersColorScheme) {
    return colorMode === "dark" ? "light" : "dark";
  }

  switch (colorMode) {
    case null:
      return "light";
    case "light":
      return "dark";
    case "dark":
      return null;
    default:
      return "light";
  }
}

function FooterThemeIcon({colorMode}) {
  const iconProps = {
    "aria-hidden": true,
    className: "footer__theme-icon"
  };

  if (colorMode === "light") {
    return <IconLightMode {...iconProps} />;
  }

  if (colorMode === "dark") {
    return <IconDarkMode {...iconProps} />;
  }

  return <IconSystemColorMode {...iconProps} />;
}

function FooterThemeButton() {
  const isBrowser = useIsBrowser();
  const {colorMode} = useThemeConfig();
  const {colorModeChoice, setColorMode} = useColorMode();

  return (
    <button
      aria-label="Change Theme"
      className="clean-btn footer__theme-button"
      disabled={!isBrowser}
      onClick={() =>
        setColorMode(
          getNextColorMode(
            colorModeChoice,
            colorMode.respectPrefersColorScheme
          )
        )
      }
      title="Change Theme"
      type="button">
      <FooterThemeIcon colorMode={colorModeChoice} />
      <span>Change Theme</span>
    </button>
  );
}

function FooterColumn({column}) {
  return (
    <div
      className={clsx(
        ThemeClassNames.layout.footer.column,
        "col footer__col",
        column.className
      )}>
      <div className="footer__title">{column.title}</div>
      <ul className="footer__items clean-list">
        {column.items.map((item) => (
          <li className="footer__item" key={item.href ?? item.to ?? item.label}>
            <FooterLinkItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ThemeColumn() {
  return (
    <div
      className={clsx(
        ThemeClassNames.layout.footer.column,
        "col footer__col footer__theme-col"
      )}>
      <div className="footer__title">Theme</div>
      <FooterThemeButton />
    </div>
  );
}

function FooterLinksWithTheme({links}) {
  return (
    <div className="row footer__links">
      {links?.map((column, index) => (
        <FooterColumn column={column} key={index} />
      ))}
      <ThemeColumn />
    </div>
  );
}

function Footer() {
  const {footer} = useThemeConfig();

  if (!footer) {
    return null;
  }

  const {copyright, links, logo, style} = footer;

  return (
    <FooterLayout
      style={style}
      links={<FooterLinksWithTheme links={links} />}
      logo={logo && <FooterLogo logo={logo} />}
      copyright={copyright && <FooterCopyright copyright={copyright} />}
    />
  );
}

export default React.memo(Footer);
