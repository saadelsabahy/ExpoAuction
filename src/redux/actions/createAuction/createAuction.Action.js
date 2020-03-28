import {
   NAME_AND_MODAL_CHANGE,
   INITIAL_PRICE_CHANGE,
   UPLOAD_PRODUCT_FAILED,
   UPLOAD_PRODUCT_SPINNER,
   UPLOAD_PRODUCT_SUCCESS,
   UPDATE_CHANGED_DATES,
   UPDATE_IMAGES,
} from './createAuctionTypes';
import { showMessage } from 'react-native-flash-message';
import * as firebase from 'firebase';
import moment from 'moment';

export const onInputsChange = (inputName, inputValue) => {
   switch (inputName) {
      case 'nameAndModel':
         return { type: NAME_AND_MODAL_CHANGE, payload: inputValue };
         break;
      case 'initialPrice':
         return { type: INITIAL_PRICE_CHANGE, payload: inputValue };
         break;
   }
};

export const onUploadProduct = (
   startDate,
   startTime,
   endDate,
   endTime
) => async (dispatch, getState) => {
   const {
      nameAndModel,
      initialPrice,
      images,
      changedDates,
   } = getState().CreateAuction;

   let validation = validateInputs(
      nameAndModel,
      initialPrice,
      images,
      changedDates
   );
   if (validation) {
      try {
         dispatch({ type: UPLOAD_PRODUCT_SPINNER });
         const response = await fetch(images[0].uri);
         const blob = await response.blob();
         let uploadSelectedImage = await firebase
            .storage()
            .ref()
            .child(`image${Math.floor(Math.random() * 10)}`)
            .put(blob);
         let imageUrl = await uploadSelectedImage.ref.getDownloadURL();

         const uploadProductResponse = await firebase
            .database()
            .ref('/products')
            .push({
               nameAndModel,
               initialPrice,
               startDate: moment(startDate).format('DD/MM/YYYY'),
               startTime: moment(startTime).format('LT'),
               endDate: moment(endDate).format('DD/MM/YYYY'),
               endTime: moment(endTime).format('LT'),
               images: [{ uri: imageUrl }],
               paid: false,
               subScribers: 0,
               currentPrice: '',
               lastPaid: '',
            });

         dispatch({ type: UPLOAD_PRODUCT_SUCCESS });
         showmessage('product upload success', 'success');
      } catch (e) {
         dispatch({ type: UPLOAD_PRODUCT_FAILED });
         showmessage('upload product failed', 'danger');
         console.log('upload product error', e);
      }
   } else {
      return;
   }
};
const validateInputs = (nameAndModel, initialPrice, images, changedDates) => {
   if (
      nameAndModel == '' ||
      initialPrice == '' ||
      images.length < 1 ||
      changedDates.length < 1
   ) {
      showmessage('All fields are required', 'warning');
   } else {
      return true;
   }
};

const showmessage = (message, type, ...res) => {
   showMessage({
      message,
      type,
      ...res,
   });
};

export const updateChangedDates = changedDates => async dispatch => {
   dispatch({
      type: UPDATE_CHANGED_DATES,
      payload: changedDates,
   });
};

export const updateImages = images => async dispatch => {
   dispatch({
      type: UPDATE_IMAGES,
      payload: images,
   });
};
