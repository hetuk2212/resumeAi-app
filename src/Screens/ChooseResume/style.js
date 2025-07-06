import { StyleSheet } from "react-native";

const getStyles = theme =>
  StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: theme.white,
      },
      container: {
        flex: 1,
        padding: 15,
       
      },
      tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 5,
      },
      tabButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
      },
      tabButtonActive: {
        backgroundColor: '#1F2937',
      },
      tabText: {
        fontSize: 16,
        color: '#6B7280',
      },
      tabTextActive: {
        color: '#ffffff',
        fontWeight: '600',
      },
      resumeView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 10
      },
      resumeBtn: {
        width: '48%',
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
        overflow:"hidden"
      },
      resumeBtnImg: {
        width: '100%',
        height: 180,
        borderRadius: 10,
      },
      resumeBtnText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1F2937',
        textAlign: 'center',
      },
      
})

export default getStyles