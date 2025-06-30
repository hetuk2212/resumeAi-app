import {StyleSheet, Platform, StatusBar} from 'react-native';

const getStyles = theme =>
  StyleSheet.create({
    drawer: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: '80%',
      zIndex: 1000,
    },
    logoIcon: {
      width: 100,
      height: 100,
      borderRadius: 15,
    },
    title: {
      fontSize: 18,
      fontWeight: '500',
      color: theme.black,
      marginTop: 10,
    },
    menuBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      gap: 20,
      marginBottom: 15,
    },
    menuBtnText: {
      fontSize: 18,
      fontWeight: '500',
      color: theme.black,
    },
    menuBtnIcon: {
      width: 30,
      height: 30,
      tintColor: theme.black,
    },
    drawerContent: {
      flex: 1,
      backgroundColor: theme.white,
      borderRadius: 10,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 10,
      // marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    drawerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    drawerItem: {
      fontSize: 16,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: '#eee',
    },
    overlay: {
      position: 'absolute',
      top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 999,
    },
  });

export default getStyles;
