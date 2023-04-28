import React from 'react';
/*
  Note: using v3.x package in this demo (react-native-elements). 
  Most recent v4.x package requires install @rneui/base and @rneui/theme.
  For more info: https://reactnativeelements.com/migration/migration-v3
*/
import { ThemeProvider} from 'react-native-elements';
import './config/firebase';
import RootNavigation from './navigation';

export default function App() {
  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>
  );
}

