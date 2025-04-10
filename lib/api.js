import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resumeDownload } from 'react-native-fs';

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
  return api.post('/user/register', {phone});
};

export const verifyOtp = async ({phone, otp}) => {
  const response = await api.post('/user/verify-otp', {phone, otp});
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

export const getAllProfileInfo = async () => {
  try {
    const response = await api.get('profile/personal-info');
    return response.data;
  } catch (error) {
    console.error(
      'Get Profile Info Error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const addPersonalInfo = async personalInfo => {
  try {
    const response = await api.post('/profile/personal-info', personalInfo);
    return response;
  } catch (error) {
    console.error(
      'Add Personal Info Error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get('/user/profile');
    return response;
  } catch (error) {
    console.error(
      'Get Profile Info Error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const deleteResume = async profileId => {
  try {
    const response = await api.delete(`/profile/${profileId}/personal-info`);
    return response;
  } catch (error) {
    console.log(
      'Get Delete Resume Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const getSpecificProfile = async resumeId => {
  try {
    const response = await api.get(`/profile/${resumeId}/personal-info`);
    return response;
  } catch (error) {
    console.log(
      'Get Profile Resume Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const updateProfile = async ({formData, resumeId}) => {
  try {
    const response = await api.put(
      `/profile/${resumeId}/personal-info`,
      formData,
    );
    return response;
  } catch (error) {
    console.log(
      'Get Update Profile Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const addEducation = async ({resumeId, body}) => {
  try {
    const response = await api.post(`/profile/${resumeId}/education`, body);
    return response;
  } catch (error) {
    console.log(
      'Get Add Education Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const getEducation = async resumeId => {
  try {
    const response = await api.get(`/profile/${resumeId}/education`);
    return response;
  } catch (error) {
    console.log(
      'Get Education Details Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const deleteEducation = async ({resumeId, educationId}) => {
  try {
    const response = await api.delete(
      `/profile/${resumeId}/education/${educationId}`,
    );
    return response;
  } catch (error) {
    console.log(
      'Get Education Details Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};
export const updateEducation = async ({resumeId, educationId, data}) => {
  try {
    const response = await api.put(
      `/profile/${resumeId}/education/${educationId}`, data,
    );
    return response;
  } catch (error) {
    console.log(
      'Get Education Update Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const getExperience = async resumeId => {
  try {
    const response = await api.get(`/profile/${resumeId}/experience`);
    return response;
  } catch (error) {
    console.log(
      'Get Experience Details Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const addExperience = async ({resumeId, body}) => {
  try {
    const response = await api.post(`/profile/${resumeId}/experience`, body);
    return response;
  } catch (error) {
    console.log(
      'Get Add Experience Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const updateExperience = async ({resumeId, experienceId, data}) => {
  try {
    const response = await api.put(
      `/profile/${resumeId}/experience/${experienceId}`, data,
    );
    return response;
  } catch (error) {
    console.log(
      'Get Experience Update Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const deleteExperience = async ({resumeId, experienceId}) => {
  try {
    const response = await api.delete(
      `/profile/${resumeId}/experience/${experienceId}`,
    );
    return response;
  } catch (error) {
    console.log(
      'Get Experience Details Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const getProjects = async resumeId => {
  try {
    const response = await api.get(`/profile/${resumeId}/project`);
    return response;
  } catch (error) {
    console.log(
      'Get Project Details Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const addProjects = async ({resumeId, body}) => {
  try {
    const response = await api.post(`/profile/${resumeId}/project`, body);
    return response;
  } catch (error) {
    console.log(
      'Get Add Project Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const deleteProjects = async ({resumeId, projectsId}) => {
  try {
    const response = await api.delete(
      `/profile/${resumeId}/project/${projectsId}`,
    );
    return response;
  } catch (error) {
    console.log(
      'Get Project Details Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};