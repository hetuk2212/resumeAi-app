import {StyleSheet, Platform} from 'react-native';

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
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  sectionBtnImg: {
    width: 28,
    height: 28,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 17,
    color: '#333',
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
    backgroundColor: '#1F2937',
    position: 'absolute',
    width: '100%',
    bottom: 0,
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
