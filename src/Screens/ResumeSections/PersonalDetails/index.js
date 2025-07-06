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
import Toast from 'react-native-toast-message';
import Header from '../../../Components/Header/Index';
import {useTheme} from '../../../Theme/ ThemeContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputText from '../../../Components/InputDesc/Index';

const PersonalDetails = () => {
  const [activeTab, setActiveTab] = useState('PersonalDetails');
  const [activePage, setActivePage] = useState('form');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nationality, setNationality] = useState('');
  const [personalWebsite, setPersonalWebsite] = useState('');
  const [position, setPosition] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [resumeId, setResumeId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigation = useNavigation();

  const {theme} = useTheme();
  const styles = getStyles(theme);

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
          setNationality(userResume.nationality || '');
          setPersonalWebsite(userResume.personalWebsite || '');
          setProfileImage(userResume.profileImage || null);
        }
      }
    } catch (error) {
      console.log('Failed to fetch data from storage:', error);
    }
  };

  useEffect(() => {
    getDataFromStorage();
  }, []);

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
          nationality: nationality,
          personalWebsite: personalWebsite,
          profileImage: profileImage || null,
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
              />
              <View>
                <CustomTextInput
                  label="Title"
                  placeholder="(optional)"
                  value={position}
                  onChangeText={setPosition}
                />
                <InputText InputText="Appears next to your name. You can write your current profession or the position you are applying for. Example: Salesperson, Project Manager." />
              </View>
              <CustomTextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
              />
              <View>
                <CustomTextInput
                  label="Address"
                  value={address}
                  onChangeText={setAddress}
                />
                <InputText InputText="Example: New York - NY" />
              </View>
              <CustomTextInput
                label="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <View>
                <CustomTextInput
                  label="Nationality"
                  placeholder="(optional)"
                  value={nationality}
                  onChangeText={setNationality}
                />
                <InputText InputText="Examples: American, British" />
              </View>
              <CustomTextInput
                label="Personal website"
                placeholder="(optional)"
                value={personalWebsite}
                onChangeText={setPersonalWebsite}
              />
              <ActionButtons
                onSave={handleSave}
                addIcon={Images.add}
                saveIcon={Images.check}
                loading={loading}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PersonalDetails;
