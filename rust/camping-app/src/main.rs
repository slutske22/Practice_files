/*
General commments
*/

/// This function read through entire project
// fn main() {
//     let summer = true;
//     let winter = true;

//     println!("Summer is the best season: {}", summer);
//     println!("Winter is also good: {}", winter);

//     // Use snake case for let and let mut:
//     let mut some_number: &str = "67789";
//     println!("Some number starts as: {}", some_number);
//     some_number = "34324";
//     println!("Some number the becomes: {}", some_number);

//     // const usually should be all caps
//     const RADIUS: u32 = 12;
//     println!("RADIUS: '{}'", RADIUS);

//     if summer {
//         println!("Go biking!")
//     } else if winter {
//         println!("Go skiing")
//     } else {
//         println!("do something else")
//     }

//     let baby_weight: f32 = 8.2;
//     println!(
//         "The baby wieghed {} and had a radius of {}",
//         baby_weight, RADIUS
//     );

//     let added_weight: u32 = 1;
//     let total_weight = baby_weight + added_weight;
//     println!("After eating, baby was {}", total_weight);
// }

// fn calculate_weight(bottles: u64, feedings: u64) -> Result<u64, String> {
//     if bottles == 0 || feedings == 0 {
//         Err("Need to use bottle number".to_string())
//     } else {
//         Ok(bottles * feedings)
//     }
// }

// fn main() {
//     let years: [i32; 3] = [1987, 2019, 2023];
//     // println!("{:?}", years);
//     // println!("{:?}", years[1]);
//     // println!("{:?}", years.len());

//     for year in years {
//         println!("{}", year);
//     }
//     println!("\n");

//     for year in years.iter() {
//         println!("{}", year);
//     }
//     println!("\n");

//     let mut index = 0;
//     while index < years.len() {
//         println!("{}", years[index]);
//         index += 1;
//     }
// }

// fn person_builder(person_info: (&str, u64, &str)) {
//     println!(
//         "I am {}, I am {} years old, and my last initial is {}",
//         person_info.0, person_info.1, person_info.2
//     )
// }

// fn main() {
//     let person_info1 = ("Seth", 36, "L");
//     let person_info2 = ("Theo", 0, "L");
//     person_builder(person_info1);
//     person_builder(person_info2);
// }

// fn main() {
//     let mut packing_list = Vec::new();
//     packing_list.push("sunglasses");
//     packing_list.push("sunscreen");
//     packing_list.push("towels");

//     println!("packing list: {:?}", packing_list)
// }

// #[derive(Debug)]

// enum Steepness {
//     Easy,
//     Moderate,
//     Difficult,
// }

// fn main() {
//     let trail1 = Steepness::Easy;
//     let trail2 = Steepness::Moderate;
//     let trail3 = Steepness::Difficult;
//     println!("Steepness is {:?}", trail1);
// }

// struct Hiker {
//     name: String,
//     miles_hiked: u64,
// }

// fn main() {
//     let me = Hiker {
//         name: String::from("Seth"),
//         miles_hiked: 33,
//     };

//     let Hiker { name, miles_hiked } = me;

//     println!("{:?} {:?}", name, miles_hiked);
//     println!("{{{{}}}}");
// }
extern crate image;

fn main() {
    let rgb = image::open("./tile.png").unwrap().to_rgba8();
    println!("{:?}", rgb)
}
