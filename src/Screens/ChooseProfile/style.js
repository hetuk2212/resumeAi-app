import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  profileBox: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    elevation: 5,
    borderRadius: 10,
    marginBottom: 15,
  },
  profileCount: {
    position: 'absolute',
    left: 10,
    top: 10,
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4db6ff',
    borderRadius: 50,
  },
  profileCountText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  profileMenu: {
    position: 'absolute',
    right: '10',
    top: 10,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontWeight: '500',
    fontSize: 18,
    color: '#000000',
  },
  profileDateView: {
    width: '100%',
    height: 20,
    marginTop: 10,
  },
  profileBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginTop: 10,
  },

  profileBtn: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    padding: 8,
    borderRadius: 30,
    backgroundColor: '#0096FF',
  },
  profileBtnText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  profileDate: {
    position: 'absolute',
    right: 5,
  },
  createBtnView: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
  },
  createBtn: {
    alignItems: 'center',
    width: '100%',
  },
  gradientBtn: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 30,
    shadowColor: '#0096FF',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  createText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconImg: {
    width: 20,
    height: 20,
  },
  dotsIconImg: {
    width: 25,
    height: 25,
  },
  ProfileIconImg: {
    width: 20,
    height: 20,
    tintColor: '#ffffff',
  },
  loaderBox: {
    width: 25,
    height: 25,
    backgroundColor: '#e0e0e0',
    borderRadius: 50,
  },
  loaderCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 50,
  },
  loaderText: {
    width: 120,
    height: 20,
    backgroundColor: '#e0e0e0',
    marginTop: 10,
    borderRadius: 5,
  },
  loaderTextSmall: {
    width: 180,
    height: 15,
    backgroundColor: '#e0e0e0',
    marginTop: 6,
    borderRadius: 5,
  },
  loaderButton: {
    width: '45%',
    height: 35,
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
  },
  dropdownMenu: {
    position: 'absolute',
    right: 10,
    top: 35,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 999,
  },
  dropdownItem: {
    paddingVertical: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: 'red',
  },
  
});

export default styles;
