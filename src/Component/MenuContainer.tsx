import React from "react";
import Menu from "@mui/material/Menu";
import MenuItemContainer from "./MenuItemContainer";

interface MenuOptions {
  menuName: string;
  menuAction?: () => void;
}

export interface MenuContainerProps {
  open: boolean;
  isMobile: boolean;
  menuOptions: MenuOptions[];
  anchorEl: HTMLElement | null;
  handleMenuClose: () => void;
}

const MenuContainer = ({
  open,
  isMobile,
  menuOptions,
  anchorEl,
  handleMenuClose,
}: MenuContainerProps) => {
  return (
    <Menu
      MenuListProps={{
        sx: !isMobile ? { p: 0, width: "100%" } : { padding: "40px 32px" },
      }}
      sx={{ marginTop: "16px", display: isMobile ? "flex" : "none" }}
      open={open}
      anchorEl={anchorEl}
      onClose={handleMenuClose}
    >
      <MenuItemContainer menuOptions={menuOptions} isMobile={isMobile} />
    </Menu>
  );
};

export default MenuContainer;
