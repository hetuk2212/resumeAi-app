import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import CustomTextInput from '../../../Components/TextInput';
import {Images} from '../../../Assets/Images';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';
import TabSwitcher from '../../../Components/TabSwitcher';
import ActionButtons from '../../../Components/ActionButtons';

const PersonalDetails = () => {
  const [activeTab, setActiveTab] = useState('PersonalDetails');
  const [activePage, setActivePage] = useState('form');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [fieldValues, setFieldValues] = useState({});
  const [fields, setFields] = useState([
    {label: 'Photo (Optional)', isActive: false, value: ''},
    {label: 'Date of Birth', isActive: false, value: ''},
    {label: 'Nationality', isActive: false, value: ''},
    {label: 'Marital Status', isActive: false, value: ''},
    {label: 'Website', isActive: false, value: ''},
    {label: 'LinkedIn', isActive: false, value: ''},
    {label: 'Facebook', isActive: false, value: ''},
    {label: 'Twitter', isActive: false, value: ''},
    {label: 'Religion', isActive: false, value: ''},
    {label: 'Passport', isActive: false, value: ''},
    {label: 'Gender', isActive: false, value: ''},
    {label: 'Driving License', isActive: false, value: ''},
    {label: 'Place', isActive: false, value: ''},
    {label: 'Salary Claim', isActive: false, value: ''},
    {label: 'Occupation', isActive: false, value: ''},
    {label: 'Hobbies', isActive: false, value: ''},
  ]);

  const handleSave = () => {
    const formData = {
      name,
      address,
      email,
      phone,
      profileImage,
      fieldValues,
    };

    console.log('Form Data:', formData);
  };

  const handleToggle = index => {
    const updatedFields = [...fields];
    updatedFields[index].isActive = !updatedFields[index].isActive;
    if (!updatedFields[index].isActive) {
      setFieldValues(prevState => ({
        ...prevState,
        [updatedFields[index].label]: '',
      }));
    }
    setFields(updatedFields);
    setActivePage('form');
  };

  const navigation = useNavigation();

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

  const handleImagePick = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
    })
      .then(image => {
        setProfileImage(image.path);
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          console.log('Image picker error:', error);
        }
      });
  };

  const handleRemoveImage = () => {
    Alert.alert(
      'Remove Profile Picture',
      'Are you sure you want to remove your profile picture?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setProfileImage(null),
        },
      ],
    );
  };

  const handleModal = () => {
    setActivePage('modal');
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        {activePage === 'form' && (
          <View>
            <TabSwitcher
              tabs={[
                {key: 'PersonalDetails', label: 'Personal Details'},
                {key: 'Help', label: 'Help'},
              ]}
              onTabChange={tabKey => setActiveTab(tabKey)}
            />

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 100}}>
              {activeTab === 'PersonalDetails' && (
                <View>
                  <CustomTextInput
                    label="Name"
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                  />
                  <CustomTextInput
                    label="Address"
                    placeholder="Enter your address"
                    value={address}
                    onChangeText={setAddress}
                  />
                  <CustomTextInput
                    label="Email"
                    placeholder="myresume@gmail.com"
                    value={email}
                    onChangeText={setEmail}
                  />
                  <CustomTextInput
                    label="Phone"
                    placeholder="9703954483"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />
                  {fields
                    .filter(field => field.isActive)
                    .map((field, index) => (
                      <CustomTextInput
                        key={index}
                        label={field.label}
                        placeholder={`Enter your ${field.label}`}
                        value={fieldValues[field.label] || ''}
                        onChangeText={text => {
                          setFieldValues(prevState => ({
                            ...prevState,
                            [field.label]: text,
                          }));
                        }}
                      />
                    ))}

                  <View>
                    <Text style={styles.label}>Photo (optional)</Text>
                    <View style={styles.profileImgView}>
                      <Image
                        source={
                          profileImage
                            ? {uri: profileImage}
                            : Images.profileAccount
                        }
                        style={styles.userProfile}
                      />
                      <View style={styles.profileImgBtnView}>
                        <TouchableOpacity
                          style={styles.profileBtnChange}
                          onPress={() => {
                            handleImagePick();
                          }}>
                          <LinearGradient
                            colors={['#33abff', '#4db6ff', '#1aa1ff']}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={styles.gradientBtn}>
                            <Text style={styles.profileBtnText}>Change</Text>
                          </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.profileBtnRemove}
                          onPress={() => {
                            handleRemoveImage();
                          }}>
                          <LinearGradient
                            colors={['#ff9800', '#ff7300', '#ff5722']}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={styles.gradientBtn}>
                            <Text style={styles.profileBtnText}>Remove</Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <ActionButtons
                    onAdd={handleModal}
                    onSave={handleSave}
                    addIcon={Images.add}
                    saveIcon={Images.check}
                  />
                </View>
              )}
            </ScrollView>
          </View>
        )}

        {activePage === 'modal' && (
          <ScrollView contentContainerStyle={{paddingBottom: 100}}>
            <Text style={styles.headerText}>
              Click the switch button to Enable / Disable any profile fields
            </Text>
            <View style={styles.fieldsContainer}>
              <View style={styles.titleBox}>
                <Text style={styles.title}>Add More Personal Info</Text>
              </View>
              {fields.map((field, index) => (
                <View key={index} style={styles.fieldItem}>
                  <Text style={styles.fieldLabel}>{field.label}</Text>
                  <ToggleSwitch
                    isOn={field.isActive}
                    onColor="green"
                    offColor="gray"
                    size="medium"
                    onToggle={() => handleToggle(index)}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PersonalDetails;
