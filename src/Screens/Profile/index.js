import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  Switch,
  ActivityIndicator,
  StatusBar,
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

const sectionImages = {
  projects: Images.SectionProjects,
  'cover Latter': Images.SectionLetter,
  // 'additional information': Images.SectionInfo,
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
    // 'additional information': true,
    interests: false,
    achievements: false,
    activities: false,
    languages: true,
  });

  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const sections = [
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

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault();

      navigation.navigate('MainApp');
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

      if (updatedSections[section]) {
        setMoreSections(prevSections => [
          ...prevSections,
          {
            id: `${section}-${Date.now()}`,
            name: section.charAt(0).toUpperCase() + section.slice(1),
            image: sectionImages[section] || Images.profile, // Use correct image
          },
        ]);
      } else {
        setMoreSections(prevSections =>
          prevSections.filter(item => item.name.toLowerCase() !== section),
        );
      }

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

    navigation.navigate(item.name);
  };

  const renderSection = (title, items, showAddButton = false) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{title}</Text>
      <View style={styles.sectionBtnContainer}>
        {[
          ...items,
          showAddButton && {
            id: 'add-more-section',
            name: 'Add More Section',
            image: Images.SectionAdd,
          },
        ]
          .filter(Boolean)
          .map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.sectionBtn}
              onPress={() => {
                if (item.id === 'add-more-section') {
                  setShowOptions(true);
                } else {
                  handleNavigation(item);
                }
              }}>
              <Image source={item.image} style={styles.sectionBtnImg} />
              <Text style={styles.sectionTitle}>{item.name}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );

  useEffect(() => {
    if (resumeId) {
      getResumeInfo();
    }
  }, [resumeId]);

  const getResumeInfo = async () => {
    setIsLoading(true);
    try {
      // 1. Get all resumes from storage
      const existingResumes = await getResumesFromStorage();
      const resumeIndex = findResumeIndex(existingResumes, resumeId);

      const profile = existingResumes[resumeIndex].profile;

      // 3. Update states
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
        translucent
        backgroundColor={Color.primary}
        barStyle="light-content"
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" style={styles.loader} />
      ) : (
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{paddingHorizontal: 10, paddingBottom: 50}}>
            {!showOptions && (
              <>
                {renderSection('Sections', sections)}
                {renderSection(
                  'Optional Sections',
                  Object.entries(optionalSections)
                    .filter(([_, isActive]) => isActive)
                    .map(([key]) => ({
                      id: `${key}-${Date.now()}`,
                      name: key.charAt(0).toUpperCase() + key.slice(1),
                      image: sectionImages[key] || Images.SectionInfo, // Use correct image
                    })),
                  true,
                )}
              </>
            )}
            {showOptions && (
              <View style={styles.optionsContainer}>
                <Text style={styles.sectionHeader}>Optional Sections</Text>
                {Object.entries(optionalSections).map(([key, value]) => (
                  <View key={key} style={styles.optionalSectionRow}>
                    <Text style={styles.sectionTitle}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Text>
                    <Switch
                      value={value}
                      onValueChange={() => toggleOptionalSection(key)}
                    />
                  </View>
                ))}
                <Text style={styles.modalTitle}>Add New Section</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter section title"
                  value={newSectionTitle}
                  onChangeText={setNewSectionTitle}
                />
                <Button title="Add Section" onPress={addNewSection} />
                <Button
                  title="Cancel"
                  color="red"
                  onPress={() => setShowOptions(false)}
                />
                {moreSections
                  .filter(section => section.isUserAdded)
                  .map(section => (
                    <View key={section.id} style={styles.deleteSectionRow}>
                      <Text style={styles.sectionTitle}>{section.name}</Text>
                      <Button
                        title="Delete"
                        color="red"
                        onPress={() => deleteSection(section.id)}
                      />
                    </View>
                  ))}
              </View>
            )}
          </ScrollView>
          <TouchableOpacity
            style={styles.viewBtn}
            onPress={() => {
              handleViewCV(profileInfo);
            }}>
            <Image source={Images.eye} style={styles.viewIcon} />
            <Text style={styles.viewText}>View CV</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;
