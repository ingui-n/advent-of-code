<?php
$content = file_get_contents('./input.txt');

$arr = explode("\n", $content);
$answer1 = 0;
$answer2 = 0;

foreach ($arr as $index => $value) {
    $danger = false;
    preg_match('/(?<firstNum>\d+)-(?<lastNum>\d+) (?<targetLetter>\w+): (?<targetPasswd>\w+)/', $value, $matches);
    $lastSpace = strrpos($value, ' ');
    $targetPasswd = substr($value, $lastSpace);

    if (substr_count($matches['targetPasswd'], $matches['targetLetter']) >= $matches['firstNum'] && substr_count($matches['targetPasswd'], $matches['targetLetter']) <= $matches['lastNum'])
        $answer1++;

    if (substr($targetPasswd, $matches['firstNum'], 1) == $matches['targetLetter'] && substr($targetPasswd, $matches['lastNum'], 1) != $matches['targetLetter']) {
        $danger = true;
        $answer2++;
    }
    if (substr($targetPasswd, $matches['firstNum'], 1) != $matches['targetLetter'] && substr($targetPasswd, $matches['lastNum'], 1) == $matches['targetLetter']) {
        $danger ? $answer2-- : $answer2++;
    }
}
echo 'Part 1. answer: ' . $answer1;
echo "<br>";
echo 'Part 2. answer: ' . $answer2;
