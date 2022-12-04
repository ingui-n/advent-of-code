const fs = require('fs');

const file = fs.readFileSync('input', {encoding: 'utf8', flag: 'r'});

const part1 = () => {
  const lines = file.split('\n');

  let overlaps = 0;

  lines.forEach(line => {
    const [parts] = [...line.matchAll(/(\d+)-(\d+),(\d+)-(\d+)/g)];
    let [x1, y1, x2, y2] = parts.slice(1, 5).map(Number);

    if ((x1 >= x2 && y1 <= y2) || (x1 <= x2 && y1 >= y2))
      overlaps++;
  });

  return overlaps;
};

const part2 = () => {
  const lines = file.split('\n');

  let overlaps = 0;

  lines.forEach(line => {
    const [parts] = [...line.matchAll(/(\d+)-(\d+),(\d+)-(\d+)/g)];
    let [x1, y1, x2, y2] = parts.slice(1, 5).map(Number);

    for (let i = x2; i <= y2; i++) {
       if (x1 <= i && y1 >= i) {
        overlaps++;
        break;
      }
    }
  });

  return overlaps;
};

console.log(`Part 1 answer: ${part1()}`);
console.log(`Part 2 answer: ${part2()}`);
