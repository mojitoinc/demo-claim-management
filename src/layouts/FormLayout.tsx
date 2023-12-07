import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ClaimTokenModal, useWallet } from "@mojito-inc/claim-management";
import { RuntimeConfiguration } from '@/configuration';
import { ClaimDetails } from '@/interface';
import { useAuction } from '@mojito-inc/core-service';
import { useAuthDetails } from '@/provider/AuthProvider';


const FormLayout = () => {
  const { auctionDetails } = useAuction();
  const { address } = useWallet();
  const { authDetails, setAuthDetails } = useAuthDetails();

  const [claimDetails, setClaimDetails] = useState<ClaimDetails>();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [listingId, setListingId] = useState('');
  const [ruleId, setRuleId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [claimCode, setClaimCode] = useState('');
  const [isTokenGating, setIsTokenGating] = useState(false);
  const [isEnterCode, setIsEnterCode] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [disconnect, setDisconnect] = useState(false);
  const [showBuyButton, setShowBuyButton] = useState(false);

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
  }

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const onChangeListingId = (e: ChangeEvent<HTMLInputElement>) => {
    setListingId(e.target.value);
  }

  const onChangeRuleId = (e: ChangeEvent<HTMLInputElement>) => {
    setRuleId(e.target.value);
  }

  const onChangeGroupId = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupId(e.target.value);
  }

  const onChangeIsTokenGating = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTokenGating(e.target.checked);
  }

  const onChangeIsEnterCode = (e: ChangeEvent<HTMLInputElement>) => {
    setIsEnterCode(e.target.checked);
  }

  const onChangeShowBuyButton = (e: ChangeEvent<HTMLInputElement>) => {
    setShowBuyButton(e.target.checked);
  }

  const onChangeClaimCode = (e: ChangeEvent<HTMLInputElement>) => {
    setClaimCode(e.target.value);
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const handleDisconnect = () => {
    setDisconnect(true);
  }

  const onChangeAPIDomain = (e: SelectChangeEvent) => {
    setAuthDetails(prev => ({
      ...prev,
      apiDomain: e.target.value as string,
    }));
  }

  const onChangeOrgId = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthDetails(prev => ({
      ...prev,
      orgId: e.target.value,
    }));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <Stack sx={{ marginBottom: '20px' }} gap="20px" direction={{ sm: 'column', lg: 'row' }}>
            <TextField label="Enter organization id" variant="outlined" value={ authDetails?.orgId } onChange={ onChangeOrgId } placeholder="Enter organization id" />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Choose API domain</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ authDetails?.apiDomain }
                label="Choose API domain"
                onChange={ onChangeAPIDomain }
              >
                <MenuItem value="https://api-dev.mojito.xyz/">Development</MenuItem>
                <MenuItem value="https://api-stg.mojito.xyz/">Staging</MenuItem>
                <MenuItem value="https://api-sandbox.mojito.xyz/">Sandbox</MenuItem>
                <MenuItem value="https://api.mojito.xyz/">Production</MenuItem>
              </Select>
            </FormControl>
        </Stack>
        <Stack sx={{ marginBottom: '20px' }} gap="20px" direction={{ sm: 'column', lg: 'row' }}>
            <TextField value={ email } onChange={ onChangeEmail } placeholder="Enter email" />
            <TextField value={ name } onChange={ onChangeName } placeholder="Enter name" />
            <TextField value={ listingId } onChange={ onChangeListingId } placeholder="Enter listing id" />
        </Stack>
        <Stack sx={{ marginBottom: '20px' }}>
            <FormGroup sx={{ display: { sm: 'block', lg: 'flex' }, gap: '20px' }}>
                <FormControlLabel control={<Switch checked={ isTokenGating } onChange={ onChangeIsTokenGating } />} label="Enable token gating" />
                <FormControlLabel control={<Switch checked={ isEnterCode } onChange={ onChangeIsEnterCode } />} label="Enable enter claim code" />
                { isTokenGating && <FormControlLabel control={<Switch checked={ showBuyButton } onChange={ onChangeShowBuyButton } />} label="Show buy now button" /> }
            </FormGroup>
        </Stack>
        { isTokenGating && (
            <Stack sx={{ marginBottom: '20px' }} gap="20px" direction={{ sm: 'column', lg: 'row' }}>
                <TextField value={ ruleId } onChange={ onChangeRuleId } placeholder="Enter rule id" />
                <TextField value={ groupId } onChange={ onChangeGroupId } placeholder="Enter group id" />
            </Stack>
        ) }
        <Stack sx={{ marginBottom: '20px' }} gap="20px" direction="column">
            {!isEnterCode && !isTokenGating && <TextField sx={{ marginBottom: '20px' }} value={ claimCode } onChange={ onChangeClaimCode } placeholder="Enter claim code" /> }
            <Button onClick={ handleOpenModal }>Open modal</Button>
            { address && <Button onClick={ handleDisconnect }>Disconnect</Button> }
        </Stack>
        <ClaimTokenModal
            open={ openModal }
            skipClaimModal={ false }
            onCloseModal={ handleCloseModal }
            name={ name }
            userEmail={ email }
            config={{
                crossmintApiKey: RuntimeConfiguration.CROSSMINT_API ?? "",
                crossmintEnv: RuntimeConfiguration?.CROSSMINT_ENV ?? "",
                orgId: authDetails?.orgId,
                chainId: Number(RuntimeConfiguration.CHAIN_ID) ?? 4,
                paperClientId: RuntimeConfiguration.PAPER_CLIENT_ID ?? "",
                paperNetworkName: RuntimeConfiguration.NETWORK_NAME ?? "",
            }}
            isDisConnect={ disconnect }
            walletOptions={{
                enableCrossmint: false,
                enableMetamask: true,
                enablePaper: true,
                enableWalletConnect: true,
            }}
            claimItemId={ listingId }
            claimCode={ claimCode }
            isEnterClaimCode={ isEnterCode }
            link={{
                termsUrl: 'https://www.getmojito.com/terms',
                logoUrl: 'https://res.cloudinary.com/duwztsuxj/image/upload/v1683870261/Frame_238173_cpwne5.png',
                privacyUrl: 'https://www.getmojito.com/terms',
                additionalTermsUrl: 'https://www.getmojito.com/terms',
            }}
            isTokenGating={ isTokenGating }
            tokenGatingConfig={{
                groupId: groupId,
                ruleId: ruleId,
            }}
            showBuyButton={ showBuyButton }
            tokenName={ 'Test' }
            onSuccess={ handleCloseModal }
        />
    </div>
  )
}

export default FormLayout