// -------------------------------------------------------- //
//
//    NOMATIM API AND CALLER
//
// -------------------------------------------------------- //

//  Getting cross origin issues, can't make the call

// https://developer.here.com/api-explorer/rest/auto_weather/weather-forecast-7days-simple



let hereAppID = 'doeviQxmkTQwZOw4f8Cl'
let hereAppCode = 'rkMIWlTcEk-J5oZmYmfxBw'
let cityName = encodeURIComponent('san diego')
let zipCode = 90036

var cityUrl = `https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&name=${cityName}&app_id=${hereAppID}&app_code=${hereAppCode}`

var zipUrl = `https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&zip=${zipCode}&app_id=${hereAppID}&app_code=${hereAppCode}`

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

getWeather(cityUrl)
   .then( (data) => {
      console.log(JSON.parse(data));
   })
