import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import styles from './style';

const SubmitBtn = ({ onPress, buttonText, loading }) => {
  return (
    <TouchableOpacity
      style={[styles.buttonView, loading && { opacity: 0.5 }]} // Optional: Change opacity when loading
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text style={styles.buttonText}>{buttonText}</Text>
      )}
    </TouchableOpacity>
  );
};

export default SubmitBtn;
