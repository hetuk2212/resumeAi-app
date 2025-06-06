import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import CustomTextInput from '../../../Components/TextInput';
import {Images} from '../../../Assets/Images';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';
import TabSwitcher from '../../../Components/TabSwitcher';
import ActionButtons from '../../../Components/ActionButtons';
import {
  addPersonalInfo,
  getSpecificProfile,
  updateProfile,
} from '../../../../lib/api';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

// Helper function to format date for display (e.g., "22, December, 2002")
const formatDisplayDate = dateString => {
  if (!dateString) return '';

  try {
    // Handle both API format (yyyy-mm-dd) and JS Date objects
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if invalid date

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
  const [profileImage, setProfileImage] = useState(null);
  const [fieldValues, setFieldValues] = useState({});
  const [loading, setIsLoading] = useState(false);
  const [loadingProfile, setIsLoadingProfile] = useState(false);
  const [resumeId, setResumeId] = useState();
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if (activePage === 'modal') {
        e.preventDefault();
        setActivePage('form');
      }
    });

    return unsubscribe;
  }, [navigation, activePage]);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
      const formattedDate = formatApiDate(selectedDate);
      setFieldValues(prev => ({
        ...prev,
        'Date of Birth': formattedDate,
      }));
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

  const getResumeInfo = async resumeId => {
    setIsLoadingProfile(true);
    try {
      console.log('Getting Resume Info for ID:', resumeId);
      const response = await getSpecificProfile(resumeId);

      if (response.status === 200) {
        const data = response.data.profile.personalInfo;
        setName(data?.fullName || '');
        setAddress(data?.address || '');
        setEmail(data?.email || '');
        setPhone(data?.phone || '');
        setProfileImage(data?.profileImage?.url || null);

        // Initialize date of birth if it exists
        if (data?.dateOfBirth) {
          setDateOfBirth(new Date(data.dateOfBirth));
        }

        const initialFieldValues = {
          'Date of Birth': data?.dateOfBirth || '',
          Nationality: data?.nationality || '',
          'Marital Status': data?.maritalStatus || '',
          Website: data?.website || '',
          LinkedIn: data?.linkedIn || '',
          Facebook: data?.facebook || '',
          Twitter: data?.twitter || '',
          Religion: data?.religion || '',
          Passport: data?.passport || '',
          Gender: data?.gender || '',
          'Driving License': data?.drivingLicense || '',
          Place: data?.place || '',
          'Salary Claim': data?.salary || '',
          Occupation: data?.occupation || '',
          Hobbies: data?.hobbies || '',
        };

        setFieldValues(initialFieldValues);

        const updatedFields = fields.map(field => {
          const fieldValue = data?.[field.key] || '';
          return {
            ...field,
            isActive: !!fieldValue,
            value: fieldValue,
          };
        });
        setFields(updatedFields);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log('Failed to fetch resume info:', error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  useEffect(() => {
    const checkAndFetchResumeInfo = async () => {
      const resumeId = await AsyncStorage.getItem('profileId');
      setResumeId(resumeId);
      if (resumeId) {
        getResumeInfo(resumeId);
      } else {
        console.log('Resume ID not found in AsyncStorage.');
      }
    };

    checkAndFetchResumeInfo();
  }, []);

  const handleToggle = index => {
    const updatedFields = [...fields];
    updatedFields[index].isActive = !updatedFields[index].isActive;
  
    if (!updatedFields[index].isActive) {
      // Clear the field value when toggled off
      updatedFields[index].value = '';
      
      // Special handling for date fields
      if (updatedFields[index].isDateField) {
        setDateOfBirth(new Date()); // Reset to current date
      }
  
      // Update field values state
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

  const createFormData = data => {
    const formData = new FormData();

    // Append all text fields
    Object.keys(data).forEach(key => {
      if (key !== 'profileImage') {
        formData.append(key, data[key]);
      }
    });

    // Append image if it exists
    if (data.profileImage) {
      formData.append('profileImage', {
        uri: data.profileImage.uri,
        type: data.profileImage.type || 'image/jpeg',
        name: data.profileImage.name || `profile_${Date.now()}.jpg`,
      });
    }

    return formData;
  };

  const handleSave = async () => {
    setIsLoading(true);
    setErrors({});

    const formData = {
      fullName: name,
      address,
      email,
      phone,
      profileImage,
      dateOfBirth: fieldValues['Date of Birth'] || '',
      nationality: fieldValues['Nationality'] || '',
      gender: fieldValues['Gender'] || '',
      maritalStatus: fieldValues['Marital Status'] || '',
      website: fieldValues['Website'] || '',
      linkedIn: fieldValues['LinkedIn'] || '',
      facebook: fieldValues['Facebook'] || '',
      twitter: fieldValues['Twitter'] || '',
      religion: fieldValues['Religion'] || '',
      passport: fieldValues['Passport'] || '',
      drivingLicense: fieldValues['Driving License'] || '',
      salary: fieldValues['Salary Claim'] || '',
      occupation: fieldValues['Occupation'] || '',
      hobbies: fieldValues['Hobbies'] || '',
      place: fieldValues['Place'] || '',
    };

    try {
      const formattedData = createFormData(formData);
      const response = await addPersonalInfo(formattedData);

      if (response.status === 201) {
        AsyncStorage.setItem('profileId', response.data.profile._id);
        navigation.navigate('Profile');
        Toast.show({
          type: 'success',
          text1: response.data.message || 'Profile saved successfully!',
          text2: 'Your details have been saved successfully.',
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
          errorObj[err.path] = err.msg;
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

  const handleUpdate = async () => {
    setIsLoading(true);
    setErrors({});
    const resumeId = await AsyncStorage.getItem('profileId');
    const formData = {
      fullName: name,
      address,
      email,
      phone,
      ...(profileImage && typeof profileImage === 'object'
        ? {profileImage}
        : {}),
      dateOfBirth: fieldValues['Date of Birth'] || '',
      nationality: fieldValues['Nationality'] || '',
      gender: fieldValues['Gender'] || '',
      maritalStatus: fieldValues['Marital Status'] || '',
      website: fieldValues['Website'] || '',
      linkedIn: fieldValues['LinkedIn'] || '',
      facebook: fieldValues['Facebook'] || '',
      twitter: fieldValues['Twitter'] || '',
      religion: fieldValues['Religion'] || '',
      passport: fieldValues['Passport'] || '',
      drivingLicense: fieldValues['Driving License'] || '',
      salary: fieldValues['Salary Claim'] || '',
      occupation: fieldValues['Occupation'] || '',
      hobbies: fieldValues['Hobbies'] || '',
      place: fieldValues['Place'] || '',
    };

    try {
      const formattedData = createFormData(formData);
      const response = await updateProfile({formData: formattedData, resumeId});

      if (response.status === 200) {
        AsyncStorage.setItem('profileId', response.data.profile._id);
        navigation.navigate('Profile');
        Toast.show({
          type: 'success',
          text1: response.data.message || 'Profile updated successfully!',
          text2: 'Your details have been updated successfully.',
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
          errorObj[err.path] = err.msg;
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
      {loadingProfile ? (
        <ActivityIndicator size="large" color="blue" style={styles.loader} />
      ) : (
        <View style={styles.container}>
          {activePage === 'form' && (
            <View>
              <TabSwitcher
                tabs={[
                  {key: 'PersonalDetails', label: 'Personal Details'},
                  {key: 'Help', label: 'Help'},
                ]}
                value={activeTab}
                onTabChange={tabKey => setActiveTab(tabKey)}
              />

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 150}}>
                {activeTab === 'PersonalDetails' && (
                  <View>
                    <CustomTextInput
                      label="Name"
                      placeholder="Enter your name"
                      value={name}
                      onChangeText={setName}
                      errorMessage={errors.fullName}
                    />
                    <CustomTextInput
                      label="Address"
                      placeholder="Enter your address"
                      value={address}
                      onChangeText={setAddress}
                      errorMessage={errors.address}
                    />
                    <CustomTextInput
                      label="Email"
                      placeholder="myresume@gmail.com"
                      value={email}
                      onChangeText={setEmail}
                      errorMessage={errors.email}
                    />
                    <CustomTextInput
                      label="Phone"
                      placeholder="9703954483"
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
                                placeholder={`Select your ${field.label}`}
                                value={fieldValues[field.label] ? formatDisplayDate(fieldValues[field.label]) : ''}
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
                            placeholder={`Enter your ${field.label}`}
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

                    <View>
                      <Text style={styles.label}>Photo (optional)</Text>
                      <View style={styles.profileImgView}>
                        <Image
                          source={
                            profileImage
                              ? {uri: profileImage.uri || profileImage}
                              : Images.profileAccount
                          }
                          style={styles.userProfile}
                        />
                        <View style={styles.profileImgBtnView}>
                          <TouchableOpacity
                            style={styles.profileBtnChange}
                            onPress={handleImagePick}>
                            <LinearGradient
                              colors={['#33abff', '#4db6ff', '#1aa1ff']}
                              start={{x: 0, y: 0}}
                              end={{x: 1, y: 0}}
                              style={styles.gradientBtn}>
                              <Text style={styles.profileBtnText}>Change</Text>
                            </LinearGradient>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.profileBtnRemove}
                            onPress={handleRemoveImage}>
                            <LinearGradient
                              colors={['#ff9800', '#ff7300', '#ff5722']}
                              start={{x: 0, y: 0}}
                              end={{x: 1, y: 0}}
                              style={styles.gradientBtn}>
                              <Text style={styles.profileBtnText}>Remove</Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <ActionButtons
                      onAdd={handleModal}
                      onSave={resumeId ? handleUpdate : handleSave}
                      addIcon={Images.add}
                      saveIcon={Images.check}
                      loading={loading}
                    />
                  </View>
                )}
              </ScrollView>
            </View>
          )}

          {activePage === 'modal' && (
            <ScrollView contentContainerStyle={{paddingBottom: 100}}>
              <Text style={styles.headerText}>
                Click the switch button to Enable / Disable any profile fields
              </Text>
              <View style={styles.fieldsContainer}>
                <View style={styles.titleBox}>
                  <Text style={styles.title}>Add More Personal Info</Text>
                </View>
                {fields.map((field, index) => (
                  <View key={index} style={styles.fieldItem}>
                    <Text style={styles.fieldLabel}>{field.label}</Text>
                    <ToggleSwitch
                      isOn={field.isActive}
                      onColor="green"
                      offColor="gray"
                      size="medium"
                      onToggle={() => handleToggle(index)}
                    />
                  </View>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default PersonalDetails;
