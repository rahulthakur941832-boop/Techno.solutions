import { MCPClient } from './mcp-client.js';

async function main() {
  const client = new MCPClient();
  try {
    await client.connect();
    console.log('Creating a test page to inspect URLs...');
    const result = await client.callTool('elementor-mcp-create-page', {
      title: "URL Test Page",
      status: 'draft'
    });
    console.log('Test Page Creation Result:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
}

main();
