use std::fs;
use regex::Regex;

fn part1(input: &String) {
    let re = Regex::new(r"mul\((?<x>\d+),(?<y>\d+)\)").unwrap();

    let catches: Vec<(i32, i32)> = re.captures_iter(input).map(|m| {
        let x: i32 = m.name("x").unwrap().as_str().parse().unwrap();
        let y: i32 = m.name("y").unwrap().as_str().parse().unwrap();

        (x, y)
    }).collect::<Vec<(i32, i32)>>();

    let mut result = 0;

    for catch in &catches {
        result += catch.0 * catch.1;
    }

    println!("Result of part 1: {}", result); // 159833790
}

fn part2(input: &String) {
    let re = Regex::new(r"(mul\((?<x>\d+),(?<y>\d+)\)|(?<do>do\(\))|(?<dont>don't\(\)))").unwrap();
    let mut enabled = true;

    let catches: Vec<(i32, i32)> = re.captures_iter(input).map(|m| {
        let is_do: bool = m.name("do").is_some();
        let is_dont: bool = m.name("dont").is_some();

        if is_do {
            enabled = true;
        } else if is_dont {
            enabled = false;
        } else {
            if enabled {
                let x: i32 = m.name("x").unwrap().as_str().parse().unwrap();
                let y: i32 = m.name("y").unwrap().as_str().parse().unwrap();

                return (x, y)
            }
        }

        (0, 0)
    }).collect::<Vec<(i32, i32)>>();

    let mut result = 0;

    for catch in &catches {
        result += catch.0 * catch.1;
    }

    println!("Result of part 2: {}", result); // 89349241
}

fn main() {
    let input_file = fs::read_to_string("input.txt");
    let input = match input_file {
        Ok(file) => file,
        Err(error) => {
            match error.kind() {
                std::io::ErrorKind::NotFound => {
                    panic!("Input file not found: {}", error)
                }
                _ => panic!("Error when opening file input.txt: {}", error)
            }
        }
    };

    part1(&input);
    part2(&input);
}
