import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StatusBar,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import {Images} from '../../Assets/Images';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSpecificProfile} from '../../../lib/api';
import Color from '../../Theme/Color';
import {
  findResumeIndex,
  getResumesFromStorage,
} from '../../../lib/asyncStorageUtils';
import Header from '../../Components/Header/Index';
import {useTheme} from '../../Theme/ ThemeContext';
import getStyles from './style';
import OptionalSectionsModal from '../../Components/OptionalSectionsModal/Index';
import {SafeAreaView} from 'react-native-safe-area-context';

const sectionImages = {
  projects: Images.SectionProjects,
  'cover Latter': Images.SectionLetter,
  interests: Images.SectionInterests,
  achievements: Images.SectionAchievements,
  activities: Images.SectionActivities,
  languages: Images.SectionLanguages,
};

const Profile = () => {
  const [resumeId, setResumeId] = useState(null);
  const [moreSections, setMoreSections] = useState([]);
  const [optionalSections, setOptionalSections] = useState({
    projects: true,
    'Cover Latter': true,
    interests: false,
    achievements: false,
    activities: false,
    languages: true,
  });

  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {theme} = useTheme();
  const styles = getStyles(theme);

  const baseSections = [
    {id: 1, name: 'Personal Details', image: Images.SectionProfile},
    {
      id: 2,
      name: !resumeId ? 'Add Education' : 'Education',
      image: Images.SectionEducation,
    },
    {id: 3, name: 'Experience', image: Images.SectionExperience},
    {id: 4, name: 'Skills', image: Images.SectionSkills},
    {id: 5, name: 'Objective', image: Images.SectionObjective},
  ];

  // Combine base sections with active optional sections
  const allSections = [
    ...baseSections,
    ...Object.entries(optionalSections)
      .filter(([_, isActive]) => isActive)
      .map(([key]) => ({
        id: `${key}-${Date.now()}`,
        name: key.charAt(0).toUpperCase() + key.slice(1),
        image: sectionImages[key] || Images.SectionInfo,
      })),
    {
      id: 'add-more-section',
      name: 'Add More Section',
      image: Images.SectionAdd,
    },
  ];

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault();

      navigation.navigate('Home');
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const getResumeId = async () => {
      try {
        const id = await AsyncStorage.getItem('resumeId');
        if (id !== null) {
          setResumeId(id);
        } else {
          console.log('No resume ID found');
        }
      } catch (error) {
        console.log('Error fetching resume ID:', error);
      }
    };

    getResumeId();
  }, []);

  const addNewSection = () => {
    if (newSectionTitle.trim()) {
      const newSection = {
        id: `${newSectionTitle}-${Date.now()}`,
        name: newSectionTitle,
        image: Images.profile,
        isUserAdded: true,
      };

      setMoreSections(prevSections => [...prevSections, newSection]);
      setOptionalSections(prev => ({
        ...prev,
        [newSectionTitle.toLowerCase()]: true,
      }));

      setNewSectionTitle('');
      setShowOptions(false);
    }
  };

  const toggleOptionalSection = section => {
    setOptionalSections(prev => {
      const updatedSections = {
        ...prev,
        [section]: !prev[section],
      };

      return updatedSections;
    });
    setShowOptions(false);
  };

  const deleteSection = sectionId => {
    setMoreSections(prevSections =>
      prevSections.filter(item => item.id !== sectionId),
    );
    setOptionalSections(prev => {
      const sectionName = sectionId.split('-')[0];
      const updatedSections = {...prev};
      delete updatedSections[sectionName.toLowerCase()];
      return updatedSections;
    });
  };

  const handleNavigation = item => {
    if (!resumeId && item.name !== 'Personal Details') {
      Toast.show({
        type: 'error',
        text1: 'Missing Personal Details',
        text2:
          'Please fill in Personal Details before accessing other sections.',
        position: 'bottom',
      });
      return;
    }

    if (item.id === 'add-more-section') {
      setShowOptions(true);
      return;
    }

    navigation.navigate(item.name);
  };

  useEffect(() => {
    if (resumeId) {
      getResumeInfo();
    }
  }, [resumeId]);

  const getResumeInfo = async () => {
    setIsLoading(true);
    try {
      const existingResumes = await getResumesFromStorage();
      const resumeIndex = findResumeIndex(existingResumes, resumeId);
      const profile = existingResumes[resumeIndex].profile;

      setProfileInfo(profile);
      setOptionalSections(prev => ({
        ...prev,
        interests: profile?.interests?.length > 0 || false,
        achievements: profile?.achievements?.length > 0 || false,
        activities: profile?.activites?.length > 0 || false,
        languages: profile?.languages?.length > 0 || false,
      }));
    } catch (error) {
      console.log('Error getting resume:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewCV = profileInfo => {
    if (resumeId) {
      navigation.navigate('Choose Resume', {resumeData: profileInfo});
    } else {
      Toast.show({
        type: 'info',
        text1: 'Missing Personal Information',
        text2:
          'Please fill in your personal details before viewing the resume.',
        position: 'bottom',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <StatusBar
        backgroundColor={theme.white}
        barStyle={theme.statusBarStyle}
        translucent={false}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" style={styles.loader} />
      ) : (
        <View style={styles.container}>
          <Header
            title="Edit Resume"
            headerIcon={Images.leftArrowIcon}
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 50}}>
            {!showOptions && (
              <View style={styles.sectionContainer}>
                <View style={styles.sectionBtnContainer}>
                  {allSections.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.sectionBtn}
                      onPress={() => handleNavigation(item)}>
                      <Image source={item.image} style={styles.sectionBtnImg} />
                      <Text style={styles.sectionTitle}>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <TouchableOpacity
              style={styles.viewBtn}
              onPress={() => {
                handleViewCV(profileInfo);
              }}>
              <Image source={Images.eye} style={styles.viewIcon} />
              <Text style={styles.viewText}>View CV</Text>
            </TouchableOpacity>
          </ScrollView>
          <Modal
            visible={showOptions}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowOptions(false)}
            statusBarTranslucent={true}>
            <SafeAreaView style={styles.modalOverlay}>
              <OptionalSectionsModal
                optionalSections={optionalSections}
                toggleOptionalSection={toggleOptionalSection}
                newSectionTitle={newSectionTitle}
                setNewSectionTitle={setNewSectionTitle}
                addNewSection={addNewSection}
                onCancel={() => setShowOptions(false)}
                moreSections={moreSections}
                deleteSection={deleteSection}
              />
            </SafeAreaView>
          </Modal>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;
