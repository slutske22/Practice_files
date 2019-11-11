// -------------------------------------------------------- //
//
//    NOMATIM API AND CALLER
//
// -------------------------------------------------------- //

// Apparently Nominatim can return a lat lng based on a zip, cityname, or whatever address.  If this works I can feed it into Dark Sky API and get better weather data than OWM gives

// No API Key required

//https://nominatim.org/release-docs/develop/api/Search/

// Open search ranks results by importance, results[0] usually makes most sense.
var searchTerm = encodeURIComponent('');
var openSearchURL = `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json`;

// Search by city name - oddly specific, gives unexpected places.  Open search better
var cityName = encodeURIComponent('new york');
var stateName = encodeURIComponent('');
var cityURL = `https://nominatim.openstreetmap.org/search?city=${cityName}&state=${stateName}&country=USA&format=json`;

var zipCode = 999999999;
// Building zipUrl assuming that the  country is USA, but that can be changed
var zipURL = `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&country=USA&format=json`;






function apiCaller(url){
   return new Promise( (resolve, reject) => {
      var request = new XMLHttpRequest()
      request.open('GET', url);
      request.onload = function(){
         if (request.status === 200) {
           resolve(request.response)
         } else {
           reject(request.statusText)
         }
      } // .onload
      request.send()
   })
}

//  Build search call to Nominatim to get array of potential lcations
apiCaller(zipURL)
   .then( (data) => {
      console.log(JSON.parse(data));
      return locationData = JSON.parse(data)
   })
   .then( function(locationData){
      //  If any results are returned, pick the first one and call darksky based on the lat lng that is returned
      if (locationData.length > 0){

         let lat = locationData[0].lat
         let lon = locationData[0].lon
         let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${dsAPIKey}/${lat},${lon}`

         //  Feed the lat lng into the weather caller
         apiCaller(url)
            .then( (weatherData) => {
               console.log('Weather for:', locationData[0].display_name);
               console.log(JSON.parse(weatherData));
            })

      // If no results are returned, array has 0 length, give error message
      } else {
         console.log('Search did not return any results.  Try something else.');
      }


   })



// -------------------------------------------------------- //
//
//    DARK SKY API AND CALLER
//
// -------------------------------------------------------- //


var dsAPIKey = '8bc745aa5c2da5e2367d048fdb76ca8a'
var dsUrl = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${dsAPIKey}/37.8267,-122.4233`

// var dsUrl = `https://cors-anywhere.herokuapp.com/https://slutskereactweatherapp.herokuapp.com/darksky/forecast/37.8267,-122.4233`

// apiCaller(dsUrl)
//    .then( (data) => {
//       console.log(JSON.parse(data));
//    })





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
