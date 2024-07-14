import axios from 'axios';

export const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response = await axios.get(url);
    if (response && response.data) {
      return response.data;
    }
    throw new Error('No data found');
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
