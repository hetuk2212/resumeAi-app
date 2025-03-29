import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Images } from '../../Assets/Images';
import styles from './style';

const Splash = ({ navigation }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const [token, setToken] = useState(null); // State to store token

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1500 });
    scale.value = withTiming(1, { duration: 1500 });

    const checkLoginStatus = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate splash delay

      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken); // Set token in state for debugging
        if (storedToken) {
          navigation.replace('MainApp'); // Navigate to home if logged in
        } else {
          navigation.replace('Onboarding'); // Show onboarding if not logged in
        }
      } catch (error) {
        console.error('Error fetching token:', error);
        navigation.replace('Onboarding'); // Default to onboarding on error
      }
    };

    checkLoginStatus();
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <LinearGradient colors={['#ffffff', '#ffffff']} style={styles.container}>
      <Animated.Image
        source={Images.MainLogo}
        style={[styles.logo, animatedStyle]}
        resizeMode="contain"
      />
      {/* ✅ Show token for debugging */}
      {token !== null && <Text style={{ marginTop: 20, fontSize: 16, color: 'black' }}>Token: {token}</Text>}
    </LinearGradient>
  );
};

export default Splash;
