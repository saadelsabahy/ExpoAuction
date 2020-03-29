import { Audio } from 'expo-av';

export const playButtonPress = async action => {
   const soundObject = new Audio.Sound();
   try {
      if (action === 'bid') {
         await soundObject.loadAsync(
            require('../assets/audio/420504__jfrecords__uprising3.wav')
         );
         await soundObject.playAsync();
      } else {
         await soundObject.loadAsync(
            require('../assets/audio/Winning-sound-effect.mp3')
         );
         await soundObject.playAsync();
      }
   } catch (error) {
      console.log('play sound error', error);
   }
};
