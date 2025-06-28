import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import MainNavigation from './src/Navigation/MainNavigation';
import Toast from 'react-native-toast-message';
import InAppUpdates, { IAUUpdateKind } from 'sp-react-native-in-app-updates';
import { ThemeProvider } from './src/Theme/ ThemeContext';

const App = () => {
  const inAppUpdates = new InAppUpdates(true); // Enable debug logs

  useEffect(() => {
    const checkUpdate = async () => {
      try {
        const result = await inAppUpdates.checkNeedsUpdate();
        if (result.shouldUpdate) {
          await inAppUpdates.startUpdate({
            updateType: IAUUpdateKind.IMMEDIATE, // or FLEXIBLE
          });
        }
      } catch (e) {
        console.log('In-app update error:', e);
      }
    };

    checkUpdate();
    LogBox.ignoreLogs(['new NativeEventEmitter']); // Optional: ignore warning
  }, []);

  return (
    <>
        <ThemeProvider>

      <MainNavigation />
        </ThemeProvider>
      <Toast />
    </>
  );
};

export default App;
