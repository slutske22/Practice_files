// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

var openWeatherMapsApiKey = 'ae9a514eab7934500eeb71f723b38277';
var zipCode = 90036
var url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&cnt=56&mode=json&APPID=${openWeatherMapsApiKey}`

// Open a new connection, using the GET request on the URL endpoint
// request.open('GET', url, true);
//
// request.onload = function(){
//    // Begin accessing JSON data here
//    var data = JSON.parse(this.response)
//
//    if (request.status >= 200 && request.status < 400) {
//       console.log(data);
//    } else {
//      console.log('error')
//    }
// }
//
// // Send request
// request.send();





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
      let data = JSON.parse(response)
      let sampleData = [ ]
      console.log(data);
      data.list.forEach( (hour) => {

         sampleData.push( [hour.dt_txt, hour.weather[0].icon] )
      })
      console.log(sampleData);
   })


// https://stackoverflow.com/questions/1091372/getting-the-clients-timezone-offset-in-javascript
var offset = new Date().getTimezoneOffset();
console.log(offset);

console.log(offset/60)
