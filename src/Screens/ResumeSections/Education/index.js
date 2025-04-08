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
import TabSwitcher from '../../../Components/TabSwitcher';
import CustomTextInput from '../../../Components/TextInput';
import {Images} from '../../../Assets/Images';
import ActionButtons from '../../../Components/ActionButtons';
import {useNavigation} from '@react-navigation/native';
import {addEducation} from '../../../../lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Education = () => {
  const [activeTab, setActiveTab] = useState('Education');
  const [educationForms, setEducationForms] = useState([]);
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

  // Add new education form
  const handleAdd = () => {
    const newForm = {
      id: Date.now(),
      course: '',
      school: '',
      grade: '',
      startYear: '',
      endYear: '',
    };
    setEducationForms(prevForms => {
      const updatedForms = [...prevForms, newForm];
      return updatedForms;
    });
  };

  // Handle input changes
  const handleInputChange = (id, field, value) => {
    setEducationForms(prevForms => {
      const updatedForms = prevForms.map(form =>
        form.id === id ? {...form, [field]: value} : form,
      );
      return updatedForms;
    });
  };

  // Delete a form
  const handleDelete = id => {
    setEducationForms(prevForms => {
      const updatedForms = prevForms.filter(form => form.id !== id);
      return updatedForms;
    });
  };

  // Handle Save (log form values)
  // const handleSave = () => {
  //   console.log(
  //     'Submitted Education Data:',
  //     JSON.stringify(educationForms, null, 2),
  //   );
  //   navigation.navigate('Choose Resume');
  // };

  // Add education api

  const handleSave = async () => {
    setIsLoading(true);
    setErrors({});

    const formattedEducation = educationForms.map(form => ({
      course: form.course || "",
      university: form.school || "",
      grade: form.grade || "",
      startYear: form.startYear ? parseInt(form.startYear, 10) : "",
      endYear: form.endYear ? parseInt(form.endYear, 10) : "",
    }));

    const body = {education: formattedEducation};

    console.log(body);
    

    try {
      const response = await addEducation({ resumeId, body });
      console.log('Response from API:', response);

      if (response.status === 201) {
        navigation.navigate('Profile');

        Toast.show({
          type: 'success',
          text1: response.data.message || 'Education saved!',
          text2: 'Your education details have been saved successfully.',
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
      console.log('Error response:', error.response?.data);

      if (error.response?.status === 400 && error.response?.data?.errors) {
        let errorObj = {};
        error.response.data.errors.forEach(err => {
          const match = err.path.match(/education\[(\d+)\]\.(\w+)/);
          if (match) {
            const [, index, field] = match;
            errorObj[`${index}_${field}`] = err.msg;
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
            {key: 'Education', label: 'Education'},
            {key: 'Example', label: 'Example'},
          ]}
          onTabChange={tabKey => setActiveTab(tabKey)}
        />

        {activeTab === 'Education' && (
          <ScrollView
            contentContainerStyle={{paddingBottom: 100}}
            showsVerticalScrollIndicator={false}>
            {educationForms.map((form, index) => (
              <View key={form.id} style={styles.formBox}>
                <View style={styles.titleView}>
                  <Text style={styles.title}>Education {index + 1}</Text>
                  <TouchableOpacity onPress={() => handleDelete(form.id)}>
                    <Image
                      source={Images.delete}
                      style={styles.educationIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.formDetails}>
                  <CustomTextInput
                    label="Course / Degree"
                    value={form.course}
                    onChangeText={text =>
                      handleInputChange(form.id, 'course', text)
                    }
                    errorMessage={errors[`${index}_course`]}
                  />

                  <CustomTextInput
                    label="School / University"
                    value={form.school}
                    onChangeText={text =>
                      handleInputChange(form.id, 'school', text)
                    }
                    errorMessage={errors[`${index}_university`]} // ✅ backend sends "university"
                  />

                  <CustomTextInput
                    label="Grade / Score"
                    value={form.grade}
                    onChangeText={text =>
                      handleInputChange(form.id, 'grade', text)
                    }
                    errorMessage={errors[`${index}_grade`]}
                  />

                  <CustomTextInput
                    label="Start Year"
                    value={form.startYear}
                    onChangeText={text =>
                      handleInputChange(form.id, 'startYear', text)
                    }
                    errorMessage={errors[`${index}_startYear`]}
                  />

                  <CustomTextInput
                    label="End Year"
                    value={form.endYear}
                    onChangeText={text =>
                      handleInputChange(form.id, 'endYear', text)
                    }
                    errorMessage={errors[`${index}_endYear`]}
                  />
                </View>
              </View>
            ))}
            <ActionButtons
              onAdd={handleAdd}
              onSave={handleSave}
              addIcon={Images.add}
              saveIcon={Images.check}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Education;
