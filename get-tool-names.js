import fs from 'fs';

try {
  const content = fs.readFileSync('mcp-tools-list.txt', 'utf8');
  const data = JSON.parse(content);
  const tools = data.result.tools;
  const toolNames = tools.map(t => `${t.name}: ${t.description.split('.')[0]}`);
  console.log('Available tools:');
  console.log(JSON.stringify(toolNames, null, 2));
} catch (err) {
  console.error('Error:', err.message);
}
