import {
   LOGIN_NAME_CHANGE,
   LOGIN_PASSWORD_CHANGE,
   LOGIN_SPINNER,
   LOGIN_SUCCESS,
   LOGIN_FAILED,
   LOGOUT,
} from '../../actions/Auth/AuthTypes';

const initialState = {
   loginName: '',
   loginPassword: '',
   loginLoading: false,
   loginError: false,
   logedIn: null,
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case LOGIN_NAME_CHANGE:
         return { ...state, loginName: payload };
         break;
      case LOGIN_PASSWORD_CHANGE:
         return { ...state, loginPassword: payload };
         break;
      case LOGIN_SPINNER:
         return { ...state, loginLoading: true, loginError: false };
         break;
      case LOGIN_SUCCESS:
         return {
            ...initialState,
            logedIn: true,
         };
         break;
      case LOGIN_FAILED:
         return { ...state, loginLoading: false, loginError: true };
         break;
      case LOGOUT:
         return { ...initialState, logedIn: false };
         break;

      default:
         return state;
   }
};
