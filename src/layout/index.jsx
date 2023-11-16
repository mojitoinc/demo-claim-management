import React, { useState } from 'react';
import { ClaimTokenModal } from "@mojito-inc/claim-management";
import Button from '@mui/material/Button';

const AppLayout = () => {
  const [openModal, setOpenModal] = useState(false);
  const [wallet, setWallet] = useState();
  const onCloseModal = () => {
    setOpenModal(false);
  }
  const onOpenModal = () => {
    setOpenModal(true);
  }

  const onChangeWalletAddress = (
      address,
      networkDetails,
      chainId,
      balance,
      provider,
      providerType
    ) => {
      // setShowClaimModal(false);
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
        open={openModal}
        onCloseModal={onCloseModal}
        // showConnectModal={showConnectModal}
        onWalletData={onChangeWalletAddress}
        walletAddress={wallet?.walletAddress}
        config={{
          CHAIN_ID: 1,
          CROSSMINT_API: "sk_live.UlOd89oC.62pBPSMHUinkxpXsDY4tbT8dfvbbAZEE",
          CROSSMINT_ENV: "STAGING",
          NETWORK_ID: "d608a5e7-8c80-4e7b-bb11-768ae855402a",
          ORG_ID: "8d95625a-5848-440c-8e55-0d008c9a1d38",
          paperClientId: "659af8f3-6a4f-4f53-8936-ba0fa32b0db0",
          paperNetworkName: "Sepolia",
        }}
        isDisConnect={false}
        walletOptions={{
          enableCrossmint: true,
          enableMetamask: true,
          enablePaper: true,
          enableWalletConnect: true,
        }}
        claimCode=""
        isEnterClaimCode={true}
      />
    </div>
  )
}

export default AppLayout;