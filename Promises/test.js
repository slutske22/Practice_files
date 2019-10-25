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



function myAsyncFunction(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.reponse);
    xhr.onload = function(){
      resolve(xhr.response)
   }
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}




const apiKey = 'd126cacbbfebf7c84ad878e9deffc0e1';
// const apiKey = '';

const losAngelesUrl =
  'https://api.openweathermap.org/data/2.5/weather?q=los+angeles&APPID=' +
  apiKey;
const sanDiegoUrl =
 'https://api.openweathermap.org/data/2.5/weather?q=san+diego&APPID=' +
 apiKey;


 myAsyncFunction(sanDiegoUrl)
    .then( function(data){
      return JSON.parse(data)
   })
   .then( function(dataObj){
      console.log("San Diego Weather:", dataObj);
   })
   .catch( () => {
      console.log('Could not get SD weather');
   })
   .finally( () => {
      console.log(`End of "myAsyncFunction" promise.`);
   })




get(losAngelesUrl)
   .then( function(data){
      return dataObject = JSON.parse(data);
   })
   .then( function(){
      console.log("Los Angeles Weather:", dataObject);
   })
   .catch( () => {
      console.log('Could not get LA weather');
   })
   .finally( () => {
      console.log(`End of "get" promise.`);
   })
