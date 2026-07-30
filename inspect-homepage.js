import fs from 'fs';

try {
  const fileContent = fs.readFileSync('techno_solutions_elementor_homepage.json', 'utf8');
  const data = JSON.parse(fileContent);
  console.log('Homepage title:', data.title);
  
  // Recursively inspect elements to find headings, text, and icons
  const results = [];
  function inspect(element) {
    if (!element) return;
    
    const info = { id: element.id, elType: element.elType };
    if (element.elType === 'widget') {
      info.widgetType = element.widgetType;
      const settings = element.settings || {};
      if (settings.title) info.title = settings.title;
      if (settings.title_text) info.title_text = settings.title_text;
      if (settings.editor) info.editor = settings.editor.substring(0, 100);
      if (settings.selected_icon) info.icon = settings.selected_icon;
      if (settings.icon) info.icon2 = settings.icon;
      
      results.push(info);
    }
    
    if (element.elements && Array.isArray(element.elements)) {
      element.elements.forEach(inspect);
    }
  }
  
  if (Array.isArray(data.content)) {
    data.content.forEach(inspect);
  }
  
  console.log(`Found ${results.length} widgets.`);
  const widgetSummary = results.map(r => {
    let desc = `[${r.widgetType}]`;
    if (r.title) desc += ` title="${r.title}"`;
    if (r.title_text) desc += ` title_text="${r.title_text}"`;
    if (r.editor) desc += ` text="${r.editor.replace(/\n/g, ' ')}"`;
    if (r.icon) desc += ` icon=${JSON.stringify(r.icon)}`;
    return desc;
  });
  
  fs.writeFileSync('mcp-homepage-widgets.txt', widgetSummary.join('\n'));
  console.log('Saved widgets summary to mcp-homepage-widgets.txt');
} catch (err) {
  console.error('Error:', err);
}
