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
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffff',
  },
  formDetails: {
    padding: 10,
  },
  ratingContainer: {
    marginTop: 10,
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color:theme.black
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 10,
  },
  ratingCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingCircleActive: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  ratingText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default getStyles;