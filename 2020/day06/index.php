<?php
$content = file_get_contents('./input.txt');

$arr = explode("\r\n\r", $content);
$answer1 = 0;
$answer2 = 0;

foreach ($arr as $index => $value) {
    $target = explode("\r\n", $value);
    $testArr = [];

    foreach ($target as $i => $val) {
        if ($i == 0) {
            $testArr = str_split($val);
        } else {
            $a = str_split($val);
            $a = array_intersect($a, $testArr);
            if (empty($a)) {
                $testArr = [];
                break;
            }
            $testArr = $a;
        }
    }
    $answer2 += count($testArr);

    $target = implode('', $target);
    $target = str_split($target);
    $target = array_unique($target);

    if ($index > 0) array_shift($target);

    $answer1 += count($target);
}
$answer2--;

echo 'Part 1. answer:' . $answer1;
echo '<br>';
echo 'Part 2. answer:' . $answer2;
