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

   showTalkBack = (childTalk) => {
      this.setState({
         childSaid: childTalk
      })
   }

   render(){
      return(
         <section className="parent" style={this.style}>
            <h2>This is the parent.</h2>
            <p>The child says: {this.state.childSaid}</p>
            <Child
               handleTalkBack={this.handleTalkBack}
               showTalkBack={this.showTalkBack}
               childTalk={this.state.childTalk} />
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
      padding: '10px',
      backgroundColor: 'lightblue'
   }

   onChange = (e) => {
      this.props.handleTalkBack(e.target.value)
   }

   onPressEnter = (e) => {
      if (e.keyCode === 13){
         this.props.showTalkBack(e.target.value);
      }
   }

   render(){
      return(
         <div className="child" style={this.style}>
            <h3>This is the child</h3>
            <p style={{display: 'inline'}}>I say: </p>
            <input type="text"
               value={this.props.childTalk}
               onChange={this.onChange}
               onKeyUp={this.onPressEnter}/>
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
