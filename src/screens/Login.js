import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import {
   WHITE_COLOR,
   MAIN_COLOR,
   SURFACE_COLOR,
   BID_INPUT_BORDER,
} from '../constants/colors';
import { Header, CustomInput, CustomButton } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { onLoginPressed, onAuthInputsChange } from '../redux/actions';
import Svg, { Circle } from 'react-native-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const { width, height } = Dimensions.get('window');
const Login = () => {
   const [showPassword, setshowPassword] = useState(true);
   const passwordRef = useRef(null);
   const dispatch = useDispatch();
   const {
      loginName,
      loginPassword,
      loginLoading,
      loginError,
      keyboardShow,
   } = useSelector(state => ({
      loginName: state.Auth.loginName,
      loginPassword: state.Auth.loginPassword,
      loginLoading: state.Auth.loginLoading,
      loginError: state.Auth.loginError,
      keyboardShow: state.Keyboard.keyboardShow,
   }));

   return (
      <View style={styles.container}>
         <Svg width="100%" height="50%" style={[styles.imageContainer]}>
            <Circle
               cx={width / 2}
               cy={`-${900 - height / 3}`}
               r="900"
               fill={MAIN_COLOR}
               stroke={MAIN_COLOR}
               strokeWidth="1"
            />
            <Image
               source={require('../assets/images/nissan.png')}
               style={{
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                  alignSelf: 'center',
               }}
            />
         </Svg>

         <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
               flexGrow: 1,
               alignItems: 'center',
            }}
            enableAutomaticScroll>
            <View style={styles.inputsContainer}>
               <CustomInput
                  placeholder={'Enter your email'}
                  iconLeftName={'user'}
                  inputProps={{
                     returnKeyType: 'next',
                     onSubmitEditing: () => passwordRef.current.focus(),
                     blurOnSubmit: false,
                  }}
                  iconLeftType="feather"
                  contentContainerStyle={styles.inputWrapper}
                  inputStyle={styles.input}
                  inputContainerStyle={styles.inputBorder}
                  onChangeText={name =>
                     dispatch(onAuthInputsChange('loginName', name))
                  }
                  value={loginName}
               />
               <CustomInput
                  placeholder={'Password'}
                  iconLeftName={'lock'}
                  inputProps={{
                     ref: passwordRef,
                     secureTextEntry: !showPassword,
                  }}
                  IconRightName={
                     showPassword ? 'eye-off-outline' : 'eye-outline'
                  }
                  onRightIconPressed={() => setshowPassword(!showPassword)}
                  iconLeftType="feather"
                  iconRightType={'material-community'}
                  contentContainerStyle={styles.inputWrapper}
                  inputStyle={styles.input}
                  inputContainerStyle={styles.inputBorder}
                  onChangeText={password =>
                     dispatch(onAuthInputsChange('loginPassword', password))
                  }
                  value={loginPassword}
                  secureTextEntry={showPassword}
               />
            </View>
            <CustomButton
               buttonTitle={'login'}
               onButtonPressed={() => dispatch(onLoginPressed())}
               buttonContainerStyle={{ width: '95%', marginBottom: 20 }}
               buttonTitleStyle={{ textTransform: 'uppercase' }}
               loading={loginLoading}
               spinnerColor={WHITE_COLOR}
            />
         </KeyboardAwareScrollView>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: SURFACE_COLOR,
   },
   imageContainer: {},

   inputsContainer: {
      flex: 0.9,
   },
   inputWrapper: {
      flex: 0,
      width: '100%',
      marginVertical: height > 800 ? '2%' : '.1%',
   },
   input: { height: 50 },
   inputBorder: {
      borderRadius: 25,
      borderColor: BID_INPUT_BORDER,
   },
});

export default Login;
