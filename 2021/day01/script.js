const fs = require('fs');

const file = fs.readFileSync('input', {encoding: 'utf8', flag: 'r'});

let inputArray = [...file.match(/(\d+)/g)];
let answer1 = 0,
    answer2 = 0;

for (let i = 1; i < inputArray.length; i++)
    if (parseInt(inputArray[i]) > parseInt(inputArray[i - 1]))
        answer1++;

for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i + 2] && inputArray[i - 1])
        if (parseInt(inputArray[i]) + parseInt(inputArray[i + 1]) + parseInt(inputArray[i + 2]) > parseInt(inputArray[i - 1]) + parseInt(inputArray[i]) + parseInt(inputArray[i + 1]))
            answer2++;
}

console.log(`Part 1 answer: ${answer1}`);
console.log(`Part 2 answer: ${answer2}`);
