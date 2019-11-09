// Apparently Nominatim can return a lat lng based on a zip, cityname, or whatever address.  If this works I can feed it into Dark Sky API and get better weather data than OWM gives

//https://nominatim.org/release-docs/develop/api/Search/

var url = 'https://nominatim.openstreetmap.org/90036?format=json';

var searchTerm = encodeURIComponent('la brea tar pits')
var zipCode = 92109;

var openSearchURL = `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json`;

// Zip assumes country is USA, but that can be changed
var zipURL = `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&country=USA&format=json`;

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

getLocationInfo(zipURL)
   .then( (data) => {
      console.log(JSON.parse(data));
   })
