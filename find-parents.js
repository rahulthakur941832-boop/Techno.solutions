import fs from 'fs';

try {
  const html = fs.readFileSync('rendered-services.html', 'utf8');
  const targetIndex = html.indexOf('data-id="0b79c57"');
  
  if (targetIndex === -1) {
    console.log('Target container 0b79c57 not found!');
  } else {
    console.log('Target container found. Extracting surrounding structure...');
    // Print 1000 characters before the target container to see the parents
    const start = Math.max(0, targetIndex - 1500);
    const context = html.substring(start, targetIndex + 200);
    console.log('=== CONTEXT BEFORE CONTAINER ===');
    console.log(context);
  }
} catch (err) {
  console.error(err);
}
