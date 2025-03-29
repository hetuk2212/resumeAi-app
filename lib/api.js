import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApiUrl = 'https://resumeai-k2qu.onrender.com/resumeai';

const api = axios.create({
  baseURL: ApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export const sendOtp = async phone => {
  return api.post('/user/register', { phone });
};

export const verifyOtp = async ({ phone, otp }) => {
  const response = await api.post('/user/verify-otp', { phone, otp });
  if (response.status === 200 && response) {
    await AsyncStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const getUserData = async () => {
  return api.get('/user');
};

export const logout = async () => {
  try {
    const response = await api.get('/user/logout');
    await AsyncStorage.removeItem('token');
    return response.data;
  } catch (error) {
    console.error('Logout Error:', error.response?.data || error.message);
    throw error;
  }
};
