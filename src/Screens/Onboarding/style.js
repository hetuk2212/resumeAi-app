import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiper: {
    height: height * 0.5, // 60% of screen height
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.9,
    height: height * 0.4, // 40% of screen height
    resizeMode: 'contain',
  },
  slogan: {
    fontSize: height * 0.025, // Responsive font size
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: height * 0.02,
    color: '#0194B5',
  },
  button: {
    marginBottom: height * 0.05,
    backgroundColor: '#1F2937',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: height * 0.02,
    fontWeight: 'bold',
  },
});

export default styles;
