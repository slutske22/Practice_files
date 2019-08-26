//
//
// // 1. obj --> otherProto -->Object.prototype -->null
// let otherProto = function(){
//    this.prop1 = 456;  // this means the instance of the object we are creating
//    this.inner = function(){
//       console.log("inner method on instance");
//    };
//    //automatically returns instance of objects
// };
//
// // 2.
//
// let protoObj = {
//    prop1: 456,
//    someMethods: function(){
//       console.log("This is some method")
//    }
// };
//
// otherProto.prototype.someMethod = function(){
//    console.log("this is OtherProto")
// }
//
// let obj = new otherProto();
//
// console.log(obj.prop1)
// obj.inner()
// obj.someMethod()
// obj.__proto__.someMethod();
//
// console.log( Object.getPrototypeOf(obj) )

// 3. childObject --> protoObj --> Object.prototype --> null
let protoObj = {
   prop1: 456,
   someMethods: function(){
      console.log("This is some method")
   }
};

let childObject = {};
Object.setPrototypeOf(childObject, protoObj);


// 4.  childObj2 --> protoObj --> Object.prototype --> null
let childObj2 = Object.create(protoObj)
console.log(childObj2.someMethods()) // coming from protoObj

childObj2.prop1 = 789; // created new property in childObj2 called prop1
console.log(childObj2.prop1, childObj2.__proto__.prop1)

childObj2.someMethods = () =>{
   console.log("This is childobj2 someMethod")
}

childObj2.someMethods();
childObj2.__proto__.someMethods();
