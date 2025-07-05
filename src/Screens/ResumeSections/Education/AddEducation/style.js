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
  },
  educationIcon: {
    width: 25,
    height: 25,
    tintColor: '#ffffff',
  },

  titleView: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffff',
  },
  formDetails: {
    padding: 10,
  },
});

export default getStyles;
