import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  deleteResume,
  getAllProfileInfo,
  getSpecificProfile,
} from '../../../lib/api';
import Toast from 'react-native-toast-message';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Images} from '../../Assets/Images';

const ShimmerEffect = ({style}) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, {duration: 1000}), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={[style, animatedStyle]} />;
};

const ChooseProfile = () => {
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProfiles();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getProfiles();
    }, []),
  );

  const getProfiles = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const resumesData = await AsyncStorage.getItem('resumes');
      if (resumesData) {
        const resumes = JSON.parse(resumesData);
        console.log(resumes[0], 'sasd');

        const sortedProfiles = resumes.sort(
          (a, b) =>
            new Date(b.profile?.createdAt || 0) -
            new Date(a.profile?.createdAt || 0),
        );
        setProfiles(sortedProfiles);
      } else {
        setProfiles([]);
        Toast.show({
          type: 'info',
          text1: 'No profiles found!',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to load profiles',
        text2: error.response?.message || 'Something went wrong!',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getResumeInfo = async profileId => {
    setIsLoading(true);
    try {
      const response = await getSpecificProfile(profileId);

      if (response.status === 200) {
        const profile = response.data.profile;
        // Navigate immediately with the response data
        navigation.navigate('Choose Resume', {resumeData: profile});
      }
    } catch (error) {
      console.log('Failed to fetch resume info:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to load resume',
        text2: error.response?.message || 'Something went wrong!',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async profileId => {
    try {
      const response = await deleteResume(profileId);
      console.log(response);

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: response.data.message || 'Profile deleted successfully!',
          position: 'bottom',
        });
        getProfiles();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to delete profile',
          position: 'bottom',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to delete profile',
        text2: error.response?.message || 'Something went wrong!',
        position: 'bottom',
      });
    }
  };
  // const handleCreateNew = async () => {
  //   try {
  //     await AsyncStorage.removeItem('profileId');
  //     navigation.navigate('Profile');
  //   } catch (error) {
  //     console.log('Error removing profileId:', error);
  //   }
  // };
  const handleEdit = async profileId => {
    try {
      await AsyncStorage.setItem('resumeId', profileId);
      navigation.navigate('Profile');
    } catch (error) {
      console.log('Error removing profileId:', error);
    }
  };
  const renderLoader = () => (
    <View>
      {[1, 2, 3].map((_, index) => (
        <View key={index} style={styles.profileBox}>
          <View style={styles.profileCount}>
            <ShimmerEffect style={styles.loaderBox} />
          </View>
          <TouchableOpacity style={styles.profileMenu}>
            <ShimmerEffect style={styles.loaderCircle} />
          </TouchableOpacity>
          <ShimmerEffect style={[styles.profileImg, styles.loaderCircle]} />
          <ShimmerEffect style={styles.loaderText} />
          <ShimmerEffect style={styles.loaderTextSmall} />
          <View style={styles.profileDateView}>
            <ShimmerEffect style={styles.loaderTextSmall} />
          </View>
          <View style={styles.profileBtnView}>
            <ShimmerEffect style={styles.loaderButton} />
            <ShimmerEffect style={styles.loaderButton} />
          </View>
        </View>
      ))}
    </View>
  );

  const renderItem = ({item, index}) => (
    <View style={styles.profileBox}>
      <View style={styles.profileCount}>
        <Text style={styles.profileCountText}>{index + 1}</Text>
      </View>

      <TouchableOpacity
        style={styles.profileMenu}
        onPress={() =>
          setVisibleDropdown(visibleDropdown === item._id ? null : item._id)
        }>
        <Image source={Images.dots} style={styles.dotsIconImg} />
      </TouchableOpacity>

      {visibleDropdown === item._id && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => handleDelete(item._id)}>
            <Text style={styles.dropdownText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.profileInfoView}>
        <Image
          source={
            item.profile?.personalInfo?.profileImage?.uri
              ? {uri: item.profile.personalInfo.profileImage.uri}
              : Images.profileAccount
          }
          style={styles.profileImg}
        />
        <View style={styles.profileInfoDetails}>
          <Text style={styles.profileName}>
            {item.profile?.personalInfo?.fullName || 'N/A'}
          </Text>
          <Text style={styles.profileEmail}>
            {item.profile?.personalInfo?.email || 'N/A'}
          </Text>
          <View style={styles.profileDateView}>
            <Text style={styles.profileDate}>
              {new Date(item.profile?.createdAt).toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.profileBtnView}>
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => handleEdit(item.profile?._id)}>
          <Image source={Images.edit} style={styles.ProfileIconImg} />
          <Text style={styles.profileBtnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => {
            getResumeInfo(item._id);
          }}>
          <Image source={Images.view} style={styles.ProfileIconImg} />
          <Text style={styles.profileBtnText}>View CV</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        {loading ? (
          renderLoader()
        ) : (
          <FlatList
            data={profiles}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={getProfiles}
          />
        )}
      </View>
      {/* <View style={styles.createBtnView}>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => {
            handleCreateNew();
          }}>
          <LinearGradient
            colors={['#5F7591', '#A0ADC1', '#7F91A9']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradientBtn}>
            <Image source={Images.add} style={styles.iconImg} />
            <Text style={styles.createText}>Create New Profile</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default ChooseProfile;
