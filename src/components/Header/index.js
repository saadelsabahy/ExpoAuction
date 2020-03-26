import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from '../IconButton';
import { BLACK_COLOR, WHITE_COLOR, MAIN_COLOR } from '../../constants/colors';

const Header = ({
   headerText,
   onIconStartPressed,
   onIconEndPressed,
   iconStart,
   iconStartColor,
   iconEnd,
   iconEndColor,
   iconEndSize,
   iconStartSize,
   iconEndText,
   containerStyle,
   textContainerStyle,
   iconStartType,
   iconEndType,
}) => {
   return (
      <View style={[styles.container, containerStyle]}>
         <View style={styles.contentContainer}>
            {iconStart && (
               <IconButton
                  iconName={iconStart}
                  iconColor={iconStartColor || '#fff'}
                  onIconPressed={onIconStartPressed}
                  iconSize={iconStartSize}
                  type={iconStartType}
                  iconStyle={{ marginEnd: 5 }}
               />
            )}
            <View style={[{ flex: 1 }, textContainerStyle]}>
               <Text style={styles.headerText}>{headerText}</Text>
            </View>
            {iconEnd && (
               <IconButton
                  iconName={iconEnd}
                  iconColor={iconEndColor || '#fff'}
                  onIconPressed={onIconEndPressed}
                  iconSize={iconEndSize}
                  type={iconEndType}
                  iconStyle={{ marginEnd: 5 }}
               />
            )}
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: '10%',
      backgroundColor: MAIN_COLOR,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
   },
   contentContainer: {
      width: '95%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   headerText: {
      color: WHITE_COLOR,
      fontSize: 20,
      textTransform: 'capitalize',
      letterSpacing: 1,
   },
});

export { Header };
