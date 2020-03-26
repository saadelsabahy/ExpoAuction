import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
   BLACK_COLOR,
   ERROR_RED_COLOR,
   MAIN_COLOR,
   WHITE_COLOR,
} from '../../constants/colors';
import { hideTabbar, clearKeyBoardListners } from '../../redux/actions';
const CustomInputButton = ({
   placeholder,
   inputContainerStyle,
   inputStyle,
   iconLeftName,
   IconRightName,
   iconLeftStyle,
   iconRightStyle,
   iconLeftSzie,
   iconRightSize,
   inputProps,
   error,
   errorText,
   errorTextStyle,
   onRightIconPressed,
   pickedValue,
   onPick,
   children,
}) => {
   return (
      <View style={{ marginVertical: 10 }}>
         <View style={[styles.container, inputContainerStyle]}>
            {iconLeftName && (
               <Icon
                  name={iconLeftName}
                  style={[styles.leftIcon, iconLeftStyle]}
                  size={iconLeftSzie || 20}
                  color={WHITE_COLOR}
               />
            )}
            {React.cloneElement(children, styles.button)}
            {IconRightName && (
               <Icon
                  name={IconRightName}
                  style={[styles.rightIcon, iconRightStyle]}
                  size={iconRightSize || 20}
                  onPress={onRightIconPressed}
                  color={WHITE_COLOR}
               />
            )}
         </View>
         {error && (
            <Text style={[styles.errorText, errorTextStyle]}>{errorText}</Text>
         )}
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      width: '95%',
      height: 60,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 5,
      borderColor: MAIN_COLOR,
      borderWidth: 0.5,
      borderRadius: 5,
   },
   button: {
      flex: 1,
   },
   leftIcon: {
      marginHorizontal: 5,
   },
   rightIcon: {
      marginHorizontal: 5,
   },
   errorText: {
      color: ERROR_RED_COLOR,
      marginVertical: 4,
      fontSize: 18,
   },
});

export { CustomInputButton };
