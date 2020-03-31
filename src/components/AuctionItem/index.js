import React, { useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   Image,
   TouchableOpacity,
   Dimensions,
   AsyncStorage,
} from 'react-native';
import {
   MAIN_COLOR,
   AUCTION_ITEM_COLOR,
   BLACK_COLOR,
   WHITE_COLOR,
   AUCTION_CONTAINER,
   BID_INPUT_BORDER,
} from '../../constants/colors';
import { CarDetailes } from '../CarDetailes';
import { CustomButton } from '../button';
import { IconButton } from '../IconButton';
import { CountDown } from '../countDown';
const { width, height } = Dimensions.get('window');
export const AUCTION_ITEM_HEIGHT = 140;
const AuctionItem = ({
   onItemPressed,
   images,
   initialPrice,
   endDate,
   endTime,
   startDate,
   startTime,
   carName,
   paid,
   onfavouritePressed,
   likedBy,
   userId,
}) => {
   return (
      <TouchableOpacity
         style={styles.container}
         activeOpacity={0.85}
         onPress={onItemPressed}>
         <View style={[styles.countDownWraper]}>
            <CountDown
               time={startTime}
               date={startDate}
               startDate={endDate}
               startTime={endTime}
            />
         </View>
         {images && (
            <View style={styles.imageContainer}>
               <Image
                  style={styles.image}
                  source={{
                     uri: images[0].uri,
                  }}
               />
            </View>
         )}
         <CarDetailes
            title={carName}
            paid={paid}
            initialPrice={initialPrice}
            endDate={endDate}
            endTime={endTime}
            startDate={startDate}
            startTime={startTime}
            carName={carName}
            onfavouritePressed={onfavouritePressed}
            likedBy={likedBy}
            userId={userId}
         />
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: AUCTION_CONTAINER,
      width: '95%',
      alignSelf: 'center',
      borderColor: BID_INPUT_BORDER,
      borderWidth: 1,
      borderStartWidth: 0,
      height: AUCTION_ITEM_HEIGHT,
      borderRadius: 10,
      marginBottom: height / 10,
      marginTop: 10,
   },
   imageContainer: {
      alignSelf: 'flex-start',
      width: 140,
      height: 160,
      borderRadius: 20,
      borderBottomStartRadius: 12,
      borderColor: BID_INPUT_BORDER,
      borderWidth: 2,
      top: -11,
      backgroundColor: WHITE_COLOR,
      overflow: 'hidden',
   },
   image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
   },
   subscribeButton: {
      backgroundColor: MAIN_COLOR,
      alignSelf: 'center',
      marginEnd: 2,
   },
   countDownWraper: {
      position: 'absolute',
      zIndex: 100,
      end: -5,
      bottom: -height / 9,
   },
});

export { AuctionItem };
