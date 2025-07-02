import {View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../../../../Components/TextInput';
import ActionButtons from '../../../../Components/ActionButtons';
import {Images} from '../../../../Assets/Images';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import getStyles from './style';
import dayjs from 'dayjs';
import {
  findResumeIndex,
  getResumesFromStorage,
} from '../../../../../lib/asyncStorageUtils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../../Theme/ ThemeContext';
import Header from '../../../../Components/Header/Index';

const UpdateExperience = () => {
  const route = useRoute();
  const {experienceData} = route.params || {};

  const [form, setForm] = useState({
    company: experienceData?.company || '',
    location: experienceData?.location || '',
    position: experienceData?.position || '',
    startDate: experienceData?.startDate || '',
    endDate: experienceData?.endDate || '',
    details: experienceData?.description || '',
  });

  const [resumeId, setResumeId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState({});
  const showDatePicker = field => {
    setDatePickerVisible({[field]: true});
  };

  const handleDateChange = (event, selectedDate, field) => {
    setDatePickerVisible({});
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      handleInputChange(field, formattedDate);
    }
  };

  const navigation = useNavigation();

  const {theme} = useTheme();
  const styles = getStyles(theme);

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
        const experienceIndex = existingResumes[
          resumeIndex
        ].profile.experience.findIndex(
          experience => experience._id === experienceData._id,
        );

        if (experienceIndex !== -1) {
          existingResumes[resumeIndex].profile.experience[experienceIndex] = {
            ...existingResumes[resumeIndex].profile.experience[experienceIndex],
            company: form.company,
            location: form.location,
            position: form.position,
            startDate: form.startDate
              ? dayjs(form.startDate).format('YYYY-MM-DD')
              : '',
            endDate: form.endDate
              ? dayjs(form.endDate).format('YYYY-MM-DD')
              : '',
            description: form.details,
          };

          await AsyncStorage.setItem(
            'resumes',
            JSON.stringify(existingResumes),
          );

          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Experience updated successfully',
            position: 'bottom',
          });

          navigation.navigate('Experience');
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Experience entry not found',
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
      console.error('Error updating Experience:', error);
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
        <Header title="Update Experience" headerIcon={Images.leftArrowIcon} onPress={()=>{
          navigation.goBack()
        }}/>
        <View style={styles.inputContainer}>
          <CustomTextInput
            label="Company Name"
            value={form.company}
            onChangeText={text => handleInputChange('company', text)}
            errorMessage={errors.company}
          />
          <CustomTextInput
            label="Location"
            value={form.location}
            onChangeText={text => handleInputChange('location', text)}
            errorMessage={errors.location}
          />
          <CustomTextInput
            label="Job Title"
            value={form.position}
            onChangeText={text => handleInputChange('position', text)}
            errorMessage={errors.position}
          />
          <View style={styles.dateView}>
            <View style={styles.dateBox}>
              <TouchableOpacity
                onPress={() => showDatePicker('startDate')}
                activeOpacity={1}>
                <CustomTextInput
                  label="Start Date"
                  value={
                    form.startDate
                      ? dayjs(form.startDate).format('YYYY-MM-DD')
                      : ''
                  }
                  editable={false}
                  pointerEvents="none"
                  errorMessage={errors.startDate}
                />
              </TouchableOpacity>

              {datePickerVisible['startDate'] && (
                <DateTimePicker
                  mode="date"
                  display="default"
                  value={form.startDate ? new Date(form.startDate) : new Date()}
                  onChange={(e, date) => handleDateChange(e, date, 'startDate')}
                />
              )}
            </View>

            <View style={styles.dateBox}>
              <TouchableOpacity
                onPress={() => showDatePicker('endDate')}
                activeOpacity={1}>
                <CustomTextInput
                  label="End Date"
                  value={
                    form.endDate ? dayjs(form.endDate).format('YYYY-MM-DD') : ''
                  }
                  editable={false}
                  pointerEvents="none"
                  errorMessage={errors.startDate}
                />
              </TouchableOpacity>

              {datePickerVisible['endDate'] && (
                <DateTimePicker
                  mode="date"
                  display="default"
                  value={form.endDate ? new Date(form.endDate) : new Date()}
                  onChange={(e, date) => handleDateChange(e, date, 'endDate')}
                />
              )}
            </View>
          </View>
          <CustomTextInput
            label="Details"
            keyboardType="details"
            value={form.details}
            onChangeText={text => handleInputChange('details', text)}
            errorMessage={errors.description}
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

export default UpdateExperience;
