const apiKey = 'd126cacbbfebf7c84ad878e9deffc0e1';
const sanDiegoUrl =
 'https://api.openweathermap.org/data/2.5/weather?q=san+diego&APPID=' +
 apiKey;



 //------------------------------------------------//
 //
 //    METHOD ONE: FUNCTION THAT RETURNS A PROMISE
 //
 //------------------------------------------------//

function fromPromise(){
    return new Promise((resolve, reject) => {
       const request = new XMLHttpRequest();
       request.open("GET", sanDiegoUrl);
       request.onload = function(){
          if (request.status === 200) {
             resolve(request.response)
          } else {
             reject(request.statusText)
          }
       console.log('%c Using fromPromise()' , 'font-weight:bold');
       console.log(request.status, request.statusText);
       } // .onload
       request.send()

    }) // Promise

} // fromPromise()


 fromPromise().then( (data) => {
    console.log(JSON.parse(data));
})


//------------------------------------------------//
//
//    METHOD TWO: ASYNC FUNCTION
//
//------------------------------------------------//

async function fromAsync(){
   let promise = new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open("GET", sanDiegoUrl);
      request.onload = function(){
         if (request.status === 200) {
            resolve(request.response)
         } else {
            reject(request.statusText)
         }
      console.log('%c Using fromAsync()' , 'font-weight:bold');
      console.log(request.status, request.statusText);
      } // .onload
      request.send()

   }) // promise

   let data = await promise;
   console.log(JSON.parse(data));
} // fromAsync()

fromAsync();
