class Car {
   constructor(doors, engine, color){
      this.doors = doors;
      this.engine = engine;
      this.color = color;
   }
}

class SUV extends Car {
   constructor(doors, engine, color){
      super(doors, engine, color);
      this.roofRack = true;
   }
}



const civic = new Car(4, 'V4', 'Silver')

const santaFe = new SUV(4, 'V6', 'Green')

console.log(santaFe);
