import React, { useState, useMemo, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import parse from "html-react-parser";
import Button from "@mui/material/Button";
import { ButtonNameProps } from "@/interface";
import Accordion from "./Accordion";

export interface FAQItem {
  label: string;
  description: string;
}

export interface FAQProps {
  buttonName?: ButtonNameProps;
  isMobile: boolean;
  data: FAQItem[];
  onClickClaim: () => void;
}

interface SeeMoreComponentProps {
  isExpand: boolean;
  onClickExpand: () => void;
}

const SeeMoreComponent = ({
  isExpand,
  onClickExpand,
}: SeeMoreComponentProps) => {
  const theme = useTheme();
  return (
    <Typography
      onClick={onClickExpand}
      sx={{
        fontFamily: theme?.MojitoClaim?.font?.secondary,
        fontWeight: 700,
        fontSize: "14px",
        display: "flex",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {isExpand ? (
        <>
          Expand for less <ArrowDropUpIcon />
        </>
      ) : (
        <>
          Expand for more <ArrowDropDownIcon />
        </>
      )}
    </Typography>
  );
};

const FAQ = ({ buttonName, isMobile, data, onClickClaim }: FAQProps) => {
  const theme = useTheme();

  const [isExpanded, setExpanded] = useState(false);

  const onClickExpand = useCallback(() => {
    setExpanded(!isExpanded);
  }, [isExpanded]);

  const faqData = useMemo(() => {
    return data.slice(0, isExpanded ? data.length : 5);
  }, [data, isExpanded]);

  return (
    <Box
      sx={{
        ...theme?.MojitoClaim?.Hero,
        backgroundColor: theme?.palette?.background?.paper,
        color: theme?.palette?.text?.primary,
        fontWeight: 700,
        fontFamily: theme?.MojitoClaim?.font?.secondary,
        padding: { lg: "40px 240px", md: "40px 240px", xs: "0px" },
      }}
    >
      <Container maxWidth="lg" sx={{ marginBottom: "80px" }}>
        <Typography
          component="h2"
          sx={{
            fontSize: "48px",
            paddingBottom: "48px",
            fontWeight: 700,
            fontFamily: theme?.MojitoClaim?.font?.secondary,
          }}
        >
          FAQs
        </Typography>
        {faqData.map((ele: FAQItem, index: number) => {
          return (
            <Box key={(ele.label + index).toString()}>
              <Accordion
                label={ele?.label}
                labelStyle={{
                  fontFamily: theme?.MojitoClaim?.font?.secondary,
                  fontSize: "24px",
                  paddingBottom: "8px",
                  fontWeight: 700,
                }}
              >
                <Box sx={{ fontWeight: 400 }}>{parse(ele?.description)}</Box>
              </Accordion>

              <Divider sx={{ margin: "24px 0 24px 0" }} />
            </Box>
          );
        })}
        {data?.length > 6 && (
          <SeeMoreComponent
            isExpand={isExpanded}
            onClickExpand={onClickExpand}
          />
        )}
      </Container>
      {isMobile && (
        <Box
          width="100%"
          height="74px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          borderTop={`1px solid ${theme?.palette?.secondary?.dark}`}
          position="fixed"
          bottom="0"
          sx={{ backgroundColor: theme?.palette?.background?.paper }}
        >
          <Button
            sx={{
              margin: "12px 22px",
              height: "48px",
              width: "calc(100% - 44px)",
            }}
            onClick={onClickClaim}
          >
            {buttonName?.primary}
          </Button>
        </Box>
      )}
    </Box>
  );
};
export default FAQ;
