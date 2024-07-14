export const getItemFromLocalStorage = (item: string) => {
  return localStorage.getItem(item) ?? '';
};

export const setItemToLocalStorage = (key: string, item: string) => {
  return localStorage.setItem(key, item);
};
