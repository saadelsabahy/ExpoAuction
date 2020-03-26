import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { CustomButton } from '../button';
import { WHITE_COLOR, BLACK_COLOR } from '../../constants/colors';

const GelleryAndCameraModal = ({
   isVisible,
   onBackdropPress,
   onOpenCameraPressed,
   onOpenGeleryPressed,
   backdropOpacity,
}) => {
   return (
      <View style={styles.container}>
         <Modal
            style={{ flex: 1 }}
            useNativeDriver
            coverScreen
            isVisible={isVisible}
            onBackdropPress={onBackdropPress}
            backdropOpacity={backdropOpacity || 0.5}>
            <View style={styles.buttonContainer}>
               <CustomButton
                  buttonContainerStyle={styles.button}
                  buttonTitle={'camera'}
                  buttonTitleStyle={styles.buttonText}
                  onButtonPressed={onOpenCameraPressed}
               />
               <CustomButton
                  buttonContainerStyle={styles.button}
                  buttonTitle={'gellery'}
                  buttonTitleStyle={styles.buttonText}
                  onButtonPressed={onOpenGeleryPressed}
               />
            </View>
         </Modal>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   buttonContainer: {
      width: '95%',
      height: '20%',
      backgroundColor: WHITE_COLOR,
      padding: 10,
   },
   button: {
      backgroundColor: 'transparent',
      alignItems: 'flex-start',
   },
   buttonText: {
      color: BLACK_COLOR,
   },
});

export { GelleryAndCameraModal };
