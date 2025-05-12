import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView, Keyboard, ActivityIndicator} from 'react-native';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import TabSwitcher from '../../../Components/TabSwitcher';
import {Images} from '../../../Assets/Images';
import CustomTextInput from '../../../Components/TextInput';
import {addObjective, getObjective} from '../../../../lib/api';
import ActionButtons from '../../../Components/ActionButtons';

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

  // Fetch resume ID and existing objective on component mount
  useEffect(() => {
    const fetchResumeData = async () => {
      setIsLoading(true);
      try {
        const id = await AsyncStorage.getItem('profileId');
        if (id) {
          setResumeId(id);
          // Fetch existing objective
          try {
            const response = await getObjective({resumeId: id});
            console.log(response);
            
            if (response?.data?.objective?.statement) {
              setFormData({
                objective: response.data.objective.statement,
              });
            }
          } catch (error) {
            // Handle 404 or other errors when fetching objective
            if (error.response?.status !== 404) {
              console.error('Error fetching objective:', error);
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to load objective. Please try again.',
              });
            }
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
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
    // Clear error when user starts typing
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
      const response = await addObjective({
        resumeId,
        body: {
          statement: formData.objective.trim()
        }
      });
      
      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Objective saved successfully!',
          position: 'bottom',
        });
        navigation.goBack();
      }
    } catch (error) {
      console.error('Save Objective Error:', error);
      
      if (error.response?.status === 400 && error.response?.data?.errors) {
        const serverErrors = {};
        error.response.data.errors.forEach(err => {
          if (err.path.includes('statement')) {
            serverErrors.objective = err.msg;
          }
        });
        setErrors(serverErrors);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.response?.data?.message || 'Failed to save objective. Please try again.',
        });
      }
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
              mobile app development seeking to leverage my expertise in React Native 
              and problem-solving skills at XYZ Company. Passionate about creating 
              efficient, user-friendly applications and collaborating with 
              cross-functional teams to deliver high-quality products."
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Objective;