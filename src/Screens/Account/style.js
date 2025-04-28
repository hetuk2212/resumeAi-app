import {StyleSheet} from 'react-native';
import Color from '../../Theme/Color';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    borderWidth: 1.5,
    padding: 10,
    borderRadius: 10,
    marginBottom: 30,
    borderColor: 'gray',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  userName: {
    fontSize: 16,
    color: '#666',
  },
  userEmail: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginBottom: 10,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: '400',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    //   backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
    marginVertical: 5,
  },
  logout: {
    backgroundColor: '#ffe6e6',
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#555',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: Color.primary,
  },
  optionContainer:{
    borderWidth:1.5,
    borderColor:"gray",
    padding:10,
    borderRadius:10,
    marginTop:10
  }
});

export default styles;
