import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { AsyncStorage } from 'react-native';

const reactotron = Reactotron.configure({
   host: '192.168.1.2',
   name: 'Auction',
})
   .useReactNative()
   .setAsyncStorageHandler(AsyncStorage)
   .use(reactotronRedux())
   .connect();

export default reactotron;
