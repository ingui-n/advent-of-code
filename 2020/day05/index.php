<?php
$content = file_get_contents('./input.txt');

$arr = explode("\r\n", $content);
$answer1 = 0;
$answer2 = [];

foreach ($arr as $value) {
    $firstArr = substr($value, 0, 7);
    $firstArr = str_split($firstArr);

    $secondArr = substr($value, 7);
    $secondArr = str_split($secondArr);

    $targetNum = getPosition($firstArr, 0, 127);
    $targetNum2 = getPosition($secondArr, 0, 7);

    $sum = $targetNum * 8 + $targetNum2;

    if ($sum > $answer1) $answer1 = $sum;

    array_push($answer2, $sum);
}

function getPosition($input, $firstNum, $secondNum)
{
    foreach ($input as $value) {
        $sub = $secondNum + 1;
        $sub += $firstNum;
        $sub /= 2;

        switch ($value) {
            case 'F':
            case 'L':
                $secondNum = $sub - 1;
                break;
            case 'B':
            case 'R':
                $firstNum = $sub;
                break;
        }
    }
    return $firstNum;
}

asort($answer2);
$answer2 = array_values($answer2);
$testNum = $answer2[0];

foreach ($answer2 as $i => $val) {
    if ($val == $testNum)
        $testNum++;
    else {
        $answer2 = $val - 1;
        break;
    }
}

echo 'Part 1. answer:' . $answer1;
echo '<br>';
echo 'Part 2. answer:' . $answer2;
