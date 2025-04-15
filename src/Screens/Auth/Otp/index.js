import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import {verifyOtp} from '../../../../lib/api';
import {Images} from '../../../Assets/Images';
import AuthTitle from '../../../Components/AuthTitle/Index';
import SubmitBtn from '../../../Components/SubmitBtn/Index';

import styles from './style';

const Otp = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {phone} = route.params;
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && index > 0 && !otp[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    if (isLoading) return; // Prevent multiple requests

    const otpCode = otp.join('');
    if (otpCode.length !== 4) {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'Please enter the 4-digit OTP correctly.',
        position: 'bottom',
      });
      return;
    }

    const payload = {phone, otp: otpCode};
    console.log('Sending OTP Verification Payload:', payload); // Log payload

    setIsLoading(true);

    try {
      const response = await verifyOtp(payload);

      console.log('OTP Verification Success:', response);

      Toast.show({
        type: 'success',
        text1: 'OTP Verified',
        text2: 'Login successful!',
        position: 'bottom',
      });

      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'MainApp'}],
        });
      }, 1000);
    } catch (error) {
      console.log('OTP Verification Failed:', error);
      console.log('Error Details:', error.response?.data || error.message);

      Toast.show({
        type: 'error',
        text1: 'Verification Failed',
        text2:
          error.response?.data?.message || 'Invalid OTP, please try again.',
        position: 'bottom',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <AuthTitle
          backImg={Images.BackIcon}
          authTitle="OTP  Verification"
          onPress={() => navigation.goBack()}
        />

        <View style={styles.formView}>
          <Text style={styles.subtitle}>
            We have sent a verification code to {phone}
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref)}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={value => handleOtpChange(index, value)}
                onKeyPress={({nativeEvent}) =>
                  handleKeyPress(index, nativeEvent.key)
                }
              />
            ))}
          </View>

          <View style={styles.resendView}>
            <Text>Didn't get the OTP ? </Text>
            <TouchableOpacity>
              <Text style={styles.resendOtp}>Resend OTP</Text>
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity
          style={[styles.button, isLoading && styles.disabledButton]}
          onPress={handleVerifyOtp}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Verify OTP</Text>
          )}
        </TouchableOpacity> */}

          <SubmitBtn
            buttonText="Verify OTP"
            onPress={handleVerifyOtp}
            loading={isLoading}
          />
        </View>
      </View>

      <Toast />
    </SafeAreaView>
  );
};

export default Otp;
