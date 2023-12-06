export const getValidURL = (data: string): string => {
  let value = data;
  if (value.includes("ipfs:")) {
    value = value.replace("ipfs://", "https://ipfs.io/ipfs/");
  }

  if (value.includes("ipfs/ipfs/")) {
    value = value.replace("ipfs/", "");
  }

  return value;
};
