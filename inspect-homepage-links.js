import { MCPClient } from './mcp-client.js';

async function main() {
  const client = new MCPClient();
  try {
    await client.connect();
    const postId = 8;
    console.log(`Fetching structural layout of Homepage (ID: ${postId})...`);
    const page = await client.callTool('elementor-mcp-get-page-structure', { post_id: postId });
    
    console.log('Homepage layout structure successfully loaded!');
    
    // Recursive search for links in the elements
    function findLinks(elements) {
      if (!elements || !Array.isArray(elements)) return;
      elements.forEach(el => {
        if (el.settings) {
          // Check for link properties
          for (const key of Object.keys(el.settings)) {
            const val = el.settings[key];
            if (val && typeof val === 'object' && val.url) {
              console.log(`Element ID: ${el.id} | Type: ${el.elType} | Settings key: "${key}" | URL: "${val.url}"`);
            } else if (typeof val === 'string' && (val.includes('/') || val.includes('http'))) {
              if (key.includes('link') || key.includes('url') || key.includes('href') || key.includes('text') || key.includes('html')) {
                console.log(`Element ID: ${el.id} | Type: ${el.elType} | Settings key: "${key}" | Value snippet: "${val.substring(0, 100)}"`);
              }
            }
          }
        }
        if (el.elements && el.elements.length > 0) {
          findLinks(el.elements);
        }
      });
    }

    findLinks(page.elements || (page.structuredContent && page.structuredContent.elements));
    
  } catch (err) {
    console.error('Error inspect homepage links:', err.stack || err.message);
  } finally {
    client.close();
  }
}

main();
