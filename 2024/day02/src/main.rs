use std::fs::File;
use std::io::{BufRead, BufReader};

fn part1(list: &Vec<Vec<i32>>) {
    let mut result = 0;

    for line in list {
        let current = line.to_vec();

        let mut direction = 1;
        let mut is_line_ok = true;

        for i in 0..current.len() - 1 {
            if i == 0 && current[i] > current[i + 1] {
                direction = -1;
            }

            let is_asc_valid = direction == 1 && current[i + 1] - current[i] > 0 && current[i + 1] - current[i] <= 3;
            let is_desc_valid = direction == -1 && current[i] - current[i + 1] > 0 && current[i] - current[i + 1] <= 3;

            if !is_asc_valid && !is_desc_valid {
                is_line_ok = false;
                break;
            }
        }

        if is_line_ok {
            result += 1;
        }
    }

    println!("Result of part 1: {}", result); // 341
}

fn part2(list: &Vec<Vec<i32>>) {
    fn test_line(current: &Vec<i32>, direction: i32, second_try: bool) -> bool {
        for i in 0..current.len() - 1 {
            let is_asc_valid = direction == 1 && current[i + 1] - current[i] > 0 && current[i + 1] - current[i] <= 3;
            let is_desc_valid = direction == -1 && current[i] - current[i + 1] > 0 && current[i] - current[i + 1] <= 3;

            if !is_asc_valid && !is_desc_valid {
                return if !second_try {
                    let mut t1 = current.clone();
                    t1.remove(i);
                    let mut t2 = current.clone();
                    t2.remove(i + 1);
                    test_line(&t1, direction, true) || test_line(&t2, direction, true)
                } else {
                    false
                }
            }
        }

        true
    }

    let mut result = 0;

    for line in list {
        let current = line.to_vec();

        if test_line(&current, 1, false) || test_line(&current, -1, false) {
            result += 1;
        }
    }

    println!("Result of part 2: {}", result); // 404
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
    let mut list = vec![];

    for line in reader.lines() {
        let line: Vec<i32> = line.unwrap()
            .split_whitespace()
            .filter(|s| !s.is_empty())
            .map(|s| s.parse::<i32>().unwrap())
            .collect();

        list.push(line);
    }

    part1(&list);
    part2(&list);
}