import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '../../Theme/ ThemeContext';
import getStyles from './style';

const InputText = ({InputText}) => {
    const {theme} = useTheme();
  const styles = getStyles(theme);
  return (
    <View>
      <Text style={styles.descText}>{InputText}</Text>
    </View>
  )
}

export default InputText