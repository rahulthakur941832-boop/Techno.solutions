import { MCPClient } from './mcp-client.js';

function getElementId(el) {
  return el.id || el.element_id;
}

async function main() {
  const client = new MCPClient();
  try {
    await client.connect();
    const postId = 8;
    console.log(`Fetching page structure for Homepage (ID: ${postId})...`);
    const page = await client.callTool('elementor-mcp-get-page-structure', { post_id: postId });
    
    const elements = page.elements || (page.structuredContent && page.structuredContent.elements) || [];
    console.log(`Found ${elements.length} top-level elements on the Homepage.`);

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const elId = getElementId(el);
      if (!elId) continue;

      console.log(`\nUpdating Top-Level Container #${i} (ID: ${elId}, Type: ${el.elType || 'container'})...`);
      
      const updateRes = await client.callTool('elementor-mcp-update-element', {
        post_id: postId,
        element_id: elId,
        settings: {
          content_width: 'full',
          boxed_width: { size: 100, unit: '%' },
          gap: { size: 0, unit: 'px' },
          padding: { top: '0', right: '0', bottom: '0', left: '0', unit: 'px', isLinked: true },
          margin: { top: '0', right: '0', bottom: '0', left: '0', unit: 'px', isLinked: true }
        }
      });
      console.log(`Update Result:`, JSON.stringify(updateRes, null, 2));
    }
    
    console.log('\nAll top-level homepage containers updated to 100% full-screen width with zero margins/padding!');
  } catch (err) {
    console.error('Error:', err.stack || err.message);
  } finally {
    client.close();
  }
}

main();
