import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import {
   BLACK_COLOR,
   ERROR_RED_COLOR,
   MAIN_COLOR,
   WHITE_COLOR,
} from '../../constants/colors';
import { Icon } from '../icon';
import { useDispatch } from 'react-redux';
import {
   hideTabbar,
   clearKeyBoardListners,
   showTabbar,
   handleKeyboardAppearance,
} from '../../redux/actions';

const CustomInput = ({
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
   contentContainerStyle,
   iconLeftType,
   iconRightType,
   ...res
}) => {
   const dispatch = useDispatch();
   const onInputFocus = () => {
      dispatch(hideTabbar());
   };
   const onInputBlur = () => {
      dispatch(showTabbar());
   };
   return (
      <View style={[styles.contentContainer, contentContainerStyle]}>
         <View style={[styles.container, inputContainerStyle]}>
            {iconLeftName && (
               <Icon
                  name={iconLeftName}
                  style={[styles.leftIcon, iconLeftStyle]}
                  size={iconLeftSzie || 20}
                  color={WHITE_COLOR}
                  type={iconLeftType}
               />
            )}
            <TextInput
               placeholder={placeholder}
               style={[styles.input, inputStyle]}
               placeholderTextColor={WHITE_COLOR}
               {...res}
            />
            {IconRightName && (
               <Icon
                  name={IconRightName}
                  style={[styles.rightIcon, iconRightStyle]}
                  size={iconRightSize || 20}
                  onPress={onRightIconPressed}
                  color={WHITE_COLOR}
                  type={iconRightType}
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
   contentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   container: {
      flexDirection: 'row',
      width: '95%',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 10,
      borderColor: MAIN_COLOR,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 5,
   },
   input: {
      flex: 0.99,
      color: WHITE_COLOR,
   },
   leftIcon: {
      marginHorizontal: 10,
   },
   rightIcon: {
      marginHorizontal: 10,
   },
   errorText: {
      color: ERROR_RED_COLOR,
      marginVertical: 4,
      fontSize: 18,
   },
});

export { CustomInput };
