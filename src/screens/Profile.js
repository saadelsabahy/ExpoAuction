import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, CustomButton, WinnerModal, IconButton } from '../components';
import { BLACK_COLOR, SURFACE_COLOR } from '../constants/colors';

const Profile = () => {
   const [winnerModalVisible, setWinnerModalVisible] = useState(false);
   return (
      <View style={styles.container}>
         <Header
            headerText={'profile'}
            containerStyle={styles.headerContainer}
         />
         {/*  <CustomButton
            buttonTitle={'showModal'}
            onButtonPressed={() => {
               setWinnerModalVisible(true);
            }}
            buttonContainerStyle={styles.buttonContainerStyle}
            buttonTitleStyle={styles.buttonTitleStyle}
         /> */}

         <WinnerModal
            isVisible={winnerModalVisible}
            onBackdropPress={() => {
               setWinnerModalVisible(false);
            }}
         />
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: SURFACE_COLOR,
   },
   buttonContainerStyle: {
      backgroundColor: 'transparent',
      alignSelf: 'center',
   },
   buttonTitleStyle: {
      color: BLACK_COLOR,
   },
   headerContainer: {
      height: '10%',
      alignItems: 'center',
      borderBottomEndRadius: 20,
      borderBottomStartRadius: 20,
      marginBottom: 0,
   },
});

export default Profile;
