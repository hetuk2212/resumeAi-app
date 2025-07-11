import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import getStyles from './style';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import TabSwitcher from '../../../../Components/TabSwitcher';
import ActionButtons from '../../../../Components/ActionButtons';
import {Images} from '../../../../Assets/Images';
import CustomTextInput from '../../../../Components/TextInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTheme} from '../../../../Theme/ ThemeContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../../Components/Header/Index';
import InputText from '../../../../Components/InputDesc/Index';
const AddExperience = () => {
  const [activeTab, setActiveTab] = useState('Experience');
  const [experienceForms, setExperienceForms] = useState([
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
  const [datePickerVisible, setDatePickerVisible] = useState({});
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const showDatePicker = (formId, field) => {
    setDatePickerVisible({[`${formId}_${field}`]: true});
  };

  const handleDateChange = (event, selectedDate, formId, field) => {
    setDatePickerVisible({});
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      handleInputChange(formId, field, formattedDate);
    }
  };

  const navigation = useNavigation();

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

  // Add new experience form
  const handleAdd = () => {
    const newForm = {
      id: Date.now(),
      company: '',
      location: '',
      position: '',
      startDate: '',
      endDate: '',
      details: '',
    };
    setExperienceForms(prevForms => {
      const updatedForms = [...prevForms, newForm];
      return updatedForms;
    });
  };

  // Handle input changes
  const handleInputChange = (id, field, value) => {
    setExperienceForms(prevForms => {
      const updatedForms = prevForms.map(form =>
        form.id === id ? {...form, [field]: value} : form,
      );
      return updatedForms;
    });
  };

  // Delete a form
  const handleDelete = id => {
    setExperienceForms(prevForms => {
      const updatedForms = prevForms.filter(form => form.id !== id);
      return updatedForms;
    });
  };

  // Handle Save (log form values)
  // const handleSave = () => {
  //   console.log(
  //     'Submitted Experience Data:',
  //     JSON.stringify(experienceForms, null, 2),
  //   );
  //   navigation.navigate('Choose Resume');
  // };

  // Add experience api

  const handleSave = async () => {
    setIsLoading(true);
    setErrors({});

    let hasErrors = false;
    const newErrors = {};

    experienceForms.forEach((form, index) => {
      if (!form.company) {
        newErrors[`${index}_company`] = 'Company is required';
        hasErrors = true;
      }
      if (!form.location) {
        newErrors[`${index}_location`] = 'Location is required';
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
        console.log('Resumes data is not an array:', existingResumes);
        existingResumes = [];
      }

      const resumeIndex = existingResumes.findIndex(
        r => r.profile?._id === resumeId,
      );

      if (resumeIndex !== -1) {
        const formattedExperience = experienceForms.map(form => ({
          company: form.company || '',
          location: form.location || '',
          position: form.position || '',
          startDate: form.startDate || '',
          endDate: form.endDate || '',
          description: form.details,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          _id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        }));

        const updatedResumes = JSON.parse(JSON.stringify(existingResumes));

        updatedResumes[resumeIndex].profile = {
          ...updatedResumes[resumeIndex].profile,
          experience: [
            ...(updatedResumes[resumeIndex].profile.experience || []),
            ...formattedExperience,
          ],
        };

        updatedResumes[resumeIndex].updatedAt = new Date().toISOString();

        await AsyncStorage.setItem('resumes', JSON.stringify(updatedResumes));

        Toast.show({
          type: 'success',
          text1: 'Experience saved!',
          text2: 'Your experience details have been saved successfully.',
          position: 'bottom',
        });

        setTimeout(() => {
          navigation.navigate('Experience');
        }, 1500);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Unexpected Error',
          text2: 'Something went wrong, please try again.',
        });
      }
    } catch (error) {
      console.error('Error saving experience:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to save experience details',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <StatusBar
        backgroundColor={theme.white}
        barStyle={theme.statusBarStyle}
        translucent={false}
      />
      <View style={styles.container}>
        <Header
          title="Add Experience"
          headerIcon={Images.leftArrowIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />

        {activeTab === 'Experience' && (
          <ScrollView
            contentContainerStyle={{paddingBottom: 100}}
            showsVerticalScrollIndicator={false}>
            {experienceForms.map((form, index) => (
              <View key={form.id} style={styles.formBox}>
                <View style={styles.titleView}>
                  <Text style={styles.title}>Experience {index + 1}</Text>
                  <TouchableOpacity onPress={() => handleDelete(form.id)}>
                    <Image
                      source={Images.delete}
                      style={styles.educationIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.formDetails}>
                  <View>
                    <CustomTextInput
                      label="Job Title"
                      value={form.position}
                      onChangeText={text =>
                        handleInputChange(form.id, 'position', text)
                      }
                      errorMessage={errors[`${index}_position`]}
                    />
                    <InputText InputText="Examples: Salesperson, Software Developer, Project Manager." />
                  </View>
                  <CustomTextInput
                    label="Company Name"
                    value={form.company}
                    onChangeText={text =>
                      handleInputChange(form.id, 'company', text)
                    }
                    errorMessage={errors[`${index}_company`]}
                  />
                  <View>
                    <CustomTextInput
                    label="Workplace Location"
                    value={form.location}
                    onChangeText={text =>
                      handleInputChange(form.id, 'location', text)
                    }
                    errorMessage={errors[`${index}_location`]}
                  />
                  <Text>Examples: New York - NY, Online.</Text>
                  </View>
                  <View style={styles.dateView}>
                    <View style={styles.dateBox}>
                      <TouchableOpacity
                        onPress={() => showDatePicker(form.id, 'startDate')}
                        activeOpacity={1}>
                        <CustomTextInput
                          label="Start Date"
                          value={form.startDate}
                          editable={false}
                          pointerEvents="none"
                          errorMessage={errors[`${index}_startDate`]}
                        />
                      </TouchableOpacity>

                      {datePickerVisible[`${form.id}_startDate`] && (
                        <DateTimePicker
                          mode="date"
                          display="default"
                          value={
                            form.startDate
                              ? new Date(form.startDate)
                              : new Date()
                          }
                          onChange={(e, date) =>
                            handleDateChange(e, date, form.id, 'startDate')
                          }
                        />
                      )}
                    </View>

                    <View style={styles.dateBox}>
                      <TouchableOpacity
                        onPress={() => showDatePicker(form.id, 'endDate')}
                        activeOpacity={1}>
                        <CustomTextInput
                          label="End Date"
                          value={form.endDate}
                          editable={false}
                          pointerEvents="none" // disables internal touch
                          errorMessage={errors[`${index}_endDate`]}
                        />
                      </TouchableOpacity>

                      {datePickerVisible[`${form.id}_endDate`] && (
                        <DateTimePicker
                          mode="date"
                          display="default"
                          value={
                            form.endDate ? new Date(form.endDate) : new Date()
                          }
                          onChange={(e, date) =>
                            handleDateChange(e, date, form.id, 'endDate')
                          }
                        />
                      )}
                    </View>
                  </View>

                  <View>
                    <CustomTextInput
                    label="Description"
                    value={form.details}
                    onChangeText={text =>
                      handleInputChange(form.id, 'details', text)
                    }
                    errorMessage={errors[`${index}_details`]}
                  />
                  <Text>Example: Managed a team of 10 people; Ensured quality and safety of provided services, Budgeting.</Text>
                  </View>
                </View>
              </View>
            ))}
            <ActionButtons
              onAdd={handleAdd}
              onSave={handleSave}
              addIcon={Images.add}
              saveIcon={Images.check}
              isLoading={loading}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddExperience;
