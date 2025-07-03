import {View, Text, SafeAreaView} from 'react-native';
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
import Header from '../../../../Components/Header/Index';

const UpdateActivity = () => {
  const route = useRoute();
  const {activityData} = route.params || '';
  console.log(activityData);

  const [form, setForm] = useState({
    activity: activityData?.activity || '',
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

      if (resumeIndex !== 1) {
        const activityIndex = existingResumes[
          resumeIndex
        ].profile.activites.findIndex(
          activites => activites._id === activityData._id,
        );
        if (activityIndex !== -1) {
          existingResumes[resumeIndex].profile.activites[activityIndex] = {
            ...existingResumes[resumeIndex].profile.activites[activityIndex],
            activity: form.activity,
          };

          await AsyncStorage.setItem(
            'resumes',
            JSON.stringify(existingResumes),
          );
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Activity updated successfully',
            position: 'bottom',
          });

          navigation.navigate('Activities');
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Activity entry not found',
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
      console.error('Error updating Activity:', error);
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
        <Header title="Update Activity" headerIcon={Images.leftArrowIcon} onPress={()=>{
          navigation.goBack();
        }}/>
        <View style={styles.inputContainer}>
          <CustomTextInput
            label="Activity"
            value={form.activity}
            onChangeText={text => handleInputChange('activity', text)}
            errorMessage={errors.activity}
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

export default UpdateActivity;
