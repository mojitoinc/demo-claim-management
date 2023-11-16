import React, { useState } from 'react';
import { ClaimTokenModal } from "@mojito-inc/claim-management";
import Button from '@mui/material/Button';

// SDK claim modal integration

const AppLayout = () => {
  const [openModal, setOpenModal] = useState(false);
  const [wallet, setWallet] = useState();
  const onCloseModal = () => {
    setOpenModal(false);
  }
  const onOpenModal = () => {
    setOpenModal(true);
  }

  const onGetWalletData = (
      address,
      networkDetails,
      chainId,
      balance,
      provider,
      providerType
    ) => {
      setWallet({
        isDisconnect: false,
        walletAddress: address,
        networkDetails: networkDetails,
        chainId: chainId,
        balance: balance,
        provider: provider,
        providerType: providerType,
      });
    };
  return (
    <div>
      <Button onClick={ onOpenModal }>Open Modal</Button>
      <ClaimTokenModal
        open={openModal} // If true it will open modal
        onCloseModal={onCloseModal} //function to modal close
        onWalletData={onGetWalletData} // In Callback to get connected wallet details
        walletAddress={wallet?.walletAddress} // Connected wallet address
        config={{
          CHAIN_ID: 1,
          CROSSMINT_API: "sk_live.UlOd89oC.62pBPSMHUinkxpXsDY4tbT8dfvbbAZEE", // cross mint connection config
          CROSSMINT_ENV: "STAGING",  // cross mint connection environment config
          NETWORK_ID: "d608a5e7-8c80-4e7b-bb11-768ae855402a", // Network Id
          ORG_ID: "8d95625a-5848-440c-8e55-0d008c9a1d38", //organization Id
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
      />
    </div>
  )
}

export default AppLayout;