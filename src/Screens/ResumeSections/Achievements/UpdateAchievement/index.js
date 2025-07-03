import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import getStyle from './style';
import CustomTextInput from '../../../../Components/TextInput';
import ActionButtons from '../../../../Components/ActionButtons';
import {Images} from '../../../../Assets/Images';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  findResumeIndex,
  getResumesFromStorage,
} from '../../../../../lib/asyncStorageUtils';
import { useTheme } from '../../../../Theme/ ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../../Components/Header/Index';

const UpdateAchievement = () => {
  const route = useRoute();
  const {achievementData} = route.params || '';

  const [form, setForm] = useState({
    achievement: achievementData?.achievement || '',
  });

  const [resumeId, setResumeId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const {theme} = useTheme()
  const styles = getStyle(theme)

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
      const existingResumes = await getResumesFromStorage();
      const resumeIndex = findResumeIndex(existingResumes, resumeId);

      if (resumeIndex !== -1) {
        const achievementIndex = existingResumes[
          resumeIndex
        ].profile.achievements.findIndex(
          achievements => achievements._id === achievementData._id,
        );
        if (achievementIndex !== -1) {
          existingResumes[resumeIndex].profile.achievements[achievementIndex] =
            {
              ...existingResumes[resumeIndex].profile.achievements[
                achievementIndex
              ],
              achievement: form.achievement,
            };

          await AsyncStorage.setItem(
            'resumes',
            JSON.stringify(existingResumes),
          );
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Achievement updated successfully',
            position: 'bottom',
          });

          navigation.navigate('Achievements');
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Achievement entry not found',
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
      console.error('Error updating achievement:', error);
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
        <Header title="Update Achievement" headerIcon={Images.leftArrowIcon} onPress={()=>{
          navigation.goBack();
        }}/>
        <View style={styles.inputContainer}>
          <CustomTextInput
            label="Achievement"
            value={form.achievement}
            onChangeText={text => handleInputChange('achievement', text)}
            errorMessage={errors.achievement}
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

export default UpdateAchievement;
