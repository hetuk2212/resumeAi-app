import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import TabSwitcher from '../../../Components/TabSwitcher';
import {Images} from '../../../Assets/Images';
import CustomTextInput from '../../../Components/TextInput';
import ActionButtons from '../../../Components/ActionButtons';
import {
  findResumeIndex,
  getResumesFromStorage,
} from '../../../../lib/asyncStorageUtils';

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
      <View style={styles.container}>
        <TabSwitcher
          tabs={[
            {key: 'Objective', label: 'Objective'},
            {key: 'Example', label: 'Example'},
          ]}
          value={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === 'Objective' ? (
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.formBox}>
              <View style={styles.titleView}>
                <Text style={styles.title}>Objective</Text>
              </View>
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
        ) : (
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Good Objective Example:</Text>
            <Text style={styles.exampleText}>
              "Detail-oriented software engineer with 5+ years of experience in
              mobile app development seeking to leverage my expertise in React
              Native and problem-solving skills at XYZ Company. Passionate about
              creating efficient, user-friendly applications and collaborating
              with cross-functional teams to deliver high-quality products."
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Objective;
