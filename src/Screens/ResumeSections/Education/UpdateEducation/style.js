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
      title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1a1a1a',
      },
      inputContainer:{
        marginTop:20
      }
})

export default getStyles