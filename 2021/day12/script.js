const fs = require('fs');

const file = fs.readFileSync('input', {encoding: 'utf8', flag: 'r'});

let lines = file.split('\n');

let answer1,
    answer2;

/** Part 1 */

let caves = {};

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].split('-');

    if (line[1] !== 'start' && line[0] !== 'end') {
        if (!caves[line[0]]) {
            caves[line[0]] = [line[1]];
        } else {
            caves[line[0]].push(line[1]);
        }
    }

    if (line[0] !== 'start' && line[1] !== 'end') {
        if (!caves[line[1]]) {
            caves[line[1]] = [line[0]];
        } else {
            caves[line[1]].push(line[0]);
        }
    }
}

let allPaths = [];

const exploreCave = path => {
    let cave = caves[path[path.length - 1]];

    for (let i = 0; i < cave.length; i++) {
        if (cave[i] === 'end') {
            allPaths.push([...path, cave[i]]);
        } else if (isCaveBig(cave[i]) || !path.includes(cave[i])) {
            exploreCave([...path, cave[i]]);
        }
    }
};

const isCaveBig = cave => {
    return cave === cave.toUpperCase();
};

exploreCave(['start']);

answer1 = allPaths.length;

/** Part 2 */

let allPaths2 = [];

const exploreCave2 = path => {
    let cave = caves[path[path.length - 1]];

    for (let i = 0; i < cave.length; i++) {
        if (cave[i] === 'end') {
            allPaths2.push([...path, cave[i]]);
        } else if (isCaveBig2(cave[i]) || !path.includes(cave[i])) {
            exploreCave2([...path, cave[i]]);
        } else {
            if (!isLow2(path))
                exploreCave2([...path, cave[i]]);
        }
    }
};

const isCaveBig2 = cave => {
    return cave === cave.toUpperCase();
};

const isLow2 = path => {
    for (let i = 0; i < path.length; i++) {
        let counter = 0;
        let char = path[i];

        if (char !== char.toLowerCase())
            continue;

        for (let j = 0; j < path.length; j++) {
            if (path[i] === path[j])
                counter++;
        }

        if (counter > 1)
            return true;
    }

    return false;
};

exploreCave2(['start']);

answer2 = allPaths2.length;


console.log(`Part 1 answer: ${answer1}`);
console.log(`Part 2 answer: ${answer2}`);
