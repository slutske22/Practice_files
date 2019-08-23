let mixin = {
   madeIn(){
      console.log('This car was made in Korea')
   }
}

let carMixIn = {
   __proto__: mixin,
   madeIn(){
      super.madeIn();
   }
}


class Car{
   constructor(name, doors, engine, color){
      this.name = name;
      this.doors = doors;
      this.engine = engine;
      this.color = color;
   }
   carStats(){
      return(`The ${this.name} has ${this.doors} doors, ${this.engine} engine in a beautiful ${this.color} color.`)
   }
   static totalDoors(car1,car2){
      const doors1 = car1.doors;
      const doors2 = car2.doors;
      return doors2 + doors2;
   }
}


class SUV extends Car{
   constructor(name, doors, engine, color, make, year, carStats){
      super(name, doors, engine, color, carStats);
      this.make = make;
      this.year = year
      this.wheels = 4;
      this.AC = true;

      // assign mixin
      Object.assign(this, carMixIn);
   }
   myBrand(){
      return console.log(`This SUV is a ${this.color} ${this.year} ${this.make}`)
   }
}


const cx5 = new Car('CX5' ,2 ,'v6','blue');
const santaFe = new SUV('Santa Fe', 4,'v4','green','Hyundai',2002);

console.log(cx5);
// console.log(cx5.carStats());
console.log(santaFe);
// console.log(santaFe.carStats());
// console.log(Car.totalDoors(cx5,santaFe));

console.log(santaFe.madeIn())
