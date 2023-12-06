import React, {
  useState,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from "react";
import moment from "moment";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNFT, useUser } from "@mojito-inc/core-service";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Pagination from "../Component/Pagination";
import ClaimedDetailContent from "../Component/ClaimedDetailContent";
import ClaimedPassList, { ClaimedPassData } from "../Component/ClaimedPassList";
import ContentContext from "../provider";
import { WalletContext } from "../provider/WalletContext";
import router from "next/router";
import { configuration } from "@/config";
import { getValidURL } from "@/utils/getValidURL.utils";
import { Images } from "@/assets/images";
import { RuntimeConfiguration } from "@/configuration";
import { UserDetail } from "@/interface";
import { ClaimTokenModal, useWallet } from "@mojito-inc/claim-management";
import Button from "@mui/material/Button";

const ClaimedLayout = () => {
  const theme = useTheme();
  const { getAllInvoices } = useNFT();
  const { getUser } = useUser();
  const { address, balance, networkDetails } = useWallet();
  const [disconnect, setDisconnect] = useState<boolean>(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { wallet, setWallet } = useContext(WalletContext);
  const { content } = useContext(ContentContext);
  const [activityData, setActivityData] = useState<ClaimedPassData[] | null>(
    []
  );
  const [totalActivity, setTotalActivity] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [showClaimModal, setShowClaimModal] = useState<boolean>(false);
  const [showConnectModal, setShowConnectModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const offset = useMemo(() => page - 1, [page]);
  const limit = useMemo(() => 5, []);

  const getInvoices = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllInvoices(
        {
          orgID: configuration?.ORG_ID,
          filter: "LATEST_TO_OLDEST",
          limit: limit,
          offset: offset,
        },
        { fetchPolicy: "no-cache" }
      );
      const formattedResponse = response?.data?.getAllInvoices?.data?.map(
        (item: any) => {
          return {
            name: item?.itemName ?? "",
            image: item?.image ? getValidURL(item?.image) : Images?.PLACEHOLDER,
            date: moment(item?.createdAt).format("MM/DD/YYYY"),
            tokenName: item?.tokenName,
          };
        }
      );
      setActivityData(formattedResponse ?? []);
      setTotalActivity(response?.data?.getAllInvoices?.count ?? 0);
      setLoading(false);
      return response?.data?.getAllInvoices;
    } catch (e) {
      setLoading(false);
      return null;
    }
  }, [getAllInvoices, limit, offset]);

  const getUserData = useCallback(async () => {
    try {
      const response = await getUser(
        {
          orgId: configuration?.ORG_ID,
        },
        { fetchPolicy: "no-cache" }
      );
      return response?.data?.me;
    } catch (e) {
      return null;
    }
  }, [getUser]);

  useEffect(() => {
    getInvoices();
  }, [getInvoices, limit, offset, page]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const onClickClaim = useCallback(() => {
    setWallet({
      ...wallet,
      isDisconnect: false,
    });
    setShowClaimModal(true);
    setShowConnectModal(false);
  }, [setWallet, wallet]);

  const onClickConnect = useCallback(() => {
    setWallet({
      ...wallet,
      isDisconnect: false,
    });
    setShowClaimModal(true);
    setShowConnectModal(true);
  }, [setWallet, wallet]);

  const userDetails = useMemo(() => {
    if (typeof window !== "undefined") {
      const sessionData = sessionStorage.getItem("userDetails");
      const response: UserDetail = sessionData
        ? JSON.parse(sessionData ?? "")
        : null;
      return response;
    }
    return null;
  }, []);

  const totalPage = useMemo(() => {
    const totalPageCount = totalActivity / limit;
    const total = Math.floor(totalPageCount);
    const isWholePageCount = totalActivity % limit;
    return isWholePageCount === 0 ? total : total + 1;
  }, [limit, totalActivity]);

  const onHandlePagination = useCallback((_page: number) => {
    setPage(_page);
  }, []);

  const handleClickLink = useCallback((url: string) => {
    if (url) {
      window.open(url, "_blank");
    }
  }, []);

  const onClickViewWallet = useCallback(() => {
    router.push("/wallet");
  }, []);

  useEffect(() => {
    if (disconnect) {
      router.push("/");
      setDisconnect(false);
    }
  }, [disconnect]);

  useEffect(() => {
    if (address && showConnectModal) {
      setShowClaimModal(false);
      setShowConnectModal(false);
    }
  }, [address, showConnectModal]);

  const onClickDisconnect = useCallback(async () => {
    setDisconnect(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowClaimModal(false);
  }, []);

  const handleSuccessRedirection = useCallback(() => {
    setShowClaimModal(false);
    onCloseModal();
    router.push("/membership");
  }, [onCloseModal]);

  const currency = useMemo(() => {
    if (networkDetails?.chainID === 80001 || networkDetails?.chainID === 137) {
      return { currencyName: "MATIC", currencyIcon: Images.MATIC.default.src };
    }
    return { currencyName: "ETH", currencyIcon: Images.ETHICON.default.src };
  }, [networkDetails?.chainID]);

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header
        logo={
          isMobile && content?.mobileLogoURL
            ? content?.mobileLogoURL
            : content.logoURL
        }
        walletAddress={address ?? ""}
        balance={balance?.native}
        buttonName={content.buttonName}
        menuLabel={content?.menuLabel}
        currencyName={currency?.currencyName}
        currencyIcon={currency?.currencyIcon}
        privacyPolicyURL={content.footer.privacyPolicyURL}
        termsAndConditionsURL={content.footer.termsAndConditionsURL}
        contactUsURL={content.footer.contactUsURL}
        onClickDisconnect={onClickDisconnect}
        onClickClaim={onClickClaim}
        onClickConnect={onClickConnect}
      />
      <div style={{ flex: 1 }}>
        <Stack sx={{ margin: "0 1rem" }}>
          {address ? (
            <Stack
              sx={{
                margin: isMobile ? "40px auto" : "80px auto",
                justifyContent: "center",
                alignItems: "flex-start",
                maxWidth: "800px",
                width: "100%",
              }}
            >
              <Stack sx={{ marginBottom: "40px" }}>
                <ClaimedDetailContent
                  buttonText="View in Wallet"
                  imageURL="https://ipfs.io/ipfs/QmU682YpQpnZVTUA75iRZBD5ni3ZdhByWkh745HAxoiseU"
                  name={userDetails?.firstName}
                  walletAddress={address ?? ""}
                  onClickButton={onClickViewWallet}
                />
              </Stack>
              <Stack
                sx={{
                  marginBottom: totalActivity > 5 ? "16px" : "40px",
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: theme?.MojitoClaim?.card?.backgroundColor,
                }}
              >
                <ClaimedPassList
                  data={activityData ?? []}
                  loading={loading}
                  content={content}
                />
              </Stack>
              {totalActivity > 5 && (
                <Stack
                  justifyContent={"center"}
                  width={"100%"}
                  marginBottom={"40px"}
                >
                  <Pagination
                    offset={page}
                    total={totalPage}
                    onHandlePagination={onHandlePagination}
                  />
                </Stack>
              )}
              {(content?.socialMedia?.linkedInURL ||
                content?.socialMedia?.twitterURL ||
                content?.socialMedia?.newsletterURL ||
                content?.socialMedia?.tmaURL ||
                content?.socialMedia?.tmaLabsURL ||
                content?.socialMedia?.telegramURL) && (
                <Stack
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: theme?.MojitoClaim?.card?.backgroundColor,
                    width: "100%",
                    marginBottom: "40px",
                  }}
                >
                  <Stack padding={2}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: theme?.MojitoClaim?.card?.titleColor,
                        fontSize: "12px",
                        marginBottom: "16px",
                      }}
                    >
                      {content?.socialMedia?.socialMediaTitle ||
                        "GET CONNECTED"}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        marginBottom: "16px",
                        color: theme?.palette?.text?.primary,
                      }}
                    >
                      {content?.socialMedia?.contentMessage}
                    </Typography>
                    {content?.socialMedia?.linkedInURL && (
                      <Typography
                        variant="body1"
                        sx={{
                          marginBottom: "16px",
                          color: theme?.MojitoClaim?.card?.linkTextColor,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleClickLink(content?.socialMedia?.linkedInURL)
                        }
                      >
                        LinkedIn
                      </Typography>
                    )}
                    {content?.socialMedia?.newsletterURL && (
                      <Typography
                        variant="body1"
                        sx={{
                          marginBottom: "16px",
                          color: theme?.MojitoClaim?.card?.linkTextColor,
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={() =>
                          handleClickLink(content?.socialMedia?.newsletterURL)
                        }
                      >
                        NewsLetter
                      </Typography>
                    )}
                    {content?.socialMedia?.twitterURL && (
                      <Typography
                        variant="body1"
                        sx={{
                          marginBottom: "16px",
                          color: theme?.MojitoClaim?.card?.linkTextColor,
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={() =>
                          handleClickLink(content?.socialMedia?.twitterURL)
                        }
                      >
                        Twitter
                      </Typography>
                    )}
                    {content?.socialMedia?.tmaURL && (
                      <Typography
                        variant="body1"
                        sx={{
                          marginBottom: "16px",
                          color: theme?.MojitoClaim?.card?.linkTextColor,
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={() =>
                          handleClickLink(content?.socialMedia?.tmaURL)
                        }
                      >
                        TMA
                      </Typography>
                    )}
                    {content?.socialMedia?.tmaLabsURL && (
                      <Typography
                        variant="body1"
                        sx={{
                          marginBottom: "16px",
                          color: theme?.MojitoClaim?.card?.linkTextColor,
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={() =>
                          handleClickLink(content?.socialMedia?.tmaLabsURL)
                        }
                      >
                        TMA Labs
                      </Typography>
                    )}
                    {content?.socialMedia?.telegramURL && (
                      <Typography
                        variant="body1"
                        sx={{
                          marginBottom: "16px",
                          color: theme?.MojitoClaim?.card?.linkTextColor,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handleClickLink(content?.socialMedia?.telegramURL)
                        }
                      >
                        Telegram
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              )}
              {content?.socialMedia?.startYourMembershipURL && (
                <Stack
                  flexDirection={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontWeight: 700,
                      fontSize: "12px",
                      marginRight: "4px",
                      color: theme?.palette?.text?.primary,
                    }}
                    onClick={() =>
                      handleClickLink(
                        content?.socialMedia?.startYourMembershipURL
                      )
                    }
                  >
                    {content?.socialMedia?.startYourMembershipLabel ||
                      "Start your own membership with Mojito"}
                  </Typography>
                  <ArrowOutwardIcon
                    sx={{
                      height: "13px",
                      width: "13px",
                      cursor: "pointer",
                      color: theme?.palette?.text?.primary,
                    }}
                    onClick={() => handleClickLink("")}
                  />
                </Stack>
              )}
            </Stack>
          ) : (
            <Stack
              sx={{
                margin: isMobile ? "40px auto" : "80px auto",
                justifyContent: "center",
                alignItems: "flex-start",
                maxWidth: "800px",
                width: "100%",
              }}
            >
              <Stack sx={{ marginBottom: "40px" }}>
                <Stack flexDirection={"row"} alignItems={"flex-start"}>
                  <Stack>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 700,
                        fontSize: isMobile ? "24px" : "48px",
                        marginBottom: "8px",
                        color: theme?.palette?.text?.primary,
                      }}
                    >
                      Log in to view your account
                    </Typography>
                    <Button
                      sx={{ maxWidth: 185, lineHeight: 1, padding: "16px 0" }}
                      onClick={onClickConnect}
                    >
                      Connect Wallet
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          )}
        </Stack>
      </div>
      {!isMobile && (
        <Footer
          privacyPolicyURL={content?.footer?.privacyPolicyURL}
          termsAndConditionsURL={content?.footer?.termsAndConditionsURL}
          twitterURL={content?.footer?.twitterURL}
          facebookURL={content?.footer?.facebookURL}
          instagramURL={content?.footer?.instagramURL}
          youtubeURL={content?.footer?.youtubeURL}
          contactUsURL={content?.footer?.contactUsURL}
          linkedInURL={content?.footer?.linkedInURL}
        />
      )}
      <ClaimTokenModal
        open={showClaimModal}
        onCloseModal={onCloseModal}
        skipClaimModal={showConnectModal}
        config={{
          crossmintApiKey: RuntimeConfiguration.CROSSMINT_API ?? "",
          crossmintEnv: RuntimeConfiguration?.CROSSMINT_ENV ?? "",
          orgId: RuntimeConfiguration.ORG_ID ?? "",
          chainId: Number(RuntimeConfiguration.CHAIN_ID) ?? 4,
          paperClientId: RuntimeConfiguration.PAPER_CLIENT_ID ?? "",
          paperNetworkName: RuntimeConfiguration.NETWORK_NAME ?? "",
        }}
        isDisConnect={disconnect}
        walletOptions={content.walletOptions}
        claimCode={content.claimCode}
        isEnterClaimCode={content.isEnterClaimCode}
        link={{
          termsUrl: content.footer.termsAndConditionsURL,
          logoUrl: content.claimLogoURL ?? content.logoURL,
          privacyUrl: content.footer.privacyPolicyURL,
        }}
        isTokenGating
        tokenGatingConfig={{
          groupId: RuntimeConfiguration?.TOKEN_GATING_GROUP_ID,
          ruleId: RuntimeConfiguration?.TOKEN_GATING_RULE_ID,
        }}
        content={content.popupContent}
        onSuccess={handleSuccessRedirection}
      />
    </div>
  );
};

export default ClaimedLayout;
