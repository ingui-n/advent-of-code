const fs = require('fs');

const file = fs.readFileSync('input', {encoding: 'utf8', flag: 'r'});

const part1 = () => {
  const [stacksPart, proceduresPart] = file.split("\n\n");

  let stackLines = stacksPart.split("\n");
  stackLines = stackLines.slice(0, stackLines.length - 1);

  let stacksLength = (stackLines[0].length + 1) / 4;

  const stacks = {};

  for (let i = 1; i <= stacksLength; i++)
    stacks[i] = [];

  for (let j = 0; j < stackLines.length; j++) {
    for (let i = 0; i < stacksLength; i++) {
      const startIndex = i * 4;
      let stack = stackLines[j].substring(startIndex, startIndex + 3);

      if (stack.trim().length !== 0)
        stacks[i + 1].push(stack);
    }
  }

  const procedures = [];

  proceduresPart.split('\n').forEach(procedure => {
    const [numbers] = [...procedure.matchAll(/move (\d+) from (\d+) to (\d+)/g)];
    const [move, from, to] = numbers.slice(1, 4);
    procedures.push({move: Number(move), from, to});
  });

  procedures.forEach(procedure => {
    let parts = stacks[procedure.from].slice(0, procedure.move);
    stacks[procedure.from] = stacks[procedure.from].slice(procedure.move);

    const rotatedParts = parts.map((e, i) => parts[parts.length - i - 1]);
    stacks[procedure.to] = rotatedParts.concat(stacks[procedure.to]);
  });

  const target = [];

  for (const [_, stack] of Object.entries(stacks)) {
    if (stack.length > 0)
      target.push(stack[0]);
  }

  return target.join('').replaceAll(/\[/g, '').replaceAll(/]/g, '');
};

const part2 = () => {
  const [stacksPart, proceduresPart] = file.split("\n\n");

  let stackLines = stacksPart.split("\n");
  stackLines = stackLines.slice(0, stackLines.length - 1);

  let stacksLength = (stackLines[0].length + 1) / 4;

  const stacks = {};

  for (let i = 1; i <= stacksLength; i++)
    stacks[i] = [];

  for (let j = 0; j < stackLines.length; j++) {
    for (let i = 0; i < stacksLength; i++) {
      const startIndex = i * 4;
      let stack = stackLines[j].substring(startIndex, startIndex + 3);

      if (stack.trim().length !== 0)
        stacks[i + 1].push(stack);
    }
  }

  const procedures = [];

  proceduresPart.split('\n').forEach(procedure => {
    const [numbers] = [...procedure.matchAll(/move (\d+) from (\d+) to (\d+)/g)];
    const [move, from, to] = numbers.slice(1, 4);
    procedures.push({move: Number(move), from, to});
  });

  procedures.forEach(procedure => {
    let parts = stacks[procedure.from].slice(0, procedure.move);
    stacks[procedure.from] = stacks[procedure.from].slice(procedure.move);
    const rotatedParts = parts.length < 2 ? parts.map((e, i) => parts[parts.length - i - 1]) : parts;
    stacks[procedure.to] = rotatedParts.concat(stacks[procedure.to]);
  });

  const target = [];

  for (const [_, stack] of Object.entries(stacks)) {
    if (stack.length > 0)
      target.push(stack[0]);
  }

  return target.join('').replaceAll(/\[/g, '').replaceAll(/]/g, '');
};

console.log(`Part 1 answer: ${part1()}`);
console.log(`Part 2 answer: ${part2()}`);
