import React from 'react'
import store from '../store/store'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/postActions'

class Posts extends React.Component{
   componenDidMount() {
      this.props.fetchPosts()
   }

   render () {
      const postItems = this.props.posts.map( post => (
         <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
         </div>
      ))
      return (
         <div>
            <h1>Posts</h1>
            { postItems }
         </div>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      posts: state.posts.items
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      fetchPosts: store.dispatch( fetchPosts() )
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
