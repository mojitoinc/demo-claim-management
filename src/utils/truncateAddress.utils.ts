export const truncateAddress = (data: string) => {
  return `${data?.substring(0, 4)}...${data?.substring(data.length - 4)}`;
};
