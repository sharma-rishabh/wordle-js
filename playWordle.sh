#!/bin/bash

node js/gameInitializer.js
gameOver="false"

while [[ "$gameOver" != "true" ]]
do
  read -p "Enter you guess:" guess
  node js/evaluateGuess.js $guess
  isWordValid=$(cat data/isLastGuessValid.txt);
  if [[ "$isWordValid" != "true" ]]
  then
    echo -e "$guess is not a valid word."
    continue
  fi
  node js/createPage.js
  open index.html
  gameOver=$(cat data/isGameOver.txt)
done
