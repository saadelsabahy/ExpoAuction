import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { CountdownTimer, FlipNumber } from './flipper';
import {
   SURFACE_COLOR,
   WHITE_COLOR,
   AUCTION_CONTAINER,
   BLACK_COLOR,
   BID_INPUT_BORDER,
} from '../../constants/colors';
import { calculateTimeDifferance } from '../../utils/calculateTimeDifferance';
import moment from 'moment';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
const { width, height } = Dimensions.get('window');
import { CustomText } from '../customText';
const CountDown = ({
   timerContainerStyle,
   date,
   time,
   startDate,
   startTime,
   ...res
}) => {
   console.log(date, time, startDate, startTime);

   const seconds = moment(date + ' ' + time, 'DD/MM/YYYY hh:mm a').diff(
      moment(),
      'seconds'
   );
   const [barInterval, setbarInterval] = useState(0);
   const totalSeconds = Math.abs(
      moment(date + ' ' + time, 'DD/MM/YYYY hh:mm a').diff(
         moment(startDate + ' ' + startTime, 'DD/MM/YYYY hh:mm a'),
         'seconds'
      )
   );

   console.log(barInterval);

   const [play, setplay] = useState(true);
   useEffect(() => {
      const playTimeOut = setTimeout(() => {
         setplay(false);
      }, seconds * 1000);

      return () => {
         clearTimeout(playTimeOut);
      };
   }, []);

   useEffect(() => {
      const durationInterval = setInterval(() => {
         const fromStartToNow = Math.abs(
            moment(date + ' ' + time, 'DD/MM/YYYY hh:mm a').diff(
               moment(),
               'seconds'
            )
         );

         setbarInterval(prev => (fromStartToNow / totalSeconds) * 100);
      }, 1000);
      return () => {
         clearInterval(durationInterval);
      };
   }, [play]);
   return (
      <View style={[styles.conntainer, timerContainerStyle]}>
         <CountdownTimer
            time={seconds}
            play={play}
            wrapperStyle={{ alignItems: 'stretch' }}
            flipNumberProps={{
               size: 20,
            }}
         />
         <View style={styles.unitContainer}>
            <CustomText text="hrs" textStyle={styles.unitText} />
            <CustomText text="mins" textStyle={styles.unitText} />
            <CustomText text="secs" textStyle={styles.unitText} />
         </View>
         <ProgressBarAnimated
            width={150}
            value={barInterval}
            maxValue={100}
            height={10}
            borderColor={SURFACE_COLOR}
            underlyingColor={SURFACE_COLOR}
            backgroundColor={
               barInterval > 80 ? 'red' : barInterval > 50 ? 'orange' : 'green'
            }
         />
      </View>
   );
};
const styles = StyleSheet.create({
   conntainer: {
      width: width / 2.5,
      backgroundColor: '#414141',
      height: height / 8,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      borderWidth: 2,
      borderColor: BID_INPUT_BORDER,
      borderRadius: 5,
   },
   unitContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
   },
   unitText: {
      alignSelf: 'center',
      textTransform: 'uppercase',
   },
   indicatorContainer: {
      height: 10,
      borderRadius: 10,
      backgroundColor: SURFACE_COLOR,
      width: '80%',
      overflow: 'hidden',
   },
   indicator: {
      backgroundColor: '#f0f',
      height: '100%',
      width: '50%',
   },
   /* cardStyle: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
   },
   numberStyle: {
      fontSize: 15,
   }, */
});

export { CountDown };
