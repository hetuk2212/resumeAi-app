import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ActionButtons = ({ onAdd, onSave, addIcon, saveIcon, loading }) => {
  return (
    <View style={styles.confrimBtnView}>
      {onAdd && addIcon && (
        <TouchableOpacity style={[styles.saveBtn, {backgroundColor:"#3E5879"}]} onPress={onAdd} disabled={loading}>
          
            <Image source={addIcon} style={styles.btnIcon} />
            <Text style={styles.profileBtnText}>Add</Text>
        </TouchableOpacity>
      )}

      {onSave && saveIcon && (
        <TouchableOpacity
          style={[styles.saveBtn, loading && styles.disabledBtn]}
          onPress={onSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Image source={saveIcon} style={styles.btnIcon} />
              <Text style={styles.profileBtnText}>Save</Text>
            </>
          )}
        </TouchableOpacity>
      )}
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
    shadowColor: '#1F2937',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  gradientBtn: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 30,
    shadowColor: '#1F2937',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  profileBtnText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  disabledBtn: {
    opacity: 0.6,
  },
});

export default ActionButtons;