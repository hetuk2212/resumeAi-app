import {StyleSheet} from 'react-native';

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
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    marginBottom: 10,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: '600',
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
  },
});

export default styles;
