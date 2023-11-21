import React, { useState } from 'react';
import { ClaimTokenModal, useWallet, useTransaction } from "@mojito-inc/claim-management";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// SDK claim modal integration

const AppLayout = () => {
  const { address, balance, networkDetails, provider, providerType } = useWallet();
  console.log('provider', provider); // Web3 provider
  const { transactionDetails, fetchInvoiceDetail, error } = useTransaction();
  const [openModal, setOpenModal] = useState(false);
  const onCloseModal = () => {
    setOpenModal(false);
  }
  const onOpenModal = () => {
    setOpenModal(true);
  }

  return (
    <div>
      <Button onClick={ onOpenModal }>Open Modal</Button>
      <Typography>{ address }</Typography>
      <Typography>Native: { balance?.native } Non-native: { balance?.nonNative }</Typography>
      <Typography>{ networkDetails?.chainID } { networkDetails?.name }</Typography>
      <Typography>{ providerType }</Typography>
      <Typography>{ transactionDetails?.invoiceId }</Typography>
      <Typography>{ transactionDetails?.status }</Typography>
      <Typography>{ transactionDetails?.transactionHash }</Typography>
      <ClaimTokenModal
        open={openModal} // If true it will open modal
        onCloseModal={onCloseModal} //function to modal close
        name="Test" // User name
        userEmail="tset@gmail.com" // User email
        config={{
          chainId: 1,
          crossmintApiKey: "sk_live.UlOd89oC.62pBPSMHUinkxpXsDY4tbT8dfvbbAZEE", // cross mint connection config
          crossmintEnv: "STAGING",  // cross mint connection environment config
          orgId: "8d95625a-5848-440c-8e55-0d008c9a1d38", //organization Id
          paperClientId: "659af8f3-6a4f-4f53-8936-ba0fa32b0db0", // Paper client Id for email wallet
          paperNetworkName: "Sepolia", // Paper network name
        }}
        isDisConnect={false} // disconnect wallet if connected
        walletOptions={{ // To hide and show the wallet options
          enableCrossmint: true,
          enableMetamask: true,
          enablePaper: true,
          enableWalletConnect: true,
        }}
        claimCode="" // pass claim code if isEnterClaimCode is false
        isEnterClaimCode={true} // if true user need to enter the claim code
        link={{
          logoUrl: '', // APP logo
          termsUrl: '', // terms and conditions url
          doNotHaveWalletURL: '', // do not have wallet button to redirect user 
          viewTokenTrackerURL: '' // token tracker url
        }}
        onSuccess={ () => {} } // function to handle your own login in success modal button
      />
    </div>
  )
}

export default AppLayout;