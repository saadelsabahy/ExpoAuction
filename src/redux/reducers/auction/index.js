import {
   GET_AUCTION_ITEMS_SPINNER,
   GET_AUCTION_ITEMS_SUCCESS,
   GET_AUCTION_ITEMS_FAILED,
   GET_AUCTION_ITEM_SPINNER,
   GET_AUCTION_ITEM_FAILED,
   GET_AUCTION_ITEM_SUCCESS,
   BID_LOADING,
   BID_SUCCESS,
   BID_FAILED,
   UPDATE_BID_VALUE,
   CLEAR_OLD_ITEM_DATA,
} from '../../actions/auction/AuctionTypes';

const initialState = {
   amounts: [
      { value: 1000, selected: false, disabeld: false },
      { value: 3000, selected: false, disabeld: false },
      { value: 600, cselected: false, disabeld: false },
      { value: 9000, selected: false, disabeld: false },
      { value: 10000, selected: false, disabeld: false },
      { value: 13000, selected: false, disabeld: false },
   ],
   getCarsLoading: false,
   getCarsError: false,
   cars: [],
   getItemLoading: false,
   selectedCarData: {
      startTime: '',
      startDate: '',
      paid: null,
      nameAndModel: '',
      initialPrice: '',
      images: [],
      endTime: '',
      endDate: '',
      subScribers: null,
      currentPrice: '',
      lastPaid: null,
      increaseAmounts: [],
   },
   getItemError: false,
   bidValue: '',
   bidLoading: false,
   bidError: false,
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case GET_AUCTION_ITEMS_SPINNER:
         return { ...state, getCarsLoading: true, getCarsError: false };
         break;
      case GET_AUCTION_ITEMS_SUCCESS:
         return {
            ...state,
            getCarsLoading: false,
            getCarsError: false,
            cars: payload,
         };
         break;
      case GET_AUCTION_ITEMS_FAILED:
         return { ...state, getCarsLoading: false, getCarsError: true };
         break;

      case GET_AUCTION_ITEM_SPINNER:
         return { ...state, getItemLoading: true, getItemError: false };
         break;
      case GET_AUCTION_ITEM_SUCCESS:
         return { ...state, getItemLoading: false, selectedCarData: payload };
         break;
      case GET_AUCTION_ITEM_FAILED:
         return { ...state, getItemLoading: false, getItemError: true };
         break;
      case CLEAR_OLD_ITEM_DATA:
         return { ...state, selectedCarData: initialState.selectedCarData };
         break;
      case UPDATE_BID_VALUE:
         return { ...state, bidValue: payload };
         break;
      case BID_LOADING:
         return { ...state, bidLoading: true, bidError: false };
         break;
      case BID_SUCCESS:
         return {
            ...state,
            bidValue: '',
            bidLoading: false,
            bidError: false,
            amounts: initialState.amounts,
         };
         break;
      case BID_FAILED:
         return { ...state, bidLoading: false, bidError: true };
         break;
      default:
         return state;
   }
};
