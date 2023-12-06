export const isVideo = (url: string): boolean => {
  return /\.(mp4|ogv|webm|mov|MP4)$/.test(url);
};
