import React, { useState } from 'react';
import { ClaimTokenModal, useWallet, useTransaction } from "@mojito-inc/claim-management";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { config } from '../config';

// SDK claim modal integration

const AppLayout = () => {
  const { address, balance, networkDetails, provider, providerType } = useWallet();
  console.log('provider', provider); // Web3 provider
  const { transactionDetails, fetchInvoiceDetail, error } = useTransaction();
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [groupId, setGroupId] = useState('');
  const [ruleId, setRuleId] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [itemId, setItemId] = useState('');
  const [claimCode, setClaimCode] = useState('');
  const [isTokenGating, setIsTokenGating] = useState(false);
  const [isEnterClaimCode, setIsEnterClaimCode] = useState(false);
  const onCloseModal = () => {
    setOpenModal(false);
  }
  const onOpenModal = () => {
    setOpenModal(true);
  }

  const onChangeEmail = (e) => {
    setEmail(e?.target?.value);
  }

  const onChangeName = (e) => {
    setName(e?.target?.value);
  }

  const onChangeContractAddress = (e) => {
    setContractAddress(e?.target?.value);
  }

  const onChangeGroupId = (e) => {
    setGroupId(e?.target?.value);
  }

  const onChangeRuleId = (e) => {
    setRuleId(e?.target?.value);
  }

  const onChangeTokenId = (e) => {
    setTokenId(e?.target?.value);
  }

  const onChangeItemId = (e) => {
    setItemId(e?.target?.value);
  }

  const onChangeClaimCode = (e) => {
    setClaimCode(e?.target?.value);
  }

  const onChangeIsTokenGating = (event) => {
    setIsTokenGating(event.target.checked);
  };

  const onChangeIsEnterClaimCode = (event) => {
    setIsEnterClaimCode(event.target.checked);
  };

  return (
    <div>
      <Button onClick={ onOpenModal }>Open Modal</Button>
      { address && (
        <>
          <Typography>Wallet address{ address }</Typography>
          <Typography>Native balance: { balance?.native } Non-native balance: { balance?.nonNative }</Typography>
          <Typography>Network name: { networkDetails?.name }</Typography>
          <Typography>Chain id: { networkDetails?.chainID }</Typography>
          <Typography>Provider Type: { providerType }</Typography>
        </>
      ) }
      { transactionDetails?.invoiceId && (
        <>
          <Typography>Invoice id: { transactionDetails?.invoiceId }</Typography>
          <Typography>Status: { transactionDetails?.status }</Typography>
          <Typography>Transaction hash: { transactionDetails?.transactionHash }</Typography>
        </>
      ) }
      <TextField value={ email } onChange={ onChangeEmail } placeholder="Enter email" />
      <TextField value={ name } onChange={ onChangeName } placeholder="Enter name" />
      <TextField value={ itemId } onChange={ onChangeItemId } placeholder="Enter item id" />

      <TextField value={ claimCode } onChange={ onChangeClaimCode } placeholder="Enter item id" />

      <Switch
        checked={isTokenGating}
        onChange={onChangeIsTokenGating}
        inputProps={{ 'aria-label': 'controlled' }}
      />

      <Switch
        checked={isEnterClaimCode}
        onChange={onChangeIsEnterClaimCode}
        inputProps={{ 'aria-label': 'controlled' }}
      />

      <TextField value={ contractAddress } onChange={ onChangeContractAddress } placeholder="Enter contract address" />
      <TextField value={ tokenId } onChange={ onChangeTokenId } placeholder="Enter token id" />
      <TextField value={ groupId } onChange={ onChangeGroupId } placeholder="Enter group id" />
      <TextField value={ ruleId } onChange={ onChangeRuleId } placeholder="Enter rule id" />
      <ClaimTokenModal
        open={openModal} // If true it will open modal
        onCloseModal={onCloseModal} //function to modal close
        name={ name } // User name
        userEmail={ email } // User email
        config={{
          chainId: config.CHAIN_ID,
          crossmintApiKey: config.CROSSMINT_API, // cross mint connection config
          crossmintEnv: config.CROSSMINT_ENV,  // cross mint connection environment config
          orgId: config.ORG_ID, //organization Id
          paperClientId: config.PAPER_CLIENT_ID, // Paper client Id for email wallet
          paperNetworkName: config.NETWORK_NAME, // Paper network name
        }}
        isDisConnect={false} // disconnect wallet if connected
        walletOptions={{ // To hide and show the wallet options
          enableCrossmint: false,
          enableMetamask: true,
          enablePaper: true,
          enableWalletConnect: true,
        }}
        isTokenGating={ isTokenGating }
        claimItemId={ itemId }
        tokenGatingConfig={{
          contractAddress,
          groupId,
          ruleId,
          tokenId,
        }}
        claimCode={ claimCode } // pass claim code if isEnterClaimCode is false
        isEnterClaimCode={isEnterClaimCode} // if true user need to enter the claim code
        link={{
          logoUrl: '', // APP logo
          termsUrl: 'https://www.getmojito.com/terms', // terms and conditions url
          doNotHaveWalletURL: '', // do not have wallet button to redirect user 
          viewTokenTrackerURL: '' // token tracker url
        }}
        onSuccess={ onCloseModal } // function to handle your own login in success modal button
      />
    </div>
  )
}

export default AppLayout;