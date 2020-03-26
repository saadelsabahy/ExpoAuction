import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { IconButton } from '../IconButton';
import { MAIN_COLOR } from '../../constants/colors';
import { CustomText } from '../customText';

const LoaderAndRetry = ({ loading, error, onRetryPressed }) => {
   return (
      <View style={styles.container}>
         {loading && (
            <View style={styles.contentContainer}>
               <ActivityIndicator size="large" color={MAIN_COLOR} />
               <CustomText
                  text={'Getting your data....'}
                  textStyle={styles.text}
               />
            </View>
         )}
         {error && (
            <View style={styles.contentContainer}>
               <IconButton
                  iconName="reload"
                  onIconPressed={onRetryPressed}
                  iconSize={50}
                  type={'material-community'}
                  iconColor={MAIN_COLOR}
               />
               <CustomText
                  text={'Something wrong please try again'}
                  textStyle={styles.text}
               />
            </View>
         )}
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   contentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   text: {
      color: MAIN_COLOR,
      fontSize: 18,
      textTransform: 'capitalize',
   },
});

export { LoaderAndRetry };
