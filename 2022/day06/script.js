const fs = require('fs');

const file = fs.readFileSync('input', {encoding: 'utf8', flag: 'r'});

const part1 = () => {
  const letters = file.split('');

  for (let i = 0; i < letters.length - 4; i++) {
    let lettersLength = [...new Set(letters.slice(i, i + 4))].length;

    if (lettersLength === 4) {
      return i + 4;
    }
  }
};

const part2 = () => {
  const letters = file.split('');

  for (let i = 0; i < letters.length - 14; i++) {
    let lettersLength = [...new Set(letters.slice(i, i + 14))].length;

    if (lettersLength === 14) {
      return i + 14;
    }
  }
};

console.log(`Part 1 answer: ${part1()}`);
console.log(`Part 2 answer: ${part2()}`);
