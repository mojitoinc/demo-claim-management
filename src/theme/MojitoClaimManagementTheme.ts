export interface MojitoClaimManagementTheme {
  delivery: {
    textColor: string;
    tokenTrackerColor: string;
  };
  Header?: {
    background?: string;
    mobileBackground?: string;
    borderColor?: string;
  };
  Footer?: {
    background?: string;
    color?: string;
  };
  Hero?: {
    background?: string;
    color?: string;
  };
  Discount?: {
    inProgressColor: string;
    inProgressBackground: string;
  };
  error?: string;
  active?: string;
  accountBackgroundColor?: string;
  placeholderColor?: string;
  checkBoxColor?: string;
  pagination?: {
    backgroundColor: string;
    selectedPageColor: string;
  };
  card?: {
    backgroundColor: string;
    titleColor: string;
    linkTextColor: string;
  };
  scrollBar?: {
    color: string;
    background: string;
  };
  deliveryBackgroundColor?: string;
  linkColor?: string;
  success: string;
}
