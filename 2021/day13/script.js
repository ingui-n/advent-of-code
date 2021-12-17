const fs = require('fs');

const file = fs.readFileSync('input', {encoding: 'utf8', flag: 'r'});

let lines = file.split('\n\n');

let answer1,
    answer2;

/** Part 1 */

const logPaper = paper => {
    let pap = [];

    for (let i = 0; i < paper.length; i++) {
        pap.push(paper[i].join(''));
    }

    console.log(pap.join('\n'));
};

let coordinates = lines[0].split('\n');

let lengthY = 0,
    lengthX = 0;

for (let i = 0; i < coordinates.length; i++) {
    let coordinate = coordinates[i].split(',').map(x => Number(x));

    if (coordinate[0] > lengthX)
        lengthX = coordinate[0] + 2;

    if (coordinate[1] > lengthY)
        lengthY = coordinate[1] + 1;
}

let paper = [];

for (let i = 0; i < lengthY; i++) {
    paper[i] = [];

    for (let j = 0; j < lengthX; j++) {
        paper[i].push('.');
    }
}

for (let i = 0; i < coordinates.length; i++) {
    let coordinate = coordinates[i].split(',').map(x => Number(x));
    paper[coordinate[1]][coordinate[0]] = '#';
}

let folds = lines[1].split('\n');

const foldY = num => {
    let newPaper = paper.slice(0, num);
    let foldPaper = paper.slice(num + 1);

    let bigger = newPaper.length >= foldPaper.length ? newPaper : foldPaper;
    let low = bigger.length === foldPaper.length ? newPaper : foldPaper;

    for (let i = 0; i < bigger.length; i++) {
        for (let j = 0; j < bigger[i].length; j++) {
            //if (foldPaper[foldPaper.length - 1 - i] === undefined) {
              //  if (newPaper.length > foldPaper.length)
                //    console.log('a');
            /*} else*/ if (bigger[bigger.length - 1 - i][j] === '#') {
                bigger[i][j] = '#';
            }
        }
    }

    return bigger;
};

const foldX = num => {
    let leftPaper = [],
        rightPaper = [];

    for (let i = 0; i < paper.length; i++) {
        leftPaper.push(paper[i].slice(0, num));
        rightPaper.push(paper[i].slice(num + 1));
    }

    let biggerPaper = leftPaper[0].length >= rightPaper[0].length ? leftPaper : rightPaper;
    let lowerPaper = biggerPaper[0].length === rightPaper[0].length ? leftPaper : rightPaper;

    for (let i = 0; i < leftPaper.length; i++) {
        for (let j = 0; j < lowerPaper[i].length; j++) {
            if (lowerPaper[i][biggerPaper[i].length - j - 1] === '#') {
                biggerPaper[i][j] = '#';
            }
        }
    }

    return biggerPaper;
};

const countAllDots = paper => {
    let counter = 0;

    for (let i = 0; i < paper.length; i++) {
        for (let j = 0; j < paper[i].length; j++) {
            if (paper[i][j] === '#')
                counter++;
        }
    }

    return counter;
};

for (let i = 0; i < folds.length; i++) {
    let match = /([yx])=(\d+)/.exec(folds[i]);

    let num = parseInt(match[2]);

    if (match[1] === 'y') {
        paper = foldY(num);
    } else {
        paper = foldX(num);
    }

    break;
}

answer1 = countAllDots(paper);

//logPaper(paper);

/** Part 2 */



console.log(`Part 1 answer: ${answer1}`);
console.log(`Part 2 answer: ${answer2}`);
