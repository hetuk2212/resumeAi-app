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
} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import {Images} from '../../Assets/Images';
import {useNavigation} from '@react-navigation/native';

const sectionImages = {
  projects: Images.SectionProjects,
  'cover letter': Images.SectionLetter,
  'additional information': Images.SectionInfo,
  interests: Images.SectionInterests,
  achievements: Images.SectionAchievements,
  activities: Images.SectionActivities,
  languages: Images.SectionLanguages,
};

const Profile = () => {
  const [moreSections, setMoreSections] = useState([]);
  const [optionalSections, setOptionalSections] = useState({
    projects: true,
    'cover letter': true,
    'additional information': true,
    interests: false,
    achievements: false,
    activities: false,
    languages: false,
  });

  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const sections = [
    {id: 1, name: 'Personal Details', image: Images.SectionProfile},
    {id: 2, name: 'Education', image: Images.SectionEducation},
    {id: 3, name: 'Experience', image: Images.SectionExperience},
    {id: 4, name: 'Skills', image: Images.SectionSkills},
    {id: 5, name: 'Objective', image: Images.SectionObjective},
  ];

  const manageSections = [
    {id: 11, name: 'Rearrange / Edit Heading', image: Images.SectionArrange},
    {id: 12, name: 'Help', image: Images.SectionHelp},
  ];

  const navigation = useNavigation();

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

  const renderSection = (title, items, showAddButton = false) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{title}</Text>
      {[...items, showAddButton && {id: 'add-more-section', name: 'Add More Section', image: Images.SectionAdd}]
        .filter(Boolean)
        .map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.sectionBtn}
            onPress={() => {
              if (item.id === 'add-more-section') {
                setShowOptions(true);
              } else {
                navigation.navigate(item.name);
              }
            }}>
            <Image source={item.image} style={styles.sectionBtnImg} />
            <Text style={styles.sectionTitle}>{item.name}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{paddingHorizontal: 10, paddingBottom:50}}>
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
              {renderSection('Manage Section', manageSections)}
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
              <Button title="Cancel" color="red" onPress={() => setShowOptions(false)} />
              {moreSections
                .filter(section => section.isUserAdded)
                .map(section => (
                  <View key={section.id} style={styles.deleteSectionRow}>
                    <Text style={styles.sectionTitle}>{section.name}</Text>
                    <Button title="Delete" color="red" onPress={() => deleteSection(section.id)} />
                  </View>
                ))}
            </View>
          )}
        </ScrollView>
        <TouchableOpacity
          style={styles.viewBtn}
          onPress={() => {
            navigation.navigate('Choose Resume');
          }}>
          <Image source={Images.eye} style={styles.viewIcon} />
          <Text style={styles.viewText}>View CV</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
