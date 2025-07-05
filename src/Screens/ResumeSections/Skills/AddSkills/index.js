import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import ActionButtons from '../../../../Components/ActionButtons';
import {Images} from '../../../../Assets/Images';
import CustomTextInput from '../../../../Components/TextInput';
import {
  findResumeIndex,
  getResumesFromStorage,
} from '../../../../../lib/asyncStorageUtils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../../Theme/ ThemeContext';
import getStyles from './style';
import Header from '../../../../Components/Header/Index';

const AddSkills = () => {
  const [activeTab, setActiveTab] = useState('Skills');
  const [skillsForms, setSkillsForms] = useState([
    {
      id: Date.now(),
      skill: '',
      rating: 0,
    },
  ]);
  const [resumeId, setResumeId] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

  const {theme} = useTheme();
  const styles = getStyles(theme);

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

  // Add new Skills form
  const handleAdd = () => {
    const newForm = {
      id: Date.now(),
      skill: '',
      rating: 0,
    };
    setSkillsForms(prevForms => {
      const updatedForms = [...prevForms, newForm];
      return updatedForms;
    });
  };

  // Handle input changes
  const handleInputChange = (id, field, value) => {
    setSkillsForms(prevForms => {
      const updatedForms = prevForms.map(form =>
        form.id === id ? {...form, [field]: value} : form,
      );
      return updatedForms;
    });
  };

  // Delete a form
  const handleDelete = id => {
    setSkillsForms(prevForms => {
      const updatedForms = prevForms.filter(form => form.id !== id);
      return updatedForms;
    });
  };

  // Handle Save (log form values)
  // const handleSave = () => {
  //   console.log(
  //     'Submitted Skills Data:',
  //     JSON.stringify(SkillsForms, null, 2),
  //   );
  //   navigation.navigate('Choose Resume');
  // };

  // Add Skills api

  const handleSave = async () => {
    setIsLoading(true);
    setErrors({});

    // First validate locally before making API call
    const localErrors = {};
    skillsForms.forEach((form, index) => {
      if (!form.skill.trim()) {
        localErrors[`${index}_skill`] = 'Skill name is required';
      }
    });

    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      setIsLoading(false);
      return;
    }


    try {
      const existingResumes = await getResumesFromStorage();
      const resumeIndex = findResumeIndex(existingResumes, resumeId);

      if (resumeIndex !== -1) {
        const formattedSkills = skillsForms.map(form => ({
          skillName: form.skill || '',
          rating: form.rating || 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          _id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        }));

        const updatedResumes = JSON.parse(JSON.stringify(existingResumes));

        updatedResumes[resumeIndex].profile = {
          ...updatedResumes[resumeIndex].profile,
          skills: [
            ...(updatedResumes[resumeIndex].profile.skills || []),
            ...formattedSkills,
          ],
        };

        updatedResumes[resumeIndex].updatedAt = new Date().toISOString();

        await AsyncStorage.setItem('resumes', JSON.stringify(updatedResumes));
        console.log('updated', updatedResumes);

        Toast.show({
          type: 'success',
          text1: 'Skills saved!',
          text2: 'Your Skills details have been saved successfully.',
          position: 'bottom',
        });

        setTimeout(() => {
          navigation.navigate('Skills');
        }, 1500);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Unexpected Error',
          text2: 'Something went wrong, please try again.',
        });
      }
    } catch (error) {
      console.error('Error saving skills:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to save skills details',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <Header title="Add Skills" headerIcon={Images.leftArrowIcon} onPress={()=>{
          navigation.goBack()
        }}/>
        {activeTab === 'Skills' && (
          <ScrollView
            contentContainerStyle={{paddingBottom: 100}}
            showsVerticalScrollIndicator={false}>
            {skillsForms.map((form, index) => (
              <View key={form.id} style={styles.formBox}>
                <View style={styles.titleView}>
                  <Text style={styles.title}>Skills {index + 1}</Text>
                  <TouchableOpacity onPress={() => handleDelete(form.id)}>
                    <Image
                      source={Images.delete}
                      style={styles.educationIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.formDetails}>
                  <CustomTextInput
                    value={form.skill}
                    onChangeText={text =>
                      handleInputChange(form.id, 'skill', text)
                    }
                    errorMessage={errors[`${index}_skill`]}
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
                          onPress={() =>
                            handleInputChange(form.id, 'rating', level)
                          }>
                          <Text style={[styles.ratingText,{color: form.rating === level && '#ffffff'}]}>{level}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
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

export default AddSkills;
