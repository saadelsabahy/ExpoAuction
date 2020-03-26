import {
   NAME_AND_MODAL_CHANGE,
   INITIAL_PRICE_CHANGE,
   UPLOAD_PRODUCT_SPINNER,
   UPLOAD_PRODUCT_FAILED,
   UPLOAD_PRODUCT_SUCCESS,
   UPDATE_CHANGED_DATES,
   UPDATE_IMAGES,
} from '../../actions/createAuction/createAuctionTypes';

const initialState = {
   nameAndModel: '',
   initialPrice: '',
   uploadLoading: false,
   changedDates: [],
   images: [],
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case NAME_AND_MODAL_CHANGE:
         return { ...state, nameAndModel: payload };
         break;
      case INITIAL_PRICE_CHANGE:
         return { ...state, initialPrice: payload };
         break;
      case UPLOAD_PRODUCT_SPINNER:
         return { ...state, uploadLoading: true };
         break;
      case UPLOAD_PRODUCT_FAILED:
         return { ...state, uploadLoading: false };
         break;
      case UPLOAD_PRODUCT_SUCCESS:
         return { ...initialState };
         break;
      case UPDATE_CHANGED_DATES:
         return { ...state, changedDates: payload };
         break;
      case UPDATE_IMAGES:
         return { ...state, images: payload };
         break;
      default:
         return state;
   }
};
