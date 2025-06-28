import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import getStyles from './style';
import { useTheme } from '../../Theme/ ThemeContext';

const SubmitBtn = ({ onPress, buttonText, loading }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <TouchableOpacity
      style={[styles.buttonView, loading && { opacity: 0.5 }]}
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
