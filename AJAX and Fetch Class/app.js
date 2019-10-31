'use strict';

// https://smartystreets.com/products/apis/us-street-api
const url = `https://us-street.api.smartystreets.com/street-address?auth-id=25731133668897616&candidates=10&match=invalid&street=5244%20La%20Jolla%20Mesa%20Drive&city=San%20Diego&state=CA`

const createRequest = function(url){
   const httpRequest = new XMLHttpRequest(url);
   httpRequest.addEventListener('readystatechange', (url) => {
      if (httpRequest.readyState === 4) {
         console.log(JSON.parse(httpRequest.responseText));
      }
   })
   httpRequest.open('GET', url);
   httpRequest.send()
}

createRequest(url);
