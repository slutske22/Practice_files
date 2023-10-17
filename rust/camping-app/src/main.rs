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

fn calculate_weight(bottles: u64, feedings: u64) -> Result<u64, String> {
    if bottles == 0 || feedings == 0 {
        Err("Need to use bottle number".to_string())
    } else {
        Ok(bottles * feedings)
    }
}

fn main() {
    let result = calculate_weight(0, 9);
    match result {
        Ok(weight) => println!("Weight: {}", weight),
        Err(weight) => println!("Weight: {}", weight),
    }
}
