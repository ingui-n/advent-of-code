fetch('input.txt')
    .then(resolvePostData)

async function resolvePostData(res) {
    let data = await res.text();
    data = data.split('\n');

    findTheNumber1(data);
    findTheNumber2(data);
}

function findTheNumber1(arr) {
    let answer = 0;
    arr.forEach((value) => {
        arr.forEach(value1 => {
            if (parseInt(value) + parseInt(value1) === 2020) {
                answer = value * value1;
            }
        });
    });
    console.log('Part 1. answer:' + answer);
}

function findTheNumber2(arr) {
    let answer = 0;
    arr.forEach((value) => {
        arr.forEach((value1) => {
            arr.forEach(value2 => {
                if (parseInt(value) + parseInt(value1) + parseInt(value2) === 2020) {
                    answer = value * value1 * value2;
                }
            });
        });
    });
    console.log('Part 2. answer:' + answer);
}
