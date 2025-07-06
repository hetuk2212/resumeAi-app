import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import getStyle from './style';
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
import Activites from '..';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../../Components/Header/Index';
import {useTheme} from '../../../../Theme/ ThemeContext';
import InputText from '../../../../Components/InputDesc/Index';

const AddActivities = () => {
  const [activeTab, setActiveTab] = useState('Activites');
  const [activitesForms, setActivitesForms] = useState([
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

  const {theme} = useTheme();
  const styles = getStyle(theme);

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

  // Add new Activites form
  const handleAdd = () => {
    const newForm = {
      id: Date.now(),
      title: '',
      description: '',
    };
    setActivitesForms(prevForms => {
      const updatedForms = [...prevForms, newForm];
      return updatedForms;
    });
  };

  // Handle input changes
  const handleInputChange = (id, field, value) => {
    setActivitesForms(prevForms => {
      const updatedForms = prevForms.map(form =>
        form.id === id ? {...form, [field]: value} : form,
      );
      return updatedForms;
    });
  };

  // Delete a form
  const handleDelete = id => {
    setActivitesForms(prevForms => {
      const updatedForms = prevForms.filter(form => form.id !== id);
      return updatedForms;
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      const existingResumes = await getResumesFromStorage();
      const resumeIndex = findResumeIndex(existingResumes, resumeId);

      if (resumeIndex !== -1) {
        const formattedactivites = activitesForms.map(form => ({
          activity: form.activity || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          _id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        }));
        const updatedResumes = JSON.parse(JSON.stringify(existingResumes));

        updatedResumes[resumeIndex].profile = {
          ...updatedResumes[resumeIndex].profile,
          activites: [
            ...(updatedResumes[resumeIndex].profile.activites || []),
            ...formattedactivites,
          ],
        };

        updatedResumes[resumeIndex].updatedAt = new Date().toISOString();

        await AsyncStorage.setItem('resumes', JSON.stringify(updatedResumes));

        Toast.show({
          type: 'success',
          text1: 'Activites saved!',
          text2: 'Your Activites details have been saved successfully.',
          position: 'bottom',
        });
        setTimeout(() => {
          navigation.navigate('Activities');
        }, 1500);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Unexpected Error',
          text2: 'Something went wrong, please try again.',
        });
      }
    } catch (error) {
      console.error('Error saving activites:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to save activites details',
      });
    } finally {
      setIsLoading(false);
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
          title="Add Activites"
          headerIcon={Images.leftArrowIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />
        {activeTab === 'Activites' && (
          <ScrollView
            contentContainerStyle={{paddingBottom: 100}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always">
            {activitesForms.map((form, index) => (
              <View key={form.id} style={styles.formBox}>
                <View style={styles.titleView}>
                  <Text style={styles.title}>Activity {index + 1}</Text>
                  <TouchableOpacity onPress={() => handleDelete(form.id)}>
                    <Image
                      source={Images.delete}
                      style={styles.educationIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.formDetails}>
                  <View>
                    <CustomTextInput
                      value={form.activity}
                      onChangeText={text =>
                        handleInputChange(form.id, 'activity', text)
                      }
                      errorMessage={errors[`${index}_activity`]}
                    />
                    <InputText InputText="Example: Participated in community clean-up programs." />
                  </View>
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

export default AddActivities;
