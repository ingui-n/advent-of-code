const fs = require('fs');

const file = fs.readFileSync('input', {encoding: 'utf8', flag: 'r'});

let answer1 = '',
    answer2 = '';


/** Part 1 */

let bingo = file.split(/\n\n/);
let finished = false;

let calledNumbers = bingo[0].match(/\d+/g);

bingo.shift();

let bingo1 = [...bingo],
    bingo2 = [...bingo];

for (let i = 0; i < calledNumbers.length; i++) {
    for (let j = 0; j < bingo1.length; j++) {
        let newRows = '';
        let rows = bingo1[j].split('\n');

        for (let k = 0; k < 5; k++) {
            let numbers = rows[k].split(/[ ]{1,2}/).filter(e => e !== '' && e !== ' ');
            let newNumbers = '';

            for (let l = 0; l < 5; l++) {
                let num = numbers[l];

                if (num === calledNumbers[i]) {
                    newNumbers += numbers.length === l + 1 ? 'x' : 'x ';
                } else {
                    newNumbers += numbers.length === l + 1 ? `${num}` : `${num} `;
                }
            }
            newRows += rows.length === k + 1 ? `${newNumbers}` : `${newNumbers}\n`;
        }
        bingo1[j] = newRows;

        if (isBingo(newRows)) {
            finished = true;

            let numbers = newRows.match(/\d+/g).map(x => Number(x));
            let sum = numbers.reduce((a, b) => a + b, 0);

            answer1 = sum * calledNumbers[i];
            break;
        }
        if (finished) break;
    }
    if (finished) break;
}

function isBingo(bingo) {
    let rows = bingo.split('\n');

    for (let i = 0; i < 5; i++) {
        let numRow = rows[i].split(' ');
        let strikeRow = 0;
        let strikeColumn = 0;

        for (let j = 0; j < 5; j++) {
            let numColumn = rows[j].split(' ');

            if (numColumn[i] === 'x')
                strikeColumn++;

            if (numRow[j] === 'x')
                strikeRow++;
        }

        if (strikeRow === 5 || strikeColumn === 5)
            return true;
    }
    return false;
}

/** Part 2 */

for (let i = 0; i < calledNumbers.length; i++) {
    let bingoToRemove = [];

    for (let j = 0; j < bingo2.length; j++) {
        let newRows = '';
        let rows = bingo2[j].split('\n');

        for (let k = 0; k < 5; k++) {
            let numbers = rows[k].split(/[ ]{1,2}/).filter(e => e !== '' && e !== ' ');
            let newNumbers = '';

            for (let l = 0; l < 5; l++) {
                let num = numbers[l];
                if (num === calledNumbers[i]) {
                    newNumbers += numbers.length === l + 1 ? 'x' : 'x ';
                } else {
                    newNumbers += numbers.length === l + 1 ? `${num}` : `${num} `;
                }
            }
            newRows += rows.length === k + 1 ? `${newNumbers}` : `${newNumbers}\n`;
        }
        bingo2[j] = newRows;

        if (isBingo(newRows))
            bingoToRemove.push(newRows);
    }

    for (let j = 0; j < bingoToRemove.length; j++) {
        if (bingo2.length === 1) {
            let numbers = bingo2[0].match(/\d+/g).map(x => Number(x));
            let sum = numbers.reduce((a, b) => a + b, 0);

            answer2 = sum * calledNumbers[i];
        }

        let index = bingo2.indexOf(bingoToRemove[j]);

        if (index > -1)
            bingo2.splice(index, 1);
    }
}


console.log(`Part 1 answer: ${answer1}`);
console.log(`Part 2 answer: ${answer2}`);
