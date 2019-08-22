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


const cx5 = new Car('CX5' ,2 ,'v6','blue');
const santaFe = new Car('Santa Fe', 4,'v4','green');

console.log(cx5);
// console.log(cx5.carStats());
// console.log(santaFe);
// console.log(santaFe.carStats());
// console.log(Car.totalDoors(cx5,santaFe));
