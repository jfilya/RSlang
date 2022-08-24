export const tokenKey = 'authToken';

export const getToken = () => {
  const lclStrg = localStorage.getItem(tokenKey);
  return lclStrg || null;
};
