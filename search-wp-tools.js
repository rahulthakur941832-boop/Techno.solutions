import fs from 'fs';

try {
  const content = fs.readFileSync('mcp-tools-list.txt', 'utf8');
  const data = JSON.parse(content);
  const tools = data.result.tools;
  const filtered = tools.filter(t => t.name.includes('option') || t.name.includes('setting') || t.name.includes('config') || t.name.includes('page'));
  console.log('Filtered tools:');
  console.log(JSON.stringify(filtered.map(t => t.name), null, 2));
} catch (err) {
  console.error('Error:', err.message);
}
