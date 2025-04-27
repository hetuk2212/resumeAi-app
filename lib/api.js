import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {resumeDownload} from 'react-native-fs';

const ApiUrl = 'https://resumeai-k2qu.onrender.com/resumeai';

const api = axios.create({
  baseURL: ApiUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
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
      `/profile/${resumeId}/education/${educationId}`,
      data,
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
      `/profile/${resumeId}/experience/${experienceId}`,
      data,
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

export const updateProject = async ({resumeId, projectId, data}) => {
  try {
    const response = await api.put(
      `/profile/${resumeId}/project/${projectId}`,
      data,
    );
    return response;
  } catch (error) {
    console.log(
      'Get Project Update Error:',
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

export const addObjective = async ({resumeId, body}) => {
  try {
    const response = await api.post(`/profile/${resumeId}/objective`, body);
    return response;
  } catch (error) {
    console.log(
      'Get Add Objective Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const getInterests = async resumeId => {
  try {
    const response = await api.get(`/profile/${resumeId}/interest`);
    return response;
  } catch (error) {
    console.log(
      'Get Interests Details Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const addInterests = async ({resumeId, body}) => {
  try {
    const response = await api.post(`/profile/${resumeId}/interest`, body);
    return response;
  } catch (error) {
    console.log(
      'Get Add Interests Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const deleteInterest = async ({resumeId, interestId}) => {
  try {
    const response = await api.delete(
      `/profile/${resumeId}/interest/${interestId}`,
    );
    return response;
  } catch (error) {
    console.log(
      'Get Interest Details Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const updateInterest = async ({resumeId, interestId, data}) => {
  try {
    const response = await api.put(
      `/profile/${resumeId}/interest/${interestId}`,
      data,
    );
    return response;
  } catch (error) {
    console.log(
      'Get Interest Update Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const getAchievements = async resumeId => {
  try {
    const response = await api.get(`/profile/${resumeId}/achievement`);
    return response;
  } catch (error) {
    console.log(
      'Get Achievements Details Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const deleteAchievement = async ({resumeId, achievementId}) => {
  try {
    const response = await api.delete(
      `/profile/${resumeId}/achievement/${achievementId}`,
    );
    return response;
  } catch (error) {
    console.log(
      'Get Achievement Details Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const addAchievements = async ({resumeId, body}) => {
  try {
    const response = await api.post(`/profile/${resumeId}/achievement`, body);
    return response;
  } catch (error) {
    console.log(
      'Get Add Achievements Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const updateAchievement = async ({resumeId, achievementId, data}) => {
  try {
    const response = await api.put(
      `/profile/${resumeId}/achievement/${achievementId}`,
      data,
    );
    return response;
  } catch (error) {
    console.log(
      'Get Achievement Update Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};
export const getSkills = async resumeId => {
  try {
    const response = await api.get(`/profile/${resumeId}/skill`);
    return response;
  } catch (error) {
    console.log(
      'Get Skills Details Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const deleteSkill = async ({resumeId, skillId}) => {
  try {
    const response = await api.delete(`/profile/${resumeId}/skill/${skillId}`);
    return response;
  } catch (error) {
    console.log(
      'Get Skill Details Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const addSkills = async ({resumeId, body}) => {
  try {
    const response = await api.post(`/profile/${resumeId}/skill`, body);
    return response;
  } catch (error) {
    console.log(
      'Get Add Skills Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const updateSkill = async ({resumeId, skillId, data}) => {
  try {
    const response = await api.put(
      `/profile/${resumeId}/skill/${skillId}`,
      data,
    );
    return response;
  } catch (error) {
    console.log(
      'Get Skill Update Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const getActivites = async resumeId => {
  try {
    const response = await api.get(`/profile/${resumeId}/activity`);
    return response;
  } catch (error) {
    console.log(
      'Get Activities Details Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const deleteActivity = async ({resumeId, activityId}) => {
  try {
    const response = await api.delete(
      `/profile/${resumeId}/activity/${activityId}`,
    );
    return response;
  } catch (error) {
    console.log(
      'Get Activity Details Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const addActivities = async ({resumeId, body}) => {
  try {
    const response = await api.post(`/profile/${resumeId}/activity`, body);
    return response;
  } catch (error) {
    console.log(
      'Get Add Activity Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const updateActivity = async ({resumeId, activityId, data}) => {
  try {
    const response = await api.put(
      `/profile/${resumeId}/activity/${activityId}`,
      data,
    );
    return response;
  } catch (error) {
    console.log(
      'Get Activity Update Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};
export const getLanguages = async resumeId => {
  try {
    const response = await api.get(`/profile/${resumeId}/language`);
    return response;
  } catch (error) {
    console.log(
      'Get Languages Details Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const deleteLanguage = async ({resumeId, languageId}) => {
  try {
    const response = await api.delete(
      `/profile/${resumeId}/language/${languageId}`,
    );
    return response;
  } catch (error) {
    console.log(
      'Get Language Details Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const addLanguages = async ({resumeId, body}) => {
  try {
    const response = await api.post(`/profile/${resumeId}/language`, body);
    return response;
  } catch (error) {
    console.log(
      'Get Add Language Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};

export const updateLanguage = async ({resumeId, languageId, data}) => {
  try {
    const response = await api.put(
      `/profile/${resumeId}/language/${languageId}`,
      data,
    );
    return response;
  } catch (error) {
    console.log(
      'Get Language Update Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};
export const addUpdateCoverLetter = async (resumeId, data) => {
  try {
    const response = await api.post(`/profile/${resumeId}/cover-letter`, data);
    return response;
  } catch (error) {
    console.log(
      'Cover Letter Update Error:',
      error.response?.message || error.message,
    );
    throw error;
  }
};
