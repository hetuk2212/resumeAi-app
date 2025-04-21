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
import {deleteSkill, getSkills} from '../../../../lib/api';
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

const Skills = () => {
  const [resumeId, setResumeId] = useState(null);
  const [skills, setSkills] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(skills);
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
      getAllSkills();
    }
  }, [resumeId]);

  const getAllSkills = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const response = await getSkills(resumeId);
      console.log(response);

      if (response.status === 200 && response.data?.skills) {
        setSkills(response.data.skills);
      } else {
        console.log(response?.data?.message || 'Unexpected response.');
      }
    } catch (error) {
      console.error(
        'Error fetching Skills:',
        error?.response?.data?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleEdit = item => {
    navigation.navigate('Update Skill', {skillData: item});
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
        getAllSkills();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Deletion failed!',
          text2: response?.data?.message || 'Please try again later.',
          position: 'bottom',
        });
      }
    } catch (error) {
      console.error('Error deleting Skills:', error);
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

  const renderSkillsItem = ({item}) => {
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
          <Text style={styles.course}>{item.skillName}</Text>
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
  
        {/* Show rating */}
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
          <Text style={styles.title}>Skills</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Add Skills')}>
            <Image source={Images.add} style={styles.addIcon} />
            <Text style={styles.addText}>Add New</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          renderLoader()
        ) : (
          <FlatList
            data={skills}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderSkillsItem}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={getAllSkills}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Skills;
