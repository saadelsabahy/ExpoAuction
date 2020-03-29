import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Modal from 'react-native-modal';
import { WHITE_COLOR } from '../../constants/colors';
import { SvgCongratulation } from '../svgCongratulation';
import { playButtonPress } from '../../utils/sound';
import { IconButton } from '../IconButton';
import * as Animatable from 'react-native-animatable';
const WinnerModal = ({
   isVisible,
   onBackdropPress,
   backdropOpacity,
   onClosePressed,
}) => {
   const [zoomType, setzoomType] = useState('');
   var timeOut;
   const onModalShow = () => {
      playButtonPress('win');

      timeOut = setTimeout(() => {
         setzoomType('zoomIn');
      }, 300);
   };
   useEffect(() => {
      return () => {
         setzoomType('zoomOut');
         clearTimeout(timeOut);
      };
   }, []);
   return (
      <View style={styles.container}>
         <Modal
            style={{ flex: 1 }}
            useNativeDriver
            coverScreen
            isVisible={isVisible}
            onBackdropPress={onBackdropPress}
            onModalShow={onModalShow}
            backdropOpacity={backdropOpacity || 0.5}>
            <View style={styles.closeButton}>
               <IconButton
                  iconName={'ios-close-circle-outline'}
                  type="ionicon"
                  iconColor={WHITE_COLOR}
                  iconSize={50}
                  onIconPressed={onBackdropPress}
               />
            </View>
            <Animatable.View
               style={{ justifyContent: 'center' }}
               animation={zoomType}
               useNativeDriver={true}
               iterationCount={1}
               duration={1500}
               easing={'ease-in-cubic'}>
               <SvgCongratulation
                  onPress={onBackdropPress}
                  style={{ flex: 1, alignSelf: 'center' }}
               />
            </Animatable.View>
         </Modal>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      zIndex: 100,
   },
   contentContainer: {
      width: '95%',
      height: '25%',
      backgroundColor: WHITE_COLOR,
      padding: 10,
      borderRadius: 5,
   },
   lottieView: {
      width: 300,
      height: 150,
   },
   textStyle: {
      color: WHITE_COLOR,
      fontSize: 30,
      textTransform: 'capitalize',
      letterSpacing: 3,
   },
   closeButton: {
      position: 'absolute',
      top: 5,
      end: 5,
   },
});

export { WinnerModal };
