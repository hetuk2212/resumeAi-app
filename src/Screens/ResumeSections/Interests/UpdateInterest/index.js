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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../../Theme/ ThemeContext';
import Header from '../../../../Components/Header/Index';

const UpdateInterest = () => {
  const route = useRoute();
  const {interestData} = route.params || '';
  console.log(interestData);

  const [form, setForm] = useState({
    interest: interestData?.interest || '',
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
        const interestIndex = existingResumes[
          resumeIndex
        ].profile.interests.findIndex(
          interests => interests._id === interestData._id,
        );
        if (interestIndex !== -1) {
          existingResumes[resumeIndex].profile.interests[interestIndex] = {
            ...existingResumes[resumeIndex].profile.interests[interestIndex],
            interest: form.interest,
          };

          await AsyncStorage.setItem(
            'resumes',
            JSON.stringify(existingResumes),
          );
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Interest updated successfully',
            position: 'bottom',
          });

          navigation.navigate('Interests');
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Interest entry not found',
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
      console.error('Error updating interest:', error);
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
        <Header title="Update Interest" headerIcon={Images.leftArrowIcon} onPress={()=>{
          navigation.goBack()
        }}/>
        <View style={styles.inputContainer}>
          <CustomTextInput
            label="Interest"
            value={form.interest}
            onChangeText={text => handleInputChange('interest', text)}
            errorMessage={errors.interest}
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

export default UpdateInterest;
