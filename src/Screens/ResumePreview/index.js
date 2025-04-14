import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import resumeTemplates from '../../Data/resumeTemplates';

const ResumePreview = ({ route }) => {
  const { templateId, resumeData } = route.params;
  const TemplateComponent = resumeTemplates[templateId]?.component;

console.log(resumeData);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 15 }}>
      {TemplateComponent ? (
        <TemplateComponent data={resumeData} />
      ) : (
        <Text>Template not found.</Text>
      )}
    </SafeAreaView>
  );
};

export default ResumePreview;
