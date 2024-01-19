export interface AppColor {
  primary: string;
  secondary: string;
  teritary: string;
  textColorPrimary: string;
  textColorSecondary: string;
  headerBackground: string;
  headerBorderColor: string;
  footerBackground: string;
  inProgressColor: string;
  inProgressBackground: string;
  grey: string;
  error: string;
  mobileHeaderBackground: string;
  paginationBackground: string;
  paginationSelectedPageColor: string;
  cardBackground: string;
  cardTitle: string;
  cardLink: string;
  active: string;
  accountBackgroundColor: string;
  placeholderColor: string;
  checkBoxColor: string;
  scrollBarGrey: string;
  scrollBarBackground: string;
  deliveryBackgroundColor: string;
  linkColor: string;
  deliveryTextColor: string;
  tokenTrackerColor: string;
}

export interface FAQItem {
  label: string;
  description: string;
}

interface ContentData {
  title: string;
  description: string;
}

export interface themeProps {
  color: AppColor;
  fontFamily: {
    primary: string;
    secondary: string;
    teritary: string;
  };
}

export interface FooterData {
  privacyPolicyURL: string;
  termsAndConditionsURL: string;
  twitterURL: string;
  facebookURL: string;
  instagramURL: string;
  youtubeURL: string;
  contactUsURL: string;
  linkedInURL: string;
  additionalTermsAndConditionsURL: string;
}

export interface SocialMediaData {
  contentMessage: string;
  twitterURL: string;
  linkedInURL: string;
  newsletterURL: string;
  tmaURL: string;
  tmaLabsURL: string;
  startYourMembershipURL: string;
  socialMediaTitle: string;
  startYourMembershipLabel: string;
  telegramURL: string;
}

export interface MenuNameData {
  loggedOut: {
    homePage: string;
    faq: string;
    alreadyClaimed: string;
  };
  loggedIn: {
    membershipPage: string;
    homePage: string;
    faq: string;
    logout: string;
  };
}

export interface ContentObject {
  title: string;
  description: string;
  theme: themeProps;
  doNotHaveWalletURL: string;
  logoURL: string;
  mobileLogoURL?: string;
  menuLabel?: MenuNameData;
  favIcon: string;
  hero: {
    title: string;
    subTitle: string;
    description: string;
    imageURL: string;
  };
  stadium: {
    title: string;
    description: string;
    imageURL: string;
  };
  subHeader: any;
  faq: FAQItem[];
  footer: FooterData;
  socialMedia: SocialMediaData;
  claimedDetails: {
    claimedTokenLabel: string;
    claimedDateLabel: string;
  };
  showScheduleDemo?: boolean;
  scheduleDemoURL?: string;
  walletOptions: {
    enableCrossmint: boolean;
    enableMetamask: boolean;
    enableWalletConnect: boolean;
    enablePaper: boolean;
  };
  isEnterClaimCode?: boolean;
  claimCode?: string;
  popupContent?: {
    ClaimCodeContent?: ContentData;
    ConnectWalletContent?: ContentData;
    SuccessContent?: ContentData;
    RecoveryCodeModal?: ContentData;
  };
  buttonName?: ButtonNameProps;
  brandLogoURL?: string;
  showUserDetailsInputForm?: boolean;
  claimLogoURL?: string;
}

export interface BalanceData {
  native: number;
  nonNative: number;
}

export interface SupportedNetworksData {
  chainID: number;
  id: string;
  isTestnet: boolean;
  name: string;
}
export interface WalletData {
  walletAddress: string;
  isDisconnect: boolean;
  networkDetails: SupportedNetworksData;
  chainId: number;
  balance: BalanceData;
  provider: any;
  providerType: string;
}

export interface ButtonNameProps {
  primary: string;
  secondary: string;
  teritary: string;
}
