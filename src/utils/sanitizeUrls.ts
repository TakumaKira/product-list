export const sanitizeUrls = (urls: string): string[] => {
  if (urls === '') return [];
  return urls.replace(/\s/g, '').split(',');
};