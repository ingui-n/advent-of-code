<?php
$content = file_get_contents('./input.txt');

$arr = explode("\r\n\r", $content);
$answer1 = 0;
$answer2 = 0;

foreach ($arr as $index => $value) {
    $target = explode("\r\n", $value);
    $target = implode('', $target);
    $target = str_split($target);
    $target = array_unique($target);

    if ($index > 0) array_shift($target);

    $answer1 += count($target);
}

echo 'Part 1. answer:' . $answer1;
echo '<br>';
echo 'Part 2. answer:' . $answer2;
