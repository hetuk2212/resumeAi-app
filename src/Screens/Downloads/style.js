import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F9FA',
      padding: 16,
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 16,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFF',
      padding: 15,
      marginVertical: 5,
      borderRadius: 10,
      // elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 1, height: 2 },
      shadowRadius: 4,
    },
    icon: {
      width: 40,
      height: 40,
      marginRight: 12,
    },
    details: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#222',
    },
    date: {
      fontSize: 12,
      color: '#666',
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionIcon: {
      width: 24,
      height: 24,
      tintColor: '#007BFF', // Adjust color if needed
    },
    downloadBtn: {
      marginLeft: 16,
    },
  });

export default styles