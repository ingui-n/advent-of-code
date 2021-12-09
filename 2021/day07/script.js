const fs = require('fs');

const file = fs.readFileSync('input', {encoding: 'utf8', flag: 'r'});

let input = file.split(',').map(x => Number(x));

let answer1, answer2;

/** Part 1 */

let usedFuel = null;
let firstPosition = input[0];
let lastPosition = input[0];

for (let i = 0; i < input.length; i++) {
    if (firstPosition > input[i]) {
        firstPosition = input[i];
    }

    if (lastPosition < input[i]) {
        lastPosition = input[i];
    }
}

let testedPosition1 = firstPosition;

for (let i = 0; i < lastPosition - firstPosition; i++) {
    let testFuel = 0;

    for (let j = 0; j < input.length; j++) {
        testFuel += input[j] - testedPosition1 > 0 ? input[j] - testedPosition1 : testedPosition1 - input[j];
    }

    if (usedFuel > testFuel || usedFuel === null)
        usedFuel = testFuel;

    testedPosition1++;
}

answer1 = usedFuel;


/** Part 2 */

let usedFuel2 = null;
let firstPosition1 = input[0];
let lastPosition1 = input[0];

for (let i = 0; i < input.length; i++) {
    if (firstPosition1 > input[i]) {
        firstPosition1 = input[i];
    } else if (lastPosition1 < input[i]) {
        lastPosition1 = input[i];
    }
}

let testedPosition2 = firstPosition1;

for (let i = 0; i < lastPosition1 - firstPosition1; i++) {
    let testFuel = 0;

    for (let j = 0; j < input.length; j++) {
        let steps = input[j] - testedPosition2 > 0 ? input[j] - testedPosition2 : testedPosition2 - input[j];

        for (let k = 1; k <= steps; k++)
            testFuel += k;
    }

    if (usedFuel2 > testFuel || usedFuel2 === null)
        usedFuel2 = testFuel;

    testedPosition2++;
}

answer2 = usedFuel2;


console.log(`Part 1 answer: ${answer1}`);
console.log(`Part 2 answer: ${answer2}`);
