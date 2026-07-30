import fs from 'fs';

try {
  const html = fs.readFileSync('rendered-services.html', 'utf8');
  
  // Find all <style> tags and print any rules inside them containing "max-width" or "width"
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let match;
  let styleBlocksCount = 0;
  
  while ((match = styleRegex.exec(html)) !== null) {
    styleBlocksCount++;
    const styleContent = match[1];
    if (styleContent.includes('0b79c57') || styleContent.includes('elementor-17') || styleContent.includes('e-con-full') || styleContent.includes('ast-plain-container')) {
      console.log(`=== Style Block #${styleBlocksCount} matches ===`);
      // Print lines containing matching selectors
      const lines = styleContent.split('\n');
      lines.forEach((line, index) => {
        if (line.includes('0b79c57') || line.includes('elementor-17') || line.includes('e-con') || line.includes('ast-plain-container') || line.includes('max-width')) {
          console.log(`Line ${index + 1}: ${line.trim()}`);
        }
      });
    }
  }
  console.log(`\nInspected ${styleBlocksCount} style blocks.`);
} catch (err) {
  console.error(err);
}
