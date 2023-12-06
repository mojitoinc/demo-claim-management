import React, { useCallback, useContext, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import { WalletContext } from "@/provider/WalletContext";
import { ButtonNameProps, MenuNameData } from "@/interface";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Modal from "@mui/material/Modal";
import MenuContainer from "./MenuContainer";
import router from "next/router";
import MenuItemContainer from "./MenuItemContainer";
import Close from "@mui/icons-material/Close";
import WalletDetails from "./WalletDetails";
import Menu from "@mui/material/Menu";
import { Images } from "../assets/images";
import { truncateAddress } from "@/utils/truncateAddress.utils";
import { ArrowBackIosNewOutlined } from "@mui/icons-material";
export interface HeaderProps {
  headerText?: string;
  logo: string;
  walletAddress?: string;
  balance?: number;
  showScheduleDemo?: boolean;
  buttonName?: ButtonNameProps;
  privacyPolicyURL: string;
  termsAndConditionsURL: string;
  contactUsURL: string;
  currencyName?: string;
  currencyIcon?: string;
  menuLabel?: MenuNameData;
  handleMenuOpen?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleMenuClose?: () => void;
  onClickClaim?: () => void;
  onClickDisconnect?: () => void;
  onClickScheduleDemo?: () => void;
  onClickConnect?: () => void;
}

const Header = ({
  headerText,
  logo,
  showScheduleDemo,
  privacyPolicyURL,
  termsAndConditionsURL,
  contactUsURL,
  buttonName,
  menuLabel,
  balance,
  walletAddress,
  currencyName,
  currencyIcon,
  onClickClaim,
  handleMenuOpen,
  handleMenuClose,
  onClickDisconnect,
  onClickScheduleDemo,
  onClickConnect,
}: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [copied, setCopied] = useState<string>("");
  const [loggedInAnchorEl, setLoggedInAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const open = useMemo(() => {
    return Boolean(anchorEl);
  }, [anchorEl]);

  const modalStyle = useMemo(() => {
    return {
      position: "absolute",
      bottom: "0",
      width: "calc(100% - 32px)",
      height: {
        lg: "350px",
        md: "350px",
        sm: "350px",
        xs: open ? "calc(100% - 46px)" : "350px",
      },
      bgcolor: theme.palette.background.paper,
      overflowY: "auto",
      padding: "16px 16px 30px 16px",
    };
  }, [open, theme]);

  const linkStyle = useMemo(
    () => ({
      textDecoration: "none",
      fontFamily: theme?.MojitoCoreUI?.font?.primary,
      color: theme?.palette?.text?.primary,
      fontSize: "12px",
      fontWeight: 700,
    }),
    [theme]
  );

  const onClickMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const onClickConnectMenu = useCallback(() => {
    onClickConnect?.();
    handleMenuClose?.();
    handleClose();
  }, [handleClose, handleMenuClose, onClickConnect]);

  const onClickClaimMembershipMenu = useCallback(() => {
    onClickClaim?.();
    handleMenuClose?.();
    handleClose();
  }, [handleClose, handleMenuClose, onClickClaim]);

  const handleClickFaq = useCallback(() => {
    router.push("/faq");
    handleMenuClose?.();
    handleClose();
  }, [handleClose, handleMenuClose]);

  const handleClickClaimed = useCallback(() => {
    router.push("/membership");
    handleMenuClose?.();
    handleClose();
  }, [handleClose, handleMenuClose]);

  const handleClickClaimMembership = useCallback(() => {
    router.push("/");
    handleMenuClose?.();
    handleClose();
  }, [handleClose, handleMenuClose]);

  const onHandleDisconnect = useCallback(() => {
    onClickDisconnect?.();
    setOpenDetailModal(false);
    handleClose();
  }, [handleClose, onClickDisconnect]);

  const menuOptions = useMemo(() => {
    if (walletAddress) {
      if (isMobile)
        return [
          {
            menuName: menuLabel?.loggedIn?.membershipPage || "View Membership",
            menuAction: handleClickClaimed,
          },
          {
            menuName: menuLabel?.loggedIn?.homePage || "Visit Claim Page",
            menuAction: handleClickClaimMembership,
          },
          {
            menuName: menuLabel?.loggedIn?.faq || "FAQs",
            menuAction: handleClickFaq,
          },
        ];
      else
        return [
          {
            menuName: menuLabel?.loggedIn?.membershipPage || "View Membership",
            menuAction: handleClickClaimed,
          },
          {
            menuName: menuLabel?.loggedIn?.homePage || "Visit Claim Page",
            menuAction: handleClickClaimMembership,
          },
          {
            menuName: menuLabel?.loggedIn?.faq || "FAQs",
            menuAction: handleClickFaq,
          },
          {
            menuName: menuLabel?.loggedIn?.logout || "Log Out",
            menuAction: onHandleDisconnect,
          },
        ];
    } else {
      return [
        {
          menuName: menuLabel?.loggedOut?.homePage || "Claim Your Membership",
          menuAction: handleClickClaimMembership,
        },
        {
          menuName: menuLabel?.loggedOut?.faq || "FAQs",
          menuAction: handleClickFaq,
        },
        {
          menuName:
            menuLabel?.loggedOut?.alreadyClaimed || "I Already Claimed My Pass",
          menuAction: onClickConnectMenu,
        },
      ];
    }
  }, [
    isMobile,
    onHandleDisconnect,
    walletAddress,
    menuLabel,
    handleClickFaq,
    handleClickClaimMembership,
    handleClickClaimed,
    onClickConnectMenu,
  ]);

  const handleClickLoggedIn = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isMobile) {
        setLoggedInAnchorEl(event.currentTarget);
      }
      setOpenDetailModal(true);
    },
    [isMobile]
  );

  const handleCloseDetailModal = useCallback(() => {
    setOpenDetailModal(false);
  }, []);

  const onClickViewWallet = useCallback(() => {
    router.push("/wallet");
  }, []);

  const onClickCopy = useCallback((data: string) => {
    navigator.clipboard
      .writeText(data)
      .then(() => {
        setCopied(data);
        setTimeout(() => {
          setCopied("close");
        }, 1000);
      })
      .catch(() => {
        setCopied("close");
      });
  }, []);

  return (
    <>
      <Box
        sx={{
          background: router?.asPath?.includes("/wallet")
            ? "#fff"
            : theme?.palette?.background?.paper,
          display: "flex",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex:
            router?.asPath?.includes("/wallet") ||
            (router?.asPath?.includes("/membership") && walletAddress)
              ? 500
              : 0,
          alignItems: "center",
          border: `1px solid ${theme?.MojitoClaim?.Header?.borderColor}`,
          height: "72px",
        }}
      >
        <Box sx={{ padding: { lg: "4.5px 24px", xs: "4.5px 12px" } }}>
          {headerText ? (
            <Box display="flex" flexDirection="row" alignItems="center">
              <ArrowBackIosNewOutlined
                sx={{ width: "20px", height: "20px", cursor: "pointer" }}
                onClick={handleClickClaimed}
              />
              {/* <Typography
                sx={{
                  fontSize: "20px",
                  marginLeft: "8px",
                  fontWeight: 500,
                  marginTop: "3px",
                }}
              >
                Wallet
              </Typography> */}
            </Box>
          ) : (
            <img
              src={logo}
              onClick={handleClickClaimMembership}
              style={{
                width: "auto",
                height: "auto",
                objectFit: "contain",
                maxHeight: "55px",
                cursor: "pointer",
              }}
              alt="logo"
            />
          )}
        </Box>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{ height: "40px", padding: { lg: "16px 24px", xs: "16px 12px" } }}
        >
          {!walletAddress ? (
            <>
              {router?.asPath?.includes("wallet") ? (
                <Button
                  sx={{
                    fontSize: { xs: "14px", lg: "16px" },
                    background: theme.palette?.background?.paper,
                    color: theme.palette?.primary?.main,
                    border: `1px solid ${theme.palette?.primary?.main}`,
                    height: "40px",
                  }}
                  onClick={onClickConnect}
                >
                  {router?.asPath?.includes("wallet")
                    ? "Connect to Wallet"
                    : buttonName?.primary || "Claim My Pass"}
                </Button>
              ) : (
                isMobile &&
                (router?.asPath?.includes("faq") ||
                  router?.asPath?.includes("membership")) && (
                  <Button
                    sx={{
                      fontSize: { xs: "14px", lg: "16px" },
                      background: theme.MojitoCoreUI?.font?.secondary,
                      color: theme.palette?.background?.paper,
                      height: "40px",
                    }}
                    onClick={handleClickClaimMembership}
                  >
                    {buttonName?.primary || "Claim My Pass"}
                  </Button>
                )
              )}
              {!router?.asPath?.includes("wallet") && (
                <Typography
                  onClick={onClickMenu}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <MenuIcon
                    sx={{
                      cursor: "pointer",
                      width: "28px",
                      height: "28px",
                      padding: "6px 0",
                      color: theme?.palette?.text?.primary,
                    }}
                  />
                </Typography>
              )}
            </>
          ) : (
            <>
              {isMobile && (
                <Typography
                  sx={{
                    border: `1px solid ${theme?.palette?.primary?.dark}`,
                    borderRadius: "4px",
                    padding: "8px 16px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={handleClickLoggedIn}
                >
                  <Typography
                    sx={{
                      backgroundColor: theme?.MojitoClaim?.active,
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      marginRight: "9px",
                    }}
                  ></Typography>
                  <Typography
                    sx={{
                      color: theme?.palette?.primary?.dark,
                      marginRight: "9px",
                    }}
                  >
                    {router?.asPath?.includes("wallet") && walletAddress
                      ? truncateAddress(walletAddress ?? "")
                      : "Logged in"}
                  </Typography>
                  <KeyboardArrowDownIcon
                    sx={{
                      color: theme?.palette?.primary?.dark,
                    }}
                  />
                </Typography>
              )}
              {!router?.asPath?.includes("wallet") && (
                <Typography
                  onClick={onClickMenu}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <MenuIcon
                    sx={{
                      cursor: "pointer",
                      width: "28px",
                      height: "28px",
                      padding: "6px 0",
                      color: theme?.palette?.text?.primary,
                    }}
                  />
                </Typography>
              )}
            </>
          )}
        </Stack>
        <MenuContainer
          menuOptions={menuOptions}
          isMobile={isMobile}
          open={open}
          anchorEl={anchorEl}
          handleMenuClose={handleClose}
        ></MenuContainer>
        <Menu
          open={isMobile && openDetailModal}
          anchorEl={loggedInAnchorEl}
          onClose={handleCloseDetailModal}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Box padding="8px 16px" width="375px">
            <WalletDetails
              currencyIcon={currencyIcon ?? Images?.ETHICON}
              walletBalance={balance ?? 0}
              walletAddress={walletAddress ?? ""}
              currency={currencyName ?? "ETH"}
              copied={copied}
              isMobile={false}
              onClickLogout={onHandleDisconnect}
              onClickCopy={onClickCopy}
              onClickViewWallet={onClickViewWallet}
            />
          </Box>
        </Menu>
        <Modal
          open={!isMobile && openDetailModal}
          onClose={handleCloseDetailModal}
        >
          <Box sx={modalStyle}>
            <Box position="fixed" sx={{ right: "17px" }}>
              <Close
                sx={{
                  cursor: "pointer",
                  color: theme.palette.background.default,
                  height: "24px",
                  weight: "24px",
                }}
                onClick={handleCloseDetailModal}
              />
            </Box>
            <Box padding="40px 16px">
              <WalletDetails
                currencyIcon={currencyIcon ?? Images?.ETHICON}
                walletBalance={balance ?? 0}
                walletAddress={walletAddress ?? ""}
                currency={currencyName ?? "ETH"}
                copied={copied}
                isMobile={true}
                onClickLogout={onHandleDisconnect}
                onClickCopy={onClickCopy}
                onClickViewWallet={onClickViewWallet}
              />
            </Box>
          </Box>
        </Modal>
        <Modal open={!isMobile && open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <Box display="flex" justifyContent="flex-end" padding="8px">
              <Close
                sx={{
                  cursor: "pointer",
                  color: theme.palette.background.default,
                }}
                onClick={handleClose}
              />
            </Box>
            <MenuItemContainer menuOptions={menuOptions} isMobile={isMobile} />
            <Stack
              direction={{ xs: "row" }}
              spacing={{ xs: 2 }}
              position="fixed"
              bottom={"40px"}
              left={"32px"}
            >
              {termsAndConditionsURL && (
                <a
                  rel="noreferrer"
                  href={termsAndConditionsURL}
                  target="_blank"
                  style={linkStyle}
                >
                  Terms & Conditions
                </a>
              )}
              {privacyPolicyURL && (
                <a
                  rel="noreferrer"
                  href={privacyPolicyURL}
                  target="_blank"
                  style={linkStyle}
                >
                  Privacy Policy
                </a>
              )}
              {contactUsURL && (
                <a
                  rel="noreferrer"
                  href={contactUsURL}
                  target="_blank"
                  style={linkStyle}
                >
                  Contact Us
                </a>
              )}
            </Stack>
          </Box>
        </Modal>
      </Box>
    </>
  );
};
export default Header;
