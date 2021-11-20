export const delay: (ms: number) => Promise<void> = (ms) => new Promise(resolve => setTimeout(resolve, ms));
