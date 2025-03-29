import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../../lib/api';
import Toast from 'react-native-toast-message';
import { Images } from '../../Assets/Images';
import styles from './style';

const Account = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await logout();

              Toast.show({
                type: 'success',
                text1: 'Logged Out',
                text2: 'You have successfully logged out.',
                position: 'bottom',
              });

              // Navigate to Login screen after a short delay
              setTimeout(() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              }, 1000);
            } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Logout Failed',
                text2: error.response?.data?.message || 'Something went wrong!',
                position: 'bottom',
              });
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Images.back} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Image source={Images.edit} style={styles.icon} />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={Images.profileAccount} style={styles.profileImage} />
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>johndoe@example.com</Text>
        </View>

        {/* Account Options */}
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonTitle}>My Account</Text>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('AccountDetails')}>
            <Image source={Images.profile} style={styles.icon} />
            <Text style={styles.optionText}>View Account Details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('Settings')}>
            <Image source={Images.policy} style={styles.icon} />
            <Text style={styles.optionText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('Settings')}>
            <Image source={Images.settings} style={styles.icon} />
            <Text style={styles.optionText}>Account Settings</Text>
          </TouchableOpacity>
        </View>

        {/* More Options */}
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonTitle}>More</Text>

          <TouchableOpacity style={styles.option}>
            <Image source={Images.support} style={styles.icon} />
            <Text style={styles.optionText}>Support & Help</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, styles.logout]}
            onPress={handleLogout}>
            <Image source={Images.logout} style={styles.icon} />
            <Text style={[styles.optionText, { color: 'red' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Toast Notification */}
      <Toast />
    </SafeAreaView>
  );
};

export default Account;
