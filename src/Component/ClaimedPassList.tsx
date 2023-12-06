import React from "react";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { ContentObject } from "@/interface";

export type ClaimedPassData = {
  name: string;
  tokenName: string;
  image: string;
  date: string;
};

interface ClaimedPassListProps {
  data: ClaimedPassData[];
  loading?: boolean;
  content?: ContentObject;
}

const ClaimedPassList = ({ data, loading, content }: ClaimedPassListProps) => {
  const theme = useTheme();
  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Grid container rowGap={2} columnSpacing={1} sx={{ padding: "1rem" }}>
          <Grid item md={5} sm={7} xs={7}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                fontSize: "12px",
                color: theme?.MojitoClaim?.card?.titleColor,
              }}
            >
              {content?.claimedDetails?.claimedTokenLabel || "MEMBERSHIP PASS"}
            </Typography>
          </Grid>
          <Grid item md={7} sm={5} xs={5}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                fontSize: "12px",
                color: theme?.MojitoClaim?.card?.titleColor,
              }}
            >
              {content?.claimedDetails?.claimedDateLabel || "CLAIMED ON"}
            </Typography>
          </Grid>
          {data?.length > 0 ? (
            data?.map((item: ClaimedPassData) => (
              <>
                <Grid item md={5} sm={7} xs={7}>
                  <Stack flexDirection={"row"} alignItems={"center"}>
                    <Stack sx={{ marginRight: 2 }}>
                      <Image
                        unoptimized
                        src={item.image}
                        style={{
                          minWidth: "40px",
                          minHeight: "40px",
                          borderRadius: "5px",
                        }}
                        width={40}
                        height={40}
                        alt=""
                      />
                    </Stack>
                    <Stack>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 400,
                          fontSize: "16px",
                          color: theme?.palette?.text?.primary,
                          wordBreak: "break-word",
                        }}
                      >
                        {item?.tokenName || item?.name}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid
                  item
                  md={7}
                  sm={5}
                  xs={5}
                  sx={{ alignItems: "center", display: "flex" }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 400,
                      fontSize: "16px",
                      color: theme?.palette?.text?.primary,
                    }}
                  >
                    {item.date}
                  </Typography>
                </Grid>
              </>
            ))
          ) : (
            <Typography
              variant="body1"
              sx={{ fontSize: "16px", color: theme?.palette?.text?.primary }}
            >
              No data to display
            </Typography>
          )}
        </Grid>
      )}
    </>
  );
};

export default ClaimedPassList;
