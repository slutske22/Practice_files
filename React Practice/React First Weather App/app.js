//  Chemistry Dog's first React App  :p

// Modulus term for flying off the end of an array
function modulus(i, n){
   return (i % n + n) % n;
}

// First, some definitions for the dates
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
var daysInAMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
var date = new Date();





class App extends React.Component {
   render() {
      return <Week />
   }
}

class Week extends React.Component {
   renderDay(i) {
      return <Day number={i}/>
   }

   render (){
      return(
         <div className="week">
            { this.renderDay(0) }
            { this.renderDay(1) }
            { this.renderDay(2) }
            { this.renderDay(3) }
            { this.renderDay(4) }
            { this.renderDay(5) }
            { this.renderDay(6) }
         </div>
      )
   }
}

class Day extends React.Component {
   render(){
      return (
         <div className="day">
            <div className="cardIndex">{ this.props.number + 1 }</div>

            <h2>{ days[ modulus(date.getDay() + this.props.number, 7) ] }</h2>
            <h2>{ months[date.getMonth()] } { modulus( date.getDate() + this.props.number, daysInAMonth[date.getMonth()] ) }</h2>
         </div>
      )
   }
}


ReactDOM.render(
   <App />,
   document.getElementById('root')
)
