import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import getStyles from './style';
import CustomTextInput from '../../../../Components/TextInput';
import ActionButtons from '../../../../Components/ActionButtons';
import {Images} from '../../../../Assets/Images';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '../../../../Theme/ ThemeContext';
import Header from '../../../../Components/Header/Index';
import { SafeAreaView } from 'react-native-safe-area-context';

const UpdateEducation = () => {
  const route = useRoute();
  const {educationData} = route.params || {};

  const [form, setForm] = useState({
    course: educationData?.course || '',
    university: educationData?.university || '',
    grade: educationData?.grade || '',
    startYear: educationData?.startYear?.toString() || '',
    endYear: educationData?.endYear?.toString() || '',
  });

  const [resumeId, setResumeId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const {theme} = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    const getResumeId = async () => {
      try {
        const id = await AsyncStorage.getItem('resumeId');
        if (id !== null) {
          setResumeId(id);
        } else {
          console.log('No resume ID found');
        }
      } catch (error) {
        console.log('Error fetching resume ID:', error);
      }
    };

    getResumeId();
  }, []);

  const handleInputChange = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
    setErrors(prev => ({
      ...prev,
      [key]: null,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const existingResumesString = await AsyncStorage.getItem('resumes');
      let existingResumes = existingResumesString
        ? JSON.parse(existingResumesString)
        : [];

      if (!Array.isArray(existingResumes)) {
        console.error('Resumes data is not an array:', existingResumes);
        existingResumes = [];
      }

      const resumeIndex = existingResumes.findIndex(
        r => r.profile?._id === resumeId,
      );

      if (resumeIndex !== -1) {
        const educationIndex = existingResumes[
          resumeIndex
        ].profile.education.findIndex(
          education => education._id === educationData._id,
        );

        if (educationIndex !== -1) {
          existingResumes[resumeIndex].profile.education[educationIndex] = {
            ...existingResumes[resumeIndex].profile.education[educationIndex],
            course: form.course,
            university: form.university,
            grade: form.grade,
            startYear: Number(form.startYear),
            endYear: Number(form.endYear),
          };

          await AsyncStorage.setItem(
            'resumes',
            JSON.stringify(existingResumes),
          );

          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Education updated successfully',
            position: 'bottom',
          });

          navigation.navigate('Education');
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Education entry not found',
            position: 'bottom',
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Resume not found',
          position: 'bottom',
        });
      }
    } catch (error) {
      console.error('Error updating education:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong, try again.',
        position: 'bottom',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <Header title="Update Education" headerIcon={Images.leftArrowIcon} onPress={()=>{
          navigation.goBack()
        }}/>
        <View style={styles.inputContainer}>
          <CustomTextInput
            label="Course / Degree"
            value={form.course}
            onChangeText={text => handleInputChange('course', text)}
            errorMessage={errors.course}
          />
          <CustomTextInput
            label="University"
            value={form.university}
            onChangeText={text => handleInputChange('university', text)}
            errorMessage={errors.university}
          />
          <CustomTextInput
            label="Grade"
            value={form.grade}
            onChangeText={text => handleInputChange('grade', text)}
            errorMessage={errors.grade}
          />
          <CustomTextInput
            label="Start Year"
            keyboardType="numeric"
            value={form.startYear}
            onChangeText={text => handleInputChange('startYear', text)}
            errorMessage={errors.startYear}
          />
          <CustomTextInput
            label="End Year"
            keyboardType="numeric"
            value={form.endYear}
            onChangeText={text => handleInputChange('endYear', text)}
            errorMessage={errors.endYear}
          />
          <ActionButtons
            onSave={handleSave}
            saveIcon={Images.check}
            loading={loading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateEducation;
