const fs = require('fs');

const file = fs.readFileSync('input', {encoding: 'utf8', flag: 'r'});

const part1 = () => {
  let rounds = file.split('\n');
  let score = 0;

  const play = {
    A: {
      X: 4,
      Y: 8,
      Z: 3
    },
    B: {
      X: 1,
      Y: 5,
      Z: 9
    },
    C: {
      X: 7,
      Y: 2,
      Z: 6
    }
  };

  rounds.forEach(round => {
    const [opponent, me] = round.split(' ');
    score += play[opponent][me];
  });

  return score;
};

const part2 = () => {
  let rounds = file.split('\n');
  let score = 0;

  const play = {
    A: {
      X: 3,
      Y: 4,
      Z: 8
    },
    B: {
      X: 1,
      Y: 5,
      Z: 9
    },
    C: {
      X: 2,
      Y: 6,
      Z: 7
    }
  };

  rounds.forEach(round => {
    const [opponent, me] = round.split(' ');
    score += play[opponent][me];
  });

  return score;
};

console.log(`Part 1 answer: ${part1()}`);
console.log(`Part 2 answer: ${part2()}`);
