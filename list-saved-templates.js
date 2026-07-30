import { MCPClient } from './mcp-client.js';

async function main() {
  const client = new MCPClient();
  try {
    await client.connect();
    console.log('Listing saved Elementor templates...');
    const result = await client.callTool('elementor-mcp-list-templates', {});
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    client.close();
  }
}

main();
