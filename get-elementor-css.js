import fs from 'fs';

try {
  const html = fs.readFileSync('rendered-services.html', 'utf8');
  
  // Find all <style> tags and parse rules inside them
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let match;
  let blockIndex = 0;
  
  while ((match = styleRegex.exec(html)) !== null) {
    blockIndex++;
    const styleContent = match[1];
    
    // Split into individual CSS blocks using simple regex
    // e.g. .selector { ... }
    const ruleRegex = /([^{]+)\{([^}]+)\}/g;
    let ruleMatch;
    
    while ((ruleMatch = ruleRegex.exec(styleContent)) !== null) {
      const selector = ruleMatch[1].trim();
      const body = ruleMatch[2].trim();
      
      if (
        selector.includes('0b79c57') || 
        selector.includes('e-con') || 
        selector.includes('elementor-17') ||
        (selector.startsWith('.') && (selector.includes('e-parent') || selector.includes('container')))
      ) {
        console.log(`Block #${blockIndex} | Selector: ${selector}`);
        console.log(`  Body: ${body}`);
      }
    }
  }
} catch (err) {
  console.error(err);
}
