import React, {useState, useEffect} from 'react';

const App = () => {

   const [user, getUser] = useState('');

   //  useEffect( () => {
   //    fetch('https://jsonplaceholder.typicode.com/users/')
   //    .then(response => response.json())
   //    .then(json => console.log(json))
   // } ) // useEffect

   // use effect runs with every render.  that means at componentDidMount, and every componentDidUpdate

   const fetchUser = () => {
      fetch('https://jsonplaceholder.typicode.com/users/')
      .then(response => response.json())
      .then(json => {
         getUser(json[ Math.floor(Math.random() * 10 ) ].name)
         console.log(user)
      })
   }

   return (
      <div>
         <p>Testing effects ova heah</p>
         <p>The user is {user}</p>
         <button onClick={fetchUser}>Update Count</button>
      </div>
   )
}

export default App