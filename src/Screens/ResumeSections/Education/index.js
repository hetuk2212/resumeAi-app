import {View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import TabSwitcher from '../../../Components/TabSwitcher';
import CustomTextInput from '../../../Components/TextInput';
import {Images} from '../../../Assets/Images';
import ActionButtons from '../../../Components/ActionButtons';
import { useNavigation } from '@react-navigation/native';

const Education = () => {
  const [activeTab, setActiveTab] = useState('Education');
  const [educationForms, setEducationForms] = useState([]);

  const navigation = useNavigation()

  const handleAdd = () => {
    const newForm = {id: Date.now()};
    setEducationForms([...educationForms, newForm]);
  };

  const handleDelete = id => {
    setEducationForms(educationForms.filter(forms => forms.id !== id));
  };

  const handleSave = () =>{
    navigation.navigate("Choose Resume")
  }

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <TabSwitcher
          tabs={[
            {key: 'Education', label: 'Education'},
            {key: 'Example', label: 'Example'},
          ]}
          onTabChange={tabKey => setActiveTab(tabKey)}
        />

        {activeTab === 'Education' && (
          <ScrollView contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
            {educationForms.map((form, index) => (
              <View style={styles.formBox}>
                <View style={styles.titleView}>
                  <Text style={styles.title}>Education {index + 1}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      handleDelete(form.id);
                    }}>
                    <Image
                      source={Images.delete}
                      style={styles.educationIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.formDetails}>
                  <CustomTextInput label="Course / Degree" />
                  <CustomTextInput label="School / University" />
                  <CustomTextInput label="Grade / Score" />
                  <CustomTextInput label="Year" />
                </View>
              </View>
            ))}
            <ActionButtons
              onAdd={handleAdd}
              onSave={handleSave}
              addIcon={Images.add}
              saveIcon={Images.check}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Education;
