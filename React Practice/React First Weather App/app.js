//----------------------------------------------------------------//
//
//    CHEMISTRY DOG'S FIRST REACT APP  :P
//
//----------------------------------------------------------------//



//----------------------------------------------------------------//
//    Generic Use functions and terms
//----------------------------------------------------------------//

// Modulus term for flying off the end of an array
function modulus(i, n){
   return (i % n + n) % n;
}

// First, some definitions for the dates
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
var daysInAMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
var date = new Date();



//----------------------------------------------------------------//
//    Openweathermaps Caller
//----------------------------------------------------------------//

var openWeatherMapsApiKey = 'ae9a514eab7934500eeb71f723b38277';
var cityName = 'san+diego';
// Endpoint for a 7 day forecast.  can also use `?zip=${zip}` instead of `q=${cityName},us` to get as a function of zip code
var url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},us&cnt=7&mode=json&APPID=${openWeatherMapsApiKey}`


function getWeather(url){
   return new Promise( (resolve, reject) => {
      var weatherRequest = new XMLHttpRequest()
      weatherRequest.open('GET', url);
      weatherRequest.onload = function(){
         if (weatherRequest.status === 200) {
           resolve(weatherRequest.response)
         } else {
           reject(weatherRequest.statusText)
         }
      } // .onload
      weatherRequest.send()
   })
}

getWeather(url).then( (data) => {
   console.log(JSON.parse(data));
}).catch( (error) => {
   console.log(error);
})






//----------------------------------------------------------------//
//  Building the App in React
//----------------------------------------------------------------//

class App extends React.Component {
   render() {
      return (
         <div className="app">
            <div className="body">
               <Locator />
               <Week />
            </div>
         </div>
      )
   }
}


class Locator extends React.Component{
   render() {
      return(
         <form className="locator">
            <h2>Choose your Location</h2>
            <Input placeholder="Search by City Name" />
            <Input placeholder="Search by Zip" />
         </form>
      )
   }
}


class Input extends React.Component{
   constructor(props){
      super(props);
      this.state = {value: ''}
      this.checkInput = this.checkInput.bind(this);
   }

   checkInput(e){
      this.setState({value: e.target.value})
      console.log(this.state.value);
   }

   render() {
      return <input type="text" placeholder={this.props.placeholder} value={this.state.value} onChange={this.checkInput} onKeyPress={this.checkInput}></input>
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
