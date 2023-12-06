import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ClaimTokenModal, useWallet } from "@mojito-inc/claim-management";
import { RuntimeConfiguration } from '@/configuration';
import { ClaimDetails } from '@/interface';
import { useAuction } from '@mojito-inc/core-service';


const FormLayout = () => {
  const { auctionDetails } = useAuction();
  const { address } = useWallet();

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <Stack sx={{ marginBottom: '20px' }} gap="20px" direction={{ sm: 'column', lg: 'row' }}>
            <TextField value={ email } onChange={ onChangeEmail } placeholder="Enter email" />
            <TextField value={ name } onChange={ onChangeName } placeholder="Enter name" />
            <TextField value={ listingId } onChange={ onChangeListingId } placeholder="Enter listing id" />
        </Stack>
        <Stack sx={{ marginBottom: '20px' }}>
            <FormGroup sx={{ display: { sm: 'block', lg: 'flex' }, gap: '20px' }}>
                <FormControlLabel control={<Switch checked={ isTokenGating } onChange={ onChangeIsTokenGating } />} label="Enable token gating" />
                <FormControlLabel control={<Switch checked={ isEnterCode } onChange={ onChangeIsEnterCode } />} label="Enable enter claim code" />
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
                orgId: RuntimeConfiguration.ORG_ID ?? "",
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
                logoUrl: '',
                privacyUrl: 'https://www.getmojito.com/terms',
                additionalTermsUrl: 'https://www.getmojito.com/terms',
            }}
            isTokenGating={ isTokenGating }
            tokenGatingConfig={{
                groupId: groupId,
                ruleId: ruleId,
            }}
            tokenName={ 'Test' }
            onSuccess={ handleCloseModal }
        />
    </div>
  )
}

export default FormLayout