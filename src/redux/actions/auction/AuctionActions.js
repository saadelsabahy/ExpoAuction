import {
   GET_AUCTION_ITEMS_SPINNER,
   GET_AUCTION_ITEMS_SUCCESS,
   GET_AUCTION_ITEMS_FAILED,
   GET_AUCTION_ITEM_FAILED,
   GET_AUCTION_ITEM_SPINNER,
   GET_AUCTION_ITEM_SUCCESS,
   BID_SUCCESS,
   BID_FAILED,
   BID_LOADING,
   UPDATE_BID_VALUE,
   CLEAR_OLD_ITEM_DATA,
} from './AuctionTypes';
import * as firebase from 'firebase';
import { showMessage } from 'react-native-flash-message';
export const getAuctionItems = () => async dispatch => {
   try {
      dispatch({ type: GET_AUCTION_ITEMS_SPINNER });
      const source = await firebase.database().ref('/products');
      source.on('value', data => {
         if (data.val()) {
            let items = Object.entries(data.val()).map(item => ({
               ...item[1],
               key: item[0],
            }));

            let filterd = items.filter(item => item.paid !== true);
            dispatch({
               type: GET_AUCTION_ITEMS_SUCCESS,
               payload: filterd.length > 0 ? filterd : [],
            });
         } else {
            dispatch({
               type: GET_AUCTION_ITEMS_SUCCESS,
               payload: [],
            });
         }
      });
   } catch (e) {
      console.log('get auction itemserror', e);
      dispatch({ type: GET_AUCTION_ITEMS_FAILED });
   }
};

export const getItemData = itemId => async (dispatch, getState) => {
   try {
      dispatch({ type: GET_AUCTION_ITEM_SPINNER });
      await firebase
         .database()
         .ref(`products/${itemId}/subScribers`)
         .transaction(oldValue => oldValue + 1);
      firebase
         .database()
         .ref(`products/${itemId}`)
         .on('value', async data => {
            if (data.val()) {
               dispatch({
                  type: GET_AUCTION_ITEM_SUCCESS,
                  payload: data.val(),
               });
            }
         });
   } catch (e) {
      console.log('get Item Error'.e);
      dispatch({ type: GET_AUCTION_ITEM_FAILED });
   }
};
export const clearOldItemData = () => async dispatch => {
   dispatch({ type: CLEAR_OLD_ITEM_DATA });
};
export const decreaseSubscribers = itemId => async (dispatch, getState) => {
   await firebase
      .database()
      .ref(`products/${itemId}/subScribers`)
      .transaction(oldValue => oldValue - 1);
   dispatch({ type: CLEAR_OLD_ITEM_DATA });
};
export const changeBidValue = bidValue => async dispatch => {
   dispatch({ type: UPDATE_BID_VALUE, payload: bidValue });
};
export const onIncreaseBid = (
   bidValue,
   itemId,
   currentPrice,
   initialPrice
) => async (dispatch, getState) => {
   if (bidValue === '') {
      showMessage({ type: 'warning', message: 'you must enter value' });
   } else {
      try {
         dispatch({ type: BID_LOADING });
         let source = firebase.database().ref(`products/${itemId}`);
         await source.update({
            currentPrice:
               currentPrice == ''
                  ? `${+bidValue + +initialPrice}`
                  : `${+bidValue + +currentPrice}`,
         });
         await source.update({ lastPaid: bidValue });
         dispatch({ type: BID_SUCCESS });
      } catch (e) {
         console.log('bid error', e);
         dispatch({ type: BID_FAILED });
      }
   }
};
