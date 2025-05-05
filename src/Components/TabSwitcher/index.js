import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Color from '../../Theme/Color';

const TabSwitcher = ({ tabs, value, onTabChange }) => {
  return (
    <View style={styles.tabsContainer}>
      {tabs.map((tab) => {
        const isActive = value === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onTabChange(tab.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab.label}
            </Text>
            {isActive && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    position: 'relative',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: Color.primary,
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -1,
    height: 3,
    width: '80%',
    backgroundColor: Color.primary,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
});

export default TabSwitcher;