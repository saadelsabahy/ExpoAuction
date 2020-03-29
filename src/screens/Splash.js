import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import SplashImage from '../assets/images/nissan.png';
import { WHITE_COLOR, SURFACE_COLOR, MAIN_COLOR } from '../constants/colors';
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
      backgroundColor: MAIN_COLOR,
   },
   image: {
      width: 400,
      height: 400,
      resizeMode: 'contain',
   },
});

export default Splash;
