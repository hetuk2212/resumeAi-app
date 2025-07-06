import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {
  findResumeIndex,
  getResumesFromStorage,
} from '../../../../../lib/asyncStorageUtils';
import {Images} from '../../../../Assets/Images';
import ActionButtons from '../../../../Components/ActionButtons';
import CustomTextInput from '../../../../Components/TextInput';
import getStyle from '../style';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../../Components/Header/Index';
import {useTheme} from '../../../../Theme/ ThemeContext';

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

  const {theme} = useTheme();
  const styles = getStyle(theme);

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
        const projectIndex = existingResumes[
          resumeIndex
        ].profile.projects.findIndex(
          projects => projects._id === projectData._id,
        );
        if (projectIndex !== -1) {
          existingResumes[resumeIndex].profile.projects[projectIndex] = {
            ...existingResumes[resumeIndex].profile.projects[projectIndex],
            title: form.title,
            description: form.description,
          };

          await AsyncStorage.setItem(
            'resumes',
            JSON.stringify(existingResumes),
          );

          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Project updated successfully',
            position: 'bottom',
          });

          navigation.navigate('Projects');
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Project entry not found',
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
      console.error('Error updating Project:', error);
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
      <StatusBar
        backgroundColor={theme.white}
        barStyle={theme.statusBarStyle}
        translucent={false}
      />
      <View style={styles.container}>
        <Header
          title="Update Project"
          headerIcon={Images.leftArrowIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />
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
