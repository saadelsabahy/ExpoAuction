import * as React from 'react';
import {
   SafeAreaView,
   StyleSheet,
   Dimensions,
   View,
   Animated,
} from 'react-native';
import * as shape from 'd3-shape';
import Svg, { Path } from 'react-native-svg';
import StaticTabbar, { TABBAR_HEIGHT } from './StarticTabbar';
import { TAB_BAR_BCKGROUND, SURFACE_COLOR } from '../../constants/colors';
import { connect } from 'react-redux';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const { width } = Dimensions.get('window');
export const height = TABBAR_HEIGHT;
const tabs = [
   {
      iconName: 'gavel',
   },
   {
      iconName: 'restore-clock',
   },

   {
      iconName: 'account-circle-outline',
   },
];
const tabWidth = width / tabs.length;
const backgroundColor = TAB_BAR_BCKGROUND;

const getPath = () => {
   const left = shape
      .line()
      .x(d => d.x)
      .y(d => d.y)([
      { x: 0, y: 0 },
      { x: width, y: 0 },
   ]);
   const tab = shape
      .line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(shape.curveBasis)([
      { x: width, y: 0 },
      { x: width + 5, y: 0 },
      { x: width + 10, y: 5 },
      { x: width + 15, y: height - 15 },
      { x: width + tabWidth - 15, y: height - 15 },
      { x: width + tabWidth - 10, y: 10 },
      { x: width + tabWidth - 5, y: 0 },
      { x: width + tabWidth, y: 0 },
   ]);
   const right = shape
      .line()
      .x(d => d.x)
      .y(d => d.y)([
      { x: width + tabWidth, y: 0 },
      { x: width * 2, y: 0 },
      { x: width * 2, y: height },
      { x: 0, y: height },
      { x: 0, y: 0 },
   ]);
   return `${left} ${tab} ${right}`;
};
const d = getPath();

// eslint-disable-next-line react/prefer-stateless-function
class Tabbar extends React.Component {
   value = new Animated.Value(0);

   render() {
      const { value } = this;
      const {
         state,
         state: { index },
         descriptors,
         navigation,
         keyboardShow,
         tabBarVisible,
      } = this.props;

      state.routes.map((route, index) => {
         tabs[index] = { ...tabs[index], ...route };
      });

      const translateX = value.interpolate({
         inputRange: [0, width],
         outputRange: [-width, 0],
      });

      return (
         tabBarVisible && (
            <>
               <View {...{ height, width }}>
                  <AnimatedSvg
                     width={width * 2}
                     height={TABBAR_HEIGHT}
                     style={{
                        transform: [{ translateX }],
                        ...styles.svgontainer,
                     }}>
                     <Path fill={backgroundColor} {...{ d }} />
                  </AnimatedSvg>
                  <View style={StyleSheet.absoluteFill}>
                     <StaticTabbar
                        {...{
                           value,
                           tabs,
                           descriptors,
                           navigation,
                           index,
                        }}
                     />
                  </View>
               </View>
               <SafeAreaView style={styles.container} />
            </>
         )
      );
   }
}

const styles = StyleSheet.create({
   container: {
      backgroundColor,
   },
   svgontainer: {
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
   },
});

export { Tabbar };
