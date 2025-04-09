import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

const CustomTextInput = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  errorMessage,
  secureTextEntry = false, 
  keyboardType = 'default',
  editable = true, 
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={editable}
        keyboardType={keyboardType}
        placeholderTextColor="#888"
      />
       {errorMessage && <Text style={{ color: 'red', fontSize: 12 }}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color:"#000000",
    backgroundColor: '#fff',
  },
});

export default CustomTextInput;
