<?php
$content = file_get_contents('./input.txt');

$arr = explode("\n", $content);

function getTreeNumber($arr, $levelX, $levelY) {
    $positionX = $levelX;
    $positionY = $levelY;
    $positions = strlen($arr[0]) - 1;
    $answer = 0;

    foreach ($arr as $index => $value) {
        if ($index == 0) continue;
        if (is_int($index / $positionY) === false) continue;

        if ($positionX >= $positions) $positionX -= $positions;

        $target = substr($value, $positionX, 1);

        if ($target == '#') $answer++;

        $positionX += $levelX;
    }
    return $answer;
}
$part1 = getTreeNumber($arr, 1, 1);
$part2 = getTreeNumber($arr, 3, 1);
$part3 = getTreeNumber($arr, 5, 1);
$part4 = getTreeNumber($arr, 7, 1);
$part5 = getTreeNumber($arr, 1, 2);
$answer2 = $part1 * $part2 * $part3 * $part4 * $part5;

echo 'Part 1. answer: ' . getTreeNumber($arr, 3, 1);
echo "<br>";
echo 'Part 2. answer: ' . $answer2;
