const fs = require('fs');
const FIVE = 5;
const ONE = 1;
const TWO = 2;

const isWordValid = (guessedWord, validWords) => {
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
    const character = guessed[index].toUpperCase();
    const position = positionStatus(actual, guessed, index);
    guessResult.push({ character, position });
  }
  return guessResult;
};

const getValidWords = () => {
  const allWords = fs.readFileSync('/usr/share/dict/words', 'utf8').split('\n');
  return allWords.filter((word) => word.length === FIVE);
};

const readGameData = () =>
  JSON.parse(fs.readFileSync('./gameData.json', 'utf8'));

const writeGameData = (gameData) => {
  const gameDataString = JSON.stringify(gameData, null, TWO);
  fs.writeFileSync('./gameData.json', gameDataString, 'utf8');
  const isGameOver = gameData.gameOver.toString();
  const isLastGuessValid = gameData.isLastGuessValid.toString();
  fs.writeFileSync('./isGameOver.txt', isGameOver, 'utf-8');
  fs.writeFileSync('./isLastGuessValid.txt', isLastGuessValid, 'utf8');
};

const updateGameData = (gameData, guess, validWords) => {
  if (!isWordValid(guess, validWords)) {
    gameData.isLastGuessValid = false;
    return -ONE;
  }
  gameData.guessRemaining -= 1;
  gameData.isLastGuessValid = true;
  setGameOverFlag(gameData, guess);
  return gameData.guesses.push(evaluateGuess(gameData.actualWord, guess));
};

const setGameOverFlag = (gameData, guess) => {
  if (guess === gameData.actualWord) {
    gameData.gameOver = true;
    gameData.wordGuessed = true;
    return gameData;
  }
  gameData.gameOver = !gameData.guessRemaining;
  return gameData;
};

const main = ([...args]) => {
  const guess = args.pop();
  const validWords = getValidWords();
  const gameData = readGameData();
  updateGameData(gameData, guess, validWords);
  writeGameData(gameData);
  return gameData;
};

main(process.argv);
