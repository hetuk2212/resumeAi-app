import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {addEducation} from '../../../../../lib/api';
import TabSwitcher from '../../../../Components/TabSwitcher';
import ActionButtons from '../../../../Components/ActionButtons';
import {Images} from '../../../../Assets/Images';
import CustomTextInput from '../../../../Components/TextInput';

const AddEducation = () => {
  const [activeTab, setActiveTab] = useState('Education');
  const [educationForms, setEducationForms] = useState([
    {
      id: Date.now(),
      course: '',
      school: '',
      grade: '',
      startYear: '',
      endYear: '',
    },
  ]);
  const [resumeId, setResumeId] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();
  console.log('ds', resumeId);

  useEffect(() => {
    const getResumeId = async () => {
      try {
        const id = await AsyncStorage.getItem('resumeId');
        if (id !== null) {
          setResumeId(id);
          console.log('Resume ID:', id);
        } else {
          console.log('No resume ID found');
        }
      } catch (error) {
        console.log('Error fetching resume ID:', error);
      }
    };

    getResumeId();
  }, []);

  // Add new education form
  const handleAdd = () => {
    const newForm = {
      id: Date.now(),
      course: '',
      school: '',
      grade: '',
      startYear: '',
      endYear: '',
    };
    setEducationForms(prevForms => {
      const updatedForms = [...prevForms, newForm];
      return updatedForms;
    });
  };

  // Handle input changes
  const handleInputChange = (id, field, value) => {
    setEducationForms(prevForms => {
      const updatedForms = prevForms.map(form =>
        form.id === id ? {...form, [field]: value} : form,
      );
      return updatedForms;
    });
  };

  // Delete a form
  const handleDelete = id => {
    setEducationForms(prevForms => {
      const updatedForms = prevForms.filter(form => form.id !== id);
      return updatedForms;
    });
  };

  // Add education api
  const handleSave = async () => {
    setIsLoading(true);
    setErrors({});

    let hasErrors = false;
    const newErrors = {};

    educationForms.forEach((form, index) => {
      if (!form.course) {
        newErrors[`${index}_course`] = 'Course is required';
        hasErrors = true;
      }
      if (!form.school) {
        newErrors[`${index}_university`] = 'School/University is required';
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

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
        const formattedEducation = educationForms.map(form => ({
          course: form.course,
          university: form.school,
          grade: form.grade,
          startYear: form.startYear ? parseInt(form.startYear, 10) : null,
          endYear: form.endYear ? parseInt(form.endYear, 10) : null,
          isOngoing: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          _id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        }));

        const updatedResumes = JSON.parse(JSON.stringify(existingResumes));

        updatedResumes[resumeIndex].profile = {
          ...updatedResumes[resumeIndex].profile,
          education: [
            ...(updatedResumes[resumeIndex].profile.education || []),
            ...formattedEducation,
          ],
        };

        updatedResumes[resumeIndex].updatedAt = new Date().toISOString();

        await AsyncStorage.setItem('resumes', JSON.stringify(updatedResumes));

        console.log(
          'Successfully saved education:',
          updatedResumes[resumeIndex],
        );

        Toast.show({
          type: 'success',
          text1: 'Education saved!',
          text2: 'Your education details have been saved successfully.',
          position: 'bottom',
        });

        setTimeout(() => {
          navigation.navigate('Education');
        }, 1500);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `Resume with ID ${resumeId} not found in local storage`,
        });
      }
    } catch (error) {
      console.error('Error saving education:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to save education details',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <TabSwitcher
          tabs={[
            {key: 'Education', label: 'Education'},
            {key: 'Example', label: 'Example'},
          ]}
          value={activeTab}
          onTabChange={tabKey => setActiveTab(tabKey)}
        />

        {activeTab === 'Education' && (
          <ScrollView
            contentContainerStyle={{paddingBottom: 100}}
            showsVerticalScrollIndicator={false}>
            {educationForms.map((form, index) => (
              <View key={form.id} style={styles.formBox}>
                <View style={styles.titleView}>
                  <Text style={styles.title}>Education {index + 1}</Text>
                  <TouchableOpacity onPress={() => handleDelete(form.id)}>
                    <Image
                      source={Images.delete}
                      style={styles.educationIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.formDetails}>
                  <CustomTextInput
                    label="Course / Degree"
                    value={form.course}
                    onChangeText={text =>
                      handleInputChange(form.id, 'course', text)
                    }
                    errorMessage={errors[`${index}_course`]}
                  />

                  <CustomTextInput
                    label="School / University"
                    value={form.school}
                    onChangeText={text =>
                      handleInputChange(form.id, 'school', text)
                    }
                    errorMessage={errors[`${index}_university`]} // ✅ backend sends "university"
                  />

                  <CustomTextInput
                    label="Grade / Score"
                    value={form.grade}
                    onChangeText={text =>
                      handleInputChange(form.id, 'grade', text)
                    }
                    errorMessage={errors[`${index}_grade`]}
                  />

                  <CustomTextInput
                    label="Start Year"
                    value={form.startYear}
                    onChangeText={text =>
                      handleInputChange(form.id, 'startYear', text)
                    }
                    errorMessage={errors[`${index}_startYear`]}
                  />

                  <CustomTextInput
                    label="End Year"
                    value={form.endYear}
                    onChangeText={text =>
                      handleInputChange(form.id, 'endYear', text)
                    }
                    errorMessage={errors[`${index}_endYear`]}
                  />
                </View>
              </View>
            ))}
            <ActionButtons
              onAdd={handleAdd}
              onSave={handleSave}
              addIcon={Images.add}
              saveIcon={Images.check}
              loading={loading}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddEducation;
