import {StyleSheet} from 'react-native';

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
    backgroundColor: '#ffffff',
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
    backgroundColor: '#1F2937',
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
