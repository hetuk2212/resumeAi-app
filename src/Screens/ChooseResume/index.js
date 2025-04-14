import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from './style';
import { Images } from '../../Assets/Images';

const tabs = ['Simple', 'Professional', 'Premium'];

const dummyResumes = {
  Simple: [
    { id: 1, name: 'Simple 1', image: Images.simple1 },
    { id: 2, name: 'Simple 2', image: Images.simple1 },
  ],
  Professional: [
    { id: 3, name: 'Professional 1', image: Images.simple1 },
  ],
  Premium: [
    { id: 4, name: 'Premium 1', image: Images.simple1 },
  ],
};

const ChooseResume = ({ navigation, route }) => {
  const { resumeData } = route.params;
  const [activeTab, setActiveTab] = useState('Simple');

  const handleResumePress = (resume) => {
    navigation.navigate('Resume Preview', {
      templateId: resume.id,
      resumeData,
    });
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tabButton,
                activeTab === tab && styles.tabButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Resume Cards */}
        <ScrollView>
          <View style={styles.resumeView}>
            {dummyResumes[activeTab].map(resume => (
              <TouchableOpacity
                key={resume.id}
                style={styles.resumeBtn}
                onPress={() => handleResumePress(resume)}
              >
                <View style={styles.resumePreviewBox} />
                <Image
                  source={resume.image}
                  style={styles.resumeBtnImg}
                  resizeMode="contain"
                />
                <Text style={styles.resumeBtnText}>{resume.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChooseResume;
