import { MCPClient } from './mcp-client.js';

async function main() {
  const client = new MCPClient();
  try {
    await client.connect();
    console.log('Fetching settings for working footer 1b29681...');
    const result1 = await client.callTool('elementor-mcp-get-element-settings', {
      post_id: 8,
      element_id: '1b29681'
    });
    console.log('Footer settings:', JSON.stringify(result1, null, 2));
    
    console.log('\nFetching settings for working header db6d421...');
    const result2 = await client.callTool('elementor-mcp-get-element-settings', {
      post_id: 8,
      element_id: 'db6d421'
    });
    console.log('Header settings:', JSON.stringify(result2, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();
