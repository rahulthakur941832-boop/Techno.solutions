import { MCPClient } from './mcp-client.js';
import fs from 'fs';

import { getHeaderHTML, getFooterHTML } from './header_footer.js';

const headerHTML = getHeaderHTML('home', true);
const footerHTML = getFooterHTML();

async function main() {
  const client = new MCPClient();
  try {
    console.log('Connecting to Elementor MCP...');
    await client.connect();

    console.log('Setting page layout template to "Elementor Canvas" to hide default theme headers and sitemaps...');
    await client.callTool('elementor-mcp-update-page-settings', {
      post_id: 8,
      settings: {
        template: 'elementor_canvas',
        page_template: 'elementor_canvas'
      }
    });
    
    console.log('Scanning page structure for existing headers and footers to clean up first...');
    const result = await client.callTool('elementor-mcp-get-page-structure', { post_id: 8 });
    const structure = result.structuredContent?.structure || result.structure || [];
    
    const elementsToRemove = [];
    function scan(element) {
      if (!element) return false;
      if (element.elType === 'widget' && element.widgetType === 'html') {
        const html = element.settings_summary?.html || '';
        if (html.includes('ts-header') || html.includes('ts-footer')) {
          return true;
        }
      }
      if (element.elements && Array.isArray(element.elements)) {
        for (const child of element.elements) {
          if (scan(child)) return true;
        }
      }
      return false;
    }

    for (const item of structure) {
      if (item.elType === 'container' || item.elType === 'section') {
        if (scan(item)) {
          console.log(`Found existing header/footer inside top-level element ${item.id}`);
          elementsToRemove.push(item.id);
        }
      }
    }

    if (elementsToRemove.length > 0) {
      console.log(`Removing ${elementsToRemove.length} existing header/footer elements to prevent duplicates...`);
      for (const id of elementsToRemove) {
        await client.callTool('elementor-mcp-remove-element', {
          post_id: 8,
          element_id: id
        });
      }
    }
    
    console.log('Creating top-level container for Header at position 0...');
    const headerContainer = await client.callTool('elementor-mcp-add-container', {
      post_id: 8,
      position: 0,
      settings: {
        content_width: 'full',
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
        margin: { top: 0, right: 0, bottom: 0, left: 0 }
      }
    });
    console.log('Header Container Created:', headerContainer);
    
    const headerId = headerContainer.structuredContent?.element_id || 
                     (headerContainer.content && JSON.parse(headerContainer.content[0].text).element_id) || 
                     headerContainer.element_id;
    console.log('Extracted Header Container ID:', headerId);
    
    console.log('Adding Header HTML widget inside Header container...');
    const headerResult = await client.callTool('elementor-mcp-add-html', {
      post_id: 8,
      parent_id: headerId,
      position: 0,
      html: headerHTML
    });
    console.log('Header Widget Add Result:', headerResult);
    
    console.log('Creating top-level container for Footer at position -1...');
    const footerContainer = await client.callTool('elementor-mcp-add-container', {
      post_id: 8,
      position: -1,
      settings: {
        content_width: 'full',
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
        margin: { top: 0, right: 0, bottom: 0, left: 0 }
      }
    });
    console.log('Footer Container Created:', footerContainer);
    
    const footerId = footerContainer.structuredContent?.element_id || 
                     (footerContainer.content && JSON.parse(footerContainer.content[0].text).element_id) || 
                     footerContainer.element_id;
    console.log('Extracted Footer Container ID:', footerId);
    
    console.log('Adding Footer HTML widget inside Footer container...');
    const footerResult = await client.callTool('elementor-mcp-add-html', {
      post_id: 8,
      parent_id: footerId,
      position: 0,
      html: footerHTML
    });
    console.log('Footer Widget Add Result:', footerResult);
    
    console.log('Home page elements successfully updated.');
  } catch (err) {
    console.error('Error during execution:', err);
  } finally {
    client.close();
  }
}

main();
