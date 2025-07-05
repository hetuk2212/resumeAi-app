import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../../../../Components/TextInput';
import ActionButtons from '../../../../Components/ActionButtons';
import {Images} from '../../../../Assets/Images';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getResumesFromStorage,
  findResumeIndex,
} from '../../../../../lib/asyncStorageUtils';
import { useTheme } from '../../../../Theme/ ThemeContext';
import getStyles from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../../Components/Header/Index';

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
    if (!form.skill.trim()) {
      setErrors({skill: 'Skill name is required'});
      return;
    }
    setLoading(true);

    try {
      const existingResumes = await getResumesFromStorage();
      const resumeIndex = findResumeIndex(existingResumes, resumeId);

      if (resumeIndex !== 1) {
        const skillIndex = existingResumes[
          resumeIndex
        ].profile.skills.findIndex(skills => skills._id === skillData._id);
        if (skillIndex !== -1) {
          existingResumes[resumeIndex].profile.skills[skillIndex] = {
            ...existingResumes[resumeIndex].profile.skills[skillIndex],
            skillName: form.skill,
            rating: form.rating,
          };

          await AsyncStorage.setItem(
            'resumes',
            JSON.stringify(existingResumes),
          );

          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Skills updated successfully',
            position: 'bottom',
          });

          navigation.navigate('Skills');
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Skills entry not found',
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
      console.error('Error updating Skills:', error);
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
        <Header title="Update Skill" headerIcon={Images.leftArrowIcon} onPress={()=>{
          navigation.goBack()
        }} />
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
                  onPress={() => handleInputChange('rating', level)}>
                  <Text style={[styles.ratingText,{color: form.rating === level && '#ffffff'}]}>{level}</Text>
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
