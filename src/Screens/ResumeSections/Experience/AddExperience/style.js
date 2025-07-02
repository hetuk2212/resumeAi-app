import {StyleSheet} from 'react-native';
import Color from '../../../../Theme/Color';

const getStyles = theme =>
  StyleSheet.create({
    safeView: {
      flex: 1,
      backgroundColor: theme.white,
    },
    container: {
      padding: 15,
    },
    formBox: {
      marginTop: 25,
      backgroundColor: theme.resumeListCardBackground,
      borderRadius: 10,
      overflow: 'hidden',
      padding: 4,
    },
    educationIcon: {
      width: 25,
      height: 25,
      tintColor: theme.black,
    },

    titleView: {
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: Color.primary,
    },
    title: {
      fontSize: 18,
      fontWeight: '500',
      color: '#ffffff',
    },
    formDetails: {
      padding: 10,
    },
    dateView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    dateBox: {
      width: '48%',
    },
  });

export default getStyles;
