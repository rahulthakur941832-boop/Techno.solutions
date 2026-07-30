import fs from 'fs';

const content = fs.readFileSync('build-rest-of-site.js', 'utf8');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith('function ')) {
    console.log(`Line ${i + 1}: ${lines[i]}`);
  }
}
