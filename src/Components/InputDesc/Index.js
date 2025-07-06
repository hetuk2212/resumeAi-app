import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '../../Theme/ ThemeContext';

const InputText = ({InputText}) => {
    const {theme} = useTheme();
  const styles = getStyles(theme);
  return (
    <View>
      <Text>{InputText}</Text>
    </View>
  )
}

export default InputText