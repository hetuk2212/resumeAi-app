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
import {addSkills} from '../../../../../lib/api';

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
  
    const formattedSkills = skillsForms.map(form => ({
      skillName: form.skill || '',
      rating: form.rating || 0,
    }));
  
    const body = {skills: formattedSkills};
  
    try {
      const response = await addSkills({resumeId, body});
      
      if (response.status === 201) {
        navigation.navigate('Skills');
        Toast.show({
          type: 'success',
          text1: response.data.message || 'Skills saved!',
          text2: 'Your Skills details have been saved successfully.',
          position: 'bottom',
        });
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.invalidEntries) {
        let errorObj = {};
        error.response.data.invalidEntries.forEach((entry, index) => {
          if (!entry.skillName) {
            errorObj[`${index}_skill`] = 'Skill name is required';
          }
        });
        setErrors(errorObj);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.response?.data?.message || 'Something went wrong, try again.',
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
            {key: 'Skills', label: 'Skills'},
            {key: 'Example', label: 'Example'},
          ]}
          value={activeTab}
          onTabChange={tabKey => setActiveTab(tabKey)}
        />

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
                          <Text style={styles.ratingText}>{level}</Text>
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
