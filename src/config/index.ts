export const configuration = {
  ORG_ID: process.env.NEXT_PUBLIC_ORG_ID ?? "",
  API_HOSTNAME: process.env.NEXT_PUBLIC_API_HOSTNAME,
  PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
  PAPER_CLIENT_ID: process.env.NEXT_PUBLIC_PAPER_CLIENT_ID ?? "",
  MARKETPLACE_ID: process.env.NEXT_PUBLIC_MARKETPLACE_ID ?? "",
  CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID ?? 80001,
};
