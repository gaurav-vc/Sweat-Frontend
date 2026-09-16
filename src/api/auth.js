import api from './client';

export const login = async (username, password) => {
  const response = await api.post('token/', {
    username,
    password
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};
