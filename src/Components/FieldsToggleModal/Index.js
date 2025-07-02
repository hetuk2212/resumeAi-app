import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import { useTheme } from '../../Theme/ ThemeContext';

const FieldsToggleModal = ({ visible, fields, onToggle, onClose }) => {
  const { theme } = useTheme();
  const screenHeight = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: theme.resumeListCardBackground,
      maxHeight: screenHeight * 0.85,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 15,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.secondary,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.black,
    },
    closeButton: {
      fontSize: 24,
      color: theme.black,
    },
    modalContent: {
      padding: 20,
    },
    modalDescription: {
      fontSize: 14,
      color: theme.smallText,
      marginBottom: 20,
    },
    fieldItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      
    },
    fieldLabel: {
      fontSize: 16,
      color: theme.black,
      flex: 1,
      marginRight: 15,
    },
    handleBar: {
      width: 40,
      height: 5,
      backgroundColor: theme.textSecondary,
      borderRadius: 3,
      alignSelf: 'center',
      marginVertical: 10,
    },
    scrollContainer: {
      flexGrow: 1,
    },
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        {/* This Pressable handles clicks outside the modal */}
        <Pressable 
          style={StyleSheet.absoluteFill} 
          onPress={onClose} 
        />
        
        <View style={styles.modalContainer}>
          <View style={styles.handleBar} />

          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add More Personal Info</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={{
              maxHeight: screenHeight * 0.7, // Adjust this as needed
            }}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false} // Disables the elastic/bounce effect on iOS
            overScrollMode="never" // Disables the over-scroll effect on Android
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalDescription}>
                Click the switch button to Enable/Disable any profile fields
              </Text>

              {fields.map((field, index) => (
                <View key={index} style={styles.fieldItem}>
                  <Text style={styles.fieldLabel}>{field.label}</Text>
                  <ToggleSwitch
                    isOn={field.isActive}
                    onColor="#4CAF50"
                    offColor="#9E9E9E"
                    size="medium"
                    onToggle={() => onToggle(index)}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default FieldsToggleModal;