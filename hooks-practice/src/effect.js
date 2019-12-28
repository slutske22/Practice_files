import React, {useState, useEffect} from 'react';

const App = () => {

   const [user, getUser] = useState({name: 'not yet known'});

    useEffect( () => {

   } ) // useEffect

   // use effect runs with every render.  that means at componentDidMount, and every componentDidUpdate

   const fetchUser = () => {
      fetch('https://jsonplaceholder.typicode.com/users/')
      .then(response => response.json())
      .then(json => {
         getUser(json[ Math.floor(Math.random() * 10 ) ])
         console.log(json)
      })
   }

   return (
      <div>
         <p>Testing effects ova heah</p>
         <h3>The user is {user.name}</h3>
         <p>Phone: {user.phone}</p>
         <p>{user.address ? `City: ${user.address.city}` : null}</p>
         <button onClick={fetchUser}>Update User</button>
      </div>
   )
}

export default App