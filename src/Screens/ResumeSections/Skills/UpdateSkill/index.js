import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import CustomTextInput from '../../../../Components/TextInput';
import ActionButtons from '../../../../Components/ActionButtons';
import {Images} from '../../../../Assets/Images';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateSkill } from '../../../../../lib/api';

const UpdateSkill = () => {
  const route = useRoute();
  const {skillData} = route.params || '';

  const [form, setForm] = useState({
    skill: skillData?.skillName || '',
    rating: skillData?.rating || 0,
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
      const response = await updateSkill({
        resumeId,
        skillId: skillData._id,
        data: {
          skillName: form.skill,
          rating: form.rating,
        },
      });

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response.data.message || 'Skill updated successfully',
          position: 'bottom',
        });

        navigation.navigate('Skills');
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
          <Text style={styles.title}>Update Skill</Text>
        </View>
        <View style={styles.inputContainer}>
          <CustomTextInput
            label="Skill"
            value={form.skill}
            onChangeText={text => handleInputChange('skill', text)}
            errorMessage={errors.skill}
          />
          <View style={styles.ratingContainer}>
  <Text style={styles.ratingLabel}>Rating:</Text>
  <View style={styles.ratingRow}>
    {[1, 2, 3, 4, 5].map(level => (
      <TouchableOpacity
        key={level}
        style={[
          styles.ratingCircle,
          form.rating === level && styles.ratingCircleActive,
        ]}
        onPress={() => handleInputChange('rating', level)}
      >
        <Text style={styles.ratingText}>{level}</Text>
      </TouchableOpacity>
    ))}
  </View>
</View>

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

export default UpdateSkill;
