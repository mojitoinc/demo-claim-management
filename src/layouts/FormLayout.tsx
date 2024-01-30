import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ClaimTokenModal, useWallet } from "@mojito-inc/claim-management";
import { RuntimeConfiguration } from "@/configuration";
import { useAuction } from "@mojito-inc/core-service";
import { useAuthDetails } from "@/provider/AuthProvider";
import router from "next/router";

const FormLayout = () => {
  const { auctionDetails } = useAuction();
  const { address, networkDetails } = useWallet();
  const { authDetails, setAuthDetails } = useAuthDetails();

  const [claimDetails, setClaimDetails] = useState<any>();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loginWithPersonalInformation, setLoginWithPersonalInformation] =
    useState(false);
  const [listingId, setListingId] = useState("");
  const [lotId, setLotId] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [ruleId, setRuleId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [claimCode, setClaimCode] = useState("");
  const [isTokenGating, setIsTokenGating] = useState(false);
  const [isEnterCode, setIsEnterCode] = useState(false);
  const [isNegativeTokenGating, setIsNegativeTokenGating] = useState(false);
  const [isClaimWithGas, setIsClaimWithGas] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [disconnect, setDisconnect] = useState(false);
  const [showBuyButton, setShowBuyButton] = useState(false);
  const [enableMixersBuyNow, setEnableMixersBuyNow] = useState(false);
  const [enableMixersAuction, setEnableMixersAuction] = useState(false);

  const getClaimedData = useCallback(async () => {
    try {
      const response = await auctionDetails(
        {
          id: listingId,
        },
        { fetchPolicy: "no-cache" }
      );
      setClaimDetails(response?.data?.collectionItemById?.details);
      return response?.data?.collectionItemById;
    } catch (error: any) {
      if (error?.message?.includes("jwt token invalid")) {
        sessionStorage?.clear();
      }
      return null;
    }
  }, [auctionDetails, listingId]);

  useEffect(() => {
    if (listingId) {
      getClaimedData();
    }
  }, [listingId, getClaimedData]);

  useEffect(() => {
    if (disconnect) {
      setDisconnect(false);
    }
  }, [disconnect]);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeLoginWithPII = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginWithPersonalInformation(e.target.checked);
  };

  const onChangeListingId = (e: ChangeEvent<HTMLInputElement>) => {
    setListingId(e.target.value);
  };

  const onChangeLotId = (e: ChangeEvent<HTMLInputElement>) => {
    setLotId(e.target.value);
  };

  const onChangeInvoiceId = (e: ChangeEvent<HTMLInputElement>) => {
    setInvoiceId(e.target.value);
  };

  const onChangeRuleId = (e: ChangeEvent<HTMLInputElement>) => {
    setRuleId(e.target.value);
  };

  const onChangeGroupId = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupId(e.target.value);
  };

  const onChangeIsTokenGating = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTokenGating(e.target.checked);
  };

  const onChangeIsEnterCode = (e: ChangeEvent<HTMLInputElement>) => {
    setIsEnterCode(e.target.checked);
  };

  const onChangeIsNegativeTokenGating = (e: ChangeEvent<HTMLInputElement>) => {
    setIsNegativeTokenGating(e.target.checked);
  };

  const onChangeIsClaimWithGas = (e: ChangeEvent<HTMLInputElement>) => {
    setIsClaimWithGas(e.target.checked);
  };

  const onChangeShowBuyButton = (e: ChangeEvent<HTMLInputElement>) => {
    setShowBuyButton(e.target.checked);
  };

  const onChangeClaimCode = (e: ChangeEvent<HTMLInputElement>) => {
    setClaimCode(e.target.value);
  };

  const onChangeEnableMixersBuyNow = (e: ChangeEvent<HTMLInputElement>) => {
    setEnableMixersBuyNow(e.target.checked);
  };

  const onChangeEnableMixersAuction = (e: ChangeEvent<HTMLInputElement>) => {
    setEnableMixersAuction(e.target.checked);
  };


  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDisconnect = () => {
    setDisconnect(true);
  };

  const onChangeAPIDomain = (e: SelectChangeEvent) => {
    setAuthDetails((prev) => ({
      ...prev,
      apiDomain: e.target.value as string,
    }));
  };

  const onChangeOrgId = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthDetails((prev) => ({
      ...prev,
      orgId: e.target.value,
    }));
  };

  const onClickGoToMarketPlace = useCallback(() => {
    router.replace('/');
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Stack
        sx={{ marginBottom: "20px" }}
        gap="20px"
        direction={{ sm: "column", lg: "row" }}
      >
        <TextField
          label="Enter organization id"
          variant="outlined"
          value={authDetails?.orgId}
          onChange={onChangeOrgId}
          placeholder="Enter organization id"
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Choose API domain
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={authDetails?.apiDomain}
            label="Choose API domain"
            onChange={onChangeAPIDomain}
          >
            <MenuItem value="https://api-dev.mojito.xyz/query">
              Development
            </MenuItem>
            <MenuItem value="https://api-stg.mojito.xyz/query">
              Staging
            </MenuItem>
            <MenuItem value="https://api-sandbox.mojito.xyz/query">
              Sandbox
            </MenuItem>
            <MenuItem value="https://api.mojito.xyz/query">Production</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack>
      <FormGroup sx={{ display: { sm: "block", lg: "flex" }, gap: "20px" }}>
          <FormControlLabel
            control={
              <Switch
                checked={enableMixersBuyNow}
                onChange={onChangeEnableMixersBuyNow}
              />
            }
            label="Enable Mixers Buy Now"
          />
          <FormControlLabel
            control={
              <Switch
                checked={enableMixersAuction}
                onChange={onChangeEnableMixersAuction}
              />
            }
            label="Enable Mixers Auction"
          />
      </FormGroup>
      </Stack>
      <Stack
        sx={{ marginBottom: "20px" }}
        gap="20px"
        direction={{ sm: "column", lg: "row" }}
      >
        <TextField
          value={email}
          onChange={onChangeEmail}
          placeholder="Enter email"
        />
        <TextField
          value={name}
          onChange={onChangeName}
          placeholder="Enter First Name"
        />
        <TextField
          value={lastName}
          onChange={onChangeLastName}
          placeholder="Enter Last Name"
        />
        <TextField
          value={listingId}
          onChange={onChangeListingId}
          placeholder="Enter listing id"
        />
        { (enableMixersBuyNow || enableMixersAuction) && <TextField
          value={lotId}
          onChange={onChangeLotId}
          placeholder="Enter lot id"
        />}
        { enableMixersAuction && <TextField
          value={invoiceId}
          onChange={onChangeInvoiceId}
          placeholder="Enter Invoice id"
        />}
      </Stack>
      { (!enableMixersBuyNow && !enableMixersAuction) && <Stack sx={{ marginBottom: "20px" }}>
        <FormGroup sx={{ display: { sm: "block", lg: "flex" }, gap: "20px" }}>
          <FormControlLabel
            control={
              <Switch
                checked={isTokenGating}
                onChange={onChangeIsTokenGating}
              />
            }
            label="Enable token gating"
          />
          <FormControlLabel
            control={
              <Switch checked={isEnterCode} onChange={onChangeIsEnterCode} />
            }
            label="Enable enter claim code"
          />
          <FormControlLabel
            control={
              <Switch
                checked={isNegativeTokenGating}
                onChange={onChangeIsNegativeTokenGating}
              />
            }
            label="Enable negative token gating"
          />
          <FormControlLabel
            control={
              <Switch
                checked={isClaimWithGas}
                onChange={onChangeIsClaimWithGas}
              />
            }
            label="Enable claim with gas"
          />
          <FormControlLabel
            control={
              <Switch
                checked={loginWithPersonalInformation}
                onChange={onChangeLoginWithPII}
              />
            }
            label="Personal Information Required"
          />
          {(isTokenGating || isNegativeTokenGating) && (
            <FormControlLabel
              control={
                <Switch
                  checked={showBuyButton}
                  onChange={onChangeShowBuyButton}
                />
              }
              label="Show buy now button"
            />
          )}
        </FormGroup>
      </Stack> }
      {(isTokenGating || isNegativeTokenGating) && (
        <Stack
          sx={{ marginBottom: "20px" }}
          gap="20px"
          direction={{ sm: "column", lg: "row" }}
        >
          <TextField
            value={ruleId}
            onChange={onChangeRuleId}
            placeholder="Enter rule id"
          />
          <TextField
            value={groupId}
            onChange={onChangeGroupId}
            placeholder="Enter group id"
          />
        </Stack>
      )}
      <Stack sx={{ marginBottom: "20px" }} gap="20px" direction="column">
        {!isEnterCode && !(isTokenGating || isNegativeTokenGating || enableMixersBuyNow || enableMixersAuction) && (
          <TextField
            sx={{ marginBottom: "20px" }}
            value={claimCode}
            onChange={onChangeClaimCode}
            placeholder="Enter claim code"
          />
        )}
        <Button onClick={handleOpenModal}>Open modal</Button>
        {address && <Button onClick={handleDisconnect}>Disconnect</Button>}
      </Stack>
      <ClaimTokenModal
        open={ openModal }
        skipClaimModal={ false }
        onCloseModal={ handleCloseModal }
        firstName={name}
        lastName={lastName}
        loginWithPersonalInformation={loginWithPersonalInformation}
        userEmail={email}
        isClaimWithGas={isClaimWithGas}
        config={{
          chainId: Number(RuntimeConfiguration.CHAIN_ID) ?? 11155111,
          crossmintApiKey: RuntimeConfiguration.CROSSMINT_API ?? '',
          orgId: authDetails?.orgId,
          crossmintEnv: RuntimeConfiguration.CROSSMINT_ENV ?? '',
          paperClientId: RuntimeConfiguration.PAPER_CLIENT_ID ?? '',
          paperNetworkName: RuntimeConfiguration.NETWORK_NAME ?? '',
        }}
        claimType={
          isTokenGating
        ? "TokenGating"
        : isEnterCode
        ? "CustomCode"
        : enableMixersAuction || enableMixersBuyNow
        ? "BuyNow"
        : "NoCode"
        }
        isDisConnect={ disconnect }
        listingId={listingId}
        claimCode={claimCode}
        link={{
          termsUrl: "https://www.getmojito.com/terms",
          logoUrl:
            "https://res.cloudinary.com/duwztsuxj/image/upload/v1683870261/Frame_238173_cpwne5.png",
          privacyUrl: "https://www.getmojito.com/terms",
          additionalTermsUrl: "https://www.getmojito.com/terms",
        }}
        tokenGatingConfig={{
          groupId: groupId,
          ruleId: ruleId,
        }}
        showBuyButton={showBuyButton}
        tokenName={"Test"}
        onSuccess={handleCloseModal}
        mixersConfig={{
          lotId: lotId,
          walletOptions: {
            enableMetamask: true,
            enableWalletConnect: true,
            enableEmailWallet: true
          },
          paymentId: '',
          invoiceId: invoiceId,
          discountCode: '',
          checkOutApiKey: 'pk_sbox_snvdtl3vfybgh7msvch7ni2gpan',
          paymentOptions: {
            creditCard: true,
            walletConnect: true,
            wire: true,
          },
          errorPageUrl: '',
          successPageUrl: '',
          onClickGoToMarketPlace,
        }} />
    </div>
  );
};

export default FormLayout;
