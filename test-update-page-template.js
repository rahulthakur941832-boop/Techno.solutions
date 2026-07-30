import { MCPClient } from './mcp-client.js';

async function main() {
  const client = new MCPClient();
  try {
    await client.connect();
    console.log('Calling elementor-mcp-update-page-settings for post 8...');
    const result = await client.callTool('elementor-mcp-update-page-settings', {
      post_id: 8,
      settings: {
        template: 'elementor_canvas',
        page_template: 'elementor_canvas'
      }
    });
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    client.close();
  }
}

main();
