import React, {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import NavbarNavLink from "@theme/NavbarItem/NavbarNavLink";

function normalizeVersionItems(data) {
  const versions = Array.isArray(data) ? data : data?.versions;

  if (!Array.isArray(versions)) {
    return [];
  }

  return versions
    .map((version) => {
      const href = version.href ?? version.url;

      if (!version.label || !href) {
        return null;
      }

      return {label: version.label, href};
    })
    .filter(Boolean);
}

function isLocalhost() {
  const {hostname} = window.location;

  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.endsWith(".local")
  );
}

function getRegistryUrl(versionsUrl) {
  return isLocalhost() ? "/versions.json" : versionsUrl;
}

function getActiveVersionLabel(versionItems) {
  if (versionItems.length === 0) {
    return null;
  }

  if (isLocalhost()) {
    return versionItems[0].label;
  }

  const {hostname, origin} = window.location;
  const activeVersion = versionItems.find((item) => {
    try {
      const itemUrl = new URL(item.href);

      return itemUrl.hostname === hostname || itemUrl.origin === origin;
    } catch {
      return false;
    }
  });

  return activeVersion?.label ?? versionItems[0].label;
}

export default function VersionRegistryNavbarItem({
  versionsUrl = "https://docs.csvdatabase.net/versions.json",
  label = "Version",
  position,
  className,
  mobile = false,
  onClick
}) {
  const [versionItems, setVersionItems] = useState([]);
  const [activeVersionLabel, setActiveVersionLabel] = useState(label);
  const displayLabel =
    activeVersionLabel === label ? label : `${label}: ${activeVersionLabel}`;
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileCollapsed, setMobileCollapsed] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const registryUrl = getRegistryUrl(versionsUrl);

    fetch(registryUrl, {cache: "no-cache"})
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load ${registryUrl}`);
        }

        return response.json();
      })
      .then((data) => {
        const nextItems = normalizeVersionItems(data);

        if (!cancelled && nextItems.length > 0) {
          setVersionItems(nextItems);
          setActiveVersionLabel(getActiveVersionLabel(nextItems) ?? label);
        }
      })
      .catch(() => {
        setActiveVersionLabel(label);
      });

    return () => {
      cancelled = true;
    };
  }, [versionsUrl]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current || dropdownRef.current.contains(event.target)) {
        return;
      }

      setShowDropdown(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("focusin", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("focusin", handleClickOutside);
    };
  }, []);

  if (mobile) {
    return (
      <li
        className={clsx("menu__list-item", {
          "menu__list-item--collapsed": mobileCollapsed
        })}>
        <div className="menu__list-item-collapsible">
          <button
            aria-expanded={!mobileCollapsed}
            className={clsx(
              "clean-btn",
              "menu__link",
              "menu__link--sublist",
              "version-registry__mobile-trigger",
              className
            )}
            type="button"
            onClick={() => setMobileCollapsed((collapsed) => !collapsed)}>
            {displayLabel}
          </button>
          <button
            aria-label={mobileCollapsed ? "Expand versions" : "Collapse versions"}
            aria-expanded={!mobileCollapsed}
            className="clean-btn menu__caret"
            type="button"
            onClick={() => setMobileCollapsed((collapsed) => !collapsed)}
          />
        </div>
        {!mobileCollapsed && (
          <ul className="menu__list">
            {versionItems.map((item) => {
              const isActive = item.label === activeVersionLabel;

              return (
                <li className="menu__list-item" key={`${item.label}-${item.href}`}>
                  <a
                    className={clsx("menu__link", {
                      "menu__link--active": isActive,
                      "version-registry__link--active": isActive
                    })}
                    href={item.href}
                    onClick={onClick}>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className={clsx("navbar__item", "dropdown", "dropdown--hoverable", {
        "dropdown--right": position === "right",
        "dropdown--show": showDropdown
      })}>
      <NavbarNavLink
        aria-expanded={showDropdown}
        aria-haspopup="true"
        className={clsx("navbar__link", className)}
        href="#"
        label={displayLabel}
        role="button"
        onClick={(event) => {
          event.preventDefault();
          setShowDropdown((shown) => !shown);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setShowDropdown((shown) => !shown);
          }
        }}>
      </NavbarNavLink>
      <ul className="dropdown__menu">
        {versionItems.map((item) => {
          const isActive = item.label === activeVersionLabel;

          return (
            <li key={`${item.label}-${item.href}`}>
              <a
                className={clsx("dropdown__link", {
                  "dropdown__link--active": isActive,
                  "version-registry__link--active": isActive
                })}
                href={item.href}>
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
