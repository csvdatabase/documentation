import React from "react";
import {useThemeConfig} from "@docusaurus/theme-common";
import {
  useNavbarMobileSidebar,
  useNavbarSecondaryMenu
} from "@docusaurus/theme-common/internal";
import NavbarItem from "@theme/NavbarItem";

function splitVersionItem(items) {
  const versionItem = items.find((item) => item.type === "custom-versionRegistry");
  const otherItems = items.filter((item) => item.type !== "custom-versionRegistry");

  return {versionItem, otherItems};
}

export default function NavbarMobileSidebarSecondaryMenu() {
  const mobileSidebar = useNavbarMobileSidebar();
  const secondaryMenu = useNavbarSecondaryMenu();
  const {items} = useThemeConfig().navbar;
  const {versionItem, otherItems} = splitVersionItem(items);

  return (
    <>
      <ul className="menu__list">
        {versionItem && (
          <>
            <NavbarItem
              mobile
              {...versionItem}
              onClick={() => mobileSidebar.toggle()}
            />
            <li className="mobile-menu__divider" role="separator" />
          </>
        )}
        {otherItems.map((item, index) => (
          <NavbarItem
            mobile
            {...item}
            onClick={() => mobileSidebar.toggle()}
            key={index}
          />
        ))}
      </ul>
      <div className="mobile-menu__divider" role="separator" />
      {secondaryMenu.content}
    </>
  );
}
