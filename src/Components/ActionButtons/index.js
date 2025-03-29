import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ActionButtons = ({onAdd, onSave, addIcon, saveIcon}) => {
  return (
    <View style={styles.confrimBtnView}>
      <TouchableOpacity style={styles.profileBtnChange} onPress={onAdd}>
        <LinearGradient
          colors={['#33abff', '#4db6ff', '#1aa1ff']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradientBtn}>
          <Image source={addIcon} style={styles.btnIcon} />
          <Text style={styles.profileBtnText}>Add</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
        <Image source={saveIcon} style={styles.btnIcon} />
        <Text style={styles.profileBtnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  confrimBtnView: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  btnIcon: {
    width: 15,
    height: 15,
  },
  saveBtn: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 30,
    backgroundColor: 'green',
    shadowColor: '#0096FF',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  gradientBtn: {
              paddingVertical:10,
              paddingHorizontal: 25,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              borderRadius: 30,
              shadowColor: '#0096FF',
              shadowOffset: {width: 0, height: 5},
              shadowOpacity: 0.3,
              shadowRadius: 10,
            },
            profileBtnText:{
              color:"#ffffff",
              fontWeight:"500"
            },
});

export default ActionButtons;


