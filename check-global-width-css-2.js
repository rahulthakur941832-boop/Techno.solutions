import fs from 'fs';

try {
  const html = fs.readFileSync('rendered-services.html', 'utf8');
  
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let match;
  let blockIndex = 0;
  
  while ((match = styleRegex.exec(html)) !== null) {
    blockIndex++;
    const styleContent = match[1];
    const ruleRegex = /([^{]+)\{([^}]+)\}/g;
    let ruleMatch;
    
    while ((ruleMatch = ruleRegex.exec(styleContent)) !== null) {
      const selector = ruleMatch[1].trim();
      const body = ruleMatch[2].trim();
      
      const s = selector.toLowerCase();
      if (
        s === 'body' || 
        s === 'html' || 
        s.includes('elementor-17') ||
        s === '.elementor' ||
        s.includes('e-con')
      ) {
        if (body.includes('width') || body.includes('max-width') || body.includes('margin') || body.includes('padding')) {
          console.log(`Block #${blockIndex} | Selector: ${selector}`);
          console.log(`  Body: ${body}\n`);
        }
      }
    }
  }
} catch (err) {
  console.error(err);
}
