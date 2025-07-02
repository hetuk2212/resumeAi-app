import { StyleSheet } from "react-native";

const getStyles = theme =>
  StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: theme.white,
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
      dateView:{
        flexDirection: 'row',
        justifyContent:"space-between",
        width:"100%",
    
      },
      dateBox:{
        width:"48%"
      }
})

export default getStyles