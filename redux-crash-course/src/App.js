import React from 'react';
import logo from './logo.svg';
import './App.css';

import Posts from './components/Posts'
import PostForm from './components/Postform'

function App() {
  return (
    <div className="App">
      <PostForm />
      <hr />
      <Posts />
    </div>
  );
}

export default App;
