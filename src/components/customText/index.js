import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WHITE_COLOR } from '../../constants/colors';
const CustomText = ({ text, textStyle, animation, ...res }) => {
   return (
      <Text style={[styles.text, textStyle]} {...res}>
         {text}
      </Text>
   );
};
const styles = StyleSheet.create({
   text: {
      fontFamily: 'Montserrat-Regular',
      textTransform: 'capitalize',
      fontSize: 13,
      marginHorizontal: 3,
      color: WHITE_COLOR,
      textAlign: 'left',
   },
});

export { CustomText };
