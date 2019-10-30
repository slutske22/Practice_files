async function firstAsync(){
   let promise = new Promise( (resolve, reject) => {
      setTimeout( ()=>{resolve("Hello!")}, 1000)
   });

   let result = await promise;

   console.log(result);
   console.log("Message complete");
}


firstAsync()
