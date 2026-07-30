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
    
    // Find anything like max-width: XXXpx or width: XXXpx
    const widthRegex = /([^{]+)\{([^}]+max-width\s*:\s*\d+[^}]+)\}/gi;
    let widthMatch;
    
    while ((widthMatch = widthRegex.exec(styleContent)) !== null) {
      const selector = widthMatch[1].trim();
      const body = widthMatch[2].trim();
      
      // Extract the max-width value
      const maxValMatch = body.match(/max-width\s*:\s*(\d+)(px|%|em|rem|vw)/i);
      if (maxValMatch) {
        const val = parseInt(maxValMatch[1]);
        if (val > 500 && val < 1500) {
          console.log(`Block #${blockIndex} | Selector: ${selector}`);
          console.log(`  Body: ${body}\n`);
        }
      }
    }
  }
} catch (err) {
  console.error(err);
}
