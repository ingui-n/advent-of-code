use std::collections::HashMap;
use std::fs::File;
use std::io::{BufRead, BufReader};

fn part1(left: &[i32], right: &[i32]) {
    let mut left = left.to_vec();
    let mut right = right.to_vec();

    left.sort();
    right.sort();

    let mut result = 0;

    for i in 0..left.len() {
        result += (left[i] - right[i]).abs();
    }

    println!("Result of part 1: {}", result);
}

fn part2(left: &[i32], right: &[i32]) {
    let left = left.to_vec();
    let right = right.to_vec();

    let mut right_sums = HashMap::new();

    for number in right {
        *right_sums.entry(number).or_insert(0) += 1;
    }

    let mut result = 0;

    for number in left {
        if let Some(sum) = right_sums.get(&number) {
            result += number * sum;
        }
    }

    println!("Result of part 1: {}", result);
}

fn main() {
    let file = File::open("input.txt");
    let file = match file {
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

    let reader = BufReader::new(file);
    let mut left: Vec<i32> = vec![];
    let mut right: Vec<i32> = vec![];

    for line in reader.lines() {
        let line: Vec<i32> = line.unwrap()
            .split_whitespace()
            .filter(|s| !s.is_empty())
            .map(|s| s.parse::<i32>().unwrap())
            .collect();

        left.push(line[0]);
        right.push(line[1]);
    }

    if left.len() != right.len() {
        panic!("Input file has different lengths");
    }

    part1(&left, &right);
    part2(&left, &right);
}
