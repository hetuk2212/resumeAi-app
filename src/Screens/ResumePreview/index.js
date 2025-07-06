import React from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';
import resumeTemplates from '../../Data/resumeTemplates';
import { useTheme } from '../../Theme/ ThemeContext';
import Header from '../../Components/Header/Index';
import { Images } from '../../Assets/Images';
import { useNavigation } from '@react-navigation/native';

const ResumePreview = ({route}) => {
  const {templateId, resumeData} = route.params;
  const TemplateComponent = resumeTemplates[templateId]?.component;

const {theme} = useTheme();

const navigation = useNavigation()
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.white, padding: 15}}>
      <StatusBar
        backgroundColor={theme.white}
        barStyle={theme.statusBarStyle}
        translucent={false}
      />
      <Header title="Preview Resume" headerIcon={Images.leftArrowIcon} onPress={()=>{
        navigation.goBack()
      }}/>
      {TemplateComponent ? (
        <TemplateComponent data={resumeData} />
      ) : (
        <Text>Template not found.</Text>
      )}
    </SafeAreaView>
  );
};

export default ResumePreview;
