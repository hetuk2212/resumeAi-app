import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import getStyles from './style';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {Images} from '../../../Assets/Images';
import CustomTextInput from '../../../Components/TextInput';
import ActionButtons from '../../../Components/ActionButtons';
import {
  findResumeIndex,
  getResumesFromStorage,
} from '../../../../lib/asyncStorageUtils';
import {useTheme} from '../../../Theme/ ThemeContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../Components/Header/Index';
import InputText from '../../../Components/InputDesc/Index';

const Objective = () => {
  const [activeTab, setActiveTab] = useState('Objective');
  const [formData, setFormData] = useState({
    objective: '',
  });
  const [resumeId, setResumeId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const {theme} = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    const fetchResumeData = async () => {
      setIsLoading(true);
      try {
        const id = await AsyncStorage.getItem('resumeId');
        if (id) {
          setResumeId(id);
          // Fetch existing profile data
          const existingResumes = await getResumesFromStorage();
          const resumeIndex = findResumeIndex(existingResumes, resumeId);

          if (
            resumeIndex !== -1 &&
            existingResumes[resumeIndex].profile.objective.statement
          ) {
            setFormData({
              objective:
                existingResumes[resumeIndex].profile.objective.statement,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching resume data:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to load resume data. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumeData();
  }, [resumeId]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: ''}));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.objective.trim()) {
      newErrors.objective = 'Objective is required';
    } else if (formData.objective.length < 20) {
      newErrors.objective = 'Objective should be at least 20 characters';
    } else if (formData.objective.length > 500) {
      newErrors.objective = 'Objective should not exceed 500 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    Keyboard.dismiss();
    if (!validateForm()) return;
    if (!resumeId) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No resume found. Please create a resume first.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const existingResumes = await getResumesFromStorage();
      const resumeIndex = findResumeIndex(existingResumes, resumeId);

      if (resumeIndex !== -1) {
        existingResumes[resumeIndex].profile.objective = {
          statement: formData.objective.trim(),
        };

        await AsyncStorage.setItem('resumes', JSON.stringify(existingResumes));

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Objective saved successfully!',
          position: 'bottom',
        });

        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Resume not found.',
        });
      }
    } catch (error) {
      console.error('Save Objective Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to save objective. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeView}>
      <StatusBar
        backgroundColor={theme.white}
        barStyle={theme.statusBarStyle}
        translucent={false}
      />
      <View style={styles.container}>
        <Header
          title="Objective"
          headerIcon={Images.leftArrowIcon}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <InputText InputText="In this section, it's important to be clear and concise, highlighting your career goals and how they align with the company and position you're applying for." />

          <View style={styles.formBox}>
            <View style={styles.formDetails}>
              <CustomTextInput
                label="Objective"
                placeholder="Describe your career goals and what you bring to the table"
                value={formData.objective}
                onChangeText={text => handleInputChange('objective', text)}
                errorMessage={errors.objective}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                maxLength={500}
              />
              <Text style={styles.charCounter}>
                {formData.objective.length}/500 characters
              </Text>
              <InputText InputText="Looking for a position as an Administrative Assistant to apply my oraganization and communication skills, contributing to the operational efficiency and administrative suppport of the team." />
            </View>
          </View>

          <ActionButtons
            onSave={handleSave}
            saveIcon={Images.check}
            hideAdd
            loading={isSubmitting}
            saveLabel="Save Objective"
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Objective;
