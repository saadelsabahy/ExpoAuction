import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomText } from '../customText';
import {
   WHITE_COLOR,
   MAIN_COLOR,
   BID_INPUT_BORDER,
   AUCTION_CONTAINER,
} from '../../constants/colors';
import { Value } from 'react-native-reanimated';

const AmountItem = ({
   selected,
   selectedContainerStyle,
   notSelectedContainerStyle,
   onAmountItemPressed,
   index,
   amount,
   currency,
   key,
}) => {
   return (
      <TouchableOpacity
         style={[
            selected
               ? [styles.selectedContainer, selectedContainerStyle]
               : [styles.notSelectedContainer, notSelectedContainerStyle],
         ]}
         onPress={() => onAmountItemPressed(index, selected, amount)}
         key={`${index}`}>
         <CustomText
            text={currency}
            textStyle={[
               selected
                  ? [
                       styles.selectedText,
                       { borderBottomWidth: 0, fontSize: 15 },
                    ]
                  : [
                       styles.notSelectedText,
                       { borderBottomWidth: 0, fontSize: 15 },
                    ],
            ]}
         />
         <CustomText
            text={amount}
            textStyle={[
               selected ? [styles.selectedText] : [styles.notSelectedText],
            ]}
         />
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   notSelectedContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '30%',
      height: 60,
      backgroundColor: 'transparent',
      marginHorizontal: 3,
   },
   selectedContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '30%',
      height: 60,
      borderWidth: 1,
      backgroundColor: AUCTION_CONTAINER,
      borderRadius: 10,
      marginHorizontal: 3,
      borderColor: BID_INPUT_BORDER,
      borderStyle: 'solid',
   },
   notSelectedText: {
      color: WHITE_COLOR,
      fontSize: 18,
      borderBottomWidth: 3,
      borderBottomColor: BID_INPUT_BORDER,
      textTransform: 'uppercase',
   },
   selectedText: {
      color: MAIN_COLOR,
      fontSize: 18,
      borderBottomWidth: 3,
      borderBottomColor: MAIN_COLOR,
      textTransform: 'uppercase',
   },
});

export { AmountItem };
