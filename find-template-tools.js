import fs from 'fs';

try {
  const content = fs.readFileSync('mcp-tools-list.txt', 'utf8');
  const data = JSON.parse(content);
  const tools = (data.result && data.result.tools) || data.tools || [];
  
  console.log('Searching for tools with "template", "settings", or "post":');
  const matched = tools.filter(t => 
    t.name.includes('template') || 
    t.name.includes('settings') || 
    t.name.includes('post') || 
    t.name.includes('meta') ||
    t.description.toLowerCase().includes('template') ||
    t.description.toLowerCase().includes('layout')
  );
  
  matched.forEach(t => {
    console.log(`- Name: ${t.name}\n  Desc: ${t.description}`);
  });
} catch (err) {
  console.error(err);
}
