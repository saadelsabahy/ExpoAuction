import React, { useEffect, useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   ScrollView,
   FlatList,
   RefreshControl,
   AsyncStorage,
} from 'react-native';
import { Header, AuctionItem, LoaderAndRetry, EmptyList } from '../components';
import { WHITE_COLOR, SURFACE_COLOR, MAIN_COLOR } from '../constants/colors';
import { useSelector, useDispatch } from 'react-redux';
import {
   getAuctionItems,
   onLogoutPressed,
   handleFavoutitrItem,
} from '../redux/actions';
import { calculateTimeDifferance } from '../utils/calculateTimeDifferance';
import { showMessage } from 'react-native-flash-message';
import moment from 'moment';

const Auctions = ({ navigation, route }) => {
   const [refreshing, setRefreshing] = useState(false);
   const [renderList, setRenderList] = useState(false);
   const [userId, setUserId] = useState(
      AsyncStorage.getItem('userId', (err, res) => setUserId(res))
   );

   const dispatch = useDispatch();
   const { cars, getCarsLoading, getCarsError } = useSelector(state => ({
      getCarsLoading: state.Auction.getCarsLoading,
      getCarsError: state.Auction.getCarsError,
      cars: state.Auction.cars,
   }));

   useEffect(() => {
      dispatch(getAuctionItems());
   }, [cars.length]);
   const onAUctionItemPressed = (
      key,
      startDate,
      startTime,
      endDate,
      endTime,
      images
   ) => {
      const startAuction = moment(
         startDate + ' ' + startTime,
         'DD/MM/YYYY hh:mm a'
      ).isSameOrAfter(moment());
      const isAuctionFinished = moment(
         endDate + ' ' + endTime,
         'DD/MM/YYYY hh:mm a'
      ).isBefore(moment());

      if (startAuction) {
         showMessage({ type: 'danger', message: `auction didn't start yet` });
      } else if (isAuctionFinished) {
         showMessage({ type: 'danger', message: `auction finished` });
      } else {
         navigation.navigate('car Detailes', {
            itemId: key,
            finish: endTime,
            images,
         });
      }
   };

   const handleRefresh = async () => {
      setRefreshing(true);
      dispatch(getAuctionItems());
      setRefreshing(false);
   };
   const onfavouritePressed = async key => {
      dispatch(handleFavoutitrItem(key));
      setRenderList(!renderList);
   };
   return (
      <View style={styles.container}>
         <Header
            headerText={'auction'}
            iconEnd={'logout'}
            iconEndType={'material-community'}
            onIconEndPressed={() => dispatch(onLogoutPressed())}
            containerStyle={styles.headerContainer}
            iconEndSize={25}
         />

         <View style={styles.contentContainer}>
            {getCarsError || getCarsLoading ? (
               <LoaderAndRetry
                  loading={getCarsLoading}
                  error={getCarsError}
                  onRetryPressed={() => dispatch(getAuctionItems())}
               />
            ) : (
               <View style={{ flex: 1, top: -30 }}>
                  <FlatList
                     style={{ flex: 1 }}
                     contentContainerStyle={{
                        flexGrow: 1,
                     }}
                     extraData={renderList}
                     data={cars}
                     keyExtractor={(item, index) => `${index}`}
                     renderItem={({
                        item,
                        item: {
                           startDate,
                           startTime,
                           endDate,
                           endTime,
                           images,
                           initialPrice,
                           nameAndModel,
                           key,
                           paid,
                        },
                        index,
                     }) => {
                        return (
                           <AuctionItem
                              onItemPressed={() =>
                                 onAUctionItemPressed(
                                    key,
                                    startDate,
                                    startTime,
                                    endDate,
                                    endTime,
                                    images
                                 )
                              }
                              startTime={startTime}
                              startDate={startDate}
                              endDate={endDate}
                              endTime={endTime}
                              carName={nameAndModel}
                              images={images}
                              initialPrice={initialPrice}
                              paid={paid}
                              onfavouritePressed={() => onfavouritePressed(key)}
                              likedBy={item.likedBy ? item.likedBy : null}
                              userId={userId}
                           />
                        );
                     }}
                     ListEmptyComponent={() => (
                        <EmptyList emptyText={'no auctions available yet'} />
                     )}
                     refreshControl={
                        <RefreshControl
                           refreshing={refreshing}
                           onRefresh={handleRefresh}
                           colors={[MAIN_COLOR]}
                        />
                     }
                  />
               </View>
            )}
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: SURFACE_COLOR,
   },
   headerContainer: {
      height: '17%',
      alignItems: 'flex-start',
      borderBottomEndRadius: 50,
      borderBottomStartRadius: 50,
      marginBottom: 0,
   },
   contentContainer: {
      flex: 1,
   },
});

export default Auctions;
