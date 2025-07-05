import { StyleSheet } from "react-native";
import { moderateScale } from "../../../lib/responsive";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: moderateScale(200),
      height: moderateScale(200),
      borderRadius: 10
    },
    
  });

export default styles