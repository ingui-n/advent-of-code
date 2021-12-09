const fs = require('fs');

const file = fs.readFileSync('input', {encoding: 'utf8', flag: 'r'});

let fishArr1 = file.split(',').map(x => Number(x));
let fishArr2 = file.split(',').map(x => Number(x));

let answer1, answer2;


/** Part 1 */

for	(let i = 0; i < 80; i++) {
	for (let j = 0; j < fishArr1.length; j++) {
		let num = fishArr1[j] - 1;

		if (num === -1) {
			fishArr1.push(9);
			num = 6;
		}
		fishArr1[j] = num;
	}
}

answer1 = fishArr1.length;


/** Part 2 */

answer2 = fishArr2.length;

/** returns days in which new fishes was born */
const getNewFishes = (fish, days) => {
    let newFishes = [];

    for (let i = days; i > 0; i--) {

        if (fish - 1 < 0) {
            newFishes.push(i);
            fish = 7;
        }
        fish--;
    }
    return newFishes;
};

const processFish = (fish, day) => {
    let newFishes = getNewFishes(fish, day);

    specificFish += newFishes.length;

    for (let i = 0; i < newFishes.length; i++) {
        processFish(9, newFishes[i]);
    }
}

let specificFish = 0;
let fishes = {};

fishArr2.forEach(e => {
    fishes[e] = (fishes[e] || 0) + 1;
});

for (const [fishDay, amount] of Object.entries(fishes)) {
    processFish(parseInt(fishDay), 256);

    answer2 += specificFish * amount;
    specificFish = 0;
}


console.log(`Part 1 answer: ${answer1}`);
console.log(`Part 2 answer: ${answer2}`);
