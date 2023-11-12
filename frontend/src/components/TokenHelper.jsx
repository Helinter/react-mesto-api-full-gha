// Функция для сохранения токена в sessionStorage
export const setToken = (token) => {
  sessionStorage.setItem('token', token);
};

// Функция для получения токена из sessionStorage
export const getToken = () => {
  return sessionStorage.getItem('token');
};

// Функция для удаления токена из sessionStorage
export const removeToken = () => {
  sessionStorage.removeItem('token');
};
