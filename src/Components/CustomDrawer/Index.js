import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import getStyles from './style';
import {Images} from '../../Assets/Images';
import { useTheme } from '../../Theme/ ThemeContext';

const CustomDrawer = ({isOpen, onClose, navigation}) => {

  const { theme } = useTheme();
  const styles = getStyles(theme);
  const drawerTranslateX = useSharedValue(isOpen ? 0 : -250);



  React.useEffect(() => {
    drawerTranslateX.value = withTiming(isOpen ? 0 : -340, {duration: 300});
  }, [isOpen]);

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{translateX: drawerTranslateX.value}],
  }));

  return (
    <>
   
      <Animated.View style={[styles.drawer, drawerStyle]}>
        <SafeAreaView edges={['top', 'right', 'bottom']} style={{flex: 1}}>
        <View style={styles.drawerContent}>
          <SafeAreaView
            edges={['right', 'bottom']}
            style={{
              flex: 1,
              alignItems: 'center',
              width: '100%',
            }}>
            <Image source={Images.logoIcon} style={styles.logoIcon} />
            <Text style={styles.title}>Easy Resume PDF</Text>
            <View style={{width: '100%', marginTop: 40}}>
              <View style={styles.menuBtn}>
                <Image source={Images.ratingIcon} style={styles.menuBtnIcon} />
                <Text style={styles.menuBtnText}>Rate App</Text>
              </View>
              <View style={styles.menuBtn}>
                <Image source={Images.shareIcon} style={styles.menuBtnIcon} />
                <Text style={styles.menuBtnText}>Share app</Text>
              </View>
              <View style={styles.menuBtn}>
                <Image source={Images.termsIcon} style={styles.menuBtnIcon} />
                <Text style={styles.menuBtnText}>Privacy Policy</Text>
              </View>
              <View style={styles.menuBtn}>
                <Image source={Images.privacyIcon} style={styles.menuBtnIcon} />
                <Text style={styles.menuBtnText}>Service Terms</Text>
              </View>
            </View>
          </SafeAreaView>
        </View>
        </SafeAreaView>
      </Animated.View>

      {isOpen && (
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

export default CustomDrawer;
