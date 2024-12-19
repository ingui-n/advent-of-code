use std::fs::File;
use std::io::{BufRead, BufReader};

fn part1(list: &Vec<Vec<String>>) {
    let search_word = "XMAS";
    let mut result = 0;

    fn find_word(word: &str, list: &Vec<Vec<String>>, row: i32, col: i32, x: i32, y: i32) -> bool {
        for i in 0..word.len() {
            let row_x = row + i as i32 * x;
            let col_y = col + i as i32 * y;
            let word_letter = word.split("").filter(|s| !s.is_empty()).collect::<Vec<_>>()[i];

            if row_x < 0 || col_y < 0 || row_x >= list.len() as i32 || col_y >= list[0].len() as i32 || list[row_x as usize][col_y as usize] != word_letter {
                return false;
            }
        }

        true
    }

    for i in 0..list.len() {
        for j in 0..list[i].len() {
            let directions = vec![
                (0, 1),
                (-1, 1),
                (-1, 0),
                (-1, -1),
                (0, -1),
                (1, -1),
                (1, 0),
                (1, 1)
            ];

            for direction in directions {
                if find_word(search_word, &list, i as i32, j as i32, direction.0, direction.1) {
                    result += 1;
                }
            }
        }
    }

    println!("Result of part 1: {}", result); // 2557
}

fn part2(list: &Vec<Vec<String>>) {
    let mut result = 0;

    fn find_word(list: &Vec<Vec<String>>, row: i32, col: i32) -> bool {
        if list[row as usize][col as usize] != "A" {
            return false;
        }

        let x0 = &list[row as usize - 1][col as usize - 1];
        let x1 = &list[row as usize + 1][col as usize + 1];
        let x2 = &list[row as usize - 1][col as usize + 1];
        let x3 = &list[row as usize + 1][col as usize - 1];

        if ((x0 == "M" && x1 == "S") || (x0 == "S" && x1 == "M")) && ((x2 == "M" && x3 == "S") || (x2 == "S" && x3 == "M")) {
            return true;
        }

        false
    }

    for i in 1..list.len() - 1 {
        for j in 1..list[i].len() - 1 {
            if find_word(&list, i as i32, j as i32) {
                result += 1;
            }
        }
    }

    println!("Result of part 2: {}", result); // 1854
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
        let line: Vec<String> = line.unwrap()
            .split("")
            .filter(|s| !s.is_empty())
            .map(|s| s.parse::<String>().unwrap())
            .collect();

        list.push(line);
    }

    part1(&list);
    part2(&list);
}
