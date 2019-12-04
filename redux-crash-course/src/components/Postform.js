import React from 'react'

class PostForm extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         title: '',
         body: ''
      };
   }

   onChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value
      })
   }

   onSubmit = (e) => {
      e.preventDefault();

      const post = {
         title: this.state.title,
         body: this.state.body
      }

      fetch('http://jsonplaceholder.typicode.com/posts', {
         method: 'POST',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify(post)
      })
         .then( response => response.json() )
         .then( data => console.log(data) )
   }

   render () {
      return (
         <div>
            <h1>Add Post</h1>
            <form onSubmit={this.onSubmit}>
               <div>
                  <label>Title: </label><br />
                  <input name="title" type="text" onChange={this.onChange} value={this.state.title}/>
               </div>
               <br />
               <div>
                  <label>Body: </label><br />
                  <textarea name="body" value={this.state.body} onChange={this.onChange}/>
               </div>
               <br />
               <button type="submit">Submit</button>
            </form>
         </div>
      )
   }
}

export default PostForm;
