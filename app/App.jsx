import React from 'react';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import StackNavigator from '../navigators/StackNavigator';
import store from '../src/redux/store';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
