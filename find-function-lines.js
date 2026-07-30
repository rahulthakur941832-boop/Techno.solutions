import fs from 'fs';

const content = fs.readFileSync('build-rest-of-site.js', 'utf8');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('function compileAboutPageHTML')) {
    console.log(`compileAboutPageHTML starts at line: ${i + 1}`);
  }
  if (lines[i].includes('function compileBlogListPageHTML')) {
    console.log(`compileBlogListPageHTML starts at line: ${i + 1}`);
  }
}
