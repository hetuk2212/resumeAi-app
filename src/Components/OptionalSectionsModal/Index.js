import React from 'react';
import {View, Text, TextInput, Button, Switch, StyleSheet} from 'react-native';
import Header from '../Header/Index';
import {Images} from '../../Assets/Images';
import {useTheme} from '../../Theme/ ThemeContext';
import {moderateScale} from '../../../lib/responsive';

const OptionalSectionsModal = ({
  optionalSections,
  toggleOptionalSection,
  newSectionTitle,
  setNewSectionTitle,
  addNewSection,
  onCancel,
  moreSections,
  deleteSection,
}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.optionsContainer}>
      <Header
        title="Customize Sections"
        headerIcon={Images.leftArrowIcon}
        onPress={onCancel}
      />
      <View style={styles.optionSection}>
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
      </View>
      {/* <Text style={styles.modalTitle}>Add New Section</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter section title"
        value={newSectionTitle}
        onChangeText={setNewSectionTitle}
      />
      <Button title="Add Section" onPress={addNewSection} />
      <Button title="Cancel" color="red" onPress={onCancel} /> */}
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
  );
};

const getStyles = theme =>
  StyleSheet.create({
    optionsContainer: {
      height: '100%',
      backgroundColor: theme.white,
      borderRadius: 10,
      padding: 10,
    },
    optionSection: {
      marginTop: 30,
    },
    optionalSectionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      backgroundColor: theme.resumeListCardBackground,
      padding: 10,
      borderRadius: 10,
    },
    sectionTitle: {
      fontSize: moderateScale(16),
      color: theme.black,
      fontWeight: 'bold',
    },
    modalTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
    },
    deleteSectionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
      padding: 10,
      backgroundColor: '#f8f8f8',
      borderRadius: 5,
    },
  });

export default OptionalSectionsModal;
