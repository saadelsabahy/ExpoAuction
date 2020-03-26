import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomText } from '../customText';
import { SURFACE_COLOR, WHITE_COLOR } from '../../constants/colors';

const Price = ({ priceContainerStyle, title, price, currency }) => {
   return (
      <View style={styles.container}>
         <CustomText textStyle={styles.title} text={title} />
         <View style={[styles.priceContainer, priceContainerStyle]}>
            <CustomText
               textStyle={styles.price}
               text={parseFloat(price).toLocaleString('en')}
            />
            <CustomText textStyle={styles.price} text={currency} />
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   priceContainer: {
      flexDirection: 'row',
      backgroundColor: 'rgba(0,0,0,.5)',
      width: '90%',
      height: 35,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
   },
   title: {
      letterSpacing: 0,
      color: WHITE_COLOR,
      textTransform: 'uppercase',
   },
   price: {
      color: WHITE_COLOR,
      textTransform: 'uppercase',
      letterSpacing: 2,
   },
});

export { Price };
