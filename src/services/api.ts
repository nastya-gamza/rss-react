import axios from 'axios';

export const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
