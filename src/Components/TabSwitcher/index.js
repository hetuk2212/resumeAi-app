import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const TabSwitcher = ({tabs, value, onTabChange}) => {
  return (
    <View style={styles.tabBtnView}>
      {tabs.map(tab => {
        const isActive = value === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabBtn, isActive && styles.activeTab]}
            onPress={() => onTabChange(tab.key)}>
            <Text
              style={[
                styles.tabBtnText,
                isActive && styles.activeTabText,
              ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: 'gray',
  },
  tabBtn: {
    width: '50%',
    alignItems: 'center',
    padding: 10,
  },
  tabBtnText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
  activeTab: {
    borderBottomWidth: 4,
    borderColor: '#0096FF',
  },
  activeTabText: {
    color: '#0096FF',
    fontWeight: 'bold',
  },
});

export default TabSwitcher;
