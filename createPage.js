const fs = require('fs');
const FIVE = 5;

const generateAttributes = (name, value) => {
  return name + '=' + '"' + value + '"';
};

const generateMessage = (gameData) => {
  const message = gameData.wordGuessed ? 'Genius' : gameData.actualWord;
  return generateTag('div', message, 'class', 'message');
};

const generateTag = (tag, data, attributeName, value) => {
  const attribute = generateAttributes(attributeName, value);
  const tagWithAttribute = '<' + tag + ' ' + attribute + '>';
  const tagWithoutAttribute = '<' + tag + '>';
  const openingTag = attributeName ? tagWithAttribute : tagWithoutAttribute;
  return openingTag + data + '</' + tag + '>';
};

const generateRow = (guess) => {
  const row = guess.map((guessResult) =>
    generateTag('span', guessResult.character, 'class', guessResult.position)
  );
  return row.join('');
};

const filledRows = (guesses) => {
  const rows = guesses.map((guess) =>
    generateTag('div', generateRow(guess), 'class', 'row')
  );
  return rows.join('');
};

const emptyRow = () => generateTag('span', '').repeat(FIVE);

const emptyRows = (count) => {
  return generateTag('div', emptyRow(), 'class', 'row').repeat(count);
};

const readGameData = () => fs.readFileSync('./gameData.json', 'utf8');

const generateRows = (gameData) => {
  let rows = filledRows(gameData.guesses);
  rows += emptyRows(gameData.guessRemaining);
  return generateTag('div', rows, 'class', 'rows');
};

const generateHeader = () => {
  const heading = generateTag('h1', 'WORDLE', 'class', 'title');
  return generateTag('header', heading);
};

const generateBody = (gameData) => {
  let content = generateHeader();
  content += generateRows(gameData);
  if (gameData.gameOver) {
    content += generateMessage(gameData);
  }
  return generateTag('body', content);
};

const generateHead = () => {
  const title = generateTag('title', 'Wordle');
  const relation = generateAttributes('rel', 'stylesheet');
  const reference = generateAttributes('href', 'styles.css');
  const link = '<link ' + relation + reference + '>';
  return generateTag('head', title + link);
};

const generatePage = (gameData) => {
  const head = generateHead();
  const body = generateBody(gameData);
  return generateTag('html', head + body);
};

const writeFile = (string) => fs.writeFileSync('./index.html', string, 'utf-8');

const main = () => {
  const gameData = JSON.parse(readGameData());
  const html = generatePage(gameData);
  writeFile(html);
};

main();
