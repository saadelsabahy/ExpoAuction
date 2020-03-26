const initialState = {
   keyboardShow: false,
   tabBarVisible: true,
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case 'KEYBOARD_SHOW':
         return { ...state, keyboardShow: true };
         break;
      case 'KEYBOARD_HIDE':
         return { ...state, keyboardShow: false };
         break;
      case 'SHOW_TAB_BAR':
         return { ...state, tabBarVisible: true };
         break;
      case 'HIDE_TAB_BAR':
         return { ...state, tabBarVisible: false };
         break;
      default:
         return state;
   }
};
