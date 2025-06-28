import {StyleSheet} from 'react-native';

const getStyles = theme =>
  StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height:"100%"
  },
  boardingImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
  sliderView: {
    height: '65%',
    position: 'relative',
  },
  textView: {
    backgroundColor: theme.white,
    height: '35%',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  textTitle: {
    color: theme.smallText,
    fontSize: 14,
    fontWeight: '500',
    width: '100%',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 35,
  },
  blurView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
  },  
  gradientView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
  },
  mainTitle: {
    position: 'absolute',
    top: '65%', 
    left: '50%', 
    transform: [
      { translateX: '-50%' },
      { translateY: '-50%' }, 
    ],
    width: '80%', 
    alignItems: 'center', 
    justifyContent: 'center',
    zIndex: 1,
  },
  mainTitleText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',  
    color: theme.primary,        
    lineHeight: 32,
  },
  signInText:{
    fontSize:14,
    fontWeight:"500",
    color:theme.black
  }
});
export default getStyles;
