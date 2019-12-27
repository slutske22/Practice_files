// from https://www.youtube.com/watch?v=9xhKH43llhU&list=PLN3n1USn4xlmyw3ebYuZmGp60mcENitdM

import React, {useState} from 'react';
import { useForm } from './useForm'
import './App.css';

const App = () => {

   function expensiveInitialState(){
      return 10
   }

   const [{ count, count2 }, setCount] = useState({count: 10, count2: 20})
   // destrucured array has the state as the first element, and a function which alters the state as the second element
   // argument of setCount becomes new count.  it acts like setState

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [values, handleChange] = useForm({email: '', password: ''})

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

            <input name="email" value={values.email} onChange={handleChange} />
            <input type="password" name="password" value={values.password} onChange={handleChange} />

         </div>
}

export default App;
