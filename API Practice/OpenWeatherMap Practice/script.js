// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=ae9a514eab7934500eeb71f723b38277', true);

request.onload = function(){
   // Begin accessing JSON data here
   var data = JSON.parse(this.response)

   if (request.status >= 200 && request.status < 400) {
      console.log(data);
   } else {
     console.log('error')
   }
}

// Send request
request.send();
