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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../../Assets/Images';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { getActivites } from '../../../../lib/api';
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

const Activites = () => {
  const [resumeId, setResumeId] = useState(null);
  const [activites, setActivites] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const getResumeId = async () => {
      try {
        const id = await AsyncStorage.getItem('profileId');
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
      getAllActivites();
    }
  }, [resumeId]);

  const getAllActivites = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const response = await getActivites(resumeId);
      console.log(response);

      if (response.status === 200 && response.data?.activities) {
        setActivites(response.data.activities);
      } else {
        console.log(response?.data?.message || 'Unexpected response.');
      }
    } catch (error) {
      console.error(
        'Error fetching Activities:',
        error?.response?.data?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleEdit = item => {
    navigation.navigate('Update Activity', {activityData: item});
  };

  const handleDelete = async skillId => {
    try {
      const response = await deleteSkill({resumeId, skillId});

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Skill deleted successfully!',
          text2: response?.data?.message || 'The entry has been removed.',
          position: 'bottom',
        });
        getAllActivites();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Deletion failed!',
          text2: response?.data?.message || 'Please try again later.',
          position: 'bottom',
        });
      }
    } catch (error) {
      console.error('Error deleting Activites:', error);
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

  const renderActivitesItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.course}>{item.activity}</Text>
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
        <View style={styles.createNew}>
          <Text style={styles.title}>Activites</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Add Activities')}>
            <Image source={Images.add} style={styles.addIcon} />
            <Text style={styles.addText}>Add New</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          renderLoader()
        ) : (
          <FlatList
            data={activites}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderActivitesItem}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={getAllActivites}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Activites;
