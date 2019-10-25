 // https://www.youtube.com/watch?v=SmPouEFKOBg&list=PLyuRouwmQCjngZXVn48vYmPK_1yAF-fLw

const rand = () => Math.floor(Math.random() * 10) + 1;

let p1 = new Promise( (resolve, reject) => {
   let x = 5;
   // resolve(x); // calling this will call then()
   // reject(x);
   let num = rand();
   setTimeout(resolve, 1500, num)
})


p1.then( (ex) => {
   console.log(ex);
   return ex * 2
})
   .then( (x) => {
      console.log(x);
   })
   .catch( (exx) => {
      console.log('caught', exx);
   })
