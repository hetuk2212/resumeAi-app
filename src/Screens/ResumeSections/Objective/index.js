import {View, Text, SafeAreaView, Image, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import TabSwitcher from '../../../Components/TabSwitcher';
import {Images} from '../../../Assets/Images';
import CustomTextInput from '../../../Components/TextInput';
import {addObjective} from '../../../../lib/api';
import ActionButtons from '../../../Components/ActionButtons'; // optional, if you still want Save button style

const Objective = () => {
  const [activeTab, setActiveTab] = useState('Objective');
  const [projectForm, setProjectForm] = useState({
    objective: '',
  });
  
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

  const handleInputChange = (field, value) => {
    setProjectForm(prev => ({...prev, [field]: value}));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setErrors({});

    const body = {
      objective: projectForm.objective,
    };
    

    try {
      const response = await addObjective({resumeId, body});
      if (response.status === 201) {
        navigation.navigate('Objective');

        Toast.show({
          type: 'success',
          text1: response.data.message || 'Project saved!',
          text2: 'Your project has been saved successfully.',
          position: 'bottom',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Unexpected Error',
          text2: 'Something went wrong, please try again.',
        });
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.errors) {
        let errorObj = {};
        error.response.data.errors.forEach(err => {
          const match = err.path.match(/objective\[0\]\.(\w+)/);
          if (match) {
            const [, field] = match;
            errorObj[field] = err.msg;
          }
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
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <TabSwitcher
          tabs={[
            {key: 'Objective', label: 'Objective'},
            {key: 'Example', label: 'Example'},
          ]}
          value={activeTab}
          onTabChange={tabKey => setActiveTab(tabKey)}
        />

        {activeTab === 'Objective' && (
          <ScrollView
            contentContainerStyle={{paddingBottom: 100}}
            showsVerticalScrollIndicator={false}>
            <View style={styles.formBox}>
              <View style={styles.titleView}>
                <Text style={styles.title}>Objective</Text>
              </View>
              <View style={styles.formDetails}>
                <CustomTextInput
                  label="Objective"
                  value={projectForm.objective}
                  onChangeText={text => handleInputChange('objective', text)}
                  errorMessage={errors['objective']}
                  multiline={true}
                  numberOfLines={4}
                />
              </View>
            </View>

            {/* Optional Save Button */}
            <ActionButtons
              onSave={handleSave}
              saveIcon={Images.check}
              hideAdd
              loading={loading}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Objective;
