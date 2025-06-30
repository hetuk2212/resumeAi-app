import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../lib/responsive';

const getStyles = theme =>
  StyleSheet.create({
    safeView: {
      flex: 1,
      backgroundColor: theme.white,
    },
    container: {
      flex: 1,
      backgroundColor: theme.white,
      padding: moderateScale(15),
    },
    barIcon: {
      width: moderateScale(30),
      height: moderateScale(30),
      tintColor: theme.black,
    },
    headerView: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(20),
    },
    mainTitle: {
      fontSize: moderateScale(24),
      fontWeight: '500',
      color: theme.black,
    },
    createBtn: {
      padding: moderateScale(5),
      borderRadius: moderateScale(15),
      backgroundColor: 'rgba(255,255,255,0.3)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: moderateScale(15),
    },
    resumeBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: theme.primary,
      marginTop: verticalScale(20),
      padding: moderateScale(14),
      borderRadius: moderateScale(12),
    },
    resumeBtnImg: {
      width: moderateScale(20),
      height: moderateScale(20),
      tintColor: '#E6E6E6',
    },
    resumeBtnText: {
      fontSize: moderateScale(18),
      fontWeight: '600',
      color: '#E6E6E6',
    },
    allResume: {
      backgroundColor: theme.resumeListCardBackground,
      padding: moderateScale(10),
      borderRadius: moderateScale(15),
    },
    allResumeLoader: {
      backgroundColor: theme.resumeListCardBackground,
      padding: moderateScale(10),
      borderRadius: moderateScale(15),
      marginTop: verticalScale(10),
    },
    profileAccount: {
      width: moderateScale(80),
      height: moderateScale(80),
      borderRadius: moderateScale(40),
    },
    accountDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(20),
    },
    accountName: {
      fontSize: moderateScale(18),
      fontWeight: '600',
      color: theme.black,
    },
    accountEmail: {
      fontSize: moderateScale(14),
      color: theme.smallText,
      fontWeight: '400',
    },
    accountTimeText: {
      fontSize: moderateScale(12),
      color: theme.smallText,
      fontWeight: '400',
    },
    dotIcon: {
      width: moderateScale(20),
      height: moderateScale(20),
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
      borderRadius: moderateScale(40),
      marginTop: verticalScale(10),
      marginBottom: verticalScale(10),
    },
    dotBtn: {
      backgroundColor: theme.tertiaryBackground,
      borderRadius: moderateScale(50),
      paddingVertical: moderateScale(5),
      paddingHorizontal: moderateScale(5),
    },
    resumeListContainer: {
      paddingVertical: verticalScale(15),
    },
    dropdownContainer: {
      position: 'relative',
    },
    dropdownMenu: {
      position: 'absolute',
      right: 0,
      top: moderateScale(30),
      backgroundColor: '#fff',
      borderRadius: moderateScale(8),
      padding: moderateScale(8),
      minWidth: moderateScale(120),
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 10,
      zIndex: 999,
    },
    dropdownItem: {
      paddingVertical: moderateScale(8),
      paddingHorizontal: moderateScale(12),
    },
    dropdownText: {
      fontSize: moderateScale(16),
      color: '#333',
    },
    loaderText: {
      width: moderateScale(150),
      height: moderateScale(14),
      borderRadius: moderateScale(7),
      backgroundColor: '#e0e0e0',
      marginBottom: verticalScale(6),
    },
    loaderTextSmall: {
      width: moderateScale(100),
      height: moderateScale(12),
      borderRadius: moderateScale(6),
      backgroundColor: '#e0e0e0',
      marginBottom: verticalScale(6),
    },
    loaderCircleSmall: {
      width: moderateScale(20),
      height: moderateScale(20),
      borderRadius: moderateScale(10),
      backgroundColor: '#e0e0e0',
    },
    emptyImage: {
      width: moderateScale(400),
      height: moderateScale(400),
    },
    emptyContainer: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    createResumeBtn: {
      backgroundColor: theme.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: moderateScale(10),
      paddingVertical: verticalScale(10),
      paddingHorizontal: moderateScale(10),
      width: '100%',
      borderRadius: moderateScale(40),
      marginTop: verticalScale(10),
    },
    createResumeBtnText: {
      color: '#ffffff',
      fontSize: moderateScale(16),
      fontWeight: '500',
    },
    rightIcon: {
      width: moderateScale(30),
      height: moderateScale(30),
      tintColor: '#ffffff',
    },
  });

export default getStyles;
