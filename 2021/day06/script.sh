#!/bin/bash

INPUT="$(cat input)"
IFS=','

read -ra ARRAY <<<"$INPUT"

for _ in {1..80}; do
  for j in "${!ARRAY[@]}"; do
    NUM=$((ARRAY[j] - 1))

    if (("$NUM" == -1)); then
      ARRAY+=(8)
      NUM=6
    fi

    ARRAY[j]=$NUM
  done
done

echo "Part 1 answer: ${#ARRAY[@]}"
