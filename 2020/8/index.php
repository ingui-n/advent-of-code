<?php
$content = file_get_contents('./input.txt');

$arr = explode("\r\n", $content);
$lastIndex = [];
$accCounter = 0;
$line = 0;
$loop = true;

while ($loop) {
    preg_match('/(\w+) (\W)(\d+)/', $arr[$line], $match);

    if (is_int(array_search(strval($line), $lastIndex))) {
        $loop = false;
        break;
    } else {
        array_push($lastIndex, strval($line));
    }

    if ($match[1] == 'acc') {
        $match[2] == '+' ? $accCounter += $match[3] : $accCounter -= $match[3];
        $line++;
    } else if ($match[1] == 'jmp')
        $match[2] == '+' ? $line += $match[3] : $line -= $match[3];
    else
        $line++;
}

echo 'Part 1. answer:' . $accCounter;
echo '<br>';
//echo 'Part 2. answer:' . $answer2;
