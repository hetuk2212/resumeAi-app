import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../Screens/Splash';
import Login from '../Screens/Auth/Login';
import BottomTabNavigation from './BottomTabNavigation';
import Onboarding from '../Screens/Onboarding';
import Otp from '../Screens/Auth/Otp';
import ChooseProfile from '../Screens/ChooseProfile';
import Profile from '../Screens/Profile';
import PersonalDetails from '../Screens/ResumeSections/PersonalDetails';
import Education from '../Screens/ResumeSections/Education';
import ChooseResume from '../Screens/ChooseResume';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="MainApp" component={BottomTabNavigation} />
        <Stack.Screen name="Choose Profile" component={ChooseProfile}
        options={{
          headerShown:true,
          headerStyle: {
            backgroundColor: '#0096FF',
          },
          headerTintColor: '#FFFFFF',
        }}
        />
        <Stack.Screen name="Profile" component={Profile}
        options={{
          headerShown:true,
          headerStyle: {
            backgroundColor: '#0096FF',
          },
          headerTintColor: '#FFFFFF',
        }}
        />
        <Stack.Screen name="Personal Details" component={PersonalDetails}
        options={{
          headerShown:true,
          headerStyle: {
            backgroundColor: '#0096FF',
          },
          headerTintColor: '#FFFFFF',
        }}
        />
        <Stack.Screen name="Education" component={Education}
        options={{
          headerShown:true,
          headerStyle: {
            backgroundColor: '#0096FF',
          },
          headerTintColor: '#FFFFFF',
        }}
        />
        <Stack.Screen name="Choose Resume" component={ChooseResume}
        options={{
          headerShown:true,
          headerStyle: {
            backgroundColor: '#0096FF',
          },
          headerTintColor: '#FFFFFF',
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
