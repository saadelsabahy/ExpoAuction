import React, { useState, useEffect, useRef } from 'react';
import {
   View,
   Text,
   StyleSheet,
   Image,
   ScrollView,
   FlatList,
   Dimensions,
   Keyboard,
   Animated,
   BackHandler,
   AsyncStorage,
} from 'react-native';
import {
   Header,
   CustomDateTimePicker,
   CustomInput,
   CustomButton,
   BUTTON_HEIGHT,
   AmountItem,
   IconButton,
   LoaderAndRetry,
   WinnerModal,
} from '../components';
import {
   WHITE_COLOR,
   SURFACE_COLOR,
   BID_INPUT_BORDER,
   MAIN_COLOR,
} from '../constants/colors';
import { CustomSwiper } from '../components/Swiper';
import { CarDetailes } from '../components/CarDetailes';
import { playSound, playButtonPress } from '../utils/sound';
import { TABBAR_HEIGHT } from '../components/tabBar/StarticTabbar';
import { CountDown } from '../components/countDown';
import { Price } from '../components/Price';
import { CustomText } from '../components/customText';
import { useDispatch, useSelector } from 'react-redux';
import {
   handleKeyboardAppearance,
   clearKeyBoardListners,
   hideTabbar,
   showTabbar,
   onIncreaseBid,
   changeBidValue,
   decreaseSubscribers,
   clearOldItemData,
} from '../redux/actions';
import * as firebase from 'firebase';
import { getItemData } from '../redux/actions';
import moment from 'moment';
import { calculateTimeDifferance } from '../utils/calculateTimeDifferance';
import Svg, { Circle, Ellipse } from 'react-native-svg';

import CarInfo from './BuyViews/CarInfo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window');

