import {StyleSheet} from 'react-native';
import { moderateScale } from '../../../lib/responsive';

const getStyles = theme =>
  StyleSheet.create({
    descText: {
      color: theme.smallText,
      fontSize: moderateScale(13),
      fontWeight: 400,
      marginBottom: 5,
    },
  });

export default getStyles;
