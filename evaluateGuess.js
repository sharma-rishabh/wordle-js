const { fs } = require('fs');
const FIVE = 5;

const isWordValid = (guessedWord) => {
  const allWords = fs.readFileSync('/usr/share/dict/words', 'utf8').split('\n');
  const validWords = allWords.filter((word) => word.length === FIVE);
  return validWords.includes(guessedWord);
};

const positionStatus = (actual, guessed, index) => {
  if (actual[index] === guessed[index]) {
    return 'correct';
  }
  return actual.includes(guessed[index]) ? 'present' : 'absent';
};

const evaluateGuess = (actual, guessed) => {
  const guessResult = [];
  for (let index = 0; index < actual.length; index++) {
    const character = guessed[index];
    const position = positionStatus(actual, guessed, index);
    guessResult.push({ character, position });
  }
  return guessResult;
};
