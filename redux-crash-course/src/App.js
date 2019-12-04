import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux'
import store from './store/store'

import Posts from './components/Posts'
import PostForm from './components/Postform'


function App() {
  return (
     <Provider store={store}>
        <div className="App">
          <PostForm />
          <hr />
          <Posts />
        </div>
     </Provider>
  );
}

export default App;
