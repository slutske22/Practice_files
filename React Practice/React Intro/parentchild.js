class Parent extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         childTalk: ''
      }
   }

   style = {
      width: '80%',
      margin: 'auto',
      padding: '10px',
      backgroundColor: 'lightgrey'
   }

   handleTalkBack = (childTalk) => {
      this.setState({
         childTalk: childTalk
      })
   }

   render(){
      return(
         <section className="parent" style={this.style}>
            <h2>This is the parent.</h2>
            <Child handleTalkBack={this.handleTalkBack}/>
         </section>

      )
   }
}

class Child extends React.Component{
   constructor(props){
      super(props)
   }

   style = {
      width: '80%',
      margin: 'auto',
      padding: '10px',
      backgroundColor: 'lightblue'
   }

   onChange = (e) => {
      this.props.handleTalkBack(e.target.value)
   }

   render(){
      return(
         <div className="child" style={this.style}>
            <h3>This is the child</h3>
            <p style={{display: 'inline'}}>I say: </p>
            <input type="text" onChange={this.onChange} />
         </div>
      )
   }
}


class App extends React.Component{
   render(){
      return(
         <Parent />
      )
   }
}

ReactDOM.render( <App /> , document.getElementById('root') )
