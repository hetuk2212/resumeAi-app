import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    padding: 15,
   
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resumeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap:10
  },
  resumeBtn: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
    width: "48%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resumeBtnImg: {
    width: 60,
    height: 60,
    tintColor:"#1F2937"
  },
  resumeBtnText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default styles;
