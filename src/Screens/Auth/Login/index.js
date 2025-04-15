import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import Toast from 'react-native-toast-message';
import styles from './style';
import {sendOtp} from '../../../../lib/api';
import SubmitBtn from '../../../Components/SubmitBtn/Index';

const {width} = Dimensions.get('window');

const Login = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const phoneInputRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      // Reset loading state when screen is focused
      setIsLoading(false);
    }, [])
  );

  const handleContinue = async () => {
    if (isLoading) return;

    const countryCode = `+${phoneInputRef.current?.getCallingCode()}`;
    const fullPhoneNumber = `${countryCode}${phone.replace(/\D/g, '')}`;

    if (!phone || phone.length < 10) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Phone Number',
        text2: 'Please enter a valid phone number.',
        position: 'bottom',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await sendOtp(fullPhoneNumber);

      Toast.show({
        type: 'success',
        text1: 'OTP Sent Successfully',
        text2: `OTP sent to ${fullPhoneNumber}`,
        position: 'bottom',
      });

      setTimeout(() => {
        navigation.navigate('Otp', {phone: fullPhoneNumber});
      }, 1000);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.message || 'Failed to send OTP',
        position: 'bottom',
      });
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Log In</Text>
        <Text style={styles.title}>Welcome to ResuMe.ai</Text>
        <Text style={styles.subtitle}>
          Build your professional resume easily
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <PhoneInput
            ref={phoneInputRef}
            defaultValue={phone}
            defaultCode="IN"
            layout="second"
            onChangeText={setPhone}
            containerStyle={[styles.phoneInputContainer, {width: width * 0.9}]}
            textContainerStyle={styles.phoneTextContainer}
            textInputStyle={styles.phoneTextInput}
            textInputProps={{
              placeholder: 'Enter Phone Number',
              placeholderTextColor: '#999',
            }}
            withDarkTheme
            withShadow
            autoFocus
            countryPickerProps={{
              withFlag: true,
              withCountryNameButton: true,
              withAlphaFilter: true,
              withFilter: true,
            }}
          />
        </View>

        {/* <TouchableOpacity
          style={[styles.button, isLoading && styles.disabledButton]}
          onPress={handleContinue}
          disabled={isLoading}
          accessible
          accessibilityLabel="Continue">
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity> */}
        <SubmitBtn
          buttonText="Continue"
          onPress={handleContinue}
          loading={isLoading}
        />
      </View>

      <Toast />
    </SafeAreaView>
  );
};

export default Login;
