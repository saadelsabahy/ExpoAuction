import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomInputButton } from '../InputButton';
import { CustomDateTimePicker } from '../DateTimePicker';
import { CustomText } from '../customText';
const AuctionDuration = ({
   startDate,
   startTime,
   endDate,
   endTime,
   onDateTimePickerPressed,
   show,
   showMode,
   currentShow,
   onDateTimePickerChange,
   changed,
}) => {
   return (
      <View style={styles.container}>
         <CustomText text={'from'} textStyle={styles.titleStyle} />
         <View style={styles.pickersContainer}>
            <CustomText text={'date'} />
            <CustomDateTimePicker
               selectedDate={startDate}
               onDateTimePickerPressed={() =>
                  onDateTimePickerPressed('startDate')
               }
               selectedDate={startDate}
               show={'startDate'}
               onDateTimePickerChange={onDateTimePickerChange}
               currentShow={currentShow}
               mode={showMode}
               changed={changed}
            />
            <CustomText text={'time'} />
            <CustomDateTimePicker
               selectedDate={startTime}
               onDateTimePickerPressed={() =>
                  onDateTimePickerPressed('startTime')
               }
               selectedDate={startTime}
               show={'startTime'}
               onDateTimePickerChange={onDateTimePickerChange}
               currentShow={currentShow}
               mode={showMode}
               changed={changed}
            />
         </View>

         <CustomText text={'to'} textStyle={styles.titleStyle} />
         <View style={styles.pickersContainer}>
            <CustomText text={'date'} />
            <CustomDateTimePicker
               selectedDate={endDate}
               onDateTimePickerPressed={() =>
                  onDateTimePickerPressed('endDate')
               }
               selectedDate={endDate}
               show={'endDate'}
               onDateTimePickerChange={onDateTimePickerChange}
               currentShow={currentShow}
               mode={showMode}
               changed={changed}
            />
            <CustomText text={'time'} />
            <CustomDateTimePicker
               selectedDate={endTime}
               onDateTimePickerPressed={() =>
                  onDateTimePickerPressed('endTime')
               }
               selectedDate={endTime}
               show={'endTime'}
               onDateTimePickerChange={onDateTimePickerChange}
               currentShow={currentShow}
               mode={showMode}
               changed={changed}
            />
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      width: '95%',
      justifyContent: 'space-evenly',
      padding: 5,
   },
   pickersContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 5,
   },
   titleStyle: {
      alignSelf: 'center',
   },
});

export { AuctionDuration };
