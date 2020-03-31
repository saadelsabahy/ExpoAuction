if (__DEV__) {
   import('./ReactotronConfig').then(() =>
      console.log('Reactotron Configured')
   );
}

import React, { useEffect, useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   StatusBar,
   AsyncStorage,
   SafeAreaView,
} from 'react-native';
import APPNavigation from './src/navigation';
import Splash from './src/screens/Splash';
import { MAIN_COLOR, SURFACE_COLOR, WHITE_COLOR } from './src/constants/colors';
import Login from './src/screens/Login';
import FlashMessage from 'react-native-flash-message';

import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import * as firebase from 'firebase';
import * as Font from 'expo-font';
import { useSelector } from 'react-redux';

YellowBox.ignoreWarnings(['Remote debugger']);

const App = () => {
   const [fontLoaded, setFontLoaded] = useState(false);
   const firebaseConfig = {
      apiKey: 'AIzaSyDn7ryKWTLcm0NzOj61uLAJAtRqZ3RrM-A',
      authDomain: 'auction-dfc2c.firebaseapp.com',
      databaseURL: 'https://auction-dfc2c.firebaseio.com',
      projectId: 'auction-dfc2c',
      storageBucket: 'auction-dfc2c.appspot.com',
      messagingSenderId: '454399629100',
      appId: '1:454399629100:web:7beb9c12cc69e2b16f7e89',
      measurementId: 'G-LLQQRJNM8Y',
   };

   useEffect(() => {
      loadFont();
      if (!firebase.apps.length) {
         firebase.initializeApp(firebaseConfig);
      }

      return () => {};
   }, []);
   const loadFont = async () => {
      await Font.loadAsync({
         Montserrat: require('./src/assets/fonts/Montserrat-Regular.ttf'),
         'Montserrat-Regular': {
            uri: require('./src/assets/fonts/Montserrat-Regular.ttf'),
         },
      });
      setFontLoaded(true);
   };
   return (
      fontLoaded && (
         <Provider store={store}>
            <SafeAreaView style={styles.container}>
               <StatusBar backgroundColor={MAIN_COLOR} />
               <APPNavigation />
               <FlashMessage
                  position="top"
                  style={styles.flashMessage}
                  duration={1000}
                  textStyle={styles.flashText}
               />
            </SafeAreaView>
         </Provider>
      )
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: SURFACE_COLOR,
   },
   flashMessage: {
      width: '97%',
      alignSelf: 'center',
      borderRadius: 5,
      justifyContent: 'center',
   },
   flashText: {
      fontFamily: 'Montserrat-Regular',
      textTransform: 'capitalize',
      fontSize: 13,
      marginHorizontal: 3,
      color: WHITE_COLOR,
   },
});

export default App;
