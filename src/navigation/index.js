import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import TabBar from './TabBar';
import { AsyncStorage } from 'react-native';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import { BackHandler } from 'react-native';

const APPNavigation = () => {
   const logedIn = useSelector(state => state.Auth.logedIn);
   const [showSplash, setShowSplash] = useState(true);
   const [userToken, setUserToken] = useState(
      AsyncStorage.getItem('userToken', (err, res) => setUserToken(res))
   );

   useEffect(() => {
      var splashTimeOut = setTimeout(async () => {
         setShowSplash(false);
      }, 500);
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      return () => {
         clearTimeout(splashTimeOut);
         BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      };
   }, []);
   const handleBackButton = () => {
      return true;
   };
   return (
      <NavigationContainer>
         {showSplash ? <Splash /> : userToken ? <TabBar /> : <Login />}
      </NavigationContainer>
   );
};

export default APPNavigation;
/*  userToken ? <TabBar /> : <Login /> */
