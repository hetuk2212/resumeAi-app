import {StyleSheet, Platform} from 'react-native';
import Color from '../../Theme/Color';

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  sectionBtn: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: "30%",
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  sectionBtnContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
    gap: 12,
  },
  sectionBtnImg: {
    width: 28,
    height: 28,
    tintColor: Color.primary
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 22,
  },
  sectionHeader: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222',
  },
  optionsContainer: {
    padding: 22,
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
    backgroundColor: Color.primary,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    gap: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
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
  loader:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  }
});

export default styles;
