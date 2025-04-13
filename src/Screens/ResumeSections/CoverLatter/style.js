import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    padding: 15,
  },
  formView: {
    marginTop: 35,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exampleList: {
    paddingTop: 10,
  },
  exampleItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007bff',
  },
  noteText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    paddingHorizontal: 10,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#333',
  },
});

export default styles;
