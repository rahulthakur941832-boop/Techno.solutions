import fs from 'fs';

try {
  const content = fs.readFileSync('build-rest-of-site.js', 'utf8');
  
  // Let's search for the functions compileAboutPageHTML, compileContactPageHTML, compileBlogListPageHTML, etc.
  const functions = [
    'compileAboutPageHTML',
    'compileBlogListPageHTML',
    'compileContactPageHTML',
    'compileServicePageHTML',
    'compileBlogDetailPageHTML'
  ];
  
  functions.forEach(fName => {
    console.log(`\n===================================`);
    console.log(`FUNCTION: ${fName}`);
    const regex = new RegExp(`function\\s+${fName}\\s*\\([^{]*\\)\\{([\\s\\S]*?)\\r?\\n\\}`, 'g');
    const match = regex.exec(content);
    if (match) {
      console.log(match[0].substring(0, 1500) + '...\n...[TRUNCATED]');
    } else {
      // Try searching just by name
      const idx = content.indexOf(`function ${fName}`);
      if (idx !== -1) {
        console.log(content.substring(idx, idx + 1000) + '...\n...[TRUNCATED]');
      } else {
        console.log(`Not found: ${fName}`);
      }
    }
  });
} catch (err) {
  console.error(err);
}
