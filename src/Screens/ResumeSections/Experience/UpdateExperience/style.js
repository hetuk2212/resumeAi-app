import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: '#ffffff',
      },
      container: {
        flex: 1,
        padding: 16,
      },
      createNew: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      },
      title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1a1a1a',
      },
      dateView:{
        flexDirection: 'row',
        justifyContent:"space-between",
        width:"100%",
    
      },
      dateBox:{
        width:"48%"
      }
})

export default styles