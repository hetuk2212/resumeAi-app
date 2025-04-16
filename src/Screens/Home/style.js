import {StyleSheet} from 'react-native';
import Color from '../../Theme/Color';

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: Color.primary,
  },
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: Color.primary,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: '40%',
    position: 'relative',
  },
  profileView: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  profileText: {
    fontSize: 28,
    color: Color.white,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: Color.white,
  },
  logoProfile: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  resumeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Color.white,
    padding: 20,
    marginTop: 40,
    position: 'relative',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resumeBtn: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
    width: '48%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resumeBtnImg: {
    width: 60,
    height: 60,
    tintColor: Color.primary,
  },
  resumeBtnText: {
    fontSize: 16,
    fontWeight: '500',
  },
  homeBox: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#59759D',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.white,
    paddingHorizontal: 20,
    width: '90%',
    alignSelf: 'center',
    bottom: -30,
    left: "10%",
    zIndex: 1,
    paddingTop:20
  },
  homeBoxTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  homeBoxText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Color.white,
    flex: 1,
  },
  homeBoxImg: {
    width: 100,
    height: 80,
  },
});

export default styles;
