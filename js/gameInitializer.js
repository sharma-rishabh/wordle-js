const { log } = console;
const fs = require('fs');
const TWO = 2;
const FIVE = 5;

const setNewData = () => {
  const gameData = {
    'actualWord': '',
    'guesses': [],
    'guessRemaining': 6,
    'gameOver': false,
    'isLastGuessValid': true,
    'wordGuessed': false
  };
  const allWords = fs.readFileSync('/usr/share/dict/words', 'utf8').split('\n');
  const validWords = allWords.filter((word) => word.length === FIVE);
  const word = validWords[Math.floor(Math.random() * validWords.length)];
  gameData.actualWord = word;
  return gameData;
};

const createNewFiles = () => {
  const dataString = JSON.stringify(setNewData(), null, TWO);
  try {
    fs.writeFileSync('./index.html', '', 'utf8');
    fs.writeFileSync('./data/gameData.json', dataString, 'utf8');
    fs.writeFileSync('./data/isGameOver.txt', 'false', 'utf8');
    fs.writeFileSync('./data/isLastGuessValid.txt', 'true', 'utf-8');
  } catch (error) {
    log('Error while writing files.');
  }
};

createNewFiles();
