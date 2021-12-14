const fs = require('fs');

const file = fs.readFileSync('input', {encoding: 'utf8', flag: 'r'});

let lines = file.split('\n');

let answer1 = 0,
    answer2;

/** Part 1 */

let map = [];

for (let i = 0; i < lines.length; i++) {
    map.push(lines[i].split('').map(x => Number(x)));
}

const goR = (num, y, x) => {
    if (map[y] !== undefined && map[y][x + 1] !== undefined && map[y][x + 1] < num)
        return goR(map[y][x + 1], y, x + 1);
    return [num, y, x];
};

const goL = (num, y, x) => {
    if (map[y] !== undefined && map[y][x - 1] !== undefined && map[y][x - 1] <= num)
        return goL(map[y][x - 1], y, x - 1);
    return [num, y, x];
};

const goB = (num, y, x) => {
    if (map[y + 1] !== undefined && map[y + 1][x] !== undefined && map[y + 1][x] <= num)
        return goB(map[y + 1][x], y + 1, x);
    return [num, y, x];
};

const goT = (num, y, x) => {
    if (map[y - 1] !== undefined && map[y - 1][x] !== undefined && map[y - 1][x] <= num)
        return goT(map[y - 1][x], y - 1, x);
    return [num, y, x];
};

let lowestPoints = [];

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        let loop = true;

        let stepX = x,
            stepY = y;

        while (loop) {
            let num = map[stepY][stepX];
            let s = goR(num, stepY, stepX);

            if (JSON.stringify(s) !== JSON.stringify([num, stepY, stepX])) {
                stepY = s[1];
                stepX = s[2];
                num = s[0];
                continue;
            }

            s = goL(num, stepY, stepX);

            if (JSON.stringify(s) !== JSON.stringify([num, stepY, stepX])) {
                stepY = s[1];
                stepX = s[2];
                num = s[0];
                continue;
            }


            s = goB(num, stepY, stepX);

            if (JSON.stringify(s) !== JSON.stringify([num, stepY, stepX])) {
                stepY = s[1];
                stepX = s[2];
                num = s[0];
                continue;
            }

            s = goT(num, stepY, stepX);

            if (JSON.stringify(s) !== JSON.stringify([num, stepY, stepX])) {
                stepY = s[1];
                stepX = s[2];
                num = s[0];
                continue;
            }

            loop = false;
        }

        if (!JSON.stringify(lowestPoints).includes(JSON.stringify([stepY, stepX])))
            lowestPoints.push([stepY, stepX]);
    }
}

for (let i = 0; i < lowestPoints.length; i++)
    answer1 += map[lowestPoints[i][0]][lowestPoints[i][1]] + 1;


/** Part 2 */

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++)
        if (map[y][x] === 9)
            map[y][x] = undefined;
}

const go = (y, x) => {
    if (map[y] !== undefined && map[y][x] !== undefined) {
        let arr = [];

        if (map[y][x + 1] !== undefined) {
            arr.push([y, x + 1]);
        }

        if (map[y][x - 1] !== undefined) {
            arr.push([y, x - 1]);
        }

        if (map[y - 1] !== undefined && map[y - 1][x] !== undefined) {
            arr.push([y - 1, x]);
        }

        if (map[y + 1] !== undefined && map[y + 1][x] !== undefined) {
            arr.push([y + 1, x]);
        }

        return arr;
    }
    return null;
};

let basins = [];

for (let j = 0; j < lowestPoints.length; j++) {
    let loop = true;

    let stepX = lowestPoints[j][1],
        stepY = lowestPoints[j][0];

    let togo = [[stepY, stepX]];
    let basin = [[stepY, stepX]];

    while (loop) {
        if (togo.length === 0) {
            basins.push(basin);
            break;
        }

        let s = go(togo[0][0], togo[0][1]);

        if (s !== null) {
            for (let i = 0; i < s.length; i++) {
                if (!JSON.stringify(basin).includes(JSON.stringify(s[i]))) {
                    basin.push(s[i]);
                    togo.push(s[i]);
                }
            }
        }
        togo.shift();
    }
}

let basinsLen = [];

for (let i = 0; i < basins.length; i++) {
    basinsLen.push(basins[i].length);
}

basinsLen.sort((a, b) => b - a);

answer2 = basinsLen[0] * basinsLen[1] * basinsLen[2];


console.log(`Part 1 answer: ${answer1}`);
console.log(`Part 2 answer: ${answer2}`);
