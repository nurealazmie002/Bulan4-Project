export const retryRequest = async (
  requestFn: () => Promise<any>,
  maxRetries: number = 3
): Promise<any> => {
  let lastError: any;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await requestFn();
      return result;
    } catch (error) {
      lastError = error;
      
      if (attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`🔄 Retry ${attempt + 1}/${maxRetries} setelah ${delay}ms`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
};