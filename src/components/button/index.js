import React from 'react';
import {
   View,
   Text,
   TouchableOpacity,
   StyleSheet,
   ActivityIndicator,
} from 'react-native';
import {
   MAIN_COLOR,
   WHITE_COLOR,
   BID_INPUT_BORDER,
} from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomText } from '../customText';
export const BUTTON_HEIGHT = 50;
const CustomButton = ({
   buttonTitle,
   buttonTitleStyle,
   loading,
   spinnerColor,
   spinnerSize,
   onButtonPressed,
   buttonContainerStyle,
   buttonActiveOpacity,
   iconStart,
   iconStartSize,
   iconStartStyle,
   iconStartColor,
}) => {
   return (
      <TouchableOpacity
         style={[styles.container, buttonContainerStyle]}
         onPress={onButtonPressed}
         activeOpacity={buttonActiveOpacity || 0.8}>
         {iconStart && (
            <Icon
               name={iconStart}
               size={iconStartSize || 30}
               style={[styles.iconStart, iconStartStyle]}
               color={iconStartColor || WHITE_COLOR}
            />
         )}
         {loading ? (
            <ActivityIndicator
               size={spinnerSize || 'small'}
               animating
               color={spinnerColor}
            />
         ) : (
            <CustomText
               textStyle={[styles.text, buttonTitleStyle]}
               text={buttonTitle}
            />
         )}
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   container: {
      width: '80%',
      height: BUTTON_HEIGHT,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: MAIN_COLOR,
      borderRadius: 0.5 * BUTTON_HEIGHT,
      borderWidth: 1.5,
      borderColor: BID_INPUT_BORDER,
   },
   text: {
      color: WHITE_COLOR,
      textTransform: 'capitalize',
      fontSize: 18,
      letterSpacing: 0.8,
   },
   iconStart: {
      marginEnd: 10,
   },
});

export { CustomButton };
