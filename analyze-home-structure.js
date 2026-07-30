import fs from 'fs';

try {
  let raw = fs.readFileSync('home-structure.json', 'utf8');
  if (raw.startsWith('Result:')) {
    raw = raw.replace(/^Result:\s*/, '');
  }
  const data = JSON.parse(raw);
  
  // Extract content array
  let pageContent = [];
  if (data.result && data.result.content) {
    pageContent = data.result.content;
  } else if (data.content) {
    pageContent = data.content;
  } else {
    // Try parsing string content
    const textStr = (data.result && data.result.content && data.result.content[0] && data.result.content[0].text) || '';
    if (textStr) {
      const parsedText = JSON.parse(textStr);
      pageContent = parsedText.content || [];
    }
  }

  if (!pageContent || pageContent.length === 0) {
    console.log('No elements found or could not parse JSON structure.');
    process.exit(0);
  }

  console.log(`=== HOMEPAGE PAGE STRUCTURE ANALYSIS (Total top-level: ${pageContent.length}) ===\n`);

  function traverse(el, depth = 0) {
    const indent = '  '.repeat(depth);
    const id = el.id || 'N/A';
    const elType = el.elType || 'N/A';
    const widgetType = el.widgetType || 'N/A';
    const title = el.settings && el.settings.title ? ` [Title: "${el.settings.title}"]` : '';
    const nameStr = el.settings && el.settings._title ? ` (${el.settings._title})` : '';
    
    console.log(`${indent}- Type: ${elType} | ID: ${id} | WidgetType: ${widgetType}${title}${nameStr}`);

    if (elType === 'widget' && widgetType === 'html') {
      const htmlCode = (el.settings && el.settings.html) || '';
      console.log(`${indent}  [HTML Widget - Snippet: ${htmlCode.substring(0, 100).replace(/\n/g, ' ')}...]`);
    }

    if (el.elements && Array.isArray(el.elements)) {
      el.elements.forEach(sub => traverse(sub, depth + 1));
    }
  }

  pageContent.forEach((el, idx) => {
    console.log(`[Top-level Element #${idx}]`);
    traverse(el, 1);
    console.log('');
  });

} catch (err) {
  console.error('Error in analysis:', err);
}
