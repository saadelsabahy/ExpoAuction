import {
   LOGIN_NAME_CHANGE,
   LOGIN_PASSWORD_CHANGE,
   LOGIN_FAILED,
   LOGIN_SUCCESS,
   LOGIN_SPINNER,
   LOGOUT,
} from './AuthTypes';
import FlashMessage, {
   showMessage,
   hideMessage,
} from 'react-native-flash-message';
import { AsyncStorage, Keyboard } from 'react-native';
import * as firebase from 'firebase';
import { AccessToken, LoginManager } from 'expo-facebook';
export const onAuthInputsChange = (inputName, inputValue) => {
   switch (inputName) {
      case 'loginName':
         return { type: LOGIN_NAME_CHANGE, payload: inputValue };
         break;
      case 'loginPassword':
         return { type: LOGIN_PASSWORD_CHANGE, payload: inputValue };
         break;
   }
};
export const onLoginPressed = () => async (dispatch, getState) => {
   Keyboard.dismiss();
   const { loginName, loginPassword } = getState().Auth;
   if (inputsValidation(loginName, loginPassword)) {
      try {
         dispatch({ type: LOGIN_SPINNER });
         firebase
            .auth()
            .signInWithEmailAndPassword(loginName, loginPassword)
            .then(user => {
               LoginSuccess(dispatch, user);
            })
            .catch(err => {
               firebase
                  .auth()
                  .createUserWithEmailAndPassword(loginName, loginPassword)
                  .then(user => {
                     LoginSuccess(dispatch, user);
                  })
                  .catch(e => {
                     LoginFailed(dispatch);
                  });
            });
      } catch (e) {
         console.log('login error', e);
         dispatch({ type: LOGIN_FAILED });
      }
   } else {
      return;
   }
};
const LoginSuccess = async (dispatch, { user }) => {
   console.log(user, 'loginSuccess');
   dispatch({
      type: LOGIN_SUCCESS,
   });

   await AsyncStorage.multiSet([
      ['userToken', user.refreshToken],
      ['userId', user.uid],
   ]);
};
const LoginFailed = dispatch => {
   console.log('login error');

   dispatch({
      type: LOGIN_FAILED,
   });
   Alerting('danger', 'login Failed');
};
const Alerting = (type, message) => {
   showMessage({
      type,
      message,
      textStyle: {
         alignSelf: 'center',
         textAlign: 'center',
         textTransform: 'capitalize',
      },
   });
};
const inputsValidation = (email, password) => {
   if (email.length == 0 || password.length == 0) {
      Alerting('warnning', 'email and password are required fields');
      return;
   } else {
      return true;
   }
};
/* export const onLoginPressedWithFaceBook = navigation => async (dispatch, getState) => {
   try {
      const result = await LoginManager.logInWithPermissions([
         'public_profile',
         'email',
      ]);

      if (result.isCancelled) {
         showMessage({
            message: 'You cancelled login',
            type: 'warning',
         });
      }

      console.log(
         `Login success with permissions: ${result.grantedPermissions.to)}`
      );

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
         showMessage({
            message: 'Something went wrong obtaining the users access token',
            type: 'danger',
         });
      }

      const credential = firebase.auth.FacebookAuthProvider.credential(
         data.accessToken
      );

      const firebaseUserCredential = await firebase
         .auth()
         .signInWithCredential(credential);

      const { displayName, email, uid } = firebaseUserCredential.user._user;
      await AsyncStorage.setItem('userToken', data.accessToken);
      dispatch({
         type: LOGIN_SUCCESS,
         payload: { name: displayName, email, id: uid },
      });
      showMessage({
         message: 'loggedin success',
         type: 'success',
      });
   } catch (e) {
      dispatch({ type: LOGIN_FAILED });
      showMessage({
         message: 'Something went wrong while login',
         type: 'danger',
      });
      console.log(e);
   }
}; */

//logout
export const onLogoutPressed = navigation => async dispatch => {
   try {
      await firebase.auth().signOut();
      await AsyncStorage.clear();
      dispatch({ type: LOGOUT });
   } catch (error) {
      console.log(error);
   }
};
