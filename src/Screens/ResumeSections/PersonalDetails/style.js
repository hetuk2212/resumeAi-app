import {StyleSheet} from 'react-native';
import {moderateScale} from '../../../../lib/responsive';

const getStyles = theme =>
  StyleSheet.create({
    safeView: {
      flex: 1,
      backgroundColor: theme.white,
    },
    container: {
      padding: 15,
    },
    tabBtnView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 2,
      borderColor: 'gray',
    },
    tabBtn: {
      width: '50%',
      alignItems: 'center',
      padding: 10,
    },
    tabBtnText: {
      fontSize: 18,
      fontWeight: '400',
    },

    activeTab: {
      borderBottomWidth: 4,
      borderColor: '#1F2937',
    },
    activeTabText: {
      color: '#1F2937',
    },
    label: {
      fontSize: moderateScale(14),
      fontWeight: '500',
      marginBottom: 8,
      color: theme.black,
    },
    userProfile: {
      width: 100,
      height: 100,
      borderRadius: moderateScale(50),
    },
    gradientBtn: {
      paddingVertical: 10,
      paddingHorizontal: 25,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      borderRadius: 30,
      shadowColor: '#1F2937',
      shadowOffset: {width: 0, height: 5},
      shadowOpacity: 0.3,
      shadowRadius: 10,
    },
    profileImgView: {
      alignItems: 'center',
    },
    profileImgBtnView: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
    },

    headerText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#333',
    },
    titleBox: {
      backgroundColor: '#1F2937',
      padding: 10,
    },
    title: {
      color: '#ffffff',
      fontWeight: '500',
      fontSize: 18,
    },
    fieldsContainer: {
      overflow: 'hidden',
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderRadius: 10,
      borderColor: 'gray',
    },
    fieldItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 10,
      margin: 10,
      // backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderColor: 'gray',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 3,
      // elevation: 3,
    },
    fieldLabel: {
      fontSize: 16,
      color: '#444',
    },
    loader: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dateInputContainer: {
      position: 'relative',
    },
    dateView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dateBox: {
      width: '48%',
    },
    profileBtnChange: {
      backgroundColor: theme.resumeListCardBackground,
      padding: moderateScale(7),
      borderRadius: moderateScale(40),
      position: 'absolute',
      top: 0,
      right: moderateScale(-12),
    },

    editIcon: {
      width: moderateScale(22),
      height: moderateScale(22),
      tintColor:theme.black
    },
  });

export default getStyles;
