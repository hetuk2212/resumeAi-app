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
import { addLanguages } from '../../../../../lib/api';
  
  const AddLanguages = () => {
    const [activeTab, setActiveTab] = useState('Languages');
    const [LanguagesForms, setLanguagesForms] = useState([]);
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
  
    // Add new Languages form
    const handleAdd = () => {
      const newForm = {
        id: Date.now(),
        language: '',
        rating: 0,
      };
      setLanguagesForms(prevForms => {
        const updatedForms = [...prevForms, newForm];
        return updatedForms;
      });
    };
  
    // Handle input changes
    const handleInputChange = (id, field, value) => {
      setLanguagesForms(prevForms => {
        const updatedForms = prevForms.map(form =>
          form.id === id ? {...form, [field]: value} : form,
        );
        return updatedForms;
      });
    };
  
    // Delete a form
    const handleDelete = id => {
      setLanguagesForms(prevForms => {
        const updatedForms = prevForms.filter(form => form.id !== id);
        return updatedForms;
      });
    };
  
    // Handle Save (log form values)
    // const handleSave = () => {
    //   console.log(
    //     'Submitted Languages Data:',
    //     JSON.stringify(LanguagesForms, null, 2),
    //   );
    //   navigation.navigate('Choose Resume');
    // };
  
    // Add Languages api
  
    const handleSave = async () => {
      setIsLoading(true);
      setErrors({});
  
      const formattedLanguages = LanguagesForms.map(form => ({
        language: form.language || '',
        rating: form.rating || 0,
      }));
  
      const body = {languages: formattedLanguages};
  
      console.log(body);
  
      try {
        const response = await addLanguages({resumeId, body});
        console.log('Response from API:', response);
  
        if (response.status === 201) {
          navigation.navigate('Languages');
  
          Toast.show({
            type: 'success',
            text1: response.data.message || 'Languages saved!',
            text2: 'Your Languages details have been saved successfully.',
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
            const match = err.path.match(/languages\[(\d+)\]\.(\w+)/);
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
              {key: 'Languages', label: 'Languages'},
              {key: 'Example', label: 'Example'},
            ]}
            onTabChange={tabKey => setActiveTab(tabKey)}
          />
  
          {activeTab === 'Languages' && (
            <ScrollView
              contentContainerStyle={{paddingBottom: 100}}
              showsVerticalScrollIndicator={false}>
              {LanguagesForms.map((form, index) => (
                <View key={form.id} style={styles.formBox}>
                  <View style={styles.titleView}>
                    <Text style={styles.title}>Language {index + 1}</Text>
                    <TouchableOpacity onPress={() => handleDelete(form.id)}>
                      <Image
                        source={Images.delete}
                        style={styles.educationIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.formDetails}>
                    <CustomTextInput
                      value={form.language}
                      onChangeText={text =>
                        handleInputChange(form.id, 'language', text)
                      }
                      errorMessage={errors[`${index}_language`]}
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
        onPress={() => handleInputChange(form.id, 'rating', level)}
      >
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
              />
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    );
  };
  
  export default AddLanguages;
  