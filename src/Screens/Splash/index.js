import React, {useEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Images} from '../../Assets/Images';
import styles from './style';
import {getProfile} from '../../../lib/api';

const Splash = ({navigation}) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const [token, setToken] = useState(null);

  useEffect(() => {
    opacity.value = withTiming(1, {duration: 1500});
    scale.value = withTiming(1, {duration: 1500});

    // const checkLoginStatus = async () => {
    //   await new Promise(resolve => setTimeout(resolve, 2000));

    //   try {
    //     const storedToken = await AsyncStorage.getItem('token');
    //     setToken(storedToken);
    //     if (storedToken) {
    //       navigation.replace('MainApp');
    //     } else {
    //       navigation.replace('Onboarding');
    //     }
    //   } catch (error) {
    //     console.error('Error fetching token:', error);
    //     navigation.replace('Onboarding');
    //   }
    // };

    const checkLoginStatus = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));

      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (!storedToken) {
          navigation.replace('Onboarding');
          return;
        }

        setToken(storedToken);

        const response = await getProfile();

        if (response.status === 200) {
          navigation.replace('MainApp');
        } else {
          navigation.replace('Onboarding');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        await AsyncStorage.removeItem('token');
        navigation.replace('Onboarding');
      }
    };

    checkLoginStatus();
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{scale: scale.value}],
  }));

  return (
    <LinearGradient colors={['#ffffff', '#ffffff']} style={styles.container}>
      <Animated.Image
        source={Images.MainLogo}
        style={[styles.logo, animatedStyle]}
        resizeMode="contain"
      />
    </LinearGradient>
  );
};

export default Splash;
