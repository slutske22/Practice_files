// from https://www.youtube.com/watch?v=9xhKH43llhU&list=PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM

import React, {useState, useEffect} from 'react';
import { useForm } from './useForm'
import { useFetch } from './useFetchHook'
import Hello from './hello'
import './App.css';

const App = () => {



   const [{ count, count2 }, setCount] = useState({count: 10, count2: 20})
   // destrucured array has the state as the first element, and a function which alters the state as the second element
   // argument of setCount becomes new count.  it acts like setState

   const [values, handleChange] = useForm({email: '', password: '', firstName: ''})
   const [showHello, setShowHello] = useState(true)

   // useEffect( () => {
   //    const onMouseMove = e => {
   //       console.log(e)
   //    }
   //    window.addEventListener('mousemove', onMouseMove)

   //    // cleanup function to be run at dismount
   //    return () => {
   //       window.removeEventListener('mousemove', onMouseMove)
   //    }

   // }, [values.password, values.firstName] ) // useEffect

   const [number, setNumber] = useState(21)   
   const {data, loading} = useFetch(`http://numbersapi.com/${number}/trivia`)

  return <div>

            <div>count1: {count}</div>
            <div>count2: {count2}</div>

            <button onClick={() =>
                  setCount(currentState =>  ({
                     ...currentState,
                     count2: currentState.count2 + 1
                  }))
               }
            >update count</button>

            <br />

            First Name: <input name="firstName" value={values.firstName} onChange={handleChange} /> <br />
            Email: <input name="email" value={values.email} onChange={handleChange} /> <br />
            Password: <input type="password" name="password" value={values.password} onChange={handleChange} /> <br />

            <br /><br />

            <button onClick={ () => setShowHello(!showHello)}>Toggle hello</button>
            {showHello && <Hello />}  <br />
            <br /><br />




            <button onClick={ () => setNumber(number + 1) }>Go up a number</button>
            <button onClick={ () => setNumber(number - 1) }>Go down a number</button>
            <div>{loading ? 'loading...' : data}</div>







         </div>
}

export default App;
