import * as React from 'react';
import {
   View,
   StyleSheet,
   TouchableWithoutFeedback,
   Animated,
   Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
   TAB_BAR_ACTIVE_ICON,
   TAB_BAR_INACTIVE_ICON,
   TAB_BAR_ACTIVE_ICON_color,
} from '../../constants/colors';

const { width } = Dimensions.get('window');
export const TABBAR_HEIGHT = 55;
/* const Tab ={
  name: string,
}

const StaticTabbarProps= {
  tabs: Tab[],
  value: Animated.Value,
} */

export default class StaticTabbar extends React.PureComponent {
   constructor(props) {
      super(props);
      const { tabs } = this.props;
      this.values = tabs.map(
         (tab, index) => new Animated.Value(index === 0 ? 1 : 0)
      );
   }

   onPress = (index, isFocused, tab) => {
      const { value, tabs, navigation } = this.props;
      const tabWidth = width / tabs.length;
      const event = navigation.emit({
         type: 'tabPress',
         target: tab.key,
         canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
         navigation.navigate(tab.name);
      }
      Animated.sequence([
         Animated.parallel(
            this.values.map(v =>
               Animated.timing(v, {
                  toValue: 0,
                  duration: 100,
                  useNativeDriver: true,
               })
            )
         ),
         Animated.parallel([
            Animated.spring(value, {
               toValue: tabWidth * index,
               useNativeDriver: true,
            }),
            Animated.spring(this.values[index], {
               toValue: 1,
               useNativeDriver: true,
            }),
         ]),
      ]).start(() => {});
   };

   render() {
      const { onPress } = this;
      const { value, tabs, navigation, descriptors } = this.props;

      return (
         <View style={styles.container}>
            {tabs.map((tab, key) => {
               const isFocused = tabs.index === key;

               const tabWidth = width / tabs.length;
               const cursor = tabWidth * key;
               const opacity = value.interpolate({
                  inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
                  outputRange: [1, 0, 1],
                  extrapolate: 'clamp',
               });
               const translateY = this.values[key].interpolate({
                  inputRange: [0, 1],
                  outputRange: [64, 0],
                  extrapolate: 'clamp',
               });
               const opacity1 = this.values[key].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
               });
               return (
                  <React.Fragment {...{ key }}>
                     <TouchableWithoutFeedback
                        onPress={() => onPress(key, isFocused, tab)}>
                        <Animated.View style={[styles.tab, { opacity }]}>
                           <Icon
                              name={tab.iconName}
                              color={TAB_BAR_INACTIVE_ICON}
                              size={25}
                           />
                        </Animated.View>
                     </TouchableWithoutFeedback>
                     <Animated.View
                        style={{
                           position: 'absolute',
                           top: -25,
                           left: tabWidth * key,
                           width: tabWidth,
                           height: 64,
                           justifyContent: 'center',
                           alignItems: 'center',
                           opacity: opacity1,
                           transform: [{ translateY }],
                        }}>
                        <View style={styles.activeIcon}>
                           <Icon
                              name={tab.iconName}
                              color={TAB_BAR_ACTIVE_ICON_color}
                              size={25}
                           />
                        </View>
                     </Animated.View>
                  </React.Fragment>
               );
            })}
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
   },
   tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: TABBAR_HEIGHT,
   },
   activeIcon: {
      backgroundColor: TAB_BAR_ACTIVE_ICON,
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
   },
});
