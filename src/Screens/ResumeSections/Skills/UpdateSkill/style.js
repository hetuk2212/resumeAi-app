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
  formDetails: {
    padding: 10,
  },
  ratingContainer: {
    marginVertical: 20,
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
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
    color: theme.black,
    fontWeight: 'bold',
  },
  inputContainer:{
    marginTop:20
  }
});

export default getStyles;