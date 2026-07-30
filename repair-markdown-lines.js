import fs from 'fs';

const FILE_PATH = 'build-rest-of-site.js';
const content = fs.readFileSync(FILE_PATH, 'utf8');
const lines = content.split('\n');

const repairedLines = [];
let insideBrokenString = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if we are inside the BLOG_POSTS block and find unquoted lines
  if (i >= 130 && i < 200) {
    const trimmed = line.trim();
    if (trimmed.startsWith('###') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      // This is a broken markdown line! Append it to the previous line with \n
      const prev = repairedLines[repairedLines.length - 1];
      // Strip trailing double quote or backtick from previous line to merge
      if (prev.endsWith('"') || prev.endsWith('",')) {
        let suffix = prev.endsWith('",') ? '",' : '"';
        let body = prev.endsWith('",') ? prev.slice(0, -2) : prev.slice(0, -1);
        repairedLines[repairedLines.length - 1] = body + '\\n' + trimmed.replace(/"/g, '\\"') + suffix;
        console.log(`Merged broken line: "${trimmed}"`);
        continue;
      }
    }
  }
  
  repairedLines.push(line);
}

fs.writeFileSync(FILE_PATH, repairedLines.join('\n'), 'utf8');
console.log('Repaired markdown strings in build-rest-of-site.js!');
