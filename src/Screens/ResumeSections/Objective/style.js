import {StyleSheet} from 'react-native';
import { moderateScale } from '../../../../lib/responsive';

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
  },
  educationIcon: {
    width: 25,
    height: 25,
  },

  titleView: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.primary,
  },
  formDetails: {
    padding: 10,
  },
  charCounter:{
    color: theme.smallText,
    fontSize: moderateScale(14),
    fontWeight: '500',
  }
});

export default getStyles;