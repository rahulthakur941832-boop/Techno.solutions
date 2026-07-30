import { MCPClient } from './mcp-client.js';

async function main() {
  const client = new MCPClient();
  try {
    console.log('Connecting to MCP...');
    await client.connect();
    
    console.log('Fetching homepage structure...');
    const result = await client.callTool('elementor-mcp-get-page-structure', { post_id: 8 });
    const structure = result.structuredContent?.structure || result.structure || [];
    
    const elementsToRemove = [];
    
    function scan(element, topLevelId) {
      if (!element) return false;
      
      if (element.elType === 'widget' && element.widgetType === 'html') {
        const html = element.settings_summary?.html || '';
        if (html.includes('ts-header') || html.includes('ts-footer')) {
          return true;
        }
      }
      
      if (element.elements && Array.isArray(element.elements)) {
        for (const child of element.elements) {
          if (scan(child, topLevelId)) {
            return true;
          }
        }
      }
      
      return false;
    }
    
    for (const item of structure) {
      if (item.elType === 'container' || item.elType === 'section') {
        if (scan(item, item.id)) {
          console.log(`Found header/footer inside top-level element ${item.id} (${item.elType})`);
          elementsToRemove.push({ id: item.id, type: item.elType });
        }
      }
    }
    
    if (elementsToRemove.length === 0) {
      console.log('No duplicate headers or footers found on page.');
    } else {
      console.log(`Removing ${elementsToRemove.length} duplicate element(s)...`);
      for (const item of elementsToRemove) {
        console.log(`Removing element: ${item.id}`);
        await client.callTool('elementor-mcp-remove-element', {
          post_id: 8,
          element_id: item.id
        });
      }
      console.log('Cleanup finished.');
    }
    
  } catch (err) {
    console.error('Error during cleanup:', err);
  } finally {
    client.close();
  }
}

main();
