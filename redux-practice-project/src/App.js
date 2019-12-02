//https://medium.com/@bretcameron/a-beginners-guide-to-redux-with-react-50309ae09a14

import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import store from './store/store'
import Counter from  './Counter'

window.store = store

function App () {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default App;
