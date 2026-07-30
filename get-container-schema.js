import { MCPClient } from './mcp-client.js';

async function main() {
  const client = new MCPClient();
  try {
    await client.connect();
    console.log('Fetching container schema...');
    const result = await client.callTool('elementor-mcp-get-container-schema', {});
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
}

main();
