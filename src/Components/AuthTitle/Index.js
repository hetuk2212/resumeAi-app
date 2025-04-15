import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';

const AuthTitle = ({authTitle, backImg, onPress,rightIcon}) => {
  return (
    <View style={styles.headerTitle}>
      <View style={styles.headerAuthDetails}>
      <TouchableOpacity style={styles.backIconImgView} onPress={onPress}>
        <Image style={styles.backIconImg} source={backImg} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{authTitle}</Text>
      </View>
      <TouchableOpacity>
        <Image source={rightIcon}/>
      </TouchableOpacity>
    </View>
  );
};

export default AuthTitle;
