import {Dimensions, StyleSheet} from 'react-native';
import Color from '../../Theme/Color';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerAuthDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backIconImg: {
    width: 25,
    height: 25,
  },
  backIconImgView: {
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
  },
  headerText: {
    fontSize: width * 0.06,
    color: Color.textBlack,
    fontWeight: '400',
  },
});

export default styles;
