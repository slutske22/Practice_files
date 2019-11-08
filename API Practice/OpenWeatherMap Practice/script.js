// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

var openWeatherMapsApiKey = 'ae9a514eab7934500eeb71f723b38277';
// var zipCode = 33101
var zipCode = 90036
var url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&cnt=56&mode=json&APPID=${openWeatherMapsApiKey}`



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

getWeather(url)
   .then( (response) => {


      let data = JSON.parse(response);
      let sampleData = [ ];
      let userLocationOffset = -60 * new Date().getTimezoneOffset()
      let searchedLocationOffset = data.city.timezone;
      console.log('City:', data.city.name);
      console.log('Offset of Searched Location:', searchedLocationOffset, searchedLocationOffset/60/60);
      console.log('Offset of User Location:', userLocationOffset, userLocationOffset/60/60);

      console.log(data);
      data.list.forEach( (hour) => {

         let unix_timestampUTC = hour.dt
         let unix_timestampLocation = unix_timestampUTC + userLocationOffset + searchedLocationOffset
         let localTime = new Date( (unix_timestampUTC - userLocationOffset + searchedLocationOffset)*1000)

         // let formattedHourStamp = (localTime < 12) ? `${localTime}:00 am` : `${localTime-12}:00 pm`;
         let totalHourStamp = localTime

         sampleData.push( [hour.dt_txt, localTime, hour.weather[0].icon] )

      })
      console.log(sampleData);
   })


// https://stackoverflow.com/questions/1091372/getting-the-clients-timezone-offset-in-javascript
// var offset = new Date().getTimezoneOffset();
// console.log('time offset in seconds:', offset);
//
// console.log('time offset in hours:', offset/60)
