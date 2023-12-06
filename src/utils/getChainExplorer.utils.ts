export const getChainExplorer = (
  chainId: number,
  walletAddress: string
): string => {
  switch (chainId) {
    case 1:
      return `https://etherscan.io/address/${walletAddress}#tokentxns`;
    case 4:
      return `https://rinkeby.etherscan.io/address/${walletAddress}`;
    case 137:
      return `https://polygonscan.com/address/${walletAddress}#tokentxnsErc1155`;
    case 80001:
      return `https://mumbai.polygonscan.com/address/${walletAddress}#nfttransfers`;
    case 11155111:
      return `https://sepolia.etherscan.io/address/${walletAddress}#nfttransfers`;
    case 5:
      return `https://goerli.etherscan.io/address/${walletAddress}#tokentxns`;
    default:
      return `https://etherscan.io/address/${walletAddress}`;
  }
};
