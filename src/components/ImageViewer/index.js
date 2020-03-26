import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { MAIN_COLOR } from '../../constants/colors';

const ImageViewer = ({ images }) => {
   return (
      <View style={[styles.container]}>
         {images.map((image, index) => {
            const { uri } = image;
            return (
               <View style={styles.imageContainer} key={`${index}`}>
                  <Image source={{ uri }} style={styles.image} />
               </View>
            );
         })}
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexWrap: 'wrap',
      width: '95%',
      flexDirection: 'row',
      padding: 5,
      borderWidth: 0.5,
      borderRadius: 5,
      borderColor: MAIN_COLOR,
      marginVertical: 10,
   },
   imageContainer: {
      width: '30%',
      height: 100,
      borderRadius: 10,
      overflow: 'hidden',
      margin: 5,
   },
   image: {
      width: '100%',
      height: '100%',
   },
});

export { ImageViewer };
