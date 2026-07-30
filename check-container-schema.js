import { MCPClient } from './mcp-client.js';

async function main() {
  const client = new MCPClient();
  try {
    await client.connect();
    console.log('Fetching container control schema...');
    const schema = await client.callTool('elementor-mcp-get-container-schema', {});
    console.log('Container Schema:', JSON.stringify(schema, null, 2));
  } catch (err) {
    console.error('Error fetching schema:', err.message);
  } finally {
    client.close();
  }
}

main();
