import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import CustomTextInput from '../../../Components/TextInput';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionButtons from '../../../Components/ActionButtons';
import {Images} from '../../../Assets/Images';
import TabSwitcher from '../../../Components/TabSwitcher';
import {addUpdateCoverLetter, getSpecificProfile} from '../../../../lib/api';
import {coverLetterExamples} from '../../../Data/coverLetterExamples';

const CoverLetter = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('CoverLetter');
  const [activePage, setActivePage] = useState('form');
  const [coverContent, setCoverContent] = useState('');
  const [resumeId, setResumeId] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [loadingProfile, setIsLoadingProfile] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchResumeId = async () => {
      const id = await AsyncStorage.getItem('profileId');
      setResumeId(id);
      if (id) fetchProfile(id);
    };
    fetchResumeId();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (activePage === 'modal') {
        setActivePage('form');
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [activePage]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if (activePage === 'modal') {
        e.preventDefault();
        setActivePage('form');
      }
    });

    return unsubscribe;
  }, [navigation, activePage]);

  const fetchProfile = async id => {
    try {
      setIsLoadingProfile(true);
      const res = await getSpecificProfile(id);
      const content = res?.data?.profile?.coverLetter?.content;
      if (content) setCoverContent(content);
    } catch (err) {
      console.log('Fetch profile error:', err);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleSaveOrUpdate = async () => {
    if (!coverContent.trim()) {
      setErrors({coverLetter: 'Cover letter cannot be empty'});
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const data = {
        coverLetter: {
          content: coverContent,
        },
      };

      const response = await addUpdateCoverLetter(resumeId, data);

      if (response.status === 200 || response.status === 201) {
        Toast.show({
          type: 'success',
          text1: response.data.message || 'Cover letter updated!',
          position: 'bottom',
        });
        navigation.navigate('Profile');
      } else {
        Toast.show({type: 'error', text1: 'Something went wrong'});
      }
    } catch (error) {
      console.log('Error:', error);
      const message =
        error?.response?.data?.message || error?.message || 'Try again later';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addExampleToEditor = item => {
    setCoverContent(item.description);
    setActiveTab('CoverLetter'); // Fixed typo here
  };

  return (
    <SafeAreaView style={styles.safeView}>
      {loadingProfile ? (
        <ActivityIndicator size="large" color="blue" style={styles.loader} />
      ) : (
        <View style={styles.container}>
          {activePage === 'form' && (
            <View>
              <TabSwitcher
                tabs={[
                  {key: 'CoverLetter', label: 'Cover Letter'},
                  {key: 'Example', label: 'Example'},
                ]}
                value={activeTab}
                onTabChange={setActiveTab}
              />

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}}>
                {activeTab === 'CoverLetter' && (
                  <View style={styles.formView}>
                    <CustomTextInput
                      value={coverContent}
                      onChangeText={setCoverContent}
                      errorMessage={errors.coverLetter}
                      placeholder="Write your cover letter here..."
                      multiline
                      numberOfLines={10}
                      style={styles.coverInput}
                      inputStyle={{
                        height: 300,
                        textAlignVertical: 'top',
                        paddingTop: 10,
                      }}
                    />
                    <ActionButtons
                      onSave={handleSaveOrUpdate}
                      saveIcon={Images.check}
                      loading={loading}
                    />
                  </View>
                )}

                {activeTab === 'Example' && (
                  <View style={styles.exampleList}>
                    <Text style={styles.noteText}>
                      Note: These are just examples. Please review and edit the
                      content to fit your profile and experience.
                    </Text>
                    <Text style={styles.sectionTitle}>
                      Select a sample cover letter:
                    </Text>
                    <FlatList
                      data={coverLetterExamples}
                      keyExtractor={(item, index) => index.toString()}
                      contentContainerStyle={styles.flatListContent}
                      nestedScrollEnabled={true}
                      renderItem={({item, index}) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.exampleItem}
                          onPress={() => addExampleToEditor(item)}>
                          <Text style={styles.exampleTitle}>{item.title}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                )}
              </ScrollView>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default CoverLetter;
