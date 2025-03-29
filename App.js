import { View, Text } from 'react-native'
import React from 'react'
import MainNavigation from './src/Navigation/MainNavigation'
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
    <MainNavigation/>
    <Toast/>
    </>
  )
}

export default App