export const retryRequest = async <T>(
  
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    
    console.log(`🔄 Retry... sisa ${retries}. Tunggu ${delay}ms`);
    await new Promise((resolve) => setTimeout(resolve, delay));
    
    return retryRequest(fn, retries - 1, delay * 2);
  }
};