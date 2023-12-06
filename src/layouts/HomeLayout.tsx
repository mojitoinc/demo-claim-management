import React from "react";
import Footer, { FooterProps } from "../Component/Footer";
import Header from "../Component/Header";
import HeroBlock from "../Component/HeroBlock";
import FAQ, { FAQItem } from "../Component/FAQ";
import StadiumBlock, { StadiumBlockProps } from "../Component/StadiumBlock";
import SubHeaderBlock from "@/Component/SubHeaderBlock";
import {
  ButtonNameProps,
  UserDetail,
  UserDetailError,
  MenuNameData,
} from "@/interface";

export interface HeroBlockProps {
  title: string;
  subTitle: string;
  description: string;
  imageURL: string;
  isLogged?: boolean;
}
export interface SubHeaderBlockProps {
  title: string;
  description: string;
}
export interface HomeProps {
  isClaimAvailable: boolean;
  isSaleStarted: boolean;
  brandLogoURL?: string;
  isMobile: boolean;
  headerLogo: string;
  heroBlock: HeroBlockProps;
  stadiumBlock?: StadiumBlockProps;
  faq: FAQItem[];
  footer: FooterProps;
  walletAddress?: string;
  balance?: number;
  subHeader?: SubHeaderBlockProps;
  showScheduleDemo?: boolean;
  buttonName?: ButtonNameProps;
  menuLabel?: MenuNameData;
  userDetail?: UserDetail;
  userDetailError?: UserDetailError;
  showUserDetailsInputForm?: boolean;
  currencyName?: string;
  currencyIcon?: string;
  anchorEl?: HTMLElement | null;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFirstName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeLastName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMenuOpen?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleMenuClose?: () => void;
  onClickHeaderClaim: () => void;
  onClickHeroClaim: () => void;
  onClickDisconnect: () => void;
  onClickScheduleDemo: () => void;
  onClickConnect?: () => void;
  handleClickBrandLogo?: () => void;
}

const HomeLayout = ({
  isClaimAvailable,
  isSaleStarted,
  brandLogoURL,
  isMobile,
  headerLogo,
  heroBlock,
  stadiumBlock,
  faq,
  footer,
  walletAddress,
  balance,
  subHeader,
  showScheduleDemo,
  buttonName,
  menuLabel,
  userDetail,
  userDetailError,
  currencyIcon,
  currencyName,
  anchorEl,
  showUserDetailsInputForm,
  handleCheckboxChange,
  onChangeFirstName,
  onChangeLastName,
  onChangeEmail,
  handleMenuOpen,
  handleMenuClose,
  onClickHeaderClaim,
  onClickHeroClaim,
  onClickDisconnect,
  onClickScheduleDemo,
  onClickConnect,
  handleClickBrandLogo,
}: HomeProps) => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header
        logo={headerLogo}
        menuLabel={menuLabel}
        walletAddress={walletAddress}
        balance={balance}
        showScheduleDemo={showScheduleDemo}
        buttonName={buttonName}
        privacyPolicyURL={footer.privacyPolicyURL}
        termsAndConditionsURL={footer.termsAndConditionsURL}
        contactUsURL={footer.contactUsURL}
        currencyName={currencyName}
        currencyIcon={currencyIcon}
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
        onClickDisconnect={onClickDisconnect}
        onClickClaim={onClickHeaderClaim}
        onClickScheduleDemo={onClickScheduleDemo}
        onClickConnect={onClickConnect}
      />
      <div style={{ flex: 1 }}>
        <HeroBlock
          isClaimAvailable={isClaimAvailable}
          isSaleStarted={isSaleStarted}
          brandLogoURL={brandLogoURL}
          showUserDetailsInputForm={showUserDetailsInputForm}
          description={heroBlock.description}
          imageURL={heroBlock.imageURL}
          subTitle={heroBlock.subTitle}
          title={heroBlock.title}
          showScheduleDemo={showScheduleDemo}
          buttonName={buttonName}
          userDetail={userDetail}
          userDetailError={userDetailError}
          onChangeFirstName={onChangeFirstName}
          onChangeLastName={onChangeLastName}
          onChangeEmail={onChangeEmail}
          anchorEl={anchorEl}
          handleMenuOpen={handleMenuOpen}
          handleMenuClose={handleMenuClose}
          handleCheckboxChange={handleCheckboxChange}
          onClickClaim={onClickHeroClaim}
          onClickScheduleDemo={onClickScheduleDemo}
          handleClickBrandLogo={handleClickBrandLogo}
        />
        {stadiumBlock && (
          <StadiumBlock
            title={stadiumBlock?.title}
            description={stadiumBlock?.description}
            imageURL={stadiumBlock?.imageURL}
          />
        )}
        {subHeader && (
          <SubHeaderBlock
            description={subHeader?.title}
            onClickClaim={onClickHeroClaim}
            title={subHeader?.description}
            showScheduleDemo={showScheduleDemo}
            buttonName={buttonName}
            onClickScheduleDemo={onClickScheduleDemo}
          />
        )}
      </div>
      {!isMobile && (
        <Footer
          privacyPolicyURL={footer.privacyPolicyURL}
          termsAndConditionsURL={footer.termsAndConditionsURL}
          twitterURL={footer.twitterURL}
          facebookURL={footer.facebookURL}
          instagramURL={footer.instagramURL}
          youtubeURL={footer.youtubeURL}
          contactUsURL={footer.contactUsURL}
          linkedInURL={footer.linkedInURL}
        />
      )}
    </div>
  );
};

export default HomeLayout;