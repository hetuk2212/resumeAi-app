import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
                            safeArea: {
                              flex: 1,
                              backgroundColor: '#f9f9f9',
                            },
                            container: {
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 20,
                            },
                            title: {
                              fontSize: 28,
                              fontWeight: 'bold',
                              color: '#333',
                              marginBottom: 10,
                            },
                            subtitle: {
                              fontSize: 16,
                              color: '#666',
                              marginBottom: 30,
                              textAlign: 'center',
                            },
                            otpContainer: {
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 30,
                              gap: 8,
                            },
                            otpInput: {
                              width: 50,
                              height: 50,
                              borderWidth: 2,
                              borderColor: '#007bff',
                              borderRadius: 10,
                              textAlign: 'center',
                              fontSize: 20,
                              backgroundColor: '#fff',
                            },
                            button: {
                              backgroundColor: '#007bff',
                              padding: 15,
                              borderRadius: 10,
                              width: '100%',
                              alignItems: 'center',
                              marginBottom: 20,
                            },
                            disabledButton: {
                              backgroundColor: '#b0c4de',
                            },
                            buttonText: {
                              color: '#fff',
                              fontSize: 18,
                              fontWeight: 'bold',
                            },
                            resendOtp: {
                              color: '#007bff',
                              fontSize: 16,
                              fontWeight: '600',
                            },
})

export default styles