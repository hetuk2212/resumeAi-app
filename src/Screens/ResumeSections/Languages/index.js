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
import { deleteLanguage, getLanguages } from '../../../../lib/api';
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

const Languages = () => {
  const [resumeId, setResumeId] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();

      navigation.navigate('Profile');
    });

    return unsubscribe;
  }, [navigation]);

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
      getAllLanguages();
    }
  }, [resumeId]);

  const getAllLanguages = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const response = await getLanguages(resumeId);
      console.log(response);

      if (response.status === 200 && response.data?.languages) {
        setLanguages(response.data.languages);
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
    navigation.navigate('Update Language', {languageData: item});
  };

  const handleDelete = async languageId => {
    try {
      const response = await deleteLanguage({resumeId, languageId});

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Language deleted successfully!',
          text2: response?.data?.message || 'The entry has been removed.',
          position: 'bottom',
        });
        getAllLanguages();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Deletion failed!',
          text2: response?.data?.message || 'Please try again later.',
          position: 'bottom',
        });
      }
    } catch (error) {
      console.error('Error deleting Languages:', error);
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
      <Image 
        source={Images.noData}
        style={styles.emptyImage}
      />
      <Text style={styles.emptyText}>No Languages Found</Text>
      <Text style={styles.emptySubText}>Add your languages details to get started</Text>
    </View>
  );
  
  const renderLanguagesItem = ({item}) => {
    const renderStars = (rating = 0) => {
      return [...Array(5)].map((_, index) => (
        <Text
          key={index}
          style={{
            color: index < rating ? '#facc15' : '#e5e7eb',
            fontSize: 14,
            marginRight: 2,
          }}>
          ★
        </Text>
      ));
    };
    return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.course}>{item.language}</Text>
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
      {item.rating > 0 && (
          <View style={styles.ratingDisplay}>
            <View style={styles.starsRow}>{renderStars(item.rating)}</View>
            <Text style={styles.ratingText}>{item.rating}/5</Text>
          </View>
        )}
    </View>
  );
};

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <View style={styles.createNew}>
          <Text style={styles.title}>Languages</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Add Languages')}>
            <Image source={Images.add} style={styles.addIcon} />
            <Text style={styles.addText}>Add New</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          renderLoader()
        ) : (
          <FlatList
            data={languages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderLanguagesItem}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={getAllLanguages}
            ListEmptyComponent={renderEmptyComponent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Languages;
