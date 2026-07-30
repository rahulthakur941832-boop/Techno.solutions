import fs from 'fs';

const content = fs.readFileSync('build-rest-of-site.js', 'utf8');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const SERVICES =') || lines[i].includes('const BLOG_POSTS =')) {
    console.log(`Array declaration: "${lines[i]}" at line ${i + 1}`);
  }
}
