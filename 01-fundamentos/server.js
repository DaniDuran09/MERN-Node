const fs = require('fs');

const file = fs.readFileSync('readme.md', 'utf8');

const words= file.split(' ');

//const wordCount = words.filter(word => word.toLowerCase() === 'react').length;

const wordCount = file.match(/react/gi).length;

console.log(wordCount);