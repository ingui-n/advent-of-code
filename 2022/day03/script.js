const fs = require('fs');

const file = fs.readFileSync('input', {encoding: 'utf8', flag: 'r'});

const part1 = () => {
  const lines = file.split('\n');
  const priorities = [];

  lines.forEach(line => {
    const halfSize = line.length / 2;

    const com1 = line.substring(0, halfSize);
    const com2 = line.substring(halfSize);

    for (const letter of com1) {
      if (com2.includes(letter)) {
        priorities.push(letter);
        break;
      }
    }
  });

  return priorities.reduce((acc, cur) => acc + cur.charCodeAt(0) - (cur.toLowerCase() === cur ? 96 : 38), 0);
};

const part2 = () => {
  const lines = file.split('\n');

  const sameChars = (array) => {
    const arrayIncludes = (arr, e) => {
      for (const a of arr) {
        if (!a.includes(e))
          return false;
      }
      return true;
    };

    let char = array[0][0];
    let counter = 0;

    for (const _ in array[0]) {
      if (!arrayIncludes(array, char)) {
        char = array[0][++counter];
      } else {
        return char;
      }
    }
  };

  let priorities = [];

  for (let i = 0; i < lines.length; i += 3) {
    priorities.push(sameChars(lines.slice(i, i + 3)));
  }

  return priorities.reduce((acc, cur) => acc + cur.charCodeAt(0) - (cur.toLowerCase() === cur ? 96 : 38), 0);
};

console.log(`Part 1 answer: ${part1()}`);
console.log(`Part 2 answer: ${part2()}`);
