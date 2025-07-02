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
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {useTheme} from '../../Theme/ThemeContext';

const FieldsToggleModal = ({visible, fields, onToggle, onClose}) => {
  const {theme} = useTheme();
  const screenHeight = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: theme.backgroundColor,
      maxHeight: screenHeight * 0.7,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      overflow: 'hidden',
    },
    handleBar: {
      width: 40,
      height: 5,
      backgroundColor: theme.textSecondary,
      borderRadius: 3,
      alignSelf: 'center',
      marginVertical: 10,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.textColor,
    },
    closeButton: {
      fontSize: 24,
      color: theme.textColor,
    },
    modalContent: {
      paddingHorizontal: 20,
    },
    modalDescription: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 10,
      paddingHorizontal: 5,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 30,
    },
    fieldItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    fieldLabel: {
      fontSize: 16,
      color: theme.textColor,
    },
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        style={styles.modalOverlay}
      >
        <Pressable style={styles.modalContainer} onPress={() => {}}>
          <View style={styles.handleBar} />

          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add More Personal Info</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <Text style={styles.modalDescription}>
              Click the switch button to Enable/Disable any profile fields
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
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
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default FieldsToggleModal;
