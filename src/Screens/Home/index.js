import {View, Text, SafeAreaView, TouchableOpacity, Image, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../../Assets/Images';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import Color from '../../Theme/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedData = JSON.parse(userData);
          console.log('parsedData', parsedData.user.phone);
          
          setUserName(parsedData.user.username || parsedData.user.phone || 'User');
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    getUserData();
  }, []);
  const handleCreateNewResume = async () => {
    try {
      await AsyncStorage.removeItem('resumeId');
      // await AsyncStorage.removeItem('resumes');
      navigation.navigate('Profile');
    } catch (error) {
      console.log('Error removing profileId:', error);
    }
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Color.primary}
      />
      <View style={styles.container}>
        <View style={styles.headerView}>
          <View style={styles.profileView}>
            <Text style={styles.profileText}>Welcome !</Text>
            <Text style={styles.profileName}>{userName}</Text>
          </View>
          <Image source={Images.profileAccount} style={styles.logoProfile} />
          <View style={styles.homeBox}>
            <View style={styles.homeBoxTextContainer}>
              <Text style={styles.homeBoxText}>Craft Your</Text>
              <Text style={styles.homeBoxText}>Career Story</Text>
            </View>
            <Image source={Images.HomeBox} style={styles.homeBoxImg} />
          </View>
        </View>

        <View style={styles.resumeView}>
          
          <TouchableOpacity style={styles.resumeBtn} onPress={() => {
            handleCreateNewResume();
          }}>
            <Image source={Images.edit} style={styles.resumeBtnImg} />
            <Text style={styles.resumeBtnText}>Create New</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.resumeBtn}
            onPress={() => {
              navigation.navigate('Choose Profile');
            }}>
            <Image source={Images.ViewAll} style={styles.resumeBtnImg} />
            <Text style={styles.resumeBtnText}>View All Resumes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
