import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Images} from '../../Assets/Images';
import styles from './style';
import SpInAppUpdates, {IAUUpdateKind} from 'sp-react-native-in-app-updates';
import { useTheme } from '../../Theme/ ThemeContext';

const Splash = ({navigation}) => {
  const {theme} = useTheme();

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withTiming(1, {duration: 1500});
    scale.value = withTiming(1, {duration: 1500});

    const inAppUpdates = new SpInAppUpdates(false);
    inAppUpdates.checkNeedsUpdate().then(result => {
      if (result.shouldUpdate) {
        inAppUpdates.startUpdate({
          updateType: IAUUpdateKind.IMMEDIATE,
        });
      } else {
        setTimeout(() => {
          navigation.replace('Home');
        }, 2000);
      }
    }).catch(error => {
      console.log('Update check error:', error);
      setTimeout(() => {
        navigation.replace('Home');
      }, 2000);
    });
  }, [navigation]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{scale: scale.value}],
  }));

  return (
    <>
      <StatusBar
        backgroundColor={theme.white}  // Set to white
        barStyle="dark-content"         // Dark text/icons for visibility
        translucent={false}             // Content won't go under status bar
      />
      <LinearGradient 
        colors={[theme.white, theme.white]} 
        style={styles.container}
      >
        <Animated.Image
          source={Images.logoIcon}
          style={[styles.logo, animatedStyle]}
          resizeMode="contain"
        />
      </LinearGradient>
    </>
  );
};

export default Splash;