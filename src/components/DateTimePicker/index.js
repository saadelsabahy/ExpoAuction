import React, { useState } from 'react';
import { View, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MAIN_COLOR } from '../../constants/colors';
import moment from 'moment';
import { CustomText } from '../customText';
const CustomDateTimePicker = ({
   datePickerContainerStyle,
   mode,
   show,
   onDateTimePickerChange,
   pickerText,
   selectedDate,
   onDateTimePickerPressed,
   currentShow,
   changed,
}) => {
   return (
      <TouchableOpacity
         style={[styles.Container, datePickerContainerStyle]}
         activeOpacity={0.9}
         onPress={onDateTimePickerPressed}>
         <CustomText
            text={
               show.includes('Date') && changed.includes(show)
                  ? moment(selectedDate).format('DD/MM/YYYY')
                  : show.includes('Time') && changed.includes(show)
                  ? moment(selectedDate).format('LT')
                  : show.includes('Date')
                  ? 'choose date'
                  : 'choose time'
            }
         />
         {show === currentShow && (
            <DateTimePicker
               testID="dateTimePicker"
               timeZoneOffsetInMinutes={0}
               value={selectedDate}
               mode={mode}
               display="default"
               onChange={onDateTimePickerChange}
               style={styles.picker}
            />
         )}
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   Container: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      borderWidth: 0.5,
      borderColor: MAIN_COLOR,
      marginEnd: 5,
      borderRadius: 5,
      height: 60,
      padding: 5,
   },
   picker: {
      backgroundColor: MAIN_COLOR,
   },
});

export { CustomDateTimePicker };
