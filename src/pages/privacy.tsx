import React from "react";
import { RuntimeConfiguration } from "../configuration";
import parse from "html-react-parser";
import Box from "@mui/material/Box";

interface PrivacyProps {
  privacy: string;
}

const Privacy = ({ privacy }: PrivacyProps) => {
  return (
    <>
      <Box>{parse(privacy)}</Box>;
    </>
  );
};
export default Privacy;

export async function getStaticProps() {
  const response = await fetch(RuntimeConfiguration.PRIVACY_URL);
  const privacyData = await response.text();

  return {
    props: {
      privacy: privacyData,
    },
  };
}
