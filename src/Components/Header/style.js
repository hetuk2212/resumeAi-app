import {StyleSheet} from 'react-native';
import {moderateScale} from '../../../lib/responsive';

const getStyles = theme =>
  StyleSheet.create({
    barIcon: {
      width: moderateScale(25),
      height: moderateScale(25),
      tintColor: theme.black,
    },
    headerView: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(20),
      paddingBottom: moderateScale(10),
    },
    mainTitle: {
      fontSize: moderateScale(24),
      fontWeight: '500',
      color: theme.black,
    },
  });

export default getStyles;
