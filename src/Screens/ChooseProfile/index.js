import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import { Images } from '../../Assets/Images';
import { useNavigation } from '@react-navigation/native';

const profiles = [
  {
    id: '1',
    name: 'Hetuk Patel',
    email: 'hetukpatel1222@gmail.com',
    date: '3/11/23 11:20 PM',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'johndoe@example.com',
    date: '3/10/23 9:15 AM',
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    date: '3/09/23 2:30 PM',
  },
  {
    id: '4',
    name: 'Emily Johnson',
    email: 'emilyj@example.com',
    date: '3/08/23 6:45 PM',
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michaelb@example.com',
    date: '3/07/23 8:00 AM',
  },
];

const ChooseProfile = () => {
  const navigation = useNavigation()
  const renderItem = ({ item, index }) => (
    <View style={styles.profileBox}>
      <View style={styles.profileCount}>
        <Text style={styles.profileCountText}>{index+1}</Text>
      </View>
      <TouchableOpacity style={styles.profileMenu}> 
        <Image source={Images.dots} style={styles.dotsIconImg}/>
      </TouchableOpacity>
      <Image source={Images.profileAccount} style={styles.profileImg} />
      <Text style={styles.profileName}>{item.name}</Text>
      <Text style={styles.profileEmail}>{item.email}</Text>
      <View style={styles.profileDateView}>
        <Text style={styles.profileDate}>{item.date}</Text>
      </View>
      <View style={styles.profileBtnView}>
        <TouchableOpacity style={styles.profileBtn} onPress={()=>{
          navigation.navigate("Profile")
        }}>
          <Image source={Images.edit} style={styles.ProfileIconImg}/>
          <Text style={styles.profileBtnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileBtn}>
          <Image source={Images.view} style={styles.ProfileIconImg} />
          <Text style={styles.profileBtnText}>View CV</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <FlatList
          data={profiles}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      
      <View style={styles.createBtnView}>
        <TouchableOpacity style={styles.createBtn}>
          <LinearGradient
            colors={['#33abff', '#4db6ff', '#1aa1ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBtn}
          >
            <Image source={Images.add} style={styles.iconImg}/>
            <Text style={styles.createText}>Create New Profile</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChooseProfile;