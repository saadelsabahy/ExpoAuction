import React, { useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   ScrollView,
   TouchableOpacity,
} from 'react-native';
import {
   Header,
   CustomInput,
   CustomInputButton,
   CustomDateTimePicker,
   ImageViewer,
   CustomButton,
   GelleryAndCameraModal,
   AuctionDuration,
} from '../components';
import { WHITE_COLOR, BLACK_COLOR, SURFACE_COLOR } from '../constants/colors';
import { CustomText } from '../components/customText';
import { useDispatch, useSelector } from 'react-redux';
import { onLogoutPressed } from '../redux/actions/Auth/AuthActions';
import {
   onInputsChange,
   onUploadProduct,
   updateChangedDates,
   updateImages,
} from '../redux/actions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { showMessage } from 'react-native-flash-message';
import moment from 'moment';

let INITIAL_TIME = new Date();
const Sell = () => {
   const dispatch = useDispatch();
   // const [images, setimages] = useState([]);
   const [startDate, setStartDate] = useState(INITIAL_TIME);
   const [startTime, setStartTime] = useState(INITIAL_TIME);
   const [endDate, setEndDate] = useState(INITIAL_TIME);
   const [endTime, setEndTime] = useState(INITIAL_TIME);
   const [currentShow, setcurrentShow] = useState('');
   // const [changed, setChanged] = useState([]);
   const [showMode, setShowMode] = useState(null);
   const {
      nameAndModel,
      initialPrice,
      uploadLoading,
      changedDates,
      images,
   } = useSelector(state => ({
      nameAndModel: state.CreateAuction.nameAndModel,
      initialPrice: state.CreateAuction.initialPrice,
      uploadLoading: state.CreateAuction.uploadLoading,
      changedDates: state.CreateAuction.changedDates,
      images: state.CreateAuction.images,
   }));
   const onDateTimePickerPressed = duration => {
      // setshow(true);
      duration.includes('Time') ? setShowMode('time') : setShowMode('date');
      setcurrentShow(duration);
   };

   const onDateTimePickerChange = (event, selectedDate) => {
      let changedFields = [];
      if (event.type !== 'dismissed') {
         changedFields.push(currentShow);
         setcurrentShow('');
         setShowMode(null);
         try {
            switch (currentShow) {
               case 'startTime':
                  setStartTime(selectedDate);
                  break;
               case 'startDate':
                  setStartDate(selectedDate);
                  break;
               case 'endTime':
                  const isTimeValid = moment(selectedDate).isSameOrAfter(
                     moment(startTime)
                  );

                  if (isTimeValid) {
                     setEndTime(selectedDate);
                  } else {
                     showMessage({
                        type: 'warning',
                        message: 'You Must Select Time In the Future',
                        duration: 4000,
                     });
                     setcurrentShow('');
                     setShowMode(null);
                     changedFields.pop(currentShow);
                     dispatch(
                        updateChangedDates([...changedDates, ...changedFields])
                     );
                  }

                  break;
               case 'endDate':
                  setEndDate(selectedDate);
                  break;
            }
         } catch (error) {
            console.log('change date time error', error);
            setcurrentShow('');
            setShowMode(null);
         }
         dispatch(updateChangedDates([...changedDates, ...changedFields]));
      } else {
         // setshow(null);
         setcurrentShow('');
         setShowMode(null);
         changedFields.pop(currentShow);
         dispatch(updateChangedDates([...changedDates, ...changedFields]));
      }
   };

   const onImagePickerPrsed = async () => {
      if (Constants.platform.ios) {
         const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
         if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
         }
      }
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         aspect: [4, 3],
         quality: 0.6,
         allowsMultipleSelection: true,
         base64: true,
      });

      if (!result.cancelled) {
         let selectedImages = [];
         selectedImages.push(result);
         dispatch(updateImages(selectedImages));
      }
   };

   return (
      <View style={styles.container}>
         <Header headerText={'Sell'} containerStyle={styles.headerContainer} />

         <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
            enableAutomaticScroll
            extraHeight={0}
            extraScrollHeight={0}>
            <CustomInput
               iconLeftName="ios-car"
               iconLeftType={'ionicon'}
               placeholder="Enter Car Name And Model"
               onChangeText={carName =>
                  dispatch(onInputsChange('nameAndModel', carName))
               }
               value={nameAndModel}
               inputContainerStyle={{ height: 50 }}
            />
            <CustomInput
               iconLeftName="price-ribbon"
               iconLeftType={'entypo'}
               placeholder={'Enter Initial Price'}
               onChangeText={initialPrice =>
                  dispatch(onInputsChange('initialPrice', initialPrice))
               }
               value={initialPrice}
               inputContainerStyle={{ height: 50 }}
               keyboardType={'numeric'}
               textContentType="telephoneNumber"
               maxLength={7}
            />
            <AuctionDuration
               startDate={startDate}
               startTime={startTime}
               endDate={endDate}
               endTime={endTime}
               onDateTimePickerPressed={onDateTimePickerPressed}
               // show={show}
               showMode={showMode}
               currentShow={currentShow}
               onDateTimePickerChange={onDateTimePickerChange}
               changed={changedDates}
            />
            <CustomInputButton
               iconLeftName="image"
               iconLeftType={'material-community'}
               inputContainerStyle={{ height: 50 }}>
               <CustomButton
                  buttonContainerStyle={styles.button}
                  onButtonPressed={onImagePickerPrsed}
                  buttonTitle={
                     images.length
                        ? `you select ${images.length} ${
                             images.length > 1 ? 'images' : 'image'
                          } below`
                        : 'pic images'
                  }
                  buttonTitleStyle={styles.text}
               />
            </CustomInputButton>
            {images.length ? <ImageViewer images={images} /> : null}
            <CustomButton
               buttonTitle="upload car"
               buttonContainerStyle={{
                  width: '90%',
                  alignSelf: 'center',
                  marginBottom: 25,
               }}
               loading={uploadLoading}
               onButtonPressed={() =>
                  dispatch(
                     onUploadProduct(startDate, startTime, endDate, endTime)
                  )
               }
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
   button: {
      flex: 1,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderWidth: 0,
      borderRadius: 0,
      height: '100%',
   },
   headerContainer: {
      height: '10%',
      alignItems: 'center',
      borderBottomEndRadius: 20,
      borderBottomStartRadius: 20,
      marginBottom: 0,
   },
});

export default Sell;
