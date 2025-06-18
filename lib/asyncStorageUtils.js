import AsyncStorage from "@react-native-async-storage/async-storage";

export const getResumesFromStorage = async () => {
  try {
    const existingResumesString = await AsyncStorage.getItem('resumes');
    let existingResumes = existingResumesString ? JSON.parse(existingResumesString) : [];

    if (!Array.isArray(existingResumes)) {
      console.error('Resumes data is not an array:', existingResumes);
      existingResumes = [];
    }

    return existingResumes;
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return [];
  }
};

export const findResumeIndex = (existingResumes, resumeId) => {
  return existingResumes.findIndex(r => r.profile?._id === resumeId);
};