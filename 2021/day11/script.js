const fs = require('fs');

const file = fs.readFileSync('input', {encoding: 'utf8', flag: 'r'});

let lines = file.split('\n');

let answer1 = 0,
    answer2;

/** Part 1 */

let octopus = [];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].split('').map(x => Number(x));

    octopus.push(line);
}

const flashAround = (y, x) => {
    if (octopus[y - 1] !== undefined) {
        if (octopus[y - 1][x - 1] !== undefined)
            octopus[y - 1][x - 1]++;

        if (octopus[y - 1][x] !== undefined)
            octopus[y - 1][x]++;

        if (octopus[y - 1][x + 1] !== undefined)
            octopus[y - 1][x + 1]++;
    }

    if (octopus[y + 1] !== undefined) {
        if (octopus[y + 1][x - 1] !== undefined)
            octopus[y + 1][x - 1]++;

        if (octopus[y + 1][x] !== undefined)
            octopus[y + 1][x]++;

        if (octopus[y + 1][x + 1] !== undefined)
            octopus[y + 1][x + 1]++;
    }

    if (octopus[y][x - 1] !== undefined)
        octopus[y][x - 1]++;

    if (octopus[y][x + 1] !== undefined)
        octopus[y][x + 1]++;
};

const findOctopus = () => {
    for (let j = 0; j < octopus.length; j++) {
        for (let k = 0; k < octopus[j].length; k++) {
            if (octopus[j][k] > 9 && octopus[j][k] < 500) {
                octopus[j][k] = 500;
                flashAround(j, k);
                findOctopus();
            }
        }
    }
};

for (let i = 0; i < 100; i++) {
    for (let j = 0; j < octopus.length; j++)
        for (let k = 0; k < octopus[j].length; k++)
            octopus[j][k]++;

    findOctopus();

    for (let j = 0; j < octopus.length; j++) {
        for (let k = 0; k < octopus[j].length; k++) {
            if (octopus[j][k] >= 500) {
                octopus[j][k] = 0;
                answer1++;
            }
        }
    }
}


/** Part 2 */

octopus = [];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].split('').map(x => Number(x));

    octopus.push(line);
}

for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < octopus.length; j++)
        for (let k = 0; k < octopus[j].length; k++)
            octopus[j][k]++;

    findOctopus();

    let counter = 0;

    for (let j = 0; j < octopus.length; j++) {
        for (let k = 0; k < octopus[j].length; k++) {
            if (octopus[j][k] >= 500) {
                octopus[j][k] = 0;
                counter++;
            }
        }
    }

    if (counter === 100) {
        answer2 = i + 1;
        break;
    }
}


console.log(`Part 1 answer: ${answer1}`);
console.log(`Part 2 answer: ${answer2}`);
