import { Keyboard } from 'react-native';

let keyboardDidShowListner, keyboardDidHideListner;
export const handleKeyboardAppearance = () => async (dispatch, getState) => {
   keyboardDidShowListner = Keyboard.addListener('keyboardDidShow', () =>
      onKeyboardchange(dispatch, 'show')
   );
   keyboardDidHideListner = Keyboard.addListener('keyboardDidHide', () =>
      onKeyboardchange(dispatch, 'hide')
   );
};

const onKeyboardchange = (dispatch, type) => {
   dispatch({ type: type == 'show' ? 'KEYBOARD_SHOW' : 'KEYBOARD_HIDE' });
   /* if (type === 'hide') {
      hideTabbar();
   } */
};
export const clearKeyBoardListners = () => async (dispatch, getState) => {
   keyboardDidShowListner.remove();
   keyboardDidHideListner.remove();
};
/* const onKeyboardHide = () => {
   
   Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
   }).start();
}; */
export const hideTabbar = () => async (dispatch, getState) => {
   dispatch({
      type: 'HIDE_TAB_BAR',
   });
};
export const showTabbar = () => async (dispatch, getState) => {
   dispatch({
      type: 'SHOW_TAB_BAR',
   });
};
