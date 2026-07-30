import { MCPClient } from './mcp-client.js';

async function main() {
  const client = new MCPClient();
  try {
    await client.connect();
    console.log('Testing elementor-mcp-add-flexbox on post 21...');
    const result = await client.callTool('elementor-mcp-add-flexbox', {
      post_id: 21,
      parent_id: '',
      position: 0,
      tag: 'header',
      direction: 'row',
      justify: 'space-between',
      align: 'center',
      padding: 20,
      background_color: '#ffffff'
    });
    console.log('Returned object keys:', Object.keys(result));
    console.log('Returned object:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
}

main();
