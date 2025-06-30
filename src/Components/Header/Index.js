import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useTheme} from '../../Theme/ ThemeContext';
import getStyles from './style';
import {Images} from '../../Assets/Images';

const Header = ({title, headerIcon, onPress}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.headerView}>
      <TouchableOpacity onPress={onPress}>
        <Image source={headerIcon} style={styles.barIcon} />
      </TouchableOpacity>
      <Text style={styles.mainTitle}>{title}</Text>
    </View>
  );
};

export default Header;
