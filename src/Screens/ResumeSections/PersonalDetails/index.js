import React, {useEffect, useState} from 'react';
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
import styles from './style';
import CustomTextInput from '../../../Components/TextInput';
import {Images} from '../../../Assets/Images';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';
import TabSwitcher from '../../../Components/TabSwitcher';
import ActionButtons from '../../../Components/ActionButtons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';

// Helper function to format date for display (e.g., "22, December, 2002")
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
  const [profileImage, setProfileImage] = useState(null);
  const [fieldValues, setFieldValues] = useState({});
  const [loading, setIsLoading] = useState(false);
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

  const saveDataToStorage = async (resumeId, data) => {
    try {
      await AsyncStorage.setItem('resumeId', resumeId);
      await AsyncStorage.setItem(resumeId, JSON.stringify(data));
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
      if (resumeId !== null) {
        const data = await AsyncStorage.getItem(resumeId);
        if (data !== null) {
          const parsedData = JSON.parse(data);
          const userResume = parsedData.profile.personalInfo;

          setName(userResume.fullName || '');
          setAddress(userResume.address || '');
          setEmail(userResume.email || '');
          setPhone(userResume.phone || '');
          setProfileImage(userResume.profileImage || null);

          // Update field values and set fields to active if they have a value
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
          });
        }
      }
    } catch (error) {
      console.log('Failed to fetch data from storage:', error);
    }
  };

  useEffect(() => {
    getDataFromStorage();
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

    const resumeId = (await AsyncStorage.getItem('resumeId')) || generateUUID();

    const profileData = {
      message: 'Profile created successfully',
      profile: {
        personalInfo: {
          fullName: name,
          address: address,
          email: email,
          phone: phone,
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
          _id: generateUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        _id: resumeId,
        education: [],
        experience: [],
        skills: [],
        projects: [],
        interests: [],
        achievements: [],
        languages: [],
        activities: [],
        publications: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0,
      },
    };

    await saveDataToStorage(resumeId, profileData);
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeView}>
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
                    onSave={handleSave}
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
    </SafeAreaView>
  );
};

export default PersonalDetails;
