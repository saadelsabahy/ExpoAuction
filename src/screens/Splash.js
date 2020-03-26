import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import SplashImage from '../assets/images/Icon.png';
import { WHITE_COLOR, SURFACE_COLOR } from '../constants/colors';
const Splash = () => {
   return (
      <View style={styles.container}>
         <Image source={SplashImage} style={styles.image} />
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: SURFACE_COLOR,
   },
   image: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
   },
});

export default Splash;
