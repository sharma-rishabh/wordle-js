const { fs } = require('fs');
const FIVE = 5;

const isWordValid = (guessedWord) => {
  const allWords = fs.readFileSync('/usr/share/dict/words', 'utf8').split('\n');
  const validWords = allWords.filter((word) => word.length === FIVE);
  return validWords.includes(guessedWord);
};
