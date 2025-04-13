import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../style';
import CustomTextInput from '../../../../Components/TextInput';
import ActionButtons from '../../../../Components/ActionButtons';
import {Images} from '../../../../Assets/Images';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateLanguage} from '../../../../../lib/api';

const UpdateLanguage = () => {
  const route = useRoute();
  const {languageData} = route.params || '';

  const [form, setForm] = useState({
    language: languageData?.language || '',
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
      const response = await updateLanguage({
        resumeId,
        languageId: languageData._id,
        data: {
          language: form.language,
        },
      });

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response.data.message || 'Language updated successfully',
          position: 'bottom',
        });

        navigation.navigate('Languages');
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
          <Text style={styles.title}>Update Language</Text>
        </View>
        <View style={styles.inputContainer}>
          <CustomTextInput
            label="Language"
            value={form.language}
            onChangeText={text => handleInputChange('language', text)}
            errorMessage={errors.language}
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

export default UpdateLanguage;
