import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { CountdownTimer, FlipNumber } from 'react-native-flip-countdown-timer';
import {
   SURFACE_COLOR,
   WHITE_COLOR,
   AUCTION_CONTAINER,
   BLACK_COLOR,
} from '../../constants/colors';
import { calculateTimeDifferance } from '../../utils/calculateTimeDifferance';
import moment from 'moment';

const { width, height } = Dimensions.get('window');

const CountDown = ({ timerContainerStyle, date, time, play, ...res }) => {
   const seconds = moment(date + ' ' + time, 'DD/MM/YYYY hh:mm a').diff(
      moment(),
      'seconds'
   );

   console.log('timer seconds', seconds, play);

   return (
      <View style={[styles.conntainer, timerContainerStyle]}>
         <CountdownTimer
            time={play ? seconds : 0}
            play={play}
            wrapperStyle={{ alignItems: 'stretch' }}
            flipNumberProps={{
               size: (width * 0.25) / 6,
            }}
         />
      </View>
   );
};
const styles = StyleSheet.create({
   conntainer: {
      width: width / 2.5,
      backgroundColor: '#414141',
      height: height / 14,
      alignItems: 'center',
      justifyContent: 'space-evenly',
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
