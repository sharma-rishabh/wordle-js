#!/bin/bash

node gameInitializer.js
gameOver="false"

while [[ "$gameOver" != "true" ]]
do
  read -p "Enter you guess:" guess
  node evaluateGuess.js $guess
  isWordValid=$(cat isLastGuessValid.txt);
  if [[ "$isWordValid" != "true" ]]
  then
    echo -e "$guess is not a valid word."
    continue
  fi
  node createPage.js
  open index.html
  gameOver=$(cat isGameOver.txt)
done
