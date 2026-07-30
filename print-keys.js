import fs from 'fs';

try {
  let raw = fs.readFileSync('home-structure.json', 'utf8');
  if (raw.startsWith('Result:')) {
    raw = raw.replace(/^Result:\s*/, '');
  }
  const data = JSON.parse(raw);
  console.log('Top level keys:', Object.keys(data));
  if (data.structuredContent) {
    console.log('data.structuredContent is array?', Array.isArray(data.structuredContent));
    if (Array.isArray(data.structuredContent)) {
      console.log('data.structuredContent length:', data.structuredContent.length);
      console.log('First element:', JSON.stringify(data.structuredContent[0], null, 2));
    } else {
      console.log('data.structuredContent keys:', Object.keys(data.structuredContent));
    }
  }
} catch (err) {
  console.error(err);
}
