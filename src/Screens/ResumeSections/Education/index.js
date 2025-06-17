import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import Toast from 'react-native-toast-message';
import {deleteEducation, getEducation} from '../../../../lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../../Assets/Images';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
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

const Education = () => {
  const [resumeId, setResumeId] = useState(null);
  const [education, setEducation] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log('sas', education);
  console.log('sas', resumeId);

  const navigation = useNavigation();

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
      getAllEducation();
    }
  }, [resumeId]);

  const getAllEducation = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      // Retrieve existing resumes from AsyncStorage
      const existingResumesString = await AsyncStorage.getItem('resumes');
      let existingResumes = existingResumesString
        ? JSON.parse(existingResumesString)
        : [];

      if (!Array.isArray(existingResumes)) {
        console.error('Resumes data is not an array:', existingResumes);
        existingResumes = [];
      }

      // Find the index of the resume with the matching resumeId
      const resumeIndex = existingResumes.findIndex(
        r => r.profile?._id === resumeId,
      );

      console.log('as', existingResumes);
      console.log('as', resumeIndex);

      if (resumeIndex !== -1) {
        // Assuming the education data is stored within the resume object under a key 'education'
        console.log('Resume found:', existingResumes[resumeIndex]);
        const educationData =
          existingResumes[resumeIndex].profile.education || [];
        setEducation(educationData);
      } else {
        console.log('Resume not found for the given resumeId');
      }
    } catch (error) {
      console.error(
        'Error fetching education:',
        error?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleEdit = item => {
    navigation.navigate('Update Education', {educationData: item});
  };

  const handleDelete = async educationId => {
    try {
      const existingResumesString = await AsyncStorage.getItem('resumes');
      let existingResumes = existingResumesString
        ? JSON.parse(existingResumesString)
        : [];

      if (!Array.isArray(existingResumes)) {
        existingResumes = [];
      }

      const resumeIndex = existingResumes.findIndex(
        r => r.profile?._id === resumeId,
      );

      if (resumeIndex !== -1) {
        existingResumes[resumeIndex].profile.education = existingResumes[
          resumeIndex
        ].profile.education.filter(education => education._id !== educationId);

        await AsyncStorage.setItem('resumes', JSON.stringify(existingResumes));
        setEducation(existingResumes[resumeIndex].profile.education);
        Toast.show({
          type: 'success',
          text1: 'Education deleted successfully!',
          text2: 'The entry has been removed.',
          position: 'bottom',
        });
        getAllEducation();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Deletion failed!',
          text2: 'Resume not found.',
          position: 'bottom',
        });
      }
    } catch (error) {
      console.error('Error deleting education:', error);
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
      <Text style={styles.emptyText}>No Education Found</Text>
      <Text style={styles.emptySubText}>
        Add your education details to get started
      </Text>
    </View>
  );

  const renderEducationItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.course}>{item.course}</Text>
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
          <Text style={styles.label}>Universitys: </Text>
          {item.university}
        </Text>
        <Text style={styles.labelText}>
          <Text style={styles.label}>Grade: </Text>
          {item.grade}
        </Text>
        <Text style={styles.labelText}>
          <Text style={styles.label}>Durations: </Text>
          {item.startYear} - {item.endYear}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <View style={styles.createNew}>
          <Text style={styles.title}>Education</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Add Education')}>
            <Image source={Images.add} style={styles.addIcon} />
            <Text style={styles.addText}>Add New</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          renderLoader()
        ) : (
          <FlatList
            data={education}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderEducationItem}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={getAllEducation}
            ListEmptyComponent={renderEmptyComponent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Education;
