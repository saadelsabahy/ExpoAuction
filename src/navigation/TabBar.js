import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
// import Splash from '../screens/Splash';
// import Login from '../screens/Login';
// import Register from '../screens/Register';
import Sell from '../screens/Sell';
import Buy from '../screens/Buy';
import Auctions from '../screens/Auctions';
import Profile from '../screens/Profile';
// import Product from '../screens/Product';
// import OwnProduct from '../screens/OwnProduct';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
   MAIN_COLOR,
   TAB_BAR_BCKGROUND,
   BLACK_COLOR,
} from '../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { Tabbar } from '../components';
import {
   handleKeyboardAppearance,
   clearKeyBoardListners,
} from '../redux/actions';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const AuctionStack = ({ route }) => {
   return (
      <Stack.Navigator
         screenOptions={{
            headerShown: false,
         }}>
         <Stack.Screen name="Auction" component={Auctions} />
         <Stack.Screen name="car Detailes" component={Buy} />
      </Stack.Navigator>
   );
};
const TabBar = () => {
   const dispatch = useDispatch();
   const { keyboardShow, tabBarVisible } = useSelector(state => ({
      keyboardShow: state.Keyboard.keyboardShow,
      tabBarVisible: state.Keyboard.tabBarVisible,
   }));

   useEffect(() => {
      dispatch(handleKeyboardAppearance());
      return () => {
         dispatch(clearKeyBoardListners());
      };
   }, []);

   return (
      <Tab.Navigator
         tabBarOptions={{
            keyboardHidesTabBar: true,
            style: {
               backgroundColor: TAB_BAR_BCKGROUND,
            },
            labelStyle: {
               color: MAIN_COLOR,
               fontSize: 15,
            },
            activeTintColor: MAIN_COLOR,
            inactiveTintColor: BLACK_COLOR,
         }}
         tabBar={props => <Tabbar tabBarVisible={tabBarVisible} {...props} />}>
         <Tab.Screen
            name="Auctions"
            component={AuctionStack}
            options={{
               tabBarLabel: ({ color, focused }) => (
                  <Text style={{ color }}>Auctions</Text>
               ),
               tabBarIcon: ({ color, size }) => (
                  <Icon name="ios-pricetag" color={color} size={size} />
               ),
            }}
         />
         <Tab.Screen
            name="Sell"
            component={Sell}
            options={{
               tabBarLabel: ({ color, focused }) => (
                  <Text style={{ color }}>Sell</Text>
               ),
               tabBarIcon: ({ color, size }) => (
                  <Icon name="ios-pricetag" color={color} size={size} />
               ),
            }}
         />

         <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
               tabBarLabel: ({ color, focused }) => (
                  <Text style={{ color }}>Profile</Text>
               ),
               tabBarIcon: ({ color, size }) => (
                  <Icon name="md-person" color={color} size={size} />
               ),
            }}
         />
      </Tab.Navigator>
   );
};

export default TabBar;

/* <Tab.Screen
            name="Buy"
            component={Buy}
            options={{
               tabBarLabel: ({ color, focused }) => (
                  <Text style={{ color }}>Bid</Text>
               ),
               tabBarIcon: ({ color, size }) => (
                  <Icon name="ios-pricetag" color={color} size={size} />
               ),
            }}
         /> */
