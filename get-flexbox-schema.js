import fs from 'fs';

try {
  const content = fs.readFileSync('mcp-tools-list.txt', 'utf8');
  const data = JSON.parse(content);
  const tools = (data.result && data.result.tools) || data.tools || [];
  
  const t = tools.find(x => x.name === 'elementor-mcp-add-flexbox');
  if (t) {
    console.log('=== Schema for elementor-mcp-add-flexbox ===');
    console.log(JSON.stringify(t.inputSchema || {}, null, 2));
  } else {
    console.log('Tool elementor-mcp-add-flexbox not found!');
  }
} catch (err) {
  console.error(err);
}
