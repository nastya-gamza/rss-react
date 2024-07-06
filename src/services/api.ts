export const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('error!');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
