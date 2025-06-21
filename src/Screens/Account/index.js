import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {deleteUser, logout} from '../../../lib/api';
import Toast from 'react-native-toast-message';
import {Images} from '../../Assets/Images';
import styles from './style';
import Color from '../../Theme/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Account = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedData = JSON.parse(userData);
          console.log('parsedData', parsedData.user.phone);

          setUserName(
            parsedData.user.username || parsedData.user.phone || 'User',
          );
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    getUserData();
  }, []);

  const handleDeleteUser = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your account? This action cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await deleteUser();
              console.log('response', response);

              Toast.show({
                type: 'success',
                text1: 'Account Deleted',
                text2: 'Your account has been deleted successfully.',
                position: 'bottom',
              });

              setTimeout(() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Login'}],
                });
              }, 1000);
            } catch (error) {
              console.log('Error deleting user:', error);
              Toast.show({
                type: 'error',
                text1: 'Delete Failed',
                text2: error.response?.data?.message || 'Something went wrong!',
                position: 'bottom',
              });
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {text: 'Cancel', style: 'cancel'},
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

              setTimeout(() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Login'}],
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
      {cancelable: true},
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar
        translucent
        backgroundColor={Color.primary}
        barStyle="light-content"
      />
      <View style={styles.container}>
        {/* Profile Section */}
        {/* <View style={styles.profileSection}>
          <Image source={Images.profileAccount} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Profiles</Text>
            <Text style={styles.userEmail}>{userName}</Text>
          </View>
        </View> */}

        {/* Account Options */}
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonTitle}>Easy Resume Builder</Text>
          <View style={styles.optionContainer}>
            {/* <TouchableOpacity
              style={styles.option}
              onPress={() => navigation.navigate('AccountDetails')}>
              <Image source={Images.profile} style={styles.icon} />
              <Text style={styles.optionText}>View Account Details</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={styles.option}
              onPress={() => navigation.navigate('Settings')}>
              <Image source={Images.policy} style={styles.icon} />
              <Text style={styles.optionText}>Privacy Policy</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.option}
              onPress={() => navigation.navigate('Settings')}>
              <Image source={Images.settings} style={styles.icon} />
              <Text style={styles.optionText}>Account Settings</Text>
            </TouchableOpacity> */}
          </View>
        </View>

        {/* More Options */}
        {/* <View style={styles.buttonContainer}>
          <Text style={styles.buttonTitle}>More Settings</Text>

          <View style={styles.optionContainer}>
            <TouchableOpacity style={styles.option}>
              <Image source={Images.support} style={styles.icon} />
              <Text style={styles.optionText}>Support & Help</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, {borderColor: 'red'}]}
              onPress={handleDeleteUser}>
              <Image source={Images.delete} style={styles.icon} />
              <Text style={styles.optionText}>Delete Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.option, styles.logout]}
              onPress={handleLogout}>
              <Image
                source={Images.logout}
                style={[styles.icon, {tintColor: 'red'}]}
              />
              <Text style={[styles.optionText, {color: 'red'}]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </View>

      {/* Toast Notification */}
      <Toast />
    </SafeAreaView>
  );
};

export default Account;
