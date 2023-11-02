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
// extern crate image;

// fn main() {
//     let rgb = image::open("./tile.png").unwrap().to_rgba8();
//     println!("{:?}", rgb)
// }

// fn main() {
//     let mut message = String::from("This is a test string");
//     println!("message is {}", message);

//     let last_word = &message[15..];
//     println!("last_word is {}", last_word);

//     // Will error because `last_word` has a borrowed reference to `message`
//     message = String::from("This is a test horse");
//     println!("last_word is {}", last_word);
// }

// fn main() {
//     let example = "  some example text with spaces   ";
//     let result = trim_spaces(example);
//     let second = second_word(example);

//     println!(
//         "

//         Original input:
//         '{example}'

//         Trimmed input:
//         '{result}'

//         Second Word:
//         '{second}'

//         ",
//     );
// }

// fn trim_spaces(input: &str) -> &str {
//     let mut start = 0;
//     let mut end = 0;

//     for (index, character) in input.chars().enumerate() {
//         // println!("chat at {} is '{}'", index, character);
//         if character != ' ' {
//             start = index;
//             break;
//         }
//     }

//     for (index, character) in input.chars().rev().enumerate() {
//         // println!("chat at {} is '{}'", index, character);
//         if character != ' ' {
//             end = index;
//             break;
//         }
//     }

//     return &input[start..input.len() - end];
// }

// fn second_word(input: &str) -> &str {
//     let mut start = 0;

//     for (index, character) in input.chars().enumerate() {
//         if character != ' ' {
//             start = index;
//             break;
//         }
//     }

//     let trimmed = &input[start..input.len()];

//     let mut first_space_index = 0;

//     for (index, character) in trimmed.chars().enumerate() {
//         if character == ' ' {
//             first_space_index = index;
//             break;
//         }
//     }

//     return &trimmed[0..first_space_index];
// }

// #[derive(Debug)]

// /// Shape that describes a rectangle
// struct Rectangle {
//     /// The height of the rectangle
//     height: f32,
//     /// The width of th rectangle
//     width: f32,
// }

// impl Rectangle {
//     fn get_area(&self) -> f32 {
//         return self.height * self.width;
//     }

//     fn scale(&mut self, factor: f32) {
//         self.height = self.height * factor;
//         self.width = self.width * factor;
//     }

//     fn new(height: f32, width: f32) -> Rectangle {
//         return Rectangle { height, width };
//     }
// }

// fn main() {
//     let mut example = Rectangle::new(5 as f32, 12.4);

//     println!("example is {:?}", example);
//     println!("The area of example is {}", example.get_area());

//     example.scale(0.1);

//     println!("example is {:?}", example);
//     println!("The area of example is {}", example.get_area());
// }

// fn get_biggest<T: PartialOrd>(a: T, b: T) -> T {
//     if a > b {
//         return a;
//     } else {
//         return b;
//     }
// }

// fn main() {
//     let biggest = get_biggest(4, 5);
//     println!("Biggest is {}", biggest);

//     let biggest2 = get_biggest("what", "can we do");
//     println!("biggest2 is {}", biggest2);

//     struct BadIdea {
//         thing: String,
//     }

//     // will error because BadIdea struct does not satisy PartialOrd
//     let biggest3 = get_biggest(
//         BadIdea {
//             thing: String::from("what"),
//         },
//         BadIdea {
//             thing: String::from("can we do"),
//         },
//     );
//     println!("biggest2 is {}", biggest2);
// }

struct Shuttle {
    name: String,
    crew_size: u8,
    peopellant: f64,
}

fn main() {
    let vehicle = Shuttle {
        name: String::from("Atlantis"),
        crew_size: 9,
        peopellant: 8983.34,
    };

    println!(
        "Vehicle size on stack: {} bytes",
        std::mem::size_of_val(&vehicle)
    );

    let boxed_vehicle: Box<Shuttle> = Box::new(vehicle);

    println!(
        "boxed_vehicle size on stack: {} bytes",
        std::mem::size_of_val(&boxed_vehicle)
    );

    println!(
        "boxed_vehicle size on heap: {} bytes",
        std::mem::size_of_val(&*boxed_vehicle)
    );

    let unboxed_vehicle: Shuttle = *boxed_vehicle;

    println!(
        "unboxed_vehicle size on stack: {} bytes",
        std::mem::size_of_val(&unboxed_vehicle)
    );
}

fn sum_boxes<T: std::ops::Add<Output = T>>(a: Box<T>, b: Box<T>) -> Box<T> {
    return Box::new(*a + *b);
}
