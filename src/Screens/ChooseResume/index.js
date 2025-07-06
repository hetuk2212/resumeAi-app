import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import getStyles from './style';
import {Images} from '../../Assets/Images';
import {useTheme} from '../../Theme/ ThemeContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../Components/Header/Index';
import InputText from '../../Components/InputDesc/Index';

const dummyResumes = [
  {id: 1, name: 'Simple 1', image: Images.simple1},
  {id: 2, name: 'Simple 2', image: Images.simple1},
  {id: 3, name: 'Professional 1', image: Images.simple1},
  {id: 4, name: 'Professional 2', image: Images.simple1},
  {id: 5, name: 'Premium 1', image: Images.simple1},
];

const ChooseResume = ({navigation, route}) => {
  const {resumeData} = route.params;

  const {theme} = useTheme();
  const styles = getStyles(theme);

  const handleResumePress = resume => {
    navigation.navigate('Resume Preview', {
      templateId: resume.id,
      resumeData,
    });
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <StatusBar
        backgroundColor={theme.white}
        barStyle={theme.statusBarStyle}
        translucent={false}
      />
      <View style={styles.container}>
        <Header 
          title="Choose Template" 
          headerIcon={Images.leftArrowIcon} 
          onPress={() => {
            navigation.navigate("Profile")
          }}
        />

        {/* Resume Cards - All in one list */}
        <ScrollView>
          <InputText InputText="Select one of the templates below to preview it with your information. Only the information you've entered will be displayed. For instance, if you haven't included a photo, your resume will be generated without one."/>
          <View style={styles.resumeView}>
            {dummyResumes.map(resume => (
              <TouchableOpacity
                key={resume.id}
                style={styles.resumeBtn}
                onPress={() => handleResumePress(resume)}>
                <View style={styles.resumePreviewBox} />
                <Image
                  source={resume.image}
                  style={styles.resumeBtnImg}
                />
                {/* <Text style={styles.resumeBtnText}>{resume.name}</Text> */}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChooseResume;