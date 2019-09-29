// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'api.openweathermap.org/data/2.5/weather?lat=35&lon=139', true);

request.onload = function(){
   // Begin accessing JSON data here
   var data = JSON.parse(this.response)

   if (request.status >= 200 && request.status < 400) {


   } else {
     console.log('error')
   }
}

// Send request
request.send();
