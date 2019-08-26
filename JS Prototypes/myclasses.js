
// Creating our class 'Animal'
let Animal = class{
   // Constructor function defines the properties that construct the class object
   constructor(type, legs){
      this.type = type;
      this.legs = legs;
   }
   // You can add methods directly without having to declare this. or function
   getBasicDetails(){
      return `A ${this.type} has ${this.legs} legs.`
   }
};
//  Creating an instance of the 'Animal' class
let dog = new Animal("dog",4)
console.log( dog.getBasicDetails() )


// Creating a new class by extending 'Animal' class
class Dog extends Animal{
   // Constructor builds the properties of this class
   constructor(type, name, legs, coat){
      // Super is used when extending a class to 'pull down' the properties of the parent / extended class.  Note this is inside of the constructor function
      super(type, legs);
      // We can then add more properties to this new class if we want
      this.name = name;
      this.coat = coat;
   }
   // Again, adding a method to this new class.
   getSpecificInfo(){
      return `${this.name} is a ${this.type} that has ${this.legs} legs and a ${this.coat} coat';`
   }
   // getBasicDetails() can still be called from Dog or any instance of Dog because getBasicDetails() is a method of the prototype of Dog, which is Animal
}

// lemon and blue are instances of the 'Dog' class object
let lemon = new Dog("dog", "Lemon",4,"merrill");
console.log( lemon.getBasicDetails() )
console.log( lemon.getSpecificInfo() )

let blue = new Dog("dog", "Blue", 4, "black and white")
console.log( blue.getSpecificInfo() )



// Creating another instance of the 'Animal' main class object
let bird = new Animal("bird", 2);
console.log( bird.getBasicDetails() )
// console.log( bird.getSpecificInfo() ) //this will throw error because getSpecificInfo() is not a method of the Animal class

// Creating another class based on 'Animal'
class Bird extends Animal{
   constructor(type, name, legs, beak){
      super(type, legs);
      this.name = name;
      this.beak = beak;
   }
   getSpecificInfo(){
      return `${this.name} is a ${this.type} that has ${this.legs} legs and a ${this.beak} beak`
   }
}

// Now creating a new object which is an isntance of the 'Bird' sub-class
let tweety = new Bird("bird", "Tweety", 2, "short");
console.log( tweety.getSpecificInfo() )

let pheonix = new Bird("bird", "Pheonix", 2, "huge")
console.log( pheonix.getSpecificInfo() )


/////////////////////////////////////////////////////
//
// NOW DOING THE SAME THING WITH PROTOTYPE SYNTAXES
//
/////////////////////////////////////////////////////
console.log("\n")

// Functional expression defining your object name as a function with certain inputs, which create the properties listed as this.X items
let Pet = function(type, name){
   this.type = type;
   this.name = name;
};
// Adding a method to the object's prototype
Pet.prototype.getBasicDetails = function(){
   return `I have a ${this.type} and their name is ${this.name}`
}

// Defining an instance of that object (class) through the use of 'new'
let garfield = new Pet("cat", "Garfield")
console.log( garfield.getBasicDetails() )

// Creating a new contructor object, but adding another property
// Similar to constructor and super
let Cat = function(type, name, food){
   Pet.call(this, type, name);
   this.food = food;
}
// sets the prototype of Cat to be Pet
Object.setPrototypeOf(Cat.prototype, Pet.prototype)
// Attaching a method to the newly created and prototyped object (read 'extended class')
Cat.prototype.getSpecificInfo = function(){
   return `My ${this.type}'s name is ${this.name}, and he eats ${this.food}`
}
// Create a new instance of this new object 'class'
let tiny = new Cat("cat", "Tiny", "wet food")
console.log( tiny.getSpecificInfo() )
