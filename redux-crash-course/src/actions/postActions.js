import { FETCH_POSTS, NEW_POST } from './types'

export function fetchPosts() {
   return function(dispatch){
      console.log('fetching');
      fetch('http://jsonplaceholder.typicode.com/posts')
         .then( response => response.json() )
         .then( posts => dispatch({
            type: FETCH_POSTS,
            payload: posts
         }) )
   }
}
