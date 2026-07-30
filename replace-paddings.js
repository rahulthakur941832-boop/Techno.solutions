import fs from 'fs';

let content = fs.readFileSync('build-native-rest-of-site.js', 'utf8');

// Replace padding objects with raw numbers
content = content.replace(/padding:\s*\{\s*top:\s*'80',[^}]+\}/g, 'padding: 80');
content = content.replace(/padding:\s*\{\s*top:\s*'60',[^}]+\}/g, 'padding: 60');
content = content.replace(/padding:\s*\{\s*top:\s*'50',[^}]+\}/g, 'padding: 50');
content = content.replace(/padding:\s*\{\s*top:\s*'20',[^}]+\}/g, 'padding: 20');
content = content.replace(/padding:\s*\{\s*top:\s*'25',[^}]+\}/g, 'padding: 25');

fs.writeFileSync('build-native-rest-of-site.js', content, 'utf8');
console.log('Successfully replaced all container paddings with numbers in build-native-rest-of-site.js!');
