import React from "react";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";

interface MenuOptions {
  menuName: string;
  menuAction?: () => void;
}

export interface MenuItemContainerProps {
  isMobile: boolean;
  menuOptions: MenuOptions[];
}

const MenuItemContainer = ({
  isMobile,
  menuOptions,
}: MenuItemContainerProps) => {
  const theme = useTheme();
  return (
    <>
      {menuOptions.map((item: MenuOptions, index: number) => (
        <MenuItem
          key={index}
          sx={{
            fontSize: "20px",
            marginTop: !isMobile ? "20px" : index !== 0 ? "20px" : "0px",
            fontWeight: 700,
            color: theme?.palette?.text?.primary,
          }}
          onClick={item?.menuAction}
        >
          {item?.menuName}
        </MenuItem>
      ))}
    </>
  );
};

export default MenuItemContainer;
