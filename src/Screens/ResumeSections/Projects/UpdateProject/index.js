import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../style';
import CustomTextInput from '../../../../Components/TextInput';
import ActionButtons from '../../../../Components/ActionButtons';
import {Images} from '../../../../Assets/Images';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {updateProject} from '../../../../../lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateProject = () => {
  const route = useRoute();
  const {projectData} = route.params || {};

  const [form, setForm] = useState({
    title: projectData?.title || '',
    description: projectData?.description || '',
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
      const response = await updateProject({
        resumeId,
        projectId: projectData._id,
        data: {
          title: form.title,
          description: form.university,
        },
      });

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response.data.message || 'Project updated successfully',
          position: 'bottom',
        });

        navigation.navigate('Projects');
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
          <Text style={styles.title}>Update Project</Text>
        </View>
        <View style={styles.inputContainer}>
          <CustomTextInput
            label="Project Name"
            value={form.title}
            onChangeText={text => handleInputChange('title', text)}
            errorMessage={errors.title}
          />
          <CustomTextInput
            label="Project Details"
            value={form.description}
            onChangeText={text => handleInputChange('description', text)}
            errorMessage={errors.description}
            multiline={true}
            numberOfLines={4}
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

export default UpdateProject;
