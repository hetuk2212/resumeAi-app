import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const TabSwitcher = ({tabs, onTabChange}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || '');

  const handleTabPress = tabKey => {
    setActiveTab(tabKey);
    onTabChange && onTabChange(tabKey);
  };

  return (
    <View style={styles.tabBtnView}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tabBtn, activeTab === tab.key && styles.activeTab]}
          onPress={() => handleTabPress(tab.key)}>
          <Text
            style={[
              styles.tabBtnText,
              activeTab === tab.key && styles.activeTabText,
            ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
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
  },

  activeTab: {
    borderBottomWidth: 4,
    borderColor: '#0096FF',
  },
  activeTabText: {
    color: '#0096FF',
  },
});

export default TabSwitcher;
