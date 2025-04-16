import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
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
import MainResume from '../Screens/MainResume';
import AddEducation from '../Screens/ResumeSections/Education/AddEducation';
import UpdateEducation from '../Screens/ResumeSections/Education/UpdateEducation';
import Experience from '../Screens/ResumeSections/Experience';
import AddExperience from '../Screens/ResumeSections/Experience/AddExperience';
import UpdateExperience from '../Screens/ResumeSections/Experience/UpdateExperience';
import Projects from '../Screens/ResumeSections/Projects';
import AddProjects from '../Screens/ResumeSections/Projects/AddProjects';
import Objective from '../Screens/ResumeSections/Objective';
import UpdateProjects from '../Screens/ResumeSections/Projects/UpdateProject';
import Interests from '../Screens/ResumeSections/Interests';
import AddInterests from '../Screens/ResumeSections/Interests/AddInterests';
import UpdateInterest from '../Screens/ResumeSections/Interests/UpdateInterest';
import Achievements from '../Screens/ResumeSections/Achievements';
import AddAchievements from '../Screens/ResumeSections/Achievements/AddAchievement';
import UpdateAchievement from '../Screens/ResumeSections/Achievements/UpdateAchievement';
import Skills from '../Screens/ResumeSections/Skills';
import AddSkills from '../Screens/ResumeSections/Skills/AddSkills';
import UpdateSkill from '../Screens/ResumeSections/Skills/UpdateSkill';
import Activites from '../Screens/ResumeSections/Activites';
import AddActivities from '../Screens/ResumeSections/Activites/AddActivities';
import UpdateActivity from '../Screens/ResumeSections/Activites/UpdateActivity';
import Languages from '../Screens/ResumeSections/Languages';
import AddLanguages from '../Screens/ResumeSections/Languages/AddLanguages';
import UpdateLanguage from '../Screens/ResumeSections/Languages/UpdateLanguage';
import CoverLatter from '../Screens/ResumeSections/CoverLatter';
import ResumePreview from '../Screens/ResumePreview';
import Color from '../Theme/Color';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="MainApp" component={BottomTabNavigation} />
        <Stack.Screen
          name="Choose Profile"
          component={ChooseProfile}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: Color.primary
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Personal Details"
          component={PersonalDetails}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Education"
          component={Education}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Choose Resume"
          component={ChooseResume}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="MainResume"
          component={MainResume}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Add Education"
          component={AddEducation}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Update Education"
          component={UpdateEducation}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Experience"
          component={Experience}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Add Experience"
          component={AddExperience}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Update Experience"
          component={UpdateExperience}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Projects"
          component={Projects}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Add Projects"
          component={AddProjects}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Objective"
          component={Objective}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Update Projects"
          component={UpdateProjects}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Interests"
          component={Interests}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Add Interests"
          component={AddInterests}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Update Interest"
          component={UpdateInterest}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Achievements"
          component={Achievements}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Add Achievements"
          component={AddAchievements}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Update Achievement"
          component={UpdateAchievement}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Skills"
          component={Skills}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Add Skills"
          component={AddSkills}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Update Skill"
          component={UpdateSkill}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Activities"
          component={Activites}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Add Activities"
          component={AddActivities}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Update Activity"
          component={UpdateActivity}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Languages"
          component={Languages}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Add Languages"
          component={AddLanguages}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Update Language"
          component={UpdateLanguage}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Cover Latter"
          component={CoverLatter}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Resume Preview"
          component={ResumePreview}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#1F2937',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
