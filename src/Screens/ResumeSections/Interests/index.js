import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import getStyle from './style';
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
import {
  findResumeIndex,
  getResumesFromStorage,
} from '../../../../lib/asyncStorageUtils';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../Components/Header/Index';
import { useTheme } from '../../../Theme/ ThemeContext';
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

const Interests = () => {
  const [resumeId, setResumeId] = useState(null);
  const [interests, setInterests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const {theme} = useTheme()
  const styles = getStyle(theme)

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
      getAllInterests();
    }
  }, [resumeId]);

  const getAllInterests = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const existingResumes = await getResumesFromStorage();
      const resumeIndex = findResumeIndex(existingResumes, resumeId);
      if (resumeIndex !== -1) {
        const interestData =
          existingResumes[resumeIndex].profile.interests || [];
        setInterests(interestData);
      } else {
        console.log('Resume not found for the given resumeId');
      }
    } catch (error) {
      console.error(
        'Error fetching interests:',
        error?.response?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleEdit = item => {
    navigation.navigate('Update Interest', {interestData: item});
  };

  const handleDelete = async interestId => {
    try {
      const existingResumes = await getResumesFromStorage();
            const resumeIndex = findResumeIndex(existingResumes, resumeId);

      if (resumeIndex !== -1) {
        existingResumes[resumeIndex].profile.interests = existingResumes[
          resumeIndex
        ].profile.interests.filter(interests => interests._id !== interestId);

        await AsyncStorage.setItem('resumes', JSON.stringify(existingResumes));
        setInterests(existingResumes[resumeIndex].profile.skills);
        Toast.show({
          type: 'success',
          text1: 'Interests deleted successfully!',
          text2: 'The entry has been removed.',
          position: 'bottom',
        });
        getAllInterests();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Deletion failed!',
          text2: 'Please try again later.',
          position: 'bottom',
        });
      }
    } catch (error) {
      console.error('Error deleting interests:', error);
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
      <Text style={styles.emptyText}>No Interests Found</Text>
      <Text style={styles.emptySubText}>
        Add your interests details to get started
      </Text>
    </View>
  );

  const renderInterestsItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.course}>{item.interest}</Text>
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
    </View>
  );

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <Header title="Interests" headerIcon={Images.leftArrowIcon} onPress={()=>{
          navigation.navigate("Profile")
        }}/>
        <View style={styles.createNew}>
          <Text style={styles.title}>Interests</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Add Interests')}>
            <Image source={Images.add} style={styles.addIcon} />
            <Text style={styles.addText}>Add New</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          renderLoader()
        ) : (
          <FlatList
            data={interests}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderInterestsItem}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={getAllInterests}
            ListEmptyComponent={renderEmptyComponent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Interests;
