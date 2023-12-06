import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Image from "next/image";
import { isVideo } from "@/utils/isVideo.utils";

export interface StadiumBlockProps {
  title: string;
  description: string;
  imageURL: string;
}
const StadiumBlock = ({ title, imageURL, description }: StadiumBlockProps) => {
  const theme = useTheme();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef) {
      videoRef.current?.load();
    }
  }, []);

  return (
    <Box
      sx={{
        ...theme?.MojitoClaim?.Hero,
        padding: { lg: "64px 64px 40px 64px", xs: "0px 0 40px 0" },
      }}
    >
      <Container maxWidth="lg">
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "48px",
              fontFamily: "Roboto Slab",
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          className="image-container"
          sx={{
            width: "100%",
            height: { lg: "600px", xs: "auto", sm: "600px" },
            margin: "24px 0 8px 0",
            backgroundColor: {
              lg: theme?.palette?.secondary?.dark,
              sm: theme?.palette?.secondary?.dark,
              xs: theme?.MojitoClaim?.Hero?.background,
            },
          }}
        >
          {isVideo(imageURL) ? (
            <video
              ref={videoRef}
              controls
              loop
              muted
              playsInline
              autoPlay={true}
              style={{ width: "100%", height: "100%" }}
            >
              <source src={imageURL} />
            </video>
          ) : (
            <Image
              unoptimized
              src={imageURL}
              alt="stadium-image"
              width={1040}
              height={600}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              className="stadium-image"
            />
          )}
        </Box>
        <Box>
          <Typography>{description}</Typography>
        </Box>
      </Container>
    </Box>
  );
};
export default StadiumBlock;
