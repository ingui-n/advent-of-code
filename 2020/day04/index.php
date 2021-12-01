<?php
$content = file_get_contents('./input.txt');

$passportFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
$arr = explode("\r\n\r\n", $content);
$answer1 = 0;
$answer2 = 0;

foreach ($arr as $index => $value) {
    $value = str_replace("\r\n", ' ', $value);
    $fieldsCounter = 0;

    foreach ($passportFields as $i => $val) {
        if (strpos($value, $val . ':') !== false)
            $fieldsCounter++;
    }
    if ($fieldsCounter == count($passportFields)) {
        $answer1++;
        if (checkPassportValidation($value))
            $answer2++;
    }
}

function checkPassportValidation($value)
{
    $fields = explode(' ', $value);
    $invalid = false;
    foreach ($fields as $field) {
        $target = explode(' ', $field);

        foreach ($target as $i => $val) {
            $checkField = substr($val, 0, 3);
            $checkValue = substr($val, 4);

            switch ($checkField) {
                case 'byr':
                    if (isNumberValid($checkValue, 1920, 2002))
                        break;
                    $invalid = true;
                    break;
                case 'iyr':
                    if (isNumberValid($checkValue, 2010, 2020))
                        break;
                    $invalid = true;
                    break;
                case 'eyr':
                    if (isNumberValid($checkValue, 2020, 2030))
                        break;
                    $invalid = true;
                    break;
                case 'hgt':
                    if (substr($checkValue, -2) == 'in') {
                        $height = substr($checkValue, 0, -2);
                        if (isNumberValid($height, 59, 76))
                            break;
                    } else if (substr($checkValue, -2) == 'cm') {
                        $height = substr($checkValue, 0, -2);
                        if (isNumberValid($height, 150, 193))
                            break;
                    }
                    $invalid = true;
                    break;
                case 'hcl':
                    if (preg_match('/^[#][a-f0-9]{6}$/', $checkValue))
                        break;
                    $invalid = true;
                    break;
                case 'ecl':
                    if (isEyesColorValid($checkValue))
                        break;
                    $invalid = true;
                    break;
                case 'pid':
                    if (preg_match('/^[0-9]{9}$/', $checkValue))
                        break;
                    $invalid = true;
                    break;
                case 'cid':
                    break;
            }
        }
    }
    return $invalid === false;
}

function isNumberValid($value, $min, $max)
{
    return $value >= $min && $value <= $max;
}

function isEyesColorValid($value)
{
    $eyesColor = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

    foreach ($eyesColor as $i) {
        if ($i == $value)
            return true;
    }
    return false;
}

echo 'Part 1. answer:' . $answer1;
echo '<br>';
echo 'Part 2. answer:' . $answer2;
