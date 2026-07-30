import { MCPClient } from './mcp-client.js';

async function main() {
  const client = new MCPClient();
  try {
    await client.connect();
    const postId = 8;
    
    console.log('Updating Homepage Header to Full Width...');
    const headerRes = await client.callTool('elementor-mcp-update-element', {
      post_id: postId,
      element_id: 'db6d421',
      settings: {
        content_width: 'full',
        boxed_width: { size: 100, unit: '%' } // make sure it's 100% width
      }
    });
    console.log('Header Update Result:', JSON.stringify(headerRes, null, 2));

    console.log('Updating Homepage Footer to Full Width...');
    const footerRes = await client.callTool('elementor-mcp-update-element', {
      post_id: postId,
      element_id: '1b29681',
      settings: {
        content_width: 'full',
        boxed_width: { size: 100, unit: '%' }
      }
    });
    console.log('Footer Update Result:', JSON.stringify(footerRes, null, 2));
    
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    client.close();
  }
}

main();
