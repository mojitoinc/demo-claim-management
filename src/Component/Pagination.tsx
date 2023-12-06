import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import MUIPagination, {
  PaginationRenderItemParams,
} from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useTheme } from "@mui/material/styles";

export interface PaginationProps {
  total: number;
  offset: number;
  onHandlePagination: (selectedPage: number) => void;
}

const Pagination = ({ total, offset, onHandlePagination }: PaginationProps) => {
  const theme = useTheme();
  const paginationItems = useMemo(() => ["previous", "next", "ellipsis"], []);
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <MUIPagination
        count={total}
        size="medium"
        page={offset}
        variant="outlined"
        shape="circular"
        data-testid="pagination-id"
        renderItem={(params: PaginationRenderItemParams) => (
          <PaginationItem
            sx={{
              fontWeight: 700,
              fontSize: "14px",
              border: params.type !== "page" ? undefined : "none",
              borderRadius: params.type !== "page" ? "6px" : undefined,
              borderColor:
                params.type !== "page"
                  ? theme?.MojitoClaim?.pagination?.backgroundColor
                  : undefined,
              color:
                (!params.selected && params.type === "page") ||
                paginationItems.includes(params.type)
                  ? theme?.palette?.grey?.[100]
                  : theme?.MojitoClaim?.pagination?.selectedPageColor,
              background: params.selected ? "none !important" : undefined,
            }}
            {...params}
          />
        )}
        onChange={(_e: React.ChangeEvent<unknown>, page: number) =>
          onHandlePagination(page)
        }
      />
    </Box>
  );
};

export default Pagination;
