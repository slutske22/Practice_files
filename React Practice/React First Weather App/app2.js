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

// Some definitions for the calendar
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
var daysInAMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
var date = new Date();



//----------------------------------------------------------------//
//    Openweathermaps Caller
//----------------------------------------------------------------//

var openWeatherMapsApiKey = 'ae9a514eab7934500eeb71f723b38277';
// var cityName = 'los%20angeles';
// var zipCode = 92109;
// Endpoint for a 7 day forecast.  can also use `?zip=${zip}` instead of `q=${cityName},us` to get as a function of zip code
// var urlCity = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},us&cnt=7&mode=json&APPID=${openWeatherMapsApiKey}`
// var urlZip = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&cnt=7&mode=json&APPID=${openWeatherMapsApiKey}`


function makeCityURL(cityName){
   return `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},us&cnt=7&mode=json&APPID=${openWeatherMapsApiKey}`
}
function makeZipURL(zipCode){
   return `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&cnt=7&mode=json&APPID=${openWeatherMapsApiKey}`
}


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

// getWeather(urlCity).then( (data) => {
//    console.log(JSON.parse(data));
// }).catch( (error) => {
//    console.log(error);
// })
//
// getWeather(urlZip).then( (data) => {
//    console.log(JSON.parse(data));
// }).catch( (error) => {
//    console.log(error);
// })






//----------------------------------------------------------------//
//  Building the App in React
//----------------------------------------------------------------//

class App extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         zipValue: '',
         cityValue: '',
         dataReady: false,
         weatherData: ''
      }
      this.renderDay = this.renderDay.bind(this)
   }

   zipHandler = (e) => {
      this.setState({zipValue: e.target.value})

      if (e.keyCode === 13){
         let zipCode = this.state.zipValue;
         let zipUrl = makeZipURL(zipCode);
         getWeather(zipUrl)
            .then( (data) => {
               return JSON.parse(data)
            })
            .then( (parsedData) => {
               this.setState( {dataReady: true, weatherData: parsedData} )
            })
            .then( () => {
               if (this.state.dataReady){
                  console.log(this.state)
               }
            })
            .catch( (error) => {
               this.setState({dataReady: false})
               console.log(error);
            })
      }
   }

   cityHandler = (e) => {
      this.setState({cityValue: e.target.value})

      if (e.keyCode === 13){
         let cityName = encodeURIComponent(this.state.cityValue);
         let cityUrl = makeCityURL(cityName);
         getWeather(cityUrl)
            .then( (data) => {
               return JSON.parse(data)
            })
            .then( (parsedData) => {
               this.setState( {dataReady: true, weatherData: parsedData} )
            })
            .then( () => {
               if (this.state.dataReady){
                  console.log(this.state)
               }
            })
            .catch( (error) => {
               this.setState({dataReady: false})
               console.log(error);
            })
      }
   }

   renderDay(i) {
      return <Day number={i}/>
   }

   render() {
      return (
         <div className="app">
            <div className="body">
               <form className="locator">
                  <h2>Choose your Location</h2>
                  <input name="city" type="text"
                     placeholder="Search by City Name" value={this.state.cityValue} onChange={this.cityHandler} onKeyDown={this.cityHandler} />
                  <input name="zip" type="number"
                     placeholder="Search by Zip" value={this.state.zipValue} onChange={this.zipHandler}
                     onKeyDown={this.zipHandler} />
               </form>
               <div className="week">
                  { this.renderDay(0) }
                  { this.renderDay(1) }
                  { this.renderDay(2) }
                  { this.renderDay(3) }
                  { this.renderDay(4) }
                  { this.renderDay(5) }
                  { this.renderDay(6) }
               </div> // week
            </div>
         </div>
      )
   }
} // App



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
