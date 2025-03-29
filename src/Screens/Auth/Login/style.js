import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    color: '#444',
    marginBottom: 6,
    fontSize: 14,
  },
  phoneInputContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007bff',
    paddingVertical: 10,
  },
  phoneTextContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingVertical: 0,
  },
  phoneTextInput: {
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 10,
  },
  button: {
    width: '90%',
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
