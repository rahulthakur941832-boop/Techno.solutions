import { MCPClient } from './mcp-client.js';

async function main() {
  const client = new MCPClient();
  try {
    const result = await client.callTool('elementor-mcp-get-page-structure', { post_id: 8 });
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
}

main();
