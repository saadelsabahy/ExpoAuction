import React, { useState, useEffect } from 'react';
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
const { width, height } = Dimensions.get('window');

const Buy = ({ navigation, route }) => {
   const { itemId, finish, images } = route.params;

   const [renderList, setrenderList] = useState(false);
   const [disableInput, setdisableInput] = useState(true);
   const [isWinnerModalVisible, setIsWinnerModalVisible] = useState(false);
   const dispatch = useDispatch();
   const {
      getItemLoading,
      selectedCarData,
      selectedCarData: {
         startTime,
         startDate,
         paid,
         nameAndModel,
         initialPrice,
         endTime,
         endDate,
         subScribers,
         currentPrice,
         lastPaid,
         increaseAmounts,
      },
      getItemError,
      bidLoading,
      bidError,
      bidValue,
      amounts,
   } = useSelector(state => ({
      getItemLoading: state.Auction.getItemLoading,
      selectedCarData: state.Auction.selectedCarData,
      getItemError: state.Auction.getItemError,
      bidLoading: state.Auction.bidLoading,
      bidError: state.Auction.bidError,
      bidValue: state.Auction.bidValue,
      bidValue: state.Auction.bidValue,
      amounts: state.Auction.amounts,
   }));
   useEffect(() => {
      dispatch(getItemData(itemId));
      dispatch(hideTabbar());
      return () => {
         dispatch(decreaseSubscribers(itemId));
         dispatch(showTabbar());
      };
   }, []);

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
               currentUserPayment = data
                  .val()
                  .find(item => item.userId == userId);
               highestValue = Math.max.apply(
                  Math,
                  data.val().map(item => +item.bidValue)
               );
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
   }, []);

   const onOutPressed = () => {
      navigation.goBack();
   };
   console.log(endTime, endDate);

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
               />
               <Header
                  containerStyle={{ marginBottom: 0 }}
                  headerText={nameAndModel}
                  iconStart={'ios-arrow-back'}
                  iconStartType={'ionicon'}
                  onIconStartPressed={() => navigation.goBack()}
               />
               {/* car info ....... */}
               <ScrollView
                  style={{ flex: 1 }}
                  contentContainerStyle={{ flexGrow: 1 }}>
                  <Animated.View style={[styles.carInfoContainer]}>
                     <View
                        style={{
                           flex: 1,
                           flexDirection: 'row',
                           justifyContent: 'space-between',
                           marginBottom: 5,
                        }}>
                        <View style={{ flex: 1.5 }}>
                           <CustomSwiper images={images} />
                        </View>
                        <View
                           style={{
                              height: '100%',
                              justifyContent: 'center',
                              paddingHorizontal: 10,
                           }}>
                           <IconButton
                              iconName={'information-outline'}
                              iconSize={25}
                              iconColor={WHITE_COLOR}
                              iconButtonText={'info'}
                              type={'material-community'}
                           />
                           <IconButton
                              iconName={'account-circle-outline'}
                              iconSize={25}
                              iconColor={WHITE_COLOR}
                              iconButtonText={`${subScribers} `}
                              type={'material-community'}
                           />
                        </View>
                     </View>
                     <View
                        style={{
                           width: '50%',
                           alignSelf: 'flex-end',
                           bottom: 5,
                           end: 5,
                        }}>
                        <Price
                           title="current price"
                           price={currentPrice ? currentPrice : initialPrice}
                           currency={'le'}
                        />

                        <View
                           style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginVertical: 10,
                           }}>
                           <IconButton
                              iconName={'account-circle-outline'}
                              iconColor={WHITE_COLOR}
                              iconSize={25}
                              type={'material-community'}
                              touchableStyle={{
                                 marginVertical: 0,
                                 width: 25,
                                 height: 25,
                              }}
                           />
                           <View
                              style={{
                                 alignItems: 'center',
                                 justifyContent: 'center',
                              }}>
                              <CustomText
                                 text={
                                    `${lastPaid}`.length > 0
                                       ? `+ ${lastPaid}`
                                       : '0'
                                 }
                                 textStyle={{
                                    color: WHITE_COLOR,
                                    textTransform: 'uppercase',
                                 }}
                              />
                              <CustomText
                                 text={'last paid'}
                                 textStyle={{
                                    color: WHITE_COLOR,
                                    textTransform: 'uppercase',
                                 }}
                              />
                           </View>
                        </View>
                     </View>
                  </Animated.View>
                  {/* payment ....... */}
                  <View
                     style={{
                        flex: 1,
                        alignItems: 'center',
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
                              }}
                              numColumns={3}
                              keyExtractor={(item, index) => `${index}`}
                              // columnWrapperStyle={{ marginVertical: 10 }}
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
                                          dispatch(changeBidValue(`${value}`));
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
                                          dispatch(changeBidValue(''));
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
                              iconLeftName="arrow-up"
                              iconLeftType={'material-community'}
                              placeholder="Other amount"
                              inputContainerStyle={styles.inputContainerStyle}
                              placeholderTextColor={WHITE_COLOR}
                              keyboardType={'number-pad'}
                              returnKeyType={'done'}
                              onChangeText={text =>
                                 dispatch(changeBidValue(text))
                              }
                              value={bidValue}
                              editable={disableInput}
                              contentContainerStyle={{
                                 flex: 0,
                                 width: '70%',
                              }}
                           />
                           <CustomButton
                              buttonTitle="bid"
                              buttonContainerStyle={styles.bidButton}
                              onButtonPressed={async () => {
                                 dispatch(
                                    onIncreaseBid(
                                       bidValue,
                                       itemId,
                                       currentPrice,
                                       initialPrice
                                    )
                                 );
                                 setrenderList(!renderList);
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

                  {/* initial price */}
                  <View
                     style={{
                        position: 'absolute',
                        top: height < 900 ? '37%' : '50%',
                        start: -width / 6.5,
                     }}>
                     <Price
                        priceContainerStyle={{ backgroundColor: 'transparent' }}
                        price={initialPrice}
                        currency={'le'}
                        title={'start price'}
                     />
                  </View>
                  <WinnerModal
                     isVisible={isWinnerModalVisible}
                     onBackdropPress={() => {
                        setIsWinnerModalVisible(false);
                        navigation.goBack();
                     }}
                  />
               </ScrollView>
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
      height: height / 2.5,
      width,
      backgroundColor: MAIN_COLOR,
      borderBottomStartRadius: width - 10,
      borderBottomColor: WHITE_COLOR,
      borderStartColor: WHITE_COLOR,
      borderWidth: 2,
      borderTopWidth: 0,
      borderEndWidth: 0,
   },
   content: {
      flex: 1,
      width: '90%',
      alignItems: 'center',
      justifyContent: 'space-around',
   },
   amountsContainer: {
      width: '100%',
      height: '55%',
   },

   buyWraper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
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
