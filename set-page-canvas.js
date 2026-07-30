import { MCPClient } from './mcp-client.js';

async function main() {
  const client = new MCPClient();
  try {
    console.log('Connecting to MCP...');
    await client.connect();
    
    console.log('Updating page settings for post_id: 8 to template: "elementor_canvas"...');
    const result1 = await client.callTool('elementor-mcp-update-page-settings', {
      post_id: 8,
      settings: {
        template: 'elementor_canvas'
      }
    });
    console.log('Result 1 (template: "elementor_canvas"):', JSON.stringify(result1, null, 2));

    // Also let's try other layout/template fields if any
    const result2 = await client.callTool('elementor-mcp-update-page-settings', {
      post_id: 8,
      settings: {
        page_template: 'elementor_canvas'
      }
    });
    console.log('Result 2 (page_template: "elementor_canvas"):', JSON.stringify(result2, null, 2));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
}

main();
