import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import React from 'react';
import getStyles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import SubmitBtn from '../../Components/SubmitBtn/Index';
import ImageSliders from '../../Components/Slider/ImageSlider';
import { Images } from '../../Assets/Images';
import { useTheme } from '../../Theme/ ThemeContext';

const OnBoarding = () => {
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = React.useState(0);

  const { theme } = useTheme();
  const styles = getStyles(theme);

  const slides = [
    {
      image: Images.boarding1,
      title: 'Smarter Resumes Better Jobs',
      description: 'Our intelligent CV builder is designed to you stand out in today \'s competitive job market.',
    },
    {
      image: Images.boarding2,
      title: 'Your Story, Your Style, Your CV',
      description: 'Showcase your talent with a CV that\'s as unique as you are.',
    },
    {
      image: Images.boarding3,
      title: 'Design Your CV, Define Your Future',
      description: 'Create professional, job-winning CVs in minutes with our easy-to-use builder.',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <View style={styles.contentView}>
        <View style={styles.sliderView}>
          <ImageSliders
            slides={slides}
            onSlideChange={(index) => setActiveSlide(index)}
          />
          <LinearGradient
            colors={['transparent', 'white']}
            style={styles.gradientView}
          />
        </View>
        <View style={styles.mainTitle}>
          <Text style={styles.mainTitleText}>
            {slides[activeSlide].title}
          </Text>
        </View>
        <View style={styles.textView}>
          <Text style={styles.textTitle}>
            {slides[activeSlide].description}
          </Text>
          <SubmitBtn
            buttonText="Get Started"
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      </View>
    </View>
  );
};


export default OnBoarding;
