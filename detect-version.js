import { MCPClient } from './mcp-client.js';

async function main() {
  const client = new MCPClient();
  try {
    const result = await client.callTool('elementor-mcp-detect-elementor-version', {});
    console.log('Result:', result);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
}

main();
