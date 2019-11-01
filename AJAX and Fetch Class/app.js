'use strict';

// https://smartystreets.com/products/apis/us-street-api
// const smartyUrl = `https://us-street.api.smartystreets.com/street-address?auth-id=25731133668897616&candidates=10&match=invalid&street=5244%20La%20Jolla%20Mesa%20Drive&city=San%20Diego&state=CA`
const smartyUrl = `https://us-street.api.smartystreets.com/street-address?auth-id=25731133668897616&candidates=10`
const parksUrl = `https://developer.nps.gov/api/v1/parks?stateCode=CA&api_key=p37gUftzQgeb61BZpCegBquiJlyyhaBubd0xpCKU`

const adddressField = document.querySelector("#address");
const cityField = document.querySelector("#city");
const stateField = document.querySelector("#state");
const zipField = document.querySelector("#zip");



const updateUISuccess = function(data){
   console.log(data);
}

const updateUIError = function(error){
   console.log(error);
}

const responseMethod = function(httpRequest){
   if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
         updateUISuccess(httpRequest.responseText)
      } else {
         updateUIError(httpRequest.status + ": " + httpRequest.responseText)
      }

   }
}

const createRequest = function(url){
   const httpRequest = new XMLHttpRequest(url);
   httpRequest.addEventListener('readystatechange', (url) => {
      responseMethod(httpRequest);
   })
   httpRequest.open('GET', url);
   httpRequest.send()
}

const checkCompletion = function(){
   if (adddressField.value !== '' &&
      cityField.value !== '' &&
      stateField.value !== '') {
         const requestURL = `${smartyUrl}&street=${adddressField.value}&city=${cityField.value}&state=${stateField.value}`;
         createRequest(requestURL)
   }
}

// createRequest(smartyUrl);
// createRequest(parksUrl);


adddressField.addEventListener('blur', checkCompletion);
cityField.addEventListener('blur', checkCompletion);
stateField.addEventListener('blur', checkCompletion);


//
//
// (function testNP(){
//
//    const nationalParksAPIKey = 'p37gUftzQgeb61BZpCegBquiJlyyhaBubd0xpCKU'
//    const nationalParksURL = `https://developer.nps.gov/api/v1/parks?stateCode=CA&api_key=${nationalParksAPIKey}`
//
//    let parksRequest = new XMLHttpRequest();
//    parksRequest.open('GET', nationalParksURL)
//    parksRequest.onload = () => {
//       if (parksRequest.status === 200) {
//          console.log(JSON.parse(parksRequest.responseText));
//       } else {
//          console.log(parksRequest.status + ": " + parksRequest.responseText);
//       }
//    };
//    parksRequest.send()
//
// })()
