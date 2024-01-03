import * as React from "react";
import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { type SxProps, useTheme } from "@mui/material/styles";

export interface AccordionProps {
  open?: boolean;
  label: string;
  children: JSX.Element;
  collapseIcon?: JSX.Element;
  expandIcon?: JSX.Element;
  containerStyle?: SxProps;
  labelStyle?: SxProps;
}

interface ExpandProps {
  icon?: JSX.Element;
}

interface CollapseProps {
  icon?: JSX.Element;
}

const Expand = ({ icon }: ExpandProps) => {
  const theme = useTheme();
  return (
    icon || (
      <AddIcon
        style={{ color: theme?.palette?.primary?.main, cursor: "pointer" }}
      />
    )
  );
};

const Collapse = ({ icon }: CollapseProps) => {
  const theme = useTheme();
  return (
    icon || (
      <RemoveIcon
        style={{ color: theme?.palette?.primary?.main, cursor: "pointer" }}
      />
    )
  );
};

const Accordion = ({
  open: defaultOpen,
  label,
  children,
  collapseIcon,
  expandIcon,
  containerStyle = {},
  labelStyle,
}: AccordionProps) => {
  const [open, setOpen] = useState<boolean>(defaultOpen ?? false);

  const onHandleChange = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <Box sx={containerStyle}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
        aria-label="accordion_arrow_label"
        onClick={onHandleChange}
      >
        <Typography sx={labelStyle}>{label}</Typography>
        <Typography>
          {open ? (
            <Collapse icon={collapseIcon} />
          ) : (
            <Expand icon={expandIcon} />
          )}
        </Typography>
      </Box>
      {open && <>{children}</>}
    </Box>
  );
};
export default Accordion;
