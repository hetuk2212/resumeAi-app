import {StyleSheet} from 'react-native';

const getStyles = theme =>
  StyleSheet.create({
    safeView: {
      flex: 1,
      backgroundColor: theme.white,
    },
    container: {
      flex: 1,
      backgroundColor: theme.white,
      padding: 15,
    },
    barIcon: {
      width: 30,
      height: 30,
      tintColor:theme.black
    },
    headerView: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
    },
    mainTitle: {
      fontSize: 24,
      fontWeight: '500',
      color: theme.black,
    },
    createBtn: {
      padding: 5,
      borderRadius: 15,
      backgroundColor: 'rgba(255,255,255,0.3)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    resumeBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: theme.primary,
      marginTop: 20,
      padding: 14,
      borderRadius: 12,
    },
    resumeBtnImg: {
      width: 20,
      height: 20,
      tintColor: "#E6E6E6",
    },
    resumeBtnText: {
      fontSize: 18,
      fontWeight: '600',
      color: "#E6E6E6",
    },
    allResume: {
      backgroundColor: theme.resumeListCardBackground,
      padding: 10,
      borderRadius: 15,
    },
    allResumeLoader: {
      backgroundColor: '#F0F0F0',
      padding: 10,
      borderRadius: 15,
      marginTop: 10,
    },
    profileAccount: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    accountDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
    },
    accountName: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.black,
    },
    accountEmail: {
      fontSize: 14,
      color: theme.smallText,
      fontWeight: '400',
    },
    accountTimeText: {
      fontSize: 12,
      color: theme.smallText,
      fontWeight: '400',
    },
    dotIcon: {
      width: 20,
      height: 20,
      tintColor: theme.secondary,
    },
    resumeTime: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    spareteBorder: {
      borderWidth: 0.5,
      borderColor: '#CCC',
      borderRadius: 40,
      marginTop: 10,
      marginBottom: 10,
    },
    dotBtn: {
      backgroundColor: theme.tertiaryBackground,
      borderRadius: 50,
      paddingVertical:5,
      paddingHorizontal: 5,
    },
    resumeListContainer: {
      paddingVertical: 15,
    },
    dropdownContainer: {
      position: 'relative',
    },
    dropdownMenu: {
      position: 'absolute',
      right: 0,
      top: 30,
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 8,
      minWidth: 120,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 10,
      zIndex: 999,
    },

    dropdownItem: {
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    dropdownText: {
      fontSize: 16,
      color: '#333',
    },
    loaderText: {
      width: 150,
      height: 14,
      borderRadius: 7,
      backgroundColor: '#e0e0e0',
      marginBottom: 6,
    },
    loaderTextSmall: {
      width: 100,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#e0e0e0',
      marginBottom: 6,
    },
    loaderCircleSmall: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#e0e0e0',
    },
  });

export default getStyles;
