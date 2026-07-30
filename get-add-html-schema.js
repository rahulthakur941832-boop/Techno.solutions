import fs from 'fs';

try {
  const content = fs.readFileSync('mcp-tools-list.txt', 'utf8');
  const data = JSON.parse(content);
  const tools = (data.result && data.result.tools) || data.tools || [];
  const tool = tools.find(t => t.name === 'elementor-mcp-add-html');
  if (tool) {
    console.log('Tool Schema:', JSON.stringify(tool, null, 2));
  } else {
    console.log('Tool not found');
  }
} catch (err) {
  console.error('Error:', err);
}
