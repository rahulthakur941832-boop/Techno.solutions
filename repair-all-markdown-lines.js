import fs from 'fs';

const FILE_PATH = 'build-rest-of-site.js';
const content = fs.readFileSync(FILE_PATH, 'utf8');
const lines = content.split('\n');

const repairedLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();
  
  if (trimmed.startsWith('###') || trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ')) {
    // This is a broken unescaped string literal line! Merge with previous line.
    const prev = repairedLines[repairedLines.length - 1];
    if (prev) {
      // Find the last quote character (double quote, single quote, or backtick)
      // Check if previous line has an unclosed string or ends with quote
      let endingQuote = '';
      if (prev.endsWith('"') || prev.endsWith('",')) {
        endingQuote = '"';
      } else if (prev.endsWith('`') || prev.endsWith('`,')) {
        endingQuote = '`';
      } else if (prev.endsWith("'") || prev.endsWith("',")) {
        endingQuote = "'";
      }
      
      if (endingQuote) {
        const isComma = prev.endsWith(endingQuote + ',');
        const sliceLen = isComma ? 2 : 1;
        const body = prev.slice(0, -sliceLen);
        const suffix = isComma ? endingQuote + ',' : endingQuote;
        
        repairedLines[repairedLines.length - 1] = body + '\\n' + trimmed.replace(new RegExp(endingQuote, 'g'), '\\' + endingQuote) + suffix;
        console.log(`Successfully merged line ${i + 1}: "${trimmed}"`);
        continue;
      }
    }
  }
  
  repairedLines.push(line);
}

fs.writeFileSync(FILE_PATH, repairedLines.join('\n'), 'utf8');
console.log('Complete file markdown repair completed successfully!');
