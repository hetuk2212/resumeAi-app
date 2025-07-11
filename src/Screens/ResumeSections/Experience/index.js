import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../../Assets/Images';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import getStyles from './style';
import dayjs from 'dayjs';
import {
  findResumeIndex,
  getResumesFromStorage,
} from '../../../../lib/asyncStorageUtils';
import {useTheme} from '../../../Theme/ ThemeContext';
import Header from '../../../Components/Header/Index';
import {SafeAreaView} from 'react-native-safe-area-context';
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

const Experience = () => {
  const [resumeId, setResumeId] = useState(null);
  const [experience, setExperience] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const {theme} = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault();

      navigation.navigate('Profile');
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const getResumeId = async () => {
      try {
        const id = await AsyncStorage.getItem('resumeId');
        if (id !== null) {
          setResumeId(id);
        } else {
          console.log('No resume ID found');
        }
      } catch (error) {
        console.log('Error fetching resume ID:', error);
      }
    };

    getResumeId();
  }, []);

  useEffect(() => {
    if (resumeId) {
      getAllExperience();
    }
  }, [resumeId]);

  const getAllExperience = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const existingResumesString = await AsyncStorage.getItem('resumes');
      let existingResumes = existingResumesString
        ? JSON.parse(existingResumesString)
        : [];

      if (!Array.isArray(existingResumes)) {
        console.error('Resume data is not an array:', existingResumes);
        existingResumes = [];
      }

      const resumeIndex = existingResumes.findIndex(
        r => r.profile?._id === resumeId,
      );

      console.log('as', existingResumes);
      console.log('as', resumeIndex);

      if (resumeIndex !== -1) {
        console.log('Resume found:', existingResumes[resumeIndex]);

        const experienceData =
          existingResumes[resumeIndex].profile.experience || [];

        setExperience(experienceData);
      } else {
        console.log('Resume not found for the given resumeId');
      }
    } catch (error) {
      console.error(
        'Error fetching experience:',
        error?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleEdit = item => {
    console.log('aa');

    navigation.navigate('Update Experience', {experienceData: item});
  };

  const handleDelete = async experienceId => {
    try {
      const existingResumes = await getResumesFromStorage();
      const resumeIndex = findResumeIndex(existingResumes, resumeId);

      if (resumeIndex !== -1) {
        existingResumes[resumeIndex].profile.experience = existingResumes[
          resumeIndex
        ].profile.experience.filter(
          experience => experience._id !== experienceId,
        );

        await AsyncStorage.setItem('resumes', JSON.stringify(existingResumes));
        setExperience(existingResumes[resumeIndex].profile.experience);

        Toast.show({
          type: 'success',
          text1: 'Experience deleted successfully!',
          text2: 'The entry has been removed.',
          position: 'bottom',
        });
        getAllExperience();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Deletion failed!',
          text2: 'Resume not found',
          position: 'bottom',
        });
      }
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  const renderLoader = () => (
    <View>
      {[1, 2, 3].map((_, index) => (
        <View key={index} style={styles.shimmerCard}>
          <View style={styles.cardHeader}>
            <ShimmerEffect style={styles.shimmerHeaderTitle} />
            <View style={styles.iconRow}>
              <ShimmerEffect style={[styles.shimmerIcon, {marginRight: 15}]} />
              <ShimmerEffect style={styles.shimmerIcon} />
            </View>
          </View>

          <View style={styles.detailBox}>
            <ShimmerEffect style={[styles.shimmerDetailLine, {width: '70%'}]} />
            <ShimmerEffect style={[styles.shimmerDetailLine, {width: '60%'}]} />
            <ShimmerEffect
              style={[
                styles.shimmerDetailLine,
                {width: '50%', marginBottom: 0},
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Image source={Images.noData} style={styles.emptyImage} />
      <Text style={styles.emptyText}>No Experience Found</Text>
      <Text style={styles.emptySubText}>
        Add your experience details to get started
      </Text>
    </View>
  );
  const renderExperienceItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.course}>{item.company}</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => handleEdit(item)}>
            <Image source={Images.edit} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(item._id)}
            style={{marginLeft: 15}}>
            <Image
              source={Images.delete}
              style={[styles.iconImage, {tintColor: 'red'}]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Details with labels */}
      <View style={styles.detailBox}>
        <Text style={styles.labelText}>
          <Text style={styles.label}>Job Title: </Text>
          {item.position}
        </Text>
        <Text style={styles.labelText}>
          <Text style={styles.label}>Start Date: </Text>
          {dayjs(item.startDate).format('D, MMMM, YYYY')}
        </Text>
        <Text style={styles.labelText}>
          <Text style={styles.label}>End Date: </Text>
          {dayjs(item.endDate).format('D, MMMM, YYYY')}
        </Text>
        <Text style={styles.labelText}>
          <Text style={styles.label}>Details: </Text>
          {item.description}
        </Text>
        <Text style={styles.labelText}>
          <Text style={styles.label}>Location: </Text>
          {item.location}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeView}>
      <StatusBar
        backgroundColor={theme.white}
        barStyle={theme.statusBarStyle}
        translucent={false}
      />
      <View style={styles.container}>
        <Header
          title="Experience"
          headerIcon={Images.leftArrowIcon}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
        <View style={styles.createNew}>
          <Text style={styles.title}>Experience</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Add Experience')}>
            <Image source={Images.add} style={styles.addIcon} />
            <Text style={styles.addText}>Add New</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          renderLoader()
        ) : (
          <FlatList
            data={experience}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderExperienceItem}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={getAllExperience}
            ListEmptyComponent={renderEmptyComponent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Experience;
