import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import CustomTextInput from '../../../../Components/TextInput';
import ActionButtons from '../../../../Components/ActionButtons';
import {Images} from '../../../../Assets/Images';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateLanguage} from '../../../../../lib/api';
import {
  findResumeIndex,
  getResumesFromStorage,
} from '../../../../../lib/asyncStorageUtils';

const UpdateLanguage = () => {
  const route = useRoute();
  const {languageData} = route.params || '';

  const [form, setForm] = useState({
    language: languageData?.language || '',
    rating: languageData?.rating || 0,
  });

  const [resumeId, setResumeId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

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
        const languageIndex = existingResumes[
          resumeIndex
        ].profile.languages.findIndex(
          languages => languages._id === languageData._id,
        );
        if (languageIndex !== -1) {
          existingResumes[resumeIndex].profile.languages[languageIndex] = {
            ...existingResumes[resumeIndex].profile.languages[languageIndex],
            language: form.language,
            rating: form.rating,
          };

          await AsyncStorage.setItem(
            'resumes',
            JSON.stringify(existingResumes),
          );
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Language updated successfully',
            position: 'bottom',
          });

          navigation.navigate('Languages');
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Languages entry not found',
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
      console.error('Error updating Language:', error);
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
        <View style={styles.createNew}>
          <Text style={styles.title}>Update Language</Text>
        </View>
        <View style={styles.inputContainer}>
          <CustomTextInput
            label="Language"
            value={form.language}
            onChangeText={text => handleInputChange('language', text)}
            errorMessage={errors.language}
          />
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Rating:</Text>
            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map(level => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.ratingCircle,
                    form.rating === level && styles.ratingCircleActive,
                  ]}
                  onPress={() => handleInputChange('rating', level)}>
                  <Text style={styles.ratingText}>{level}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
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

export default UpdateLanguage;
