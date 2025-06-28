import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');

const getStyles = theme =>
  StyleSheet.create({
    buttonView: {
      width: '100%',
      paddingVertical: 18,
      borderRadius: 10,
      alignItems: 'center',
      backgroundColor: theme.primary,
    },
    buttonText: {
      color: theme.white,
      fontSize: width * 0.045,
      fontWeight: '500',
    },
  });

export default getStyles;
