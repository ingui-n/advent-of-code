const fs = require('fs');

const file = fs.readFileSync('input', {encoding: 'utf8', flag: 'r'});

const part1 = () => {
  let topElf = -1;
  let elfs = file.split('\n\n');

  elfs.forEach(elf => {
    let total = 0;
    let food = elf.split('\n');

    food.forEach(f => total += parseInt(f));
    topElf = topElf < total ? total : topElf;
  });

  return topElf;
};

const part2 = () => {
  let topElfs = [-1, -1, -1];
  let elfs = file.split('\n\n');

  elfs.forEach(elf => {
    let total = 0;
    let food = elf.split('\n');

    food.forEach(f => total += parseInt(f));
    topElfs.sort((a, b) => a - b);

    for (let i = 0; i < topElfs.length; i++) {
      if (topElfs[i] < total) {
        topElfs[i] = total;
        break;
      }
    }
  });

  return topElfs[0] + topElfs[1] + topElfs[2];
};

console.log(`Part 1 answer: ${part1()}`);
console.log(`Part 2 answer: ${part2()}`);
