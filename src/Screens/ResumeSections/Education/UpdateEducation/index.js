import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../style';
import CustomTextInput from '../../../../Components/TextInput';
import ActionButtons from '../../../../Components/ActionButtons';
import {Images} from '../../../../Assets/Images';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {updateEducation} from '../../../../../lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateEducation = () => {
  const route = useRoute();
  const {educationData} = route.params || {};

  const [form, setForm] = useState({
    course: educationData?.course || '',
    university: educationData?.university || '',
    grade: educationData?.grade || '',
    startYear: educationData?.startYear?.toString() || '',
    endYear: educationData?.endYear?.toString() || '',
  });

  const [resumeId, setResumeId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const getResumeId = async () => {
      try {
        const id = await AsyncStorage.getItem('profileId');
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
      const response = await updateEducation({
        resumeId,
        educationId: educationData._id,
        data: {
          course: form.course,
          university: form.university,
          grade: form.grade,
          startYear: Number(form.startYear),
          endYear: Number(form.endYear),
        },
      });

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response.data.message || 'Education updated successfully',
          position: 'bottom',
        });

        navigation.navigate('Education');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Unexpected response from server',
          position: 'bottom',
        });
      }
    } catch (error) {
      console.log('Error response:', error.response?.data);

      if (error.response?.status === 400 && error.response?.data?.errors) {
        let errorObj = {};
        error.response.data.errors.forEach(err => {
          errorObj[err.path] = err.msg;
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
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <View style={styles.createNew}>
          <Text style={styles.title}>Update Education</Text>
        </View>
        <View style={styles.inputContainer}>
          <CustomTextInput
            label="Course / Degree"
            value={form.course}
            onChangeText={text => handleInputChange('course', text)}
            errorMessage={errors.course}
          />
          <CustomTextInput
            label="University"
            value={form.university}
            onChangeText={text => handleInputChange('university', text)}
            errorMessage={errors.university}
          />
          <CustomTextInput
            label="Grade"
            value={form.grade}
            onChangeText={text => handleInputChange('grade', text)}
            errorMessage={errors.grade}
          />
          <CustomTextInput
            label="Start Year"
            keyboardType="numeric"
            value={form.startYear}
            onChangeText={text => handleInputChange('startYear', text)}
            errorMessage={errors.startYear}
          />
          <CustomTextInput
            label="End Year"
            keyboardType="numeric"
            value={form.endYear}
            onChangeText={text => handleInputChange('endYear', text)}
            errorMessage={errors.endYear}
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

export default UpdateEducation;
