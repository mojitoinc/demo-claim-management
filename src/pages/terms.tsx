import React from "react";
import { RuntimeConfiguration } from "../configuration";
import parse from "html-react-parser";
import Box from "@mui/material/Box";

interface TermsProps {
  terms: string;
}

const Terms = ({ terms }: TermsProps) => {
  return (
    <>
      <Box>{parse(terms)}</Box>;
    </>
  );
};
export default Terms;

export async function getStaticProps() {
  const response = await fetch(RuntimeConfiguration.TERMS_URL);
  const termsData = await response.text();

  return {
    props: {
      terms: termsData,
    },
  };
}
