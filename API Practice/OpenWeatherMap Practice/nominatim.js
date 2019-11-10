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

function getLocationInfo(url){
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

getLocationInfo(cityURL)
   .then( (data) => {
      console.log(JSON.parse(data));
   })



// -------------------------------------------------------- //
//
//    DARK SKY API AND CALLER
//
// -------------------------------------------------------- //


var dsAPIKey = '8bc745aa5c2da5e2367d048fdb76ca8a'
var dsUrl = `https://api.darksky.net/forecast/${dsAPIKey}/37.8267,-122.4233`

getLocationInfo(dsUrl)
   .then( (data) => {
      console.log(JSON.parse(data));
   })
