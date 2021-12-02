const fs = require('fs');

const file = fs.readFileSync('input', {encoding: 'utf8', flag: 'r'});

let inputArray = [...file.match(/(\w+) (\d+)/g)];
let answer1, answer2;

let depth = 0,
    forward = 0,
    aim = 0;

inputArray.map(el => {
    let match = /(\w+) (\d+)/g.exec(el);

    let num = parseInt(match[2]);

    if (match[1] === 'down') {
        depth += num;
    } else if (match[1] === 'up') {
        depth -= num;
    } else if (match[1] === 'forward') {
        forward += num;
    }
});

answer1 = depth * forward;

depth = 0;
forward = 0;

inputArray.map(el => {
   let match = /(\w+) (\d+)/g.exec(el);

   let num = parseInt(match[2]);

   if (match[1] === 'down') {
       aim += num;//
   } else if (match[1] === 'up') {
       aim -= num;
   } else if (match[1] === 'forward') {
       depth += aim * num;
       forward += num;
   }
});

answer2 = depth * forward;

console.log(`Part 1 answer: ${answer1}`);
console.log(`Part 2 answer: ${answer2}`);
