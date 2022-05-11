const FIVE = 5;

const generateAttributes = (name, value) => {
  return name + '=' + '"' + value + '"';
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

const guessedRows = (guesses) => {
  const rows = guesses.map((guess) =>
    generateTag('div', generateRow(guess), 'class', 'row')
  );
  return rows.join('');
};

const emptyRow = () => generateTag('span', '').repeat(FIVE);

const emptyRows = (count) => {
  return generateTag('div', emptyRow(), 'class', 'row').repeat(count);
};


