import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Home from '../Screens/Home';
import Account from '../Screens/Account';
import { Images } from '../Assets/Images';
import Downloads from '../Screens/Downloads';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const HomeActiveIcon = Images.homeActive;
  const HomeInactiveIcon = Images.home;
  const ProfileActiveIcon = Images.profileActive;
  const ProfileInactiveIcon = Images.profile;
  const DownloadsActiveIcon = Images.downloadsActive;
  const DownloadsInActiveIcon = Images.downloads;

  return (
    <>
      {/* Status bar that stays consistent */}
      <StatusBar translucent backgroundColor="#1F2937" barStyle="light-content" />

      <SafeAreaView style={{ flex: 1, backgroundColor: '#1F2937' }}>
        <Tab.Navigator
          screenOptions={{
            headerStyle: { 
              backgroundColor: '#213555', 
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerStatusBarHeight: 0, // Remove default status bar height
            tabBarActiveTintColor: '#007bff',
            tabBarInactiveTintColor: '#888',
            tabBarStyle: { backgroundColor: '#fff', paddingBottom: 5, height: 60 },
          }}
        >
          <Tab.Screen 
            name="Home" 
            component={Home} 
            options={{
              tabBarIcon: ({ focused }) => (
                <Image 
                  source={focused ? HomeActiveIcon : HomeInactiveIcon} 
                  style={{ width: 24, height: 24 }} 
                  resizeMode="contain" 
                />
              ),
            }}
          />
          <Tab.Screen 
            name="Downloads" 
            component={Downloads} 
            options={{
              tabBarIcon: ({ focused }) => (
                <Image 
                  source={focused ? DownloadsActiveIcon : DownloadsInActiveIcon} 
                  style={{ width: 24, height: 24 }} 
                  resizeMode="contain" 
                />
              ),
            }}
          />
          <Tab.Screen 
            name="Account" 
            component={Account} 
            options={{
              tabBarIcon: ({ focused }) => (
                <Image 
                  source={focused ? ProfileActiveIcon : ProfileInactiveIcon} 
                  style={{ width: 24, height: 24 }} 
                  resizeMode="contain" 
                />
              ),
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
};

export default BottomTabNavigation;
