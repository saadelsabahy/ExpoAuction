import React from 'react';
import { View, Dimensions, StyleSheet, Image, I18nManager } from 'react-native';
import Swiper from 'react-native-swiper';
import {
   DRAWER_TEXT,
   MAIN_COLOR,
   PAGINATION_INACTIVE_DOT_COLOR,
   INPUT_COLOR,
   WHITE_COLOR,
   SURFACE_COLOR,
} from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const { width } = Dimensions.get('window');
const CustomSwiper = ({ images }) => {
   console.log('images', images);

   return (
      <View style={styles.container}>
         <Swiper
            style={styles.wrapper}
            height={'100%'}
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.activeDot} />}
            loop
            autoplay
            paginationStyle={{
               flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
            }}
            buttonWrapperStyle={{
               flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
            }}
            nextButton={
               <Icon
                  name={'chevron-right'}
                  size={50}
                  color={MAIN_COLOR}
                  style={{ backgroundColor: WHITE_COLOR }}
               />
            }
            prevButton={
               <Icon
                  name={'chevron-left'}
                  size={50}
                  color={MAIN_COLOR}
                  style={{ backgroundColor: WHITE_COLOR }}
               />
            }>
            {images &&
               images.map((image, index) => {
                  return (
                     <View style={styles.slide} key={image.uri}>
                        <Image
                           resizeMode="cover"
                           style={styles.image}
                           source={{ uri: image.uri }}
                        />
                     </View>
                  );
               })}
         </Swiper>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      height: '100%',
      width: '100%',
      borderTopEndRadius: 5,
      borderBottomEndRadius: 10,
      overflow: 'hidden',
   },

   wrapper: {},

   slide: {
      width: '100%',
      height: '100%',
      backgroundColor: SURFACE_COLOR,
   },

   text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
   },

   image: {
      width,
      flex: 1,
      resizeMode: 'cover',
   },
   activeDot: {
      backgroundColor: MAIN_COLOR,
      width: 18,
      height: 18,
      borderRadius: 9,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3,
   },
   dot: {
      backgroundColor: WHITE_COLOR,
      width: 15,
      height: 15,
      borderRadius: 7.5,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3,
   },
   buttonsContainer: {
      backgroundColor: INPUT_COLOR,
      borderTopStartRadius: 0,
      borderBottomStartRadius: 0,
   },
});

export { CustomSwiper };
