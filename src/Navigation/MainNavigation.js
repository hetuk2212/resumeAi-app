import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../Screens/Splash';
import Onboarding from '../Screens/Onboarding';
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
import Home from '../Screens/Home';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Home" component={Home} />
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
        />
        <Stack.Screen
          name="Personal Details"
          component={PersonalDetails}
        />
        <Stack.Screen
          name="Education"
          component={Education}
        />
        <Stack.Screen
          name="Choose Resume"
          component={ChooseResume}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: Color.primary,
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
              backgroundColor: Color.primary,
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        <Stack.Screen
          name="Add Education"
          component={AddEducation}
        />
        <Stack.Screen
          name="Update Education"
          component={UpdateEducation}
        />
        <Stack.Screen
          name="Experience"
          component={Experience}
        />
        <Stack.Screen
          name="Add Experience"
          component={AddExperience}
        />
        <Stack.Screen
          name="Update Experience"
          component={UpdateExperience}
        />
        <Stack.Screen
          name="Projects"
          component={Projects}
        />
        <Stack.Screen
          name="Add Projects"
          component={AddProjects}
        />
        <Stack.Screen
          name="Objective"
          component={Objective}
        />
        <Stack.Screen
          name="Update Projects"
          component={UpdateProjects}
        />
        <Stack.Screen
          name="Interests"
          component={Interests}
        />
        <Stack.Screen
          name="Add Interests"
          component={AddInterests}
        />
        <Stack.Screen
          name="Update Interest"
          component={UpdateInterest}
        />
        <Stack.Screen
          name="Achievements"
          component={Achievements}
        />
        <Stack.Screen
          name="Add Achievements"
          component={AddAchievements}
        />
        <Stack.Screen
          name="Update Achievement"
          component={UpdateAchievement}
        />
        <Stack.Screen
          name="Skills"
          component={Skills}
        />
        <Stack.Screen
          name="Add Skills"
          component={AddSkills}
        />
        <Stack.Screen
          name="Update Skill"
          component={UpdateSkill}
        />
        <Stack.Screen
          name="Activities"
          component={Activites}
        />
        <Stack.Screen
          name="Add Activities"
          component={AddActivities}
        />
        <Stack.Screen
          name="Update Activity"
          component={UpdateActivity}
        />
        <Stack.Screen
          name="Languages"
          component={Languages}
        />
        <Stack.Screen
          name="Add Languages"
          component={AddLanguages}
        />
        <Stack.Screen
          name="Update Language"
          component={UpdateLanguage}
        />
        <Stack.Screen
          name="Cover Latter"
          component={CoverLatter}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: Color.primary,
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
              backgroundColor: Color.primary,
            },
            headerTintColor: '#FFFFFF',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;