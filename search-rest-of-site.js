import fs from 'fs';

try {
  const content = fs.readFileSync('build-rest-of-site.js', 'utf8');
  console.log('Searching build-rest-of-site.js:');
  console.log('Has "a7dd322"?', content.includes('a7dd322'));
  console.log('Has "a76c00e"?', content.includes('a76c00e'));
  console.log('Has "headerHTML"?', content.includes('headerHTML'));
  console.log('Has "footerHTML"?', content.includes('footerHTML'));
} catch (err) {
  console.error(err);
}
