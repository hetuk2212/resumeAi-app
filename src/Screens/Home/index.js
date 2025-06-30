import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {Images} from '../../Assets/Images';
import getStyles from './style';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomDrawer from '../../Components/CustomDrawer/Index';
import Header from '../../Components/Header/Index';
import { useTheme } from '../../Theme/ ThemeContext';

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

const Home = () => {
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize as true
  const [refreshing, setRefreshing] = useState(false);
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {theme} = useTheme();
  const styles = getStyles(theme);

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
      await new Promise(resolve => setTimeout(resolve, 2000));

      const resumesData = await AsyncStorage.getItem('resumes');
      if (resumesData) {
        const resumes = JSON.parse(resumesData);
        const sortedProfiles = resumes.sort(
          (a, b) =>
            new Date(b.profile?.createdAt || 0) -
            new Date(a.profile?.createdAt || 0),
        );
        setProfiles(sortedProfiles);
      } else {
        setProfiles([]);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to load profiles',
        text2: error.message || 'Something went wrong!',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleCreateNewResume = async () => {
    try {
      await AsyncStorage.removeItem('resumeId');
      navigation.navigate('Profile');
    } catch (error) {
      console.log('Error removing profileId:', error);
    }
  };

  const handleEdit = async profileId => {
    try {
      await AsyncStorage.setItem('resumeId', profileId);
      navigation.navigate('Profile');
    } catch (error) {
      console.log('Error setting resumeId:', error);
    }
  };

  const handleDelete = async profileId => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const updatedProfiles = profiles.filter(
        item => item.profile?._id !== profileId,
      );
      await AsyncStorage.setItem('resumes', JSON.stringify(updatedProfiles));
      setProfiles(updatedProfiles);
      setVisibleDropdown(null);
      Toast.show({
        type: 'success',
        text1: 'Resume deleted successfully',
        position: 'bottom',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to delete resume',
        text2: error.message || 'Something went wrong!',
        position: 'bottom',
      });
    }
  };

  const toggleDropdown = id => {
    setVisibleDropdown(visibleDropdown === id ? null : id);
  };

  const renderLoader = () => (
    <View>
      {[1, 2, 3].map((_, index) => (
        <View key={index} style={styles.allResumeLoader}>
          <View style={styles.accountDetails}>
            <ShimmerEffect style={styles.profileAccount} />
            <View style={{flex: 1, gap: 5}}>
              <ShimmerEffect style={styles.loaderText} />
              <ShimmerEffect style={styles.loaderTextSmall} />
              <ShimmerEffect style={styles.loaderTextSmall} />
            </View>
          </View>

          <View style={styles.spareteBorder} />

          <View style={styles.resumeTime}>
            <ShimmerEffect style={{width: 120, height: 12, borderRadius: 6}} />
            <ShimmerEffect style={styles.loaderCircleSmall} />
          </View>
        </View>
      ))}
    </View>
  );

  const renderResumeItem = ({item}) => (
    <View style={styles.allResume}>
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => handleEdit(item.profile?._id)}>
        <View style={styles.accountDetails}>
          <Image
            source={
              item.profile?.personalInfo?.profileImage?.uri
                ? {uri: item.profile.personalInfo.profileImage.uri}
                : Images.profileAccount
            }
            style={styles.profileAccount}
          />
          <View>
            <Text style={styles.accountName}>
              {item.profile?.personalInfo?.fullName || 'N/A'}
            </Text>
            <Text style={styles.accountEmail}>
              {item.profile?.personalInfo?.email || 'N/A'}
            </Text>
            <Text style={styles.accountEmail}>
              {item.profile?.personalInfo?.position || 'N/A'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.spareteBorder}></View>
      <View style={styles.resumeTime}>
        <Text style={styles.accountTimeText}>
          Last update:{' '}
          {new Date(
            item.profile?.updatedAt || item.profile?.createdAt,
          ).toLocaleString()}
        </Text>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.dotBtn}
            onPress={() => toggleDropdown(item.profile?._id)}>
            <Image source={Images.dots} style={styles.dotIcon} />
          </TouchableOpacity>

          {visibleDropdown === item.profile?._id && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleDelete(item.profile?._id)}>
                <Text style={styles.dropdownText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Image source={Images.noResumeIcon} style={styles.emptyImage} />
      <TouchableOpacity
        style={styles.createResumeBtn}
        onPress={handleCreateNewResume}>
        <Text style={styles.createResumeBtnText}>
          Create your first resume now
        </Text>
        <Image source={Images.rightArrowIcon} style={styles.rightIcon} />
      </TouchableOpacity>
    </View>
  );

  const renderResumeList = () => (
    <>
      <TouchableOpacity
        style={styles.resumeBtn}
        onPress={handleCreateNewResume}>
        <View style={styles.createBtn}>
          <Image source={Images.add} style={styles.resumeBtnImg} />
        </View>
        <Text style={styles.resumeBtnText}>Create New Resume</Text>
      </TouchableOpacity>

      <FlatList
        data={profiles}
        renderItem={renderResumeItem}
        keyExtractor={item => item.profile?._id}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={getProfiles}
        contentContainerStyle={styles.resumeListContainer}
        ItemSeparatorComponent={() => <View style={{height: 15}} />}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        removeClippedSubviews={true}
        windowSize={10}
        updateCellsBatchingPeriod={50}
      />
    </>
  );

  const renderContent = () => {
    if (loading) {
      return renderLoader();
    }
    return profiles.length > 0 ? renderResumeList() : renderEmptyState();
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.white} />
      <View style={styles.container}>
        <Header
          title="Resume"
          headerIcon={Images.barIcon}
          onPress={() => setIsDrawerOpen(true)}
        />
        {renderContent()}
      </View>

      {visibleDropdown && (
        <TouchableWithoutFeedback onPress={() => setVisibleDropdown(null)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <CustomDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default Home;