import React, {useEffect} from 'react'

const Hello = () => {

   useEffect( () => {

      // cleanup function to be run at dismount
      return () => {
         console.log('unmount')
      }

   } ) // useEffect

   return <code>hello</code>

}

export default Hello