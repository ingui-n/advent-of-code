const fs = require('fs');

const file = fs.readFileSync('input', {encoding: 'utf8', flag: 'r'});

let answer1 = 0,
    answer2 = 0;


/** Part 1 */

let lines = [...file.matchAll(/(\d+),(\d+) -> (\d+),(\d+)/g)];
let maxX = 0,
    maxY = 0;

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].slice(1, 5).map(x => Number(x));

    if (line[0] > maxX) {
        maxX = line[0];
    } else if (line[2] > maxX) {
        maxX = line[2];
    }

    if (line[1] > maxY) {
        maxY = line[1];
    } else if (line[3] > maxY) {
        maxY = line[3];
    }
}

let diagram = [];

for (let i = 0; i <= maxY; i++) {
    let newLine = [];

    for (let j = 0; j <= maxX; j++) {
        newLine.push('.');
    }
    diagram.push(newLine);
}

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].slice(1, 5).map(x => Number(x));

    // if x1 === x2
    if (line[0] === line[2]) {
        let smaller = line[1] > line[3] ? line[3] : line[1];
        let bigger = smaller === line[1] ? line[3] : line[1];

        for (let j = 0; j <= bigger - smaller; j++) {
            if (typeof diagram[smaller + j][line[0]] === 'number') {
                diagram[smaller + j][line[0]]++;
            } else {
                diagram[smaller + j][line[0]] = 1;
            }
        }
    }

    // if y1 === y2
    if (line[1] === line[3]) {
        let smaller = line[0] > line[2] ? line[2] : line[0];
        let bigger = smaller === line[0] ? line[2] : line[0];

        for (let j = 0; j <= bigger - smaller; j++) {
            if (typeof diagram[line[1]][smaller + j] === 'number') {
                diagram[line[1]][smaller + j]++;
            } else {
                diagram[line[1]][smaller + j] = 1;
            }
        }
    }
}

for (let i = 0; i < diagram.length; i++) {
    for (let j = 0; j < diagram[i].length; j++) {
        if (diagram[i][j] > 1)
            answer1++;
    }
}


/** Part 2 */

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].slice(1, 5).map(x => Number(x));

    if (line[1] === line[3] || line[0] === line[2])
        continue;

    let x1, x2, y1, y2;

    if (line[0] > line[2]) {
        x1 = line[2];
        y1 = line[3];

        x2 = line[0];
        y2 = line[1];
    } else {
        x1 = line[0];
        y1 = line[1];

        x2 = line[2];
        y2 = line[3];
    }

    let up = y1 < y2;

    let loops = x2 > x1 ? x2 - x1 : x1 - x2;

    let nX = [];
    let nY = [];

    for (let j = 0; j <= loops; j++) {
        nX.push(x1 + j);
        up ? nY.push(y1 + j) : nY.push(y1 - j);
    }

    for (let j = 0; j <= loops; j++) {
        if (typeof diagram[nY[j]][nX[j]] === 'number') {
            diagram[nY[j]][nX[j]]++;
        } else {
            diagram[nY[j]][nX[j]] = 1;
        }
    }
}

for (let i = 0; i < diagram.length; i++) {
    for (let j = 0; j < diagram[i].length; j++) {
        if (diagram[i][j] > 1)
            answer2++;
    }
}


console.log(`Part 1 answer: ${answer1}`);
console.log(`Part 2 answer: ${answer2}`);
