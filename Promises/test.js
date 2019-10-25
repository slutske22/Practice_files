function get(url) {
  return new Promise(function(resolve, reject) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', url);
    httpRequest.onload = function() {
      if (httpRequest.status === 200) {
        // Resolve the promise with the response text
        // success(httpRequest.responseText);
        resolve(httpRequest.response);
      } else {
        // Reject the promise with the status text
        // fail(httpRequest.status);
        reject(Error(httpRequest.statusText));
      }
    };

    // Handle network errors
    httpRequest.onerror = function() {
      reject(Error('Network Error'));
    };

    httpRequest.send();
  });
}





// const apiKey = 'd126cacbbfebf7c84ad878e9deffc0e1';
const apiKey = '';

const url =
  'https://api.openweathermap.org/data/2.5/weather?q=los+angeles&APPID=' +
  apiKey;


get(url)
   .then( function(data){
      return dataObject = JSON.parse(data);
   })
   .then( function(){
      console.log(dataObject);
   })
   .then( function(){
      console.log(dataObject.weather);
   })
   .catch( () => {
      console.log('Could not get weather');
   })
   .finally( () => {
      console.log('Weather report complete');
   })
