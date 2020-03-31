import React from 'react';
import {
   View,
   Text,
   Image,
   StyleSheet,
   ActivityIndicator,
   FlatList,
} from 'react-native';
import { SURFACE_COLOR, MAIN_COLOR, WHITE_COLOR } from '../constants/colors';
import { Header } from '../components';
import { CustomText } from '../components/customText';
const Info = ({ navigation, route }) => {
   const { image, carName } = route.params;
   return (
      <View style={styles.container}>
         <Header
            headerText={'car Detailes'}
            iconStart={'ios-arrow-back'}
            iconStartType={'ionicon'}
            onIconStartPressed={() => navigation.goBack()}
            containerStyle={styles.headerContainer}
            iconStartSize={25}
         />
         <Image
            source={{ uri: image }}
            style={styles.image}
            onLoad={() => (
               <ActivityIndicator
                  color={WHITE_COLOR}
                  style={{ alignSelf: 'center' }}
               />
            )}
         />
         <CustomText text={carName} textStyle={styles.carName} />
         <View style={styles.informationContainer}>
            <View
               style={{
                  height: '20%',
                  justifyContent: 'center',
               }}>
               <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ flex: 1 }}
                  contentContainerStyle={{
                     flexGrow: 1,
                     alignItems: 'center',
                  }}
                  data={['100k mi', 'white', 'alamo,ca']}
                  keyExtractor={item => item}
                  renderItem={({ item }) => {
                     return (
                        <View style={[styles.properitiesContainer]}>
                           <CustomText text={item} />
                        </View>
                     );
                  }}
               />
            </View>
            <CustomText
               text={'detailes'}
               textStyle={{
                  color: MAIN_COLOR,
                  textTransform: 'uppercase',
                  fontSize: 20,
               }}
            />
            <View
               style={{
                  flex: 1,
                  marginStart: 10,
                  justifyContent: 'space-evenly',
               }}>
               <CustomText
                  text={'air conditioned'}
                  textStyle={{ fontSize: 16 }}
               />
               <CustomText
                  text={'front &rear spoiler'}
                  textStyle={{ fontSize: 16 }}
               />
               <CustomText
                  text={'engine rebuilt 100k miles'}
                  textStyle={{ fontSize: 16 }}
               />
               <CustomText
                  text={'transmission rebuilt 200k miles'}
                  textStyle={{ fontSize: 16 }}
               />
               <CustomText
                  text={'5-speed G50 manual transaxle'}
                  textStyle={{ fontSize: 16 }}
               />
               <CustomText
                  text={'3.2-liter flat-six'}
                  textStyle={{ fontSize: 16 }}
               />
            </View>
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: { flex: 1, backgroundColor: SURFACE_COLOR },
   headerContainer: {
      height: '10%',
      alignItems: 'flex-start',

      marginBottom: 0,
   },
   image: {
      width: '100%',
      height: '40%',
      resizeMode: 'cover',
      backgroundColor: MAIN_COLOR,
   },
   informationContainer: {
      flex: 1,
      width: '90%',
      alignSelf: 'center',
      marginTop: 10,
      justifyContent: 'space-evenly',
   },
   carName: {
      fontSize: 25,
      textTransform: 'uppercase',
      marginVertical: 10,
   },
   properitiesContainer: {
      backgroundColor: MAIN_COLOR,
      width: 100,
      height: 35,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 5,
   },
});

export default Info;
