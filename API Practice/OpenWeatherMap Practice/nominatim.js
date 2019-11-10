// -------------------------------------------------------- //
//
//    NOMATIM API AND CALLER
//
// -------------------------------------------------------- //

// Apparently Nominatim can return a lat lng based on a zip, cityname, or whatever address.  If this works I can feed it into Dark Sky API and get better weather data than OWM gives

// No API Key required

//https://nominatim.org/release-docs/develop/api/Search/

var searchTerm = encodeURIComponent('san diego california');
var cityName = encodeURIComponent('santa cruz');
var stateName = encodeURIComponent('');
var zipCode = 92109;

var openSearchURL = `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json`;

// Zip assumes country is USA, but that can be changed
var zipURL = `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&country=USA&format=json`;

var cityURL = `https://nominatim.openstreetmap.org/search?city=${cityName}&state=${stateName}&country=USA&format=json`;

function apiCaller(url){
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

apiCaller(cityURL)
   .then( (data) => {
      console.log(JSON.parse(data));
   })



// -------------------------------------------------------- //
//
//    DARK SKY API AND CALLER
//
// -------------------------------------------------------- //


var dsAPIKey = '8bc745aa5c2da5e2367d048fdb76ca8a'
var dsUrl = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${dsAPIKey}/37.8267,-122.4233`

// var dsUrl = `https://cors-anywhere.herokuapp.com/https://slutskereactweatherapp.herokuapp.com/darksky/forecast/37.8267,-122.4233`

apiCaller(dsUrl)
   .then( (data) => {
      console.log(JSON.parse(data));
   })





// -------------------------------------------------------- //
//
//    OPENWEATHERMAPS API AND CALLER
//
// -------------------------------------------------------- //


// var openWeatherMapsApiKey = 'ae9a514eab7934500eeb71f723b38277';
//
// function makeCityURL(cityName){
//    return `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},us&cnt=56&mode=json&APPID=${openWeatherMapsApiKey}`
//
// function makeZipURL(zipCode){
//    return `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&cnt=56&mode=json&APPID=${openWeatherMapsApiKey}`
// }

// var owmCityUrl = `https://slutskereactweatherapp.herokuapp.com/owm/data/2.5/forecast?q=${cityName},us&cnt=56&mode=json`;
//
//
// getLocationInfo(owmCityUrl)
//    .then( (data) => {
//       console.log(JSON.parse(data));
//    });
