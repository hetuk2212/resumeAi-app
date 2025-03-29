import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Images} from '../../Assets/Images';
import styles from './style';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <Text style={styles.title}>Resume / CV</Text>

        <View style={styles.resumeView}>
          <TouchableOpacity
            style={styles.resumeBtn}
            onPress={() => {
              navigation.navigate('Choose Profile');
            }}>
            <Image source={Images.edit} style={styles.resumeBtnImg} />
            <Text style={styles.resumeBtnText}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resumeBtn}>
            <Image source={Images.ai} style={styles.resumeBtnImg} />
            <Text style={styles.resumeBtnText}>Create With AI</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
