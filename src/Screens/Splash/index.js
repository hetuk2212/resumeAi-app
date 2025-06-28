import React, {useEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Images} from '../../Assets/Images';
import styles from './style';
import {useTheme} from '../../Theme/ ThemeContext';

const Splash = ({navigation}) => {
  const {theme} = useTheme();

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withTiming(1, {duration: 1500});
    scale.value = withTiming(1, {duration: 1500});

    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{scale: scale.value}],
  }));

  return (
    <LinearGradient
      colors={[theme.white, theme.white]}
      style={styles.container}>
      <Animated.Image
        source={Images.MainLogo}
        style={[styles.logo, animatedStyle]}
        resizeMode="contain"
      />
    </LinearGradient>
  );
};

export default Splash;
