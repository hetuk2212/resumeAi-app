import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  BackHandler,
  StatusBar,
} from 'react-native';
import getStyles from './style';
import CustomTextInput from '../../../Components/TextInput';
import {Images} from '../../../Assets/Images';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import ActionButtons from '../../../Components/ActionButtons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import Header from '../../../Components/Header/Index';
import {useTheme} from '../../../Theme/ ThemeContext';
import FieldsToggleModal from '../../../Components/FieldsToggleModal/Index';
import {SafeAreaView} from 'react-native-safe-area-context';

// Helper function to format date for display
const formatDisplayDate = dateString => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'long'});
    const year = date.getFullYear();
    return `${day}, ${month}, ${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

// Helper function to format date for API (yyyy-mm-dd)
const formatApiDate = date => {
  if (!date) return '';
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error formatting API date:', error);
    return '';
  }
};

const PersonalDetails = () => {
  const [activeTab, setActiveTab] = useState('PersonalDetails');
  const [activePage, setActivePage] = useState('form');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [fieldValues, setFieldValues] = useState({});
  const [loading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [resumeId, setResumeId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [fields, setFields] = useState([
    {
      label: 'Date of Birth',
      key: 'dateOfBirth',
      isActive: false,
      value: '',
      isDateField: true,
    },
    {label: 'Nationality', key: 'nationality', isActive: false, value: ''},
    {label: 'Marital Status', key: 'maritalStatus', isActive: false, value: ''},
    {label: 'Website', key: 'website', isActive: false, value: ''},
    {label: 'LinkedIn', key: 'linkedIn', isActive: false, value: ''},
    {label: 'Facebook', key: 'facebook', isActive: false, value: ''},
    {label: 'Twitter', key: 'twitter', isActive: false, value: ''},
    {label: 'Religion', key: 'religion', isActive: false, value: ''},
    {label: 'Passport', key: 'passport', isActive: false, value: ''},
    {label: 'Gender', key: 'gender', isActive: false, value: ''},
    {
      label: 'Driving License',
      key: 'drivingLicense',
      isActive: false,
      value: '',
    },
    {label: 'Place', key: 'place', isActive: false, value: ''},
    {label: 'Salary Claim', key: 'salaryClaim', isActive: false, value: ''},
    {label: 'Occupation', key: 'occupation', isActive: false, value: ''},
    {label: 'Hobbies', key: 'hobbies', isActive: false, value: ''},
  ]);

  const navigation = useNavigation();

  const {theme} = useTheme();
  const styles = getStyles(theme);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      navigation.navigate('Profile');
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const backAction = () => {
      if (activePage === 'modal') {
        setActivePage('form');
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [activePage]);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
      const formattedDate = formatApiDate(selectedDate);
      setFieldValues(prev => ({...prev, 'Date of Birth': formattedDate}));
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleImagePick = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
    })
      .then(image => {
        setProfileImage({
          uri: image.path,
          name: image.filename || `profile_${Date.now()}.jpg`,
          type: image.mime,
        });
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          console.log('Image picker error:', error);
        }
      });
  };

  const handleRemoveImage = () => {
    Alert.alert(
      'Remove Profile Picture',
      'Are you sure you want to remove your profile picture?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setProfileImage(null),
        },
      ],
    );
  };

  const handleModal = () => {
    setActivePage('modal');
  };

  const saveDataToStorage = async (resumeId, profileData) => {
    try {
      let resumes = await AsyncStorage.getItem('resumes');
      resumes = resumes ? JSON.parse(resumes) : [];

      const existingResumeIndex = resumes.findIndex(
        resume => resume && resume.profile && resume.profile._id === resumeId,
      );

      if (existingResumeIndex !== -1) {
        resumes[existingResumeIndex] = profileData;
      } else {
        resumes.push(profileData);
      }
      console.log('sas', resumes);

      await AsyncStorage.setItem('resumes', JSON.stringify(resumes));
      await AsyncStorage.setItem('resumeId', resumeId);

      Toast.show({
        type: 'success',
        text1: 'Profile saved successfully!',
        text2: 'Your details have been saved successfully.',
        position: 'bottom',
      });
    } catch (error) {
      console.log('Failed to save data to storage:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong while saving the data.',
      });
    }
  };

  const getDataFromStorage = async () => {
    try {
      const resumeId = await AsyncStorage.getItem('resumeId');
      const resumes = await AsyncStorage.getItem('resumes');
      if (resumeId && resumes !== null) {
        const parsedResumes = JSON.parse(resumes);
        const existingResume = parsedResumes.find(
          resume => resume && resume.profile && resume.profile._id === resumeId,
        );
        if (existingResume) {
          const userResume = existingResume.profile.personalInfo;
          setResumeId(resumeId);
          setName(userResume.fullName || '');
          setAddress(userResume.address || '');
          setEmail(userResume.email || '');
          setPhone(userResume.phone || '');
          setPosition(userResume.position || '');
          setProfileImage(userResume.profileImage || null);

          const updatedFields = fields.map(field => {
            const value =
              userResume[field.key] || fieldValues[field.label] || '';
            if (value) {
              return {...field, isActive: true, value};
            }
            return field;
          });

          setFields(updatedFields);

          setFieldValues({
            'Date of Birth': userResume.dateOfBirth || '',
            Nationality: userResume.nationality || '',
            Gender: userResume.gender || '',
            'Marital Status': userResume.maritalStatus || '',
            Website: userResume.website || '',
            LinkedIn: userResume.linkedIn || '',
            Facebook: userResume.facebook || '',
            Twitter: userResume.twitter || '',
            Religion: userResume.religion || '',
            Passport: userResume.passport || '',
            'Driving License': userResume.drivingLicense || '',
            'Salary Claim': userResume.salary || '',
            Place: userResume.place || '',
            Occupation: userResume.occupation || '',
            Hobbies: userResume.hobbies || '',
          });
        }
      }
    } catch (error) {
      console.log('Failed to fetch data from storage:', error);
    }
  };

  useEffect(() => {
    getDataFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = index => {
    const updatedFields = [...fields];
    updatedFields[index].isActive = !updatedFields[index].isActive;

    if (!updatedFields[index].isActive) {
      updatedFields[index].value = '';
      if (updatedFields[index].isDateField) {
        setDateOfBirth(new Date());
      }
      setFieldValues(prev => {
        const newValues = {...prev};
        delete newValues[updatedFields[index].label];
        return newValues;
      });
    }

    setFields(updatedFields);
    setTimeout(() => {
      setActivePage('form');
    }, 500);
  };

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  };

  const handleSave = async () => {
    setIsLoading(true);
    setErrors({});

    const formattedDateOfBirth = fieldValues['Date of Birth']
      ? formatDisplayDate(fieldValues['Date of Birth'])
      : null;

    const id = resumeId || generateUUID();
    setResumeId(id);

    const profileData = {
      profile: {
        personalInfo: {
          fullName: name,
          address: address,
          email: email,
          phone: phone,
          position: position,
          dateOfBirth: formattedDateOfBirth,
          nationality: fieldValues['Nationality'] || null,
          gender: fieldValues['Gender'] || null,
          maritalStatus: fieldValues['Marital Status'] || null,
          profileImage: profileImage || null,
          website: fieldValues['Website'] || null,
          linkedIn: fieldValues['LinkedIn'] || null,
          facebook: fieldValues['Facebook'] || null,
          twitter: fieldValues['Twitter'] || null,
          religion: fieldValues['Religion'] || null,
          passport: fieldValues['Passport'] || null,
          drivingLicense: fieldValues['Driving License'] || null,
          salary: fieldValues['Salary Claim'] || null,
          place: fieldValues['Place'] || null,
          occupation: fieldValues['Occupation'] || null,
          hobbies: fieldValues['Hobbies'] || null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        _id: id,
        education: [],
        experience: [],
        skills: [],
        projects: [],
        interests: [],
        achievements: [],
        languages: [],
        activities: [],
        publications: [],
        objective: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0,
      },
    };

    await saveDataToStorage(id, profileData);
    navigation.navigate('Profile');
    setIsLoading(false);
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
          title="Personal Information"
          headerIcon={Images.leftArrowIcon}
          onPress={() => navigation.navigate('Profile')}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 150, paddingTop: 20}}>
          {activeTab === 'PersonalDetails' && (
            <View>
              <View>
                <Text style={styles.label}>Photo (optional)</Text>
                <View style={styles.profileImgView}>
                  <View>
                    <Image
                      source={
                        profileImage
                          ? {uri: profileImage.uri || profileImage}
                          : Images.profileAccount
                      }
                      style={styles.userProfile}
                    />
                    {profileImage ? (
                      <TouchableOpacity
                        style={styles.profileBtnChange}
                        onPress={handleRemoveImage}>
                        <Image source={Images.delete} style={styles.editIcon} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.profileBtnChange}
                        onPress={handleImagePick}>
                        <Image source={Images.edit} style={styles.editIcon} />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
              <CustomTextInput
                label="Name"
                value={name}
                onChangeText={setName}
                errorMessage={errors.fullName}
              />
              <View>
                <CustomTextInput
                label="Title"
                placeholder="(Optional)"
                value={position}
                onChangeText={setPosition}
                errorMessage={errors.position}
              />
              <Text style={styles.descText}>Appears next to your name. You can write your current profession or the position you are applying for. Example: Salesperson, Project Manager.</Text>
              </View>
              <CustomTextInput
                label="Address"
                value={address}
                onChangeText={setAddress}
                errorMessage={errors.address}
              />
              <CustomTextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                errorMessage={errors.email}
              />
              <CustomTextInput
                label="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                errorMessage={errors.phone}
              />
              {fields
                .filter(field => field.isActive)
                .map((field, index) =>
                  field.isDateField ? (
                    <View key={index}>
                      <Text style={styles.label}>{field.label}</Text>
                      <TouchableOpacity
                        onPress={showDatepicker}
                        activeOpacity={1}
                        style={styles.dateInputContainer}>
                        <CustomTextInput
                          value={
                            fieldValues[field.label]
                              ? formatDisplayDate(fieldValues[field.label])
                              : ''
                          }
                          editable={false}
                          pointerEvents="none"
                        />
                      </TouchableOpacity>
                      {showDatePicker && (
                        <DateTimePicker
                          mode="date"
                          display="default"
                          value={dateOfBirth}
                          onChange={handleDateChange}
                          maximumDate={new Date()}
                        />
                      )}
                    </View>
                  ) : (
                    <CustomTextInput
                      key={index}
                      label={field.label}
                      value={fieldValues[field.label] || ''}
                      onChangeText={text => {
                        setFieldValues(prevState => ({
                          ...prevState,
                          [field.label]: text,
                        }));
                      }}
                    />
                  ),
                )}
              <ActionButtons
                onAdd={toggleModal}
                onSave={handleSave}
                addIcon={Images.add}
                saveIcon={Images.check}
                loading={loading}
              />
            </View>
          )}
        </ScrollView>

        <FieldsToggleModal
          visible={isModalVisible}
          fields={fields}
          onToggle={handleToggle}
          onClose={toggleModal}
          // styles={styles}
        />
      </View>
    </SafeAreaView>
  );
};

export default PersonalDetails;
