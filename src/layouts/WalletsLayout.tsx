import React, {
  useState,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Component/Header";
import ContentContext from "../provider";
import { WalletContext } from "../provider/WalletContext";
import { WalletsPage } from "@mojito-inc/secondary-market";
import { configuration } from "@/config";
import router from "next/router";
import { Images } from "@/assets/images";
import { SecondaryMarketTheme as themes } from "../theme";
import Box from "@mui/material/Box";
import { RuntimeConfiguration } from "@/configuration";
import { ClaimTokenModal, useWallet } from "@mojito-inc/claim-management";
import Footer from "@/Component/Footer";

export enum ListingType {
  SALE = "sale",
  CLAIMABLE = "claimable",
}

const WalletsLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { wallet, setWallet } = useContext(WalletContext);
  const { content } = useContext(ContentContext);
  const [showClaimModal, setShowClaimModal] = useState<boolean>(false);
  const [showConnectModal, setShowConnectModal] = useState<boolean>(false);
  const [disconnect, setDisconnect] = useState<boolean>(false);
  const { address, balance, networkDetails, provider, providerType } =
    useWallet();

  const config = useMemo(() => {
    return {
      orgId: configuration?.ORG_ID ?? "",
      projectId: configuration?.PROJECT_ID ?? "",
      paperClientId: configuration.PAPER_CLIENT_ID,
      walletOptions: {
        enableEmail: true,
        enableMetamask: true,
        enableWalletConnect: true,
      },
      chainId: +configuration.CHAIN_ID,
    };
  }, []);

  const Image = useMemo(() => {
    return {
      ethIcon: Images.ETHICON.default.src,
      logo: Images.LOGO_ICON.default.src,
      metamask: Images.METAMASK.default.src,
      walletConnect: Images.WALLET_CONNECT.default.src,
      loader: Images.LOADER.default.src,
      wethIcon: Images.WETH_ICON.default.src,
      maticIcon: Images.MATIC.default.src,
      placeHolderImage: Images.PLACEHOLDER.default.src,
    };
  }, []);

  const onClickViewItem = useCallback(() => {
    router.push("/");
  }, []);

  const onClickClaim = useCallback(() => {
    setWallet({
      ...wallet,
      isDisconnect: false,
    });
    setShowClaimModal(true);
    setShowConnectModal(true);
  }, [setWallet, wallet]);

  useEffect(() => {
    if (disconnect) {
      router.push("/");
      setDisconnect(false);
    }
  }, [disconnect]);

  const onClickDisconnect = useCallback(async () => {
    setDisconnect(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowClaimModal(false);
  }, []);

  const handleSuccessRedirection = useCallback(() => {
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
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Header
        headerText="Wallet"
        logo={content.logoURL}
        menuLabel={content?.menuLabel}
        walletAddress={address}
        balance={balance?.native}
        currencyName={currency?.currencyName}
        currencyIcon={currency?.currencyIcon}
        buttonName={content.buttonName}
        privacyPolicyURL={content.footer.privacyPolicyURL}
        termsAndConditionsURL={content.footer.termsAndConditionsURL}
        contactUsURL={content.footer.contactUsURL}
        onClickDisconnect={onClickDisconnect}
        onClickClaim={onClickClaim}
      />
      <div style={{ flex: 1 }}>
        <ThemeProvider theme={themes}>
          <Box sx={{ padding: { lg: "16px 96px", xs: "16px" } }}>
            <WalletsPage
              hideWalletBalance
              showMenu={false}
              listingType={ListingType?.CLAIMABLE}
              walletDetails={{
                balance: balance,
                walletAddress: address,
                providerType: providerType,
                networkDetails: networkDetails,
                provider: provider,
                disConnect: false,
                open: false,
                refetchBalance: false,
              }}
              config={config}
              Image={Image}
              showViewItem={false}
              onViewItem={onClickViewItem}
              onClickLogout={onClickDisconnect}
              onConnectWallet={onClickClaim}
            />
          </Box>
        </ThemeProvider>
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
        isTokenGating
        tokenGatingConfig={{
          groupId: RuntimeConfiguration?.TOKEN_GATING_GROUP_ID,
          ruleId: RuntimeConfiguration?.TOKEN_GATING_RULE_ID,
        }}
        isDisConnect={disconnect}
        walletOptions={content.walletOptions}
        claimCode={content.claimCode}
        isEnterClaimCode={content.isEnterClaimCode}
        link={{
          termsUrl: content.footer.termsAndConditionsURL,
          logoUrl: content.logoURL,
        }}
        content={content.popupContent}
        onSuccess={handleSuccessRedirection}
      />
    </div>
  );
};

export default WalletsLayout;
