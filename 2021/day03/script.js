const fs = require('fs');

const file = fs.readFileSync('input', {encoding: 'utf8', flag: 'r'});

let inputArray = [...file.match(/(\d+)/g)];

/** Part 1 */

let gamma = '',
    epsilon = '';

for (let j = 0; j < inputArray[0].length; j++) {
    let counter0 = 0,
        counter1 = 0;

    for (let i = 0; i < inputArray.length; i++)
        inputArray[i][j] === '0' ? counter0++ : counter1++;

    gamma += counter0 > counter1 ? '0' : '1';
}

for (let i = 0; i < gamma.length; i++)
    epsilon += gamma[i] === '0' ? '1' : '0';

let answer1 = parseInt(gamma, 2) * parseInt(epsilon, 2);


/** Part 2 */
let oxygenArray = inputArray;

for (let j = 0; j < inputArray[0].length; j++) {
    let counter0 = 0,
        counter1 = 0,
        newPartArray = [];

    for (let i = 0; i < oxygenArray.length; i++)
        oxygenArray[i][j] === '0' ? counter0++ : counter1++;

    let collectingNumbers = counter1 >= counter0 ? '1' : '0';

    for (let i = 0; i < oxygenArray.length; i++) {
        if (collectingNumbers === oxygenArray[i][j])
            newPartArray.push(oxygenArray[i]);
    }

    oxygenArray = newPartArray;

    if (newPartArray.length === 1)
        break;
}

let co2Array = inputArray;

for (let j = 0; j < inputArray[0].length; j++) {
    let counter0 = 0,
        counter1 = 0,
        newPartArray = [];

    for (let i = 0; i < co2Array.length; i++)
        co2Array[i][j] === '0' ? counter0++ : counter1++;

    let collectingNumbers = counter1 >= counter0 ? '0' : '1';

    for (let i = 0; i < co2Array.length; i++) {
        if (collectingNumbers === co2Array[i][j])
            newPartArray.push(co2Array[i]);
    }

    co2Array = newPartArray;

    if (newPartArray.length === 1)
        break;
}

let answer2 = parseInt(oxygenArray[0], 2) * parseInt(co2Array[0], 2);


console.log(`Part 1 answer: ${answer1}`);
console.log(`Part 2 answer: ${answer2}`);
