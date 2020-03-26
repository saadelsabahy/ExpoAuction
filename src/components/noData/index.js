import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { CustomText } from '../customText';
import { MAIN_COLOR } from '../../constants/colors';

const EmptyList = ({ iconSize, emptyText }) => {
   return (
      <View style={styles.container}>
         <Icon name={'exclamation'} size={iconSize || 30} color={MAIN_COLOR} />
         <CustomText
            textStyle={styles.text}
            text={emptyText || 'No data found'}
         />
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   text: {
      letterSpacing: 1,
      marginVertical: 5,
      fontSize: 17,
      color: MAIN_COLOR,
   },
});

export { EmptyList };
