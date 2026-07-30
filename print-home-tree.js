import fs from 'fs';

try {
  let raw = fs.readFileSync('home-structure.json', 'utf8');
  if (raw.startsWith('Result:')) {
    raw = raw.replace(/^Result:\s*/, '');
  }
  const data = JSON.parse(raw);
  const structure = data.structuredContent.structure;
  
  if (!structure || !Array.isArray(structure)) {
    console.log('No structure found or structure is not an array.');
    process.exit(0);
  }
  
  console.log(`=== HOMEPAGE PAGE STRUCTURE (Total elements: ${structure.length}) ===\n`);
  
  function traverse(el, depth = 0) {
    const indent = '  '.repeat(depth);
    const id = el.id || 'N/A';
    const elType = el.elType || el.type || 'N/A';
    const widgetType = el.widgetType || 'N/A';
    
    // Check if there are any title or label settings
    const title = el.settings && el.settings.title ? ` [Title: "${el.settings.title}"]` : '';
    const customTitle = el.settings && el.settings._title ? ` (${el.settings._title})` : '';
    
    console.log(`${indent}- [${elType}] ID: ${id} | WidgetType: ${widgetType}${title}${customTitle}`);
    
    if (elType === 'widget' && widgetType === 'html') {
      const htmlCode = (el.settings && el.settings.html) || '';
      console.log(`${indent}  [HTML Widget - Snippet: ${htmlCode.substring(0, 120).replace(/\n/g, ' ')}...]`);
    }
    
    const children = el.elements || el.children;
    if (children && Array.isArray(children)) {
      children.forEach(sub => traverse(sub, depth + 1));
    }
  }
  
  structure.forEach((el, idx) => {
    console.log(`[Top-level Element #${idx}]`);
    traverse(el, 1);
    console.log('');
  });
} catch (err) {
  console.error(err);
}
