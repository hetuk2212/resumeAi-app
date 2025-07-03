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
import {useTheme} from '../../../Theme/ ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../Components/Header/Index';
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

const Projects = () => {
  const [resumeId, setResumeId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const {theme} = useTheme();
  const styles = getStyle(theme);

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
      getAllProjects();
    }
  }, [resumeId]);

  const getAllProjects = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const existingResumes = await getResumesFromStorage();
      const resumeIndex = findResumeIndex(existingResumes, resumeId);
      if (resumeIndex !== -1) {
        const projectData = existingResumes[resumeIndex].profile.projects || [];

        setProjects(projectData);
      } else {
        console.log('Resume not found for the given resumeId');
      }
    } catch (error) {
      console.error(
        'Error fetching projects:',
        error?.response?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleEdit = item => {
    navigation.navigate('Update Projects', {projectData: item});
  };

  const handleDelete = async projectsId => {
    try {
      const existingResumes = await getResumesFromStorage();
      const resumeIndex = findResumeIndex(existingResumes, resumeId);

      if (resumeIndex !== -1) {
        existingResumes[resumeIndex].profile.projects = existingResumes[
          resumeIndex
        ].profile.projects.filter(projects => projects._id !== projectsId);

        await AsyncStorage.setItem('resumes', JSON.stringify(existingResumes));
        setProjects(existingResumes[resumeIndex].profile.experience);
        Toast.show({
          type: 'success',
          text1: 'Projects deleted successfully!',
          text2: 'The entry has been removed.',
          position: 'bottom',
        });
        getAllProjects();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Deletion failed!',
          text2: response?.data?.message || 'Please try again later.',
          position: 'bottom',
        });
      }
    } catch (error) {
      console.error('Error deleting projects:', error);
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
      <Text style={styles.emptyText}>No Projects Found</Text>
      <Text style={styles.emptySubText}>
        Add your projects details to get started
      </Text>
    </View>
  );

  const renderProjectsItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.course}>{item.title}</Text>
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

      {/* Project Description */}
      <View style={styles.detailBox}>
        <Text style={styles.labelText}>
          <Text style={styles.label}>Description: </Text>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <Header title="Projects" headerIcon={Images.leftArrowIcon} onPress={()=>{
          navigation.navigate("Profile")
        }}/>
        <View style={styles.createNew}>
          <Text style={styles.title}>Projects</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Add Projects')}>
            <Image source={Images.add} style={styles.addIcon} />
            <Text style={styles.addText}>Add New</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          renderLoader()
        ) : (
          <FlatList
            data={projects}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderProjectsItem}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={getAllProjects}
            ListEmptyComponent={renderEmptyComponent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Projects;
