const fs = require('fs');

const file = fs.readFileSync('input', {encoding: 'utf8', flag: 'r'});

let lines = file.split('\n');

let answer1 = 0,
    answer2 = 0;

/** Part 1 */

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].split('|')[1].split(' ');

    for (let j = 0; j < line.length; j++) {
        if (line[j].length === 2 || line[j].length === 4 || line[j].length === 3 || line[j].length === 7)
            answer1++;
    }
}


/** Part 2 */

for (let i = 0; i < lines.length; i++) {
    let digits = lines[i].split(' | ')[0].split(' ').sort((a, b) => a.length - b.length);

    let positions = {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []};

    for (let j = 0; j < 10; j++) {
        let digit = digits[j].split('');

        if (j === 0) {
            positions[1].push(digit[0], digit[1]);
            positions[2].push(digit[0], digit[1]);
        } else if (j === 1) {
            positions[0].push(digit[0], digit[1], digit[2]);
        } else if (j === 2) {
            positions[5].push(digit[0], digit[1], digit[2], digit[3]);
            positions[6].push(digit[0], digit[1], digit[2], digit[3]);
        }
    }


    for (let j = 0; j < 3; j++) {
        if (!positions[1].includes(positions[0][j])) {
            positions[0] = [positions[0][j]];
            break;
        }
    }

    for (let j = 0; j < 2; j++) {
        let index = positions[6].indexOf(positions[1][j]);

        if (index > -1) {
            positions[5].splice(index, 1);
            positions[6].splice(index, 1);
        }
    }

    let unusedLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

    for (const position of Object.entries(positions)) {
        for (let j = 0; j < position[1].length; j++) {
            let index = unusedLetters.indexOf(position[1][j]);

            if (index > -1)
                unusedLetters.splice(index, 1);
        }
    }

    positions[3] = unusedLetters;
    positions[4] = unusedLetters;

    for (let j = 3; j < 7; j++) {
        let digit = digits[j === 6 ? 3 : j].split('');

        // if digit === 3
        if (digit.includes(positions[1][0]) && digit.includes(positions[1][1])) {
            let index = digit.indexOf(positions[1][0]);

            if (index > -1)
                digit.splice(index, 1);

            index = digit.indexOf(positions[1][1]);

            if (index > -1)
                digit.splice(index, 1);

            index = digit.indexOf(positions[0][0]);

            if (index > -1) {
                digit.splice(index, 1);
            }

            for (let k = 0; k < 2; k++) {
                if (positions[5].includes(digit[k])) {
                    let index = positions[5].indexOf(digit[k]);

                    if (index > -1)
                        positions[5].splice(index, 1);

                    index = digit.indexOf(digit[k]);

                    if (index > -1)
                        digit.splice(index, 1);
                    break;
                }
            }

            index = positions[6].indexOf(positions[5][0]);

            if (index > -1)
                positions[6].splice(index, 1);

            positions[3] = digit;

            index = positions[4].indexOf(positions[3][0]);

            if (index > -1)
                positions[4].splice(index, 1);

        } else if (positions[6].length === 1) {
            // if digit === 2
            if (digit.includes(positions[4][0])) {
                let index = digit.indexOf(positions[0][0]);

                if (index > -1)
                    digit.splice(index, 1);

                index = digit.indexOf(positions[3][0]);

                if (index > -1)
                    digit.splice(index, 1);

                index = digit.indexOf(positions[4][0]);

                if (index > -1)
                    digit.splice(index, 1);

                index = digit.indexOf(positions[6][0]);

                if (index > -1)
                    digit.splice(index, 1);

                positions[1] = digit;

                index = positions[2].indexOf(positions[1][0]);

                if (index > -1)
                    positions[2].splice(index, 1);

                break;
            } else if (digit.includes(positions[5][0]) && (positions[1].length > 1 || positions[2].length > 1)) {
                // if digit === 5

                let index = digit.indexOf(positions[0][0]);

                if (index > -1)
                    digit.splice(index, 1);

                index = digit.indexOf(positions[3][0]);

                if (index > -1)
                    digit.splice(index, 1);

                index = digit.indexOf(positions[5][0]);

                if (index > -1)
                    digit.splice(index, 1);

                index = digit.indexOf(positions[6][0]);

                if (index > -1)
                    digit.splice(index, 1);

                positions[2] = digit;

                index = positions[1].indexOf(positions[2][0]);

                if (index > -1)
                    positions[1].splice(index, 1);
            }
        }
    }

    digits = lines[i].split(' | ')[1].split(' ');

    let targetNumbers = [];

    for (let j = 0; j < digits.length; j++) {
        if (digits[j].includes(positions[0][0]) && digits[j].includes(positions[1][0]) && digits[j].includes(positions[2][0]) && digits[j].includes(positions[3][0]) && digits[j].includes(positions[4][0]) && digits[j].includes(positions[5][0]) && digits[j].includes(positions[6][0])) {
            targetNumbers.push(8);
        } else if (digits[j].includes(positions[0][0]) && digits[j].includes(positions[1][0]) && digits[j].includes(positions[2][0]) && digits[j].includes(positions[3][0]) && digits[j].includes(positions[5][0]) && digits[j].includes(positions[6][0])) {
            targetNumbers.push(9);
        } else if (digits[j].includes(positions[0][0]) && digits[j].includes(positions[1][0]) && digits[j].includes(positions[2][0]) && digits[j].includes(positions[3][0]) && digits[j].includes(positions[4][0]) && digits[j].includes(positions[5][0])) {
            targetNumbers.push(0);
        } else if (digits[j].includes(positions[0][0]) && digits[j].includes(positions[2][0]) && digits[j].includes(positions[3][0]) && digits[j].includes(positions[4][0]) && digits[j].includes(positions[5][0]) && digits[j].includes(positions[6][0])) {
            targetNumbers.push(6);
        } else if (digits[j].includes(positions[0][0]) && digits[j].includes(positions[2][0]) && digits[j].includes(positions[3][0]) && digits[j].includes(positions[5][0]) && digits[j].includes(positions[6][0])) {
            targetNumbers.push(5);
        } else if (digits[j].includes(positions[0][0]) && digits[j].includes(positions[1][0]) && digits[j].includes(positions[2][0]) && digits[j].includes(positions[3][0]) && digits[j].includes(positions[6][0])) {
            targetNumbers.push(3);
        } else if (digits[j].includes(positions[0][0]) && digits[j].includes(positions[1][0]) && digits[j].includes(positions[3][0]) && digits[j].includes(positions[4][0]) && digits[j].includes(positions[6][0])) {
            targetNumbers.push(2);
        } else if (digits[j].includes(positions[1][0]) && digits[j].includes(positions[2][0]) && digits[j].includes(positions[5][0]) && digits[j].includes(positions[6][0])) {
            targetNumbers.push(4);
        } else if (digits[j].includes(positions[0][0]) && digits[j].includes(positions[1][0]) && digits[j].includes(positions[2][0])) {
            targetNumbers.push(7);
        } else {
            targetNumbers.push(1);
        }
    }

    answer2 += parseInt(targetNumbers.join(''));
}


console.log(`Part 1 answer: ${answer1}`);
console.log(`Part 2 answer: ${answer2}`);
