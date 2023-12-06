import React, {
  useCallback,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ContentContext from "../provider";
import FAQ from "@/Component/FAQ";
import Footer from "@/Component/Footer";
import Header from "@/Component/Header";
import { RuntimeConfiguration } from "../configuration";
import { ClaimTokenModal, useWallet } from "@mojito-inc/claim-management";
import router from "next/router";
import { Images } from "@/assets/images";

const Faq = () => {
  const theme = useTheme();
  const { content } = useContext(ContentContext);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showClaimModal, setShowClaimModal] = useState<boolean>(false);
  const { address, balance, networkDetails } = useWallet();
  const [disconnect, setDisconnect] = useState<boolean>(false);
  const [showConnectModal, setShowConnectModal] = useState<boolean>(false);

  const onClickClaim = useCallback(() => {
    if (content?.showUserDetailsInputForm) router.push("/");
    else {
      setShowClaimModal(true);
    }
  }, [content?.showUserDetailsInputForm]);

  const onClickConnect = useCallback(() => {
    setShowClaimModal(true);
    setShowConnectModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowClaimModal(false);
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
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header
        logo={
          isMobile && content?.mobileLogoURL
            ? content?.mobileLogoURL
            : content.logoURL
        }
        walletAddress={address}
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
        <FAQ
          data={content?.faq}
          isMobile={isMobile}
          buttonName={content?.buttonName}
          onClickClaim={onClickClaim}
        />
      </div>
      <ClaimTokenModal
        open={showClaimModal}
        skipClaimModal={showConnectModal}
        onCloseModal={onCloseModal}
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
      {!isMobile && (
        <Footer
          privacyPolicyURL={content.footer.privacyPolicyURL}
          termsAndConditionsURL={content.footer.termsAndConditionsURL}
          twitterURL={content.footer.twitterURL}
          facebookURL={content.footer.facebookURL}
          instagramURL={content.footer.instagramURL}
          youtubeURL={content.footer.youtubeURL}
          contactUsURL={content.footer.contactUsURL}
          linkedInURL={content.footer.linkedInURL}
        />
      )}
    </div>
  );
};
export default Faq;
