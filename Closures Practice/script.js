//Closures fromhttps://www.youtube.com/watch?v=K9fjMX6F5fE
//All about variable scope

var g = "I am a global variable";
fred(42);  //fred is a global function

function fred(num){
      var str = "Hello";
      //variables num and str and local to this function

      var somethingElse = function(){
          //str and num are available within this subfunction //
          //str and num can have different values depending on when this function runs
          //console.log('somethingElse: ' , num);
          //accessing variable num here created a closure
          //use console.dir to view the closre
          //console.dir(somethingElse);
        }

      var btns = document.querySelectorAll("button");
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", (function(innerEye){
          return function(){
            console.log('click: ', innerEye, i);
          }
        })(i)   );
      }




      somethingElse();
      num = num + 5;
      str = "Goodbye";
      somethingElse();

}
