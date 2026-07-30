import fs from 'fs';

try {
  const content = fs.readFileSync('mcp-tools-list.txt', 'utf8');
  const data = JSON.parse(content);
  
  const tools = (data.result && data.result.tools) || data.tools || [];
  if (tools.length > 0) {
    console.log(`Found ${tools.length} tools:`);
    tools.forEach(t => {
      console.log(`\nTool: ${t.name}`);
      console.log(`Description: ${t.description}`);
      console.log('Parameters:', Object.keys(t.inputSchema.properties || {}));
    });
  } else {
    console.log('No tools found in mcp-tools-list.txt');
  }
} catch (err) {
  console.error('Error:', err);
}
