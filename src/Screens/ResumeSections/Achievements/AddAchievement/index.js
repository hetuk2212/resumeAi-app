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
import {addAchievements} from '../../../../../lib/api';
import {
  findResumeIndex,
  getResumesFromStorage,
} from '../../../../../lib/asyncStorageUtils';

const AddAchievements = () => {
  const [activeTab, setActiveTab] = useState('Achievements');
  const [achievementsForms, setAchievementsForms] = useState([
    {
      id: Date.now(),
      title: '',
      description: '',
    },
  ]);
  const [resumeId, setResumeId] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

  // Add new Achievements form
  const handleAdd = () => {
    const newForm = {
      id: Date.now(),
      title: '',
      description: '',
    };
    setAchievementsForms(prevForms => {
      const updatedForms = [...prevForms, newForm];
      return updatedForms;
    });
  };

  // Handle input changes
  const handleInputChange = (id, field, value) => {
    setAchievementsForms(prevForms => {
      const updatedForms = prevForms.map(form =>
        form.id === id ? {...form, [field]: value} : form,
      );
      return updatedForms;
    });
  };

  // Delete a form
  const handleDelete = id => {
    setAchievementsForms(prevForms => {
      const updatedForms = prevForms.filter(form => form.id !== id);
      return updatedForms;
    });
  };

  // Add Achievements api

  const handleSave = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      const existingResumes = await getResumesFromStorage();
      const resumeIndex = findResumeIndex(existingResumes, resumeId);

      if (resumeIndex !== -1) {
        const formattedAchievements = achievementsForms.map(form => ({
          achievement: form.achievement || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          _id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        }));
        const updatedResumes = JSON.parse(JSON.stringify(existingResumes));

        updatedResumes[resumeIndex].profile = {
          ...updatedResumes[resumeIndex].profile,
          achievements: [
            ...(updatedResumes[resumeIndex].profile.achievements || []),
            ...formattedAchievements,
          ],
        };

        updatedResumes[resumeIndex].updatedAt = new Date().toISOString();

        await AsyncStorage.setItem('resumes', JSON.stringify(updatedResumes));

        Toast.show({
          type: 'success',
          text1: 'Achievements saved!',
          text2: 'Your Achievements details have been saved successfully.',
          position: 'bottom',
        });
        setTimeout(() => {
          navigation.navigate('Achievements');
        }, 1500);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Unexpected Error',
          text2: 'Something went wrong, please try again.',
        });
      }
    } catch (error) {
      console.error('Error saving achievements:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to save achievements details',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <TabSwitcher
          tabs={[
            {key: 'Achievements', label: 'Achievements'},
            {key: 'Example', label: 'Example'},
          ]}
          value={activeTab}
          onTabChange={tabKey => setActiveTab(tabKey)}
        />

        {activeTab === 'Achievements' && (
          <ScrollView
            contentContainerStyle={{paddingBottom: 100}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always">
            {achievementsForms.map((form, index) => (
              <View key={form.id} style={styles.formBox}>
                <View style={styles.titleView}>
                  <Text style={styles.title}>Achievements {index + 1}</Text>
                  <TouchableOpacity onPress={() => handleDelete(form.id)}>
                    <Image
                      source={Images.delete}
                      style={styles.educationIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.formDetails}>
                  <CustomTextInput
                    value={form.achievement}
                    onChangeText={text =>
                      handleInputChange(form.id, 'achievement', text)
                    }
                    errorMessage={errors[`${index}_achievement`]}
                  />
                </View>
              </View>
            ))}
            <ActionButtons
              onAdd={handleAdd}
              onSave={handleSave}
              addIcon={Images.add}
              saveIcon={Images.check}
              loading={loading}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddAchievements;
