import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '../../Theme/ ThemeContext';
import { moderateScale } from '../../../lib/responsive';

const CustomTextInput = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  errorMessage,
  secureTextEntry = false, 
  keyboardType = 'default',
  editable = true,
  multiline = false,
  numberOfLines = 4, 
  inputStyle = {}, 
}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          inputStyle
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={editable}
        keyboardType={keyboardType}
        placeholderTextColor="#888"
        multiline={multiline} // ✅ Important for multiline
        numberOfLines={numberOfLines} // ✅ Apply this too
        textAlignVertical={multiline ? 'top' : 'center'} // ✅ Ensures top-aligned for multiline
      />
       {errorMessage && <Text style={{ color: 'red', fontSize: 12, marginTop:3 }}>{errorMessage}</Text>}
    </View>
  );
};

const getStyles = theme =>
  StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  label: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    marginBottom: 5,
    color: theme.black,
  },
  input: {
    height: moderateScale(50),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color:theme.black,
    backgroundColor: theme.resumeListCardBackground,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
});

export default CustomTextInput;
