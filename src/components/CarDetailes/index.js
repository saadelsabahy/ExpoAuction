import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
   MAIN_COLOR,
   AUCTION_ITEM_COLOR,
   BID_INPUT_BORDER,
   WHITE_COLOR,
} from '../../constants/colors';
import { CustomText } from '../customText';
import { IconButton } from '../IconButton';
import { Icon } from '../icon';
import moment from 'moment';
const CarDetailes = ({
   title,
   paid,
   initialPrice,
   endDate,
   endTime,
   startDate,
   startTime,
   carName,
   subscribed,
}) => {
   return (
      <View style={styles.detailesContainer}>
         <View style={styles.header}>
            <CustomText text={carName} textStyle={styles.title} />
            <IconButton
               type={'ionicon'}
               iconName={!subscribed ? 'ios-star-outline' : 'md-star'}
               iconSize={20}
               touchableStyle={{ height: 0 }}
               iconColor={!subscribed ? BID_INPUT_BORDER : MAIN_COLOR}
            />
         </View>
         <View style={styles.body}>
            <CustomText
               text={!paid ? 'not paid yet' : 'paid'}
               textStyle={styles.paid}
            />
            <View style={styles.priceContainer}>
               <CustomText
                  text={parseFloat(initialPrice).toLocaleString('en') + ` le`}
                  textStyle={styles.price}
               />
               <CustomText
                  text={'initial price'}
                  textStyle={[
                     styles.price,
                     {
                        alignSelf: 'flex-end',
                        letterSpacing: 0,
                     },
                  ]}
               />
            </View>
         </View>
         <View style={styles.footer}>
            <CustomText text={'close on'} textStyle={styles.footerTitle} />
            <View style={styles.rowTime}>
               <Icon
                  name={'calendar'}
                  type={'material-community'}
                  color={BID_INPUT_BORDER}
               />
               <CustomText
                  text={moment(endDate, 'DDD/MM/YYYY').format('ll')}
                  textStyle={styles.timeText}
               />
            </View>
            <View style={styles.rowTime}>
               <Icon
                  name={'clock-outline'}
                  type={'material-community'}
                  color={BID_INPUT_BORDER}
               />
               <CustomText text={endTime} textStyle={styles.timeText} />
            </View>
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   detailesContainer: {
      flex: 1,
      paddingHorizontal: 3,
      marginBottom: 5,
   },
   header: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   title: {
      color: MAIN_COLOR,
      fontSize: 18,
   },
   body: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
   },
   priceContainer: {
      justifyContent: 'center',
   },
   paid: {
      color: WHITE_COLOR,
      letterSpacing: 1,
   },
   price: {
      color: WHITE_COLOR,
      letterSpacing: 1,
      textTransform: 'uppercase',
      alignSelf: 'flex-end',
   },
   footer: {
      justifyContent: 'center',
   },
   footerTitle: {
      color: MAIN_COLOR,
   },
   rowTime: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   timeText: {
      color: BID_INPUT_BORDER,
      fontSize: 17,
   },
});

export { CarDetailes };
