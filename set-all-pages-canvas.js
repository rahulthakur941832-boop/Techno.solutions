import { MCPClient } from './mcp-client.js';

const PAGE_IDS = [17, 21, 25, 29, 33, 37, 41, 45, 49, 53, 57, 61, 65, 69];

async function main() {
  const client = new MCPClient();
  try {
    console.log('Connecting to MCP...');
    await client.connect();
    
    for (const post_id of PAGE_IDS) {
      console.log(`Setting template to "Elementor Canvas" for page ID ${post_id}...`);
      try {
        const result = await client.callTool('elementor-mcp-update-page-settings', {
          post_id,
          settings: {
            template: 'elementor_canvas',
            page_template: 'elementor_canvas'
          }
        });
        console.log(`Page ID ${post_id} result:`, JSON.stringify(result, null, 2));
      } catch (err) {
        console.error(`Error updating page ID ${post_id}:`, err.message);
      }
    }
    console.log('Finished updating all sub-pages.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
}

main();