const Buy = ({ navigation, route }) => {
   const { itemId, finish, images } = route.params;
   const inputRef = useRef('');

   const [renderList, setrenderList] = useState(false);
   const [disableInput, setdisableInput] = useState(true);
   const [isWinnerModalVisible, setIsWinnerModalVisible] = useState(false);
   const dispatch = useDispatch();
   const {
      getItemLoading,
      getItemError,
      bidLoading,
      bidError,
      bidValue,
      amounts,
   } = useSelector(state => ({
      getItemLoading: state.Auction.getItemLoading,
      getItemError: state.Auction.getItemError,
      bidLoading: state.Auction.bidLoading,
      bidError: state.Auction.bidError,
      bidValue: state.Auction.bidValue,
      bidValue: state.Auction.bidValue,
      amounts: state.Auction.amounts,
   }));
   const [
      {
         nameAndModel = '',
         initialPrice = 0,
         endTime = '',
         endDate = '',
         subScribers = 0,
         currentPrice = 0,
         lastPaid = 0,
      },
      setAuctionData,
   ] = useState({});
   useEffect(() => {
      if (!navigation.isFocused) {
         return;
      }
      firebase
         .database()
         .ref(`products/${itemId}`)
         .on('value', async data => {
            if (data.val()) {
               setAuctionData(prv => ({ ...prv, ...data.val() }));
            }
         });

      return () => {
         firebase
            .database()
            .ref(`products/${itemId}`)
            .off();
      };
   }, [navigation.isFocused]);
   useEffect(() => {
      if (!navigation.isFocused) {
         return;
      }
      dispatch(getItemData(itemId));
      dispatch(hideTabbar());
      return () => {
         dispatch(decreaseSubscribers(itemId));
         dispatch(showTabbar());
      };
   }, [navigation.isFocused]);

   useEffect(() => {
      let end = moment(finish.endTime, 'LT').diff(moment(), 'milliseconds');

      let closeAuction = setTimeout(async () => {
         let userId = await AsyncStorage.getItem('userId');
         await firebase
            .database()
            .ref(`products/${itemId}/paid`)
            .transaction(oldValue => true);
         let currentUserPayment;
         let highestValue;
         await firebase
            .database()
            .ref(`products/${itemId}/mostPayed`)
            .once('value', data => {
               if (data.val()) {
                  currentUserPayment = data
                     .val()
                     .find(item => item.userId == userId);
                  highestValue = Math.max.apply(
                     Math,
                     data.val().map(item => +item.bidValue)
                  );
               } else {
                  navigation.goBack();
               }
            });
         if (+currentUserPayment.bidValue == highestValue) {
            console.log('the Current user win' + currentUserPayment.userId);
            setIsWinnerModalVisible(true);
         } else {
            navigation.goBack();
         }
      }, end);
      return () => {
         clearTimeout(closeAuction);
         dispatch(clearOldItemData());
      };
   }, [navigation.isFocused]);

   const onOutPressed = () => {
      navigation.goBack();
   };

   return (
      <Animated.View style={[styles.container]}>
         {getItemError || getItemLoading ? (
            <View style={{ flex: 1 }}>
               <LoaderAndRetry error={getItemError} loading={getItemLoading} />
            </View>
         ) : (
            <React.Fragment>
               {/* count down */}
               <CountDown
                  timerContainerStyle={styles.timerContainerStyle}
                  time={finish.endTime}
                  date={finish.endDate}
                  startDate={finish.startDate}
                  startTime={finish.startTime}
               />
               <Header
                  containerStyle={{ marginBottom: 0 }}
                  headerText={nameAndModel}
                  iconStart={'ios-arrow-back'}
                  iconStartType={'ionicon'}
                  onIconStartPressed={() => navigation.goBack()}
               />
               {/* car info ....... */}

               <KeyboardAwareScrollView
                  style={{ flex: 1 }}
                  contentContainerStyle={{ flexGrow: 1 }}
                  extraHeight={0}
                  enableOnAndroid
                  enableAutomaticScroll={false}
                  extraScrollHeight={10}>
                  <View
                     style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                     }}>
                     <Svg
                        viewBox="0 0 100 100"
                        width="100%"
                        height="100%"
                        style={{
                           backgroundColor: 'trnsparent',
                        }}>
                        <Ellipse
                           cx="100"
                           cy="0"
                           rx="80"
                           ry="60"
                           fill={MAIN_COLOR}
                           stroke={WHITE_COLOR}
                           strokeWidth="1"
                        />
                     </Svg>
                  </View>
                  <Animated.View style={[styles.carInfoContainer]}>
                     <CarInfo
                        currentPrice={currentPrice}
                        initialPrice={initialPrice}
                        images={images}
                        lastPaid={lastPaid}
                        subScribers={subScribers}
                        navigation={navigation}
                        carName={nameAndModel}
                     />
                  </Animated.View>
                  {/* payment ....... */}

                  <View
                     style={{
                        height: '40%',
                        width,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                     }}>
                     <View style={styles.content}>
                        <View style={styles.amountsContainer}>
                           <FlatList
                              data={amounts}
                              scrollEnabled={false}
                              style={{ flex: 1 }}
                              contentContainerStyle={{
                                 flexGrow: 1,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 paddingTop: 10,
                              }}
                              numColumns={3}
                              keyExtractor={(item, index) => `${index}`}
                              extraData={renderList}
                              renderItem={({
                                 item: { selected, value },
                                 index,
                              }) => (
                                 <AmountItem
                                    index={index}
                                    amount={value}
                                    currency={'le'}
                                    onAmountItemPressed={(
                                       index,
                                       selected,
                                       value
                                    ) => {
                                       if (!selected) {
                                          setdisableInput(false);
                                          dispatch(
                                             onIncreaseBid(
                                                `${value}`,
                                                itemId,
                                                currentPrice,
                                                initialPrice
                                             )
                                          );
                                          setdisableInput(true);
                                          let previousSelected = amounts.findIndex(
                                             item => item['selected'] == true
                                          );
                                          previousSelected > -1
                                             ? (amounts[previousSelected][
                                                  'selected'
                                               ] = false)
                                             : null;
                                          amounts[index][
                                             'selected'
                                          ] = !selected;
                                          setrenderList(!renderList);
                                       } else {
                                          setdisableInput(true);
                                          amounts[index][
                                             'selected'
                                          ] = !selected;
                                          inputRef.current = '';
                                          setrenderList(!renderList);
                                          return;
                                       }
                                    }}
                                    selected={selected}
                                 />
                              )}
                           />
                        </View>
                        <View style={styles.buyWraper}>
                           <CustomInput
                              inputContainerStyle={styles.inputContainerStyle}
                              contentContainerStyle={{
                                 width: '70%',
                              }}
                              iconLeftName="arrow-up"
                              iconLeftType={'material-community'}
                              placeholder="Other amount"
                              inputContainerStyle={styles.inputContainerStyle}
                              placeholderTextColor={WHITE_COLOR}
                              keyboardType={'number-pad'}
                              returnKeyType={'done'}
                              editable={disableInput}
                              ref={inputRef}
                              onChangeText={text => (inputRef.current = text)}
                           />
                           <CustomButton
                              buttonTitle="bid"
                              buttonContainerStyle={styles.bidButton}
                              onButtonPressed={async () => {
                                 dispatch(
                                    onIncreaseBid(
                                       inputRef.current,
                                       itemId,
                                       currentPrice,
                                       initialPrice
                                    )
                                 );
                                 setrenderList(!renderList);
                                 console.log(inputRef);

                                 inputRef.current = '';
                              }}
                              loading={bidLoading}
                              spinnerColor={WHITE_COLOR}
                           />
                        </View>
                        <View
                           style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '100%',
                           }}>
                           <CustomButton
                              buttonTitle="out"
                              onButtonPressed={onOutPressed}
                              buttonContainerStyle={styles.buttonContainerStyle}
                              buttonTitleStyle={styles.buttonTitleStyle}
                           />
                        </View>
                     </View>
                  </View>

                  <WinnerModal
                     isVisible={isWinnerModalVisible}
                     onBackdropPress={() => {
                        setIsWinnerModalVisible(false);
                        navigation.goBack();
                     }}
                  />
               </KeyboardAwareScrollView>
            </React.Fragment>
         )}
      </Animated.View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: SURFACE_COLOR,
   },
   carInfoContainer: {
      height: '55%',
      width,
      marginBottom: 15,
   },
   content: {
      flex: 1,
      width: '90%',
   },
   amountsContainer: {
      width: '100%',
      height: '55%',
   },

   buyWraper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
   },
   inputContainerStyle: {
      borderWidth: 0,
      borderBottomWidth: 3,
      borderColor: BID_INPUT_BORDER,
      borderRadius: 0,
   },
   bidButton: {
      height: 40,
      width: 100,
      borderRadius: 20,
      marginHorizontal: 5,
   },
   buttonContainerStyle: {
      borderRadius: 0.5 * BUTTON_HEIGHT,
      width: '100%',
      marginBottom: 10,
   },
   buttonTitleStyle: {
      textTransform: 'uppercase',
   },
   flipCardStyle: {
      width: 20,
      height: 20,
   },
   numberStyle: {
      fontSize: 15,
   },
   timerContainerStyle: {
      zIndex: 100,
      position: 'absolute',
      top: 10,
      end: 10,
   },
});

export default Buy;
