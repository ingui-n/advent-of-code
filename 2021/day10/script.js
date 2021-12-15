const fs = require('fs');

const file = fs.readFileSync('input', {encoding: 'utf8', flag: 'r'});

let lines = file.split('\n');

let answer1, answer2;

/** Part 1 */

let illegal1 = 0,
    illegal2 = 0,
    illegal3 = 0,
    illegal4 = 0;

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].split('');

    const spliceLine = num => {
        line.splice(num, 1);
        line.splice(num, 1);
    };

    for (let j = 0; j < line.length; j++) {
        if (line[j] === ')') {
            if (line[j - 1] === '(') {
                spliceLine(j - 1);
                j -= 2;
            } else {
                illegal1++;
                break;
            }
        } else if (line[j] === ']') {
            if (line[j - 1] === '[') {
                spliceLine(j - 1);
                j -= 2;
            } else {
                illegal2++;
                break;
            }
        } else if (line[j] === '}') {
            if (line[j - 1] === '{') {
                spliceLine(j - 1);
                j -= 2;
            } else {
                illegal3++;
                break;
            }
        } else if (line[j] === '>') {
            if (line[j - 1] === '<') {
                spliceLine(j - 1);
                j -= 2;
            } else {
                illegal4++;
                break;
            }
        }
    }
}

answer1 = 3 * illegal1 + 57 * illegal2 + 1197 * illegal3 + 25137 * illegal4;


/** Part 2 */

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].split('');

    const spliceLine = num => {
        line.splice(num, 1);
        line.splice(num, 1);
    };

    for (let j = 0; j < line.length; j++) {
        if (line[j] === ')') {
            if (line[j - 1] === '(') {
                spliceLine(j - 1);
                j -= 2;
            } else {
                lines.splice(i, 1);
                i--;
                break;
            }
        } else if (line[j] === ']') {
            if (line[j - 1] === '[') {
                spliceLine(j - 1);
                j -= 2;
            } else {
                lines.splice(i, 1);
                i--;
                break;
            }
        } else if (line[j] === '}') {
            if (line[j - 1] === '{') {
                spliceLine(j - 1);
                j -= 2;
            } else {
                lines.splice(i, 1);
                i--;
                break;
            }
        } else if (line[j] === '>') {
            if (line[j - 1] === '<') {
                spliceLine(j - 1);
                j -= 2;
            } else {
                lines.splice(i, 1);
                i--;
                break;
            }
        }
    }
}

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].split('');

    const spliceLine = num => {
        line.splice(num, 1);
        line.splice(num, 1);
    };

    for (let j = 0; j < line.length; j++) {
        if ((line[j] === '(' && line[j + 1] === ')') || (line[j] === '[' && line[j + 1] === ']') || (line[j] === '{' && line[j + 1] === '}') || (line[j] === '<' && line[j + 1] === '>')) {
            spliceLine(j);
            j = -1;
        }
    }

    lines[i] = line.join('');
}

let lineEnds = [];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].split('');

    let lineEnd = 0;

    for (let j = line.length - 1; j >= 0; j--) {
        if (line[j] === '(') {
            lineEnd = lineEnd * 5 + 1;
        } else if (line[j] === '[') {
            lineEnd = lineEnd * 5 + 2;
        } else if (line[j] === '{') {
            lineEnd = lineEnd * 5 + 3;
        } else if (line[j] === '<') {
            lineEnd = lineEnd * 5 + 4;
        }
    }

    lineEnds.push(lineEnd);
}

lineEnds.sort((a, b) => a - b);

answer2 = lineEnds[lineEnds.length / 2 - 0.5];


console.log(`Part 1 answer: ${answer1}`);
console.log(`Part 2 answer: ${answer2}`);
