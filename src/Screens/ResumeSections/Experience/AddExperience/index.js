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
import TabSwitcher from '../../../../Components/TabSwitcher';
import ActionButtons from '../../../../Components/ActionButtons';
import {Images} from '../../../../Assets/Images';
import CustomTextInput from '../../../../Components/TextInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addExperience } from '../../../../../lib/api';
const AddExperience = () => {
  const [activeTab, setActiveTab] = useState('Experience');
  const [experienceForms, setExperienceForms] = useState([]);
  const [resumeId, setResumeId] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [datePickerVisible, setDatePickerVisible] = useState({}); // { [formId_field]: true }
  const [selectedDates, setSelectedDates] = useState({});

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
        const id = await AsyncStorage.getItem('profileId');
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

    const formattedExperience = experienceForms.map(form => ({
      company: form.company || '',
      location: form.school || '',
      position: form.position || '',
      startDate: form.startDate || '',
      endDate: form.endDate || '',
      description: form.details
    }));

    const body = {experience: formattedExperience};

    console.log(body);

    try {
      const response = await addExperience({resumeId, body});
      console.log('Response from API:', response);

      if (response.status === 201) {
        navigation.navigate('Experience');

        Toast.show({
          type: 'success',
          text1: response.data.message || 'Experience saved!',
          text2: 'Your experience details have been saved successfully.',
          position: 'bottom',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Unexpected Error',
          text2: 'Something went wrong, please try again.',
        });
      }
    } catch (error) {
      console.log('Error response:', error.response?.data);

      if (error.response?.status === 400 && error.response?.data?.errors) {
        let errorObj = {};
        error.response.data.errors.forEach(err => {
          const match = err.path.match(/experience\[(\d+)\]\.(\w+)/);
          if (match) {
            const [, index, field] = match;
            errorObj[`${index}_${field}`] = err.msg;
          }
        });
        setErrors(errorObj);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2:
            error.response?.data?.message || 'Something went wrong, try again.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <TabSwitcher
          tabs={[
            {key: 'Experience', label: 'Experience'},
            {key: 'Example', label: 'Example'},
          ]}
          onTabChange={tabKey => setActiveTab(tabKey)}
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
                  <CustomTextInput
                    label="Company Name"
                    value={form.company}
                    onChangeText={text =>
                      handleInputChange(form.id, 'company', text)
                    }
                    errorMessage={errors[`${index}_company`]}
                  />
                  <CustomTextInput
                    label="Location"
                    value={form.location}
                    onChangeText={text =>
                      handleInputChange(form.id, 'location', text)
                    }
                    errorMessage={errors[`${index}_location`]}
                  />

                  <CustomTextInput
                    label="Job Title"
                    value={form.position}
                    onChangeText={text =>
                      handleInputChange(form.id, 'position', text)
                    }
                    errorMessage={errors[`${index}_position`]}
                  />

                  <View style={styles.dateView}>
                    <View style={styles.dateBox}>
                      <TouchableOpacity
                        onPress={() => showDatePicker(form.id, 'startDate')}
                        activeOpacity={1}
                      >
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
                            form.startDate ? new Date(form.startDate) : new Date()
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
                        activeOpacity={1}
                      >
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

                  <CustomTextInput
                    label="Details"
                    value={form.details}
                    onChangeText={text =>
                      handleInputChange(form.id, 'details', text)
                    }
                    errorMessage={errors[`${index}_details`]}
                  />
                </View>
              </View>
            ))}
            <ActionButtons
              onAdd={handleAdd}
              onSave={handleSave}
              addIcon={Images.add}
              saveIcon={Images.check}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddExperience;
