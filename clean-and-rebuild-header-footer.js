import { MCPClient } from './mcp-client.js';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const client = new MCPClient();
  try {
    await client.connect();
    const postId = 8;
    
    console.log('=== STEP 1: Setting page template to "elementor_canvas" ===');
    const templateRes = await client.callTool('elementor-mcp-update-page-settings', {
      post_id: postId,
      settings: {
        template: 'elementor_canvas',
        page_template: 'elementor_canvas'
      }
    });
    console.log('Template Update Result:', JSON.stringify(templateRes, null, 2));
    await sleep(2000);

    console.log('=== STEP 2: Cleaning up legacy/duplicate containers ===');
    // IDs identified in our tree analysis:
    const legacyIds = ['a7dd322', '927e017', '71d8821', '3a07362', 'a76c00e', '20c0600'];
    
    for (const id of legacyIds) {
      try {
        console.log(`Removing legacy element ${id}...`);
        const delRes = await client.callTool('elementor-mcp-remove-element', {
          post_id: postId,
          element_id: id
        });
        console.log(`Removed ${id} successfully:`, JSON.stringify(delRes));
      } catch (err) {
        console.warn(`Could not remove ${id} (might already be removed):`, err.message);
      }
      await sleep(1000);
    }

    console.log('\n=== STEP 3: Creating NATIVE Header Container ===');
    // Create a horizontal parent container for the Header at position 0 (the top!)
    const headerContainer = await client.callTool('elementor-mcp-add-flexbox', {
      post_id: postId,
      parent_id: '',
      position: 0,
      tag: 'header',
      direction: 'row',
      justify: 'space-between',
      align: 'center',
      padding: 20,
      background_color: '#ffffff'
    });
    
    console.log('Created native Header Container:', JSON.stringify(headerContainer, null, 2));
    const headerId = headerContainer.id || headerContainer.structuredContent?.element_id || headerContainer.structuredContent?.id || headerContainer.result?.id;
    if (!headerId) {
      throw new Error('Could not retrieve new Header Container ID!');
    }
    await sleep(2000);

    console.log('\n=== STEP 4: Creating Header Widgets inside Header Container ===');
    
    // 1. Logo / Site Name Heading
    console.log('Adding Logo Heading...');
    const logoHeading = await client.callTool('elementor-mcp-add-heading', {
      post_id: postId,
      parent_id: headerId,
      position: 0,
      title: 'TECHNO-SOLUTIONS',
      link: { url: '/' },
      title_color: '#0f2d63',
      typography_typography: 'custom',
      typography_font_family: 'Inter',
      typography_font_size: { size: 18, unit: 'px' },
      typography_font_weight: '800',
      typography_letter_spacing: { size: 0.1, unit: 'em' }
    });
    console.log('Added Logo Heading:', JSON.stringify(logoHeading));
    await sleep(1500);

    // 2. Navigation Link list (Inline Icon List)
    console.log('Adding Navigation Links (inline icon-list)...');
    const navLinks = await client.callTool('elementor-mcp-add-icon-list', {
      post_id: postId,
      parent_id: headerId,
      position: 1,
      view: 'inline',
      icon_list: [
        { text: 'Home', link: { url: '/' } },
        { text: 'About', link: { url: '/about/' } },
        { text: 'Services', link: { url: '/services/' } },
        { text: 'Blog', link: { url: '/blog/' } },
        { text: 'Contact', link: { url: '/contact/' } }
      ]
    });
    console.log('Added Navigation Links:', JSON.stringify(navLinks));
    await sleep(1500);

    // 3. CTA Consultation Button
    console.log('Adding CTA Button...');
    const ctaButton = await client.callTool('elementor-mcp-add-button', {
      post_id: postId,
      parent_id: headerId,
      position: 2,
      text: 'Book Consultation',
      link: { url: '/contact/' },
      background_color: '#0f2d63',
      button_text_color: '#ffffff',
      border_radius: { top: 30, right: 30, bottom: 30, left: 30, unit: 'px', isLinked: true },
      button_padding: { top: 10, right: 20, bottom: 10, left: 20, unit: 'px', isLinked: false }
    });
    console.log('Added CTA Button:', JSON.stringify(ctaButton));
    await sleep(2000);

    console.log('\n=== STEP 5: Creating NATIVE Footer Container ===');
    // Create a horizontal parent container for the Footer at position -1 (the bottom!)
    const footerContainer = await client.callTool('elementor-mcp-add-flexbox', {
      post_id: postId,
      parent_id: '',
      position: -1,
      tag: 'footer',
      direction: 'row',
      justify: 'space-between',
      align: 'flex-start',
      padding: 50,
      background_color: '#0f2d63'
    });
    
    console.log('Created native Footer Container:', JSON.stringify(footerContainer, null, 2));
    const footerId = footerContainer.id || footerContainer.structuredContent?.element_id || footerContainer.structuredContent?.id || footerContainer.result?.id;
    if (!footerId) {
      throw new Error('Could not retrieve new Footer Container ID!');
    }
    await sleep(2000);

    console.log('\n=== STEP 6: Creating 4 Columns inside Footer ===');
    
    // Column 1: Brand Pitch
    console.log('Creating Footer Col 1 (Brand Info)...');
    const col1 = await client.callTool('elementor-mcp-add-flexbox', {
      post_id: postId,
      parent_id: footerId,
      position: 0,
      direction: 'column',
      padding: 10
    });
    const col1Id = col1.id || col1.structuredContent?.element_id || col1.structuredContent?.id;
    await sleep(1000);
    
    await client.callTool('elementor-mcp-add-heading', {
      post_id: postId,
      parent_id: col1Id,
      position: 0,
      title: 'TECHNO-SOLUTIONS',
      title_color: '#e5af2b',
      typography_typography: 'custom',
      typography_font_family: 'Inter',
      typography_font_size: { size: 16, unit: 'px' },
      typography_font_weight: '800'
    });
    await sleep(1000);

    await client.callTool('elementor-mcp-add-text-editor', {
      post_id: postId,
      parent_id: col1Id,
      position: 1,
      editor: '<p style="color: #ffffff; opacity: 0.8; font-size: 13px; line-height: 1.6; margin-top: 10px;">Empowering organizations with digital-first strategies, process automation, and intelligent AI models.</p>'
    });
    await sleep(1500);

    // Column 2: Solutions Links
    console.log('Creating Footer Col 2 (Solutions)...');
    const col2 = await client.callTool('elementor-mcp-add-flexbox', {
      post_id: postId,
      parent_id: footerId,
      position: 1,
      direction: 'column',
      padding: 10
    });
    const col2Id = col2.id || col2.structuredContent?.element_id || col2.structuredContent?.id;
    await sleep(1000);

    await client.callTool('elementor-mcp-add-heading', {
      post_id: postId,
      parent_id: col2Id,
      position: 0,
      title: 'SOLUTIONS',
      title_color: '#ffffff',
      typography_typography: 'custom',
      typography_font_family: 'Inter',
      typography_font_size: { size: 13, unit: 'px' },
      typography_font_weight: '700'
    });
    await sleep(1000);

    await client.callTool('elementor-mcp-add-icon-list', {
      post_id: postId,
      parent_id: col2Id,
      position: 1,
      view: 'traditional',
      icon_list: [
        { text: 'Digital Transformation', link: { url: '/digital-transformation/' } },
        { text: 'Business Automation', link: { url: '/business-automation/' } },
        { text: 'Artificial Intelligence', link: { url: '/artificial-intelligence/' } }
      ]
    });
    await sleep(1500);

    // Column 3: Quick Links
    console.log('Creating Footer Col 3 (Quick Links)...');
    const col3 = await client.callTool('elementor-mcp-add-flexbox', {
      post_id: postId,
      parent_id: footerId,
      position: 2,
      direction: 'column',
      padding: 10
    });
    const col3Id = col3.id || col3.structuredContent?.element_id || col3.structuredContent?.id;
    await sleep(1000);

    await client.callTool('elementor-mcp-add-heading', {
      post_id: postId,
      parent_id: col3Id,
      position: 0,
      title: 'QUICK LINKS',
      title_color: '#ffffff',
      typography_typography: 'custom',
      typography_font_family: 'Inter',
      typography_font_size: { size: 13, unit: 'px' },
      typography_font_weight: '700'
    });
    await sleep(1000);

    await client.callTool('elementor-mcp-add-icon-list', {
      post_id: postId,
      parent_id: col3Id,
      position: 1,
      view: 'traditional',
      icon_list: [
        { text: 'About Us', link: { url: '/about/' } },
        { text: 'Our Blog', link: { url: '/blog/' } },
        { text: 'Contact Us', link: { url: '/contact/' } }
      ]
    });
    await sleep(1500);

    // Column 4: Contact
    console.log('Creating Footer Col 4 (Contact)...');
    const col4 = await client.callTool('elementor-mcp-add-flexbox', {
      post_id: postId,
      parent_id: footerId,
      position: 3,
      direction: 'column',
      padding: 10
    });
    const col4Id = col4.id || col4.structuredContent?.element_id || col4.structuredContent?.id;
    await sleep(1000);

    await client.callTool('elementor-mcp-add-heading', {
      post_id: postId,
      parent_id: col4Id,
      position: 0,
      title: 'GET IN TOUCH',
      title_color: '#ffffff',
      typography_typography: 'custom',
      typography_font_family: 'Inter',
      typography_font_size: { size: 13, unit: 'px' },
      typography_font_weight: '700'
    });
    await sleep(1000);

    await client.callTool('elementor-mcp-add-icon-list', {
      post_id: postId,
      parent_id: col4Id,
      position: 1,
      view: 'traditional',
      icon_list: [
        { text: '218 AGCR Enclave, Delhi' },
        { text: '+91 9811841782', link: { url: 'tel:+919811841782' } },
        { text: 'info2sanjeev@gmail.com', link: { url: 'mailto:info2sanjeev@gmail.com' } }
      ]
    });
    await sleep(1500);

    console.log('\n=== SUCCESS: All native Elementor structures successfully deployed! ===');
  } catch (err) {
    console.error('Fatal Error during restructuring:', err);
  } finally {
    client.close();
  }
}

main();
