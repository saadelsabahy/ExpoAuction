import { combineReducers } from 'redux';
import Auth from './AuthReducer';
import Keyboard from './keyboard';
import CreateAuction from './createAuction';
import Auction from './auction';

export default combineReducers({
   Auth,
   Keyboard,
   CreateAuction,
   Auction,
});
