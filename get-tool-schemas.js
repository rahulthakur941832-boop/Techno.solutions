import fs from 'fs';

try {
  const content = fs.readFileSync('mcp-tools-list.txt', 'utf8');
  const data = JSON.parse(content);
  const tools = (data.result && data.result.tools) || data.tools || [];
  
  const targetTools = [
    'elementor-mcp-add-container',
    'elementor-mcp-add-heading',
    'elementor-mcp-add-button',
    'elementor-mcp-add-text-editor',
    'elementor-mcp-add-image',
    'elementor-mcp-add-icon-list'
  ];
  
  targetTools.forEach(name => {
    const t = tools.find(x => x.name === name);
    if (t) {
      console.log(`=== Schema for: ${name} ===`);
      console.log(JSON.stringify(t.inputSchema || {}, null, 2));
      console.log('\n');
    } else {
      console.log(`Tool ${name} not found!`);
    }
  });
} catch (err) {
  console.error(err);
}
