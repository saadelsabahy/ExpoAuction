import React from 'react';
import { View, Text } from 'react-native';
import { WHITE_COLOR, MAIN_COLOR } from '../../constants/colors';
import { IconButton } from '../../components';
import { Price } from '../../components/Price';
import { CustomText } from '../../components/customText';
import { CustomSwiper } from '../../components/Swiper';
import Svg, { Circle, Ellipse } from 'react-native-svg';

const CarInfo = ({
   currentPrice,
   initialPrice,
   images,
   lastPaid,
   subScribers,
   navigation,
   carName,
}) => {
   return (
      <View style={{ flex: 1 }}>
         {/* swiper and subscriber */}
         <View
            style={{
               flex: 1,
               flexDirection: 'row',
               justifyContent: 'space-between',
               backgroundColor: MAIN_COLOR,
            }}>
            <View style={{ flex: 1 }}>
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
                  onIconPressed={() =>
                     navigation.navigate('info', {
                        image: images[0].uri,
                        carName,
                     })
                  }
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
         {/* pricing */}
         <View
            style={{
               flexDirection: 'row',
               width: '100%',
               height: '40%',
               justifyContent: 'space-evenly',
               backgroundColor: 'transparent',
            }}>
            {/* initial price */}
            <View
               style={{
                  justifyContent: 'center',
                  alignItems: 'flex-start',
               }}>
               <Price
                  price={initialPrice}
                  currency={'le'}
                  title={'start price'}
                  priceContainerStyle={{
                     width: '70%',
                     backgroundColor: 'transparent',
                  }}
               />
            </View>
            {/* current price */}
            <View
               style={{
                  alignItems: 'flex-end',
                  justifyContent: 'center',
               }}>
               <View style={{ justifyContent: 'center' }}>
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
                     }}>
                     <IconButton
                        iconName={'account-circle-outline'}
                        iconColor={WHITE_COLOR}
                        iconSize={25}
                        type={'material-community'}
                        touchableStyle={{
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
                              `${lastPaid}`.length > 0 ? `+ ${lastPaid}` : '0'
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
            </View>
         </View>
      </View>
   );
};

export default CarInfo;
