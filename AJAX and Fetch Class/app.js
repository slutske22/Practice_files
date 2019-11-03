'use strict';

//const smartyUrl = 'https://us-street.api.smartystreets.com/street-address?auth-id=19785289899902913&candidates=10&street=86%20Frontage%20Road&city=Belmont&state=MA';
const smartyUrl = `https://us-street.api.smartystreets.com/street-address?auth-id=25731133668897616&candidates=10`
const parksUrl = `https://developer.nps.gov/api/v1/parks?stateCode=CA&api_key=p37gUftzQgeb61BZpCegBquiJlyyhaBubd0xpCKU`

const addressField = document.querySelector('#address');
const cityField = document.querySelector('#city');
const stateField = document.querySelector('#state');
const zipField = document.querySelector('#zip');

const parkThumb = document.querySelector("#specials h2 img");
const parkSection = document.querySelector("#specials");

const parkLink = document.querySelector('#specials a');
const parkDescription = document.querySelector('#specials p');

const smartyUpdateUISuccess = function(data) {
   const parsedData = JSON.parse(data)
  // console.log(parsedData);
  let zip = parsedData[0].components.zipcode
  let plus4 = parsedData[0].components.plus4_code
  // console.log(zip + '-' + plus4);
  zipField.value = zip + '-' + plus4;
};
const smartyUpdateUIError = function(error) {
  console.log(error);
};

const parksUpdateUISuccess = function(data){
   parkThumb.src = 'https://www.nps.gov/common/commonspot/templates/assetsCT/images/branding/logo.png';
   parkSection.classList.remove('hidden');
   let parsedData = JSON.parse(data)
   let randomNumber = Math.floor( Math.random() * parsedData.data.length)
   console.log(randomNumber);
   parkLink.href = parsedData.data[randomNumber].url;
   parkLink.innerHTML = parsedData.data[randomNumber].fullName;
   parkDescription.innerHTML = parsedData.data[randomNumber].description;
};
const parksUpdateUIError = function(error) {
  console.log(error);
};


const responseMethod = function(httpRequest, succeed, fail) {
  if (httpRequest.readyState === 4) {
    if (httpRequest.status === 200) {
      succeed(httpRequest.responseText);
    } else {
      fail(httpRequest.status + ': ' + httpRequest.responseText);
    }
  }
}


const createRequest = function(url, succeed, fail) {
  const httpRequest = new XMLHttpRequest(url);
  httpRequest.addEventListener('readystatechange', (url) => responseMethod(httpRequest, succeed, fail));
  httpRequest.open('GET', url);
  httpRequest.send();
};

const checkCompletion = function() {
  if (addressField.value !== '' &&
      cityField.value !== '' &&
      stateField.value !== '') {
        const requestUrl = smartyUrl +
          '&street=' + addressField.value +
          '&city=' + cityField.value +
          '&state=' + stateField.value;
        createRequest(requestUrl, smartyUpdateUISuccess, smartyUpdateUIError);
      }
}
// createRequest(smartyUrl);
createRequest(parksUrl, parksUpdateUISuccess, parksUpdateUIError);

addressField.addEventListener('blur', checkCompletion);
cityField.addEventListener('blur', checkCompletion);
stateField.addEventListener('blur', checkCompletion);

window.addEventListener('DOMContentLoaded', function(){
   createRequest(parksUrl, parksUpdateUISuccess, parksUpdateUIError);
}, false)
