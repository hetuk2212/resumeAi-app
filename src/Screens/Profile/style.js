import {StyleSheet, Platform} from 'react-native';
import Color from '../../Theme/Color';
import {moderateScale} from '../../../lib/responsive';

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
    sectionBtn: {
      paddingVertical: moderateScale(10),
      paddingHorizontal: moderateScale(10),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: moderateScale(8),
      width: '100%',
      backgroundColor: theme.resumeListCardBackground,
      marginBottom: moderateScale(2),
      borderRadius: moderateScale(12),
 
    },
    sectionBtnContainer: {
      gap: moderateScale(12),
    },
    sectionBtnImg: {
      width: moderateScale(30),
      height: moderateScale(30),
      tintColor: theme.black,
    },
    sectionTitle: {
      fontWeight: '600',
      fontSize: moderateScale(14),
      color: theme.black,
      textAlign: 'center',
    },
    sectionContainer: {
      marginTop: moderateScale(20),
    },
    sectionHeader: {
      fontSize: moderateScale(20),
      fontWeight: 'bold',
      marginBottom: moderateScale(20),
      color: theme.black,
    },
    optionsContainer: {
      padding: moderateScale(20),
    },
    optionalSectionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    deleteSectionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 18,
      textAlign: 'center',
      color: '#111',
    },
    input: {
      borderWidth: 1,
      borderColor: '#CCCCCC',
      borderRadius: 12,
      padding: 12,
      marginBottom: 22,
      fontSize: 16,
      backgroundColor: '#FFF',
    },
    viewBtn: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 14,
      backgroundColor: theme.primary,
      width: '100%',
      gap: 10,
      borderRadius: 25,
      marginTop: moderateScale(20),
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: {width: 0, height: -2},
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        android: {
          elevation: 10,
        },
      }),
    },
    viewIcon: {
      width: 26,
      height: 26,
      tintColor: '#FFFFFF',
    },
    viewText: {
      fontSize: 18,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    loader: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default getStyles;
