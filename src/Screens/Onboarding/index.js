import React from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {Images} from '../../Assets/Images';
import {useNavigation} from '@react-navigation/native';
import styles from './style';

const Onboarding = () => {
  const navigation = useNavigation();
  const slides = [
    {image: Images.boarding1, text: 'Create a Professional Resume in Minutes!'},
    {
      image: Images.boarding2,
      text: 'AI-Powered Resume Builder for Your Dream Job!',
    },
    {image: Images.boarding3, text: 'Stand Out with a Stunning Resume!'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        autoplay
        loop
        dotColor="#C4C4C4"
        activeDotColor="#0194B5"
        style={styles.swiper}>
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <Image source={slide.image} style={styles.image} />
            <Text style={styles.slogan}>{slide.text}</Text>
          </View>
        ))}
      </Swiper>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Onboarding;
