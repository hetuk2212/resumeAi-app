import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './style';
import TabSwitcher from '../../../Components/TabSwitcher';
import CustomTextInput from '../../../Components/TextInput';
import {Images} from '../../../Assets/Images';
import ActionButtons from '../../../Components/ActionButtons';
import {useNavigation} from '@react-navigation/native';

const Education = () => {
  const [activeTab, setActiveTab] = useState('Education');
  const [educationForms, setEducationForms] = useState([]);

  const navigation = useNavigation();

  // Add new education form
  const handleAdd = () => {
    const newForm = {
      id: Date.now(),
      course: '',
      school: '',
      grade: '',
      year: '',
    };
    setEducationForms(prevForms => {
      const updatedForms = [...prevForms, newForm];
      return updatedForms;
    });
  };

  // Handle input changes
  const handleInputChange = (id, field, value) => {
    setEducationForms(prevForms => {
      const updatedForms = prevForms.map(form =>
        form.id === id ? {...form, [field]: value} : form,
      );
      return updatedForms;
    });
  };

  // Delete a form
  const handleDelete = id => {
    setEducationForms(prevForms => {
      const updatedForms = prevForms.filter(form => form.id !== id);
      return updatedForms;
    });
  };

  // Handle Save (log form values)
  const handleSave = () => {
    console.log(
      'Submitted Education Data:',
      JSON.stringify(educationForms, null, 2),
    );
    navigation.navigate('Choose Resume');
  };

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
          <ScrollView
            contentContainerStyle={{paddingBottom: 100}}
            showsVerticalScrollIndicator={false}>
            {educationForms.map((form, index) => (
              <View key={form.id} style={styles.formBox}>
                <View style={styles.titleView}>
                  <Text style={styles.title}>Education {index + 1}</Text>
                  <TouchableOpacity onPress={() => handleDelete(form.id)}>
                    <Image
                      source={Images.delete}
                      style={styles.educationIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.formDetails}>
                  <CustomTextInput
                    label="Course / Degree"
                    value={form.course}
                    onChangeText={text =>
                      handleInputChange(form.id, 'course', text)
                    }
                  />
                  <CustomTextInput
                    label="School / University"
                    value={form.school}
                    onChangeText={text =>
                      handleInputChange(form.id, 'school', text)
                    }
                  />
                  <CustomTextInput
                    label="Grade / Score"
                    value={form.grade}
                    onChangeText={text =>
                      handleInputChange(form.id, 'grade', text)
                    }
                  />
                  <CustomTextInput
                    label="Year"
                    value={form.year}
                    onChangeText={text =>
                      handleInputChange(form.id, 'year', text)
                    }
                  />
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
