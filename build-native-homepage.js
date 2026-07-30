import { MCPClient } from './mcp-client.js';

const SERVICES = [
  {
    id: "digital-transformation",
    title: "Digital Transformation Solutions",
    description: "Modernize your organization with digital-first strategies, cloud adoption, and AI integration plans.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    badge: "Strategy & Advisory",
    slug: "digital-transformation-solutions"
  },
  {
    id: "business-automation",
    title: "Business Automation Solutions",
    description: "Automate repetitive manual processes across departments to increase productivity and reduce costs.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    badge: "Automation Core",
    slug: "business-automation-solutions"
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence Solutions",
    description: "Unlock the power of neural engines, Generative AI models, and custom Agentic systems.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    badge: "Cognitive AI",
    slug: "artificial-intelligence-solutions"
  },
  {
    id: "blockchain-crypto",
    title: "Blockchain & Crypto Solutions",
    description: "Secure, transparent, decentralized ledger integrations, Web3 portals, and audited smart contracts.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    badge: "Distributed Web3",
    slug: "blockchain-crypto-solutions"
  },
  {
    id: "smart-home",
    title: "Smart Home Installation Services",
    description: "Transform your residential or commercial space into a secure, responsive, intelligent living environment.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    badge: "Intelligent IoT",
    slug: "smart-home-installation-services"
  },
  {
    id: "solar-energy",
    title: "Solar Panel Installation Services",
    description: "Reduce overhead utility expenses and transition to modern carbon-negative operations.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    badge: "Clean Tech",
    slug: "solar-panel-installation-services"
  }
];

const PROCESS_STEPS = [
  { step: "01", name: "Consultation" },
  { step: "02", name: "Analysis" },
  { step: "03", name: "Design" },
  { step: "04", name: "Implementation" },
  { step: "05", name: "Training" },
  { step: "06", name: "Optimization" }
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getElementId(res) {
  if (!res) return null;
  if (res.id) return res.id;
  if (res.structuredContent && res.structuredContent.element_id) return res.structuredContent.element_id;
  if (res.structuredContent && res.structuredContent.id) return res.structuredContent.id;
  if (res.content && res.content[0] && res.content[0].text) {
    try {
      const parsed = JSON.parse(res.content[0].text);
      return parsed.element_id || parsed.id;
    } catch (e) {}
  }
  return null;
}

async function addHeader(client, postId) {
  console.log(`Adding native header to page ID ${postId}...`);
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
  
  const headerId = getElementId(headerContainer);
  if (!headerId) throw new Error(`Could not get header container ID for page ${postId}`);
  await sleep(1000);
  
  // Add Logo Heading
  await client.callTool('elementor-mcp-add-heading', {
    post_id: postId,
    parent_id: headerId,
    position: 0,
    title: 'TECHNO-SOLUTIONS',
    link: { url: '/' },
    title_color: '#0f2d63',
    typography_typography: 'custom',
    typography_font_family: 'Inter',
    typography_font_size: { size: 18, unit: 'px' },
    typography_font_weight: '800'
  });
  await sleep(1000);

  // Add Inline Icon List for Navigation
  await client.callTool('elementor-mcp-add-icon-list', {
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
  await sleep(1000);

  // Add CTA Consultation Button
  await client.callTool('elementor-mcp-add-button', {
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
  await sleep(1000);
}

async function addFooter(client, postId) {
  console.log(`Adding native footer to page ID ${postId}...`);
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
  
  const footerId = getElementId(footerContainer);
  if (!footerId) throw new Error(`Could not get footer container ID for page ${postId}`);
  await sleep(1000);

  // Column 1: Brand Info
  const col1 = await client.callTool('elementor-mcp-add-flexbox', {
    post_id: postId,
    parent_id: footerId,
    position: 0,
    direction: 'column'
  });
  const col1Id = getElementId(col1);
  await sleep(800);

  await client.callTool('elementor-mcp-add-heading', {
    post_id: postId,
    parent_id: col1Id,
    position: 0,
    title: 'TECHNO-SOLUTIONS',
    title_color: '#ffffff',
    typography_typography: 'custom',
    typography_font_family: 'Inter',
    typography_font_size: { size: 16, unit: 'px' },
    typography_font_weight: '800'
  });
  await sleep(800);

  await client.callTool('elementor-mcp-add-text-editor', {
    post_id: postId,
    parent_id: col1Id,
    position: 1,
    editor: '<p style="color: #a5b1c2; font-size: 13px; line-height: 1.6; max-width: 250px; margin-top: 10px;">Accelerating digital transformations, workflow automations, green solar technology installations, and smart infrastructure grids natively.</p>'
  });
  await sleep(1000);

  // Column 2: Solutions Links
  const col2 = await client.callTool('elementor-mcp-add-flexbox', {
    post_id: postId,
    parent_id: footerId,
    position: 1,
    direction: 'column'
  });
  const col2Id = getElementId(col2);
  await sleep(800);

  await client.callTool('elementor-mcp-add-heading', {
    post_id: postId,
    parent_id: col2Id,
    position: 0,
    title: 'SOLUTIONS',
    title_color: '#e5af2b',
    typography_typography: 'custom',
    typography_font_family: 'Inter',
    typography_font_size: { size: 12, unit: 'px' },
    typography_font_weight: '700'
  });
  await sleep(800);

  await client.callTool('elementor-mcp-add-icon-list', {
    post_id: postId,
    parent_id: col2Id,
    position: 1,
    icon_list: [
      { text: 'Digital Transformation', link: { url: '/digital-transformation-solutions/' } },
      { text: 'Business Automation', link: { url: '/business-automation-solutions/' } },
      { text: 'Artificial Intelligence', link: { url: '/artificial-intelligence-solutions/' } },
      { text: 'Solar Energy', link: { url: '/solar-panel-installation-services/' } }
    ]
  });
  await sleep(1000);

  // Column 3: Contact Info
  const col3 = await client.callTool('elementor-mcp-add-flexbox', {
    post_id: postId,
    parent_id: footerId,
    position: 2,
    direction: 'column'
  });
  const col3Id = getElementId(col3);
  await sleep(800);

  await client.callTool('elementor-mcp-add-heading', {
    post_id: postId,
    parent_id: col3Id,
    position: 0,
    title: 'OFFICE CONTACTS',
    title_color: '#e5af2b',
    typography_typography: 'custom',
    typography_font_family: 'Inter',
    typography_font_size: { size: 12, unit: 'px' },
    typography_font_weight: '700'
  });
  await sleep(800);

  await client.callTool('elementor-mcp-add-icon-list', {
    post_id: postId,
    parent_id: col3Id,
    position: 1,
    icon_list: [
      { text: '📍 Delhi Office: 218 AGCR Enclave, Near Karkardoma Metro Station, Delhi 110092' },
      { text: '📞 Phone: +91 9811841782' },
      { text: '✉️ Email: info2sanjeev@gmail.com' }
    ]
  });
  await sleep(1000);
}

async function main() {
  const client = new MCPClient();
  try {
    await client.connect();
    const postId = 8;

    console.log(`\n==============================================`);
    console.log(`REBUILDING NATIVE HOMEPAGE (ID: ${postId})...`);
    console.log(`==============================================`);

    console.log('Clearing existing homepage content...');
    await client.callTool('elementor-mcp-delete-page-content', { post_id: postId });
    await sleep(2000);

    // Force canvas template
    await client.callTool('elementor-mcp-update-page-settings', {
      post_id: postId,
      settings: {
        template: 'elementor_canvas',
        page_template: 'elementor_canvas'
      }
    });
    await sleep(2000);

    // 1. Add Header
    await addHeader(client, postId);

    // 2. Add Hero Section (2 Columns: Left content, Right animated image)
    console.log('Adding Hero Section...');
    const heroSec = await client.callTool('elementor-mcp-add-flexbox', {
      post_id: postId,
      parent_id: '',
      position: 1,
      direction: 'row',
      justify: 'space-between',
      align: 'center',
      padding: 80,
      background_color: '#06183B'
    });
    const heroId = getElementId(heroSec);
    await sleep(1000);

    // Left Column
    console.log('Adding Hero Left Column...');
    const heroLeft = await client.callTool('elementor-mcp-add-flexbox', {
      post_id: postId,
      parent_id: heroId,
      position: 0,
      direction: 'column',
      padding: 20
    });
    const heroLeftId = getElementId(heroLeft);
    await sleep(1000);

    // Badge (using HTML widget)
    console.log('Adding Hero Left Badge...');
    await client.callTool('elementor-mcp-add-html', {
      post_id: postId,
      parent_id: heroLeftId,
      position: 0,
      html: `
        <div style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 9999px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.15); font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 600; color: #E5AF2B; text-transform: uppercase; letter-spacing: 0.1em; width: fit-content; margin-bottom: 20px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E5AF2B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5Z"/><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z"/></svg>
          <span>TRANSFORM YOUR BUSINESS</span>
        </div>
      `
    });
    await sleep(800);

    // Primary Heading
    console.log('Adding Hero Primary Heading...');
    await client.callTool('elementor-mcp-add-heading', {
      post_id: postId,
      parent_id: heroLeftId,
      position: 1,
      title: 'Digital Transformation Consulting and Training',
      title_color: '#ffffff',
      typography_typography: 'custom',
      typography_font_family: 'Playfair Display',
      typography_font_size: { size: 48, unit: 'px' },
      typography_font_weight: '800',
      typography_line_height: { size: 1.15, unit: 'em' }
    });
    await sleep(800);

    // Gold Subheading
    console.log('Adding Hero Subheading...');
    await client.callTool('elementor-mcp-add-heading', {
      post_id: postId,
      parent_id: heroLeftId,
      position: 2,
      title: 'Transform Your Business with Intelligent Digital Solutions',
      title_color: '#E5AF2B',
      typography_typography: 'custom',
      typography_font_family: 'Inter',
      typography_font_size: { size: 20, unit: 'px' },
      typography_font_weight: '600'
    });
    await sleep(800);

    // Main Text Editor
    console.log('Adding Hero Paragraph...');
    await client.callTool('elementor-mcp-add-text-editor', {
      post_id: postId,
      parent_id: heroLeftId,
      position: 3,
      editor: '<p style="color: rgba(255, 255, 255, 0.85); font-size: 15px; line-height: 1.7; margin-top: 15px; font-family: Inter, sans-serif;">At Techno-Solutions, we help businesses modernize, automate, and grow using cutting-edge technologies. Whether you are a startup, SME, enterprise, educational institution, or government organization, we deliver innovative solutions that improve efficiency, reduce costs, and accelerate digital transformation.</p>'
    });
    await sleep(800);

    // Mono Solution List
    console.log('Adding Hero Solution List...');
    await client.callTool('elementor-mcp-add-text-editor', {
      post_id: postId,
      parent_id: heroLeftId,
      position: 4,
      editor: '<div style="border-left: 2px solid rgba(229, 175, 43, 0.4); padding-left: 16px; margin: 20px 0; font-family: \'JetBrains Mono\', monospace; font-size: 12px; color: rgba(255, 255, 255, 0.6); line-height: 1.8; letter-spacing: -0.01em;">Digital Transformation | Business Automation | Artificial Intelligence<br>Blockchain & Crypto | Smart Home Installation | Solar Panel Installation</div>'
    });
    await sleep(800);

    // Custom Buttons (Inline)
    console.log('Adding Hero Buttons...');
    await client.callTool('elementor-mcp-add-html', {
      post_id: postId,
      parent_id: heroLeftId,
      position: 5,
      html: `
        <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-top: 10px; margin-bottom: 20px;">
          <a href="/contact/" style="display: inline-flex; align-items: center; gap: 8px; background: #E5AF2B; color: #06183B; font-weight: 700; font-family: 'Inter', sans-serif; font-size: 14px; padding: 14px 28px; border-radius: 12px; text-decoration: none; transition: all 0.3s ease;" onmouseover="this.style.background='#f3c043'; this.style.transform='translateY(-2px)';" onmouseout="this.style.background='#E5AF2B'; this.style.transform='translateY(0)';" onmousedown="this.style.transform='scale(0.97)';">
            Book a Free Consultation
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.3s ease;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
          <a href="/services/" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.05); color: #FFFFFF; border: 1px solid rgba(255, 255, 255, 0.15); font-weight: 600; font-family: 'Inter', sans-serif; font-size: 14px; padding: 14px 28px; border-radius: 12px; text-decoration: none; transition: all 0.3s ease;" onmouseover="this.style.background='rgba(255, 255, 255, 0.1)'; this.style.borderColor='rgba(255, 255, 255, 0.3)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.background='rgba(255, 255, 255, 0.05)'; this.style.borderColor='rgba(255, 255, 255, 0.15)'; this.style.transform='translateY(0)';" onmousedown="this.style.transform='scale(0.97)';">
            Explore Our Services
          </a>
        </div>
      `
    });
    await sleep(800);

    // Trusted Brands
    console.log('Adding Hero Trusted Brands...');
    await client.callTool('elementor-mcp-add-html', {
      post_id: postId,
      parent_id: heroLeftId,
      position: 6,
      html: `
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px; display: flex; flex-direction: column; sm:flex-direction: row; align-items: flex-start; sm:align-items: center; gap: 16px; margin-top: 10px;">
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; color: rgba(255, 255, 255, 0.4); letter-spacing: 0.1em; text-transform: uppercase;">TRUSTED BY LEADING BRANDS:</span>
          <div style="display: flex; flex-wrap: wrap; gap: 24px; font-family: 'Playfair Display', serif; font-weight: 700; font-size: 12px; color: rgba(255, 255, 255, 0.35);">
            <span style="transition: color 0.3s ease;" onmouseover="this.style.color='#ffffff';" onmouseout="this.style.color='rgba(255, 255, 255, 0.35)';">VORTEX CORP</span>
            <span style="transition: color 0.3s ease;" onmouseover="this.style.color='#ffffff';" onmouseout="this.style.color='rgba(255, 255, 255, 0.35)';">APEX LOGICS</span>
            <span style="transition: color 0.3s ease;" onmouseover="this.style.color='#ffffff';" onmouseout="this.style.color='rgba(255, 255, 255, 0.35)';">INNOVA SMART</span>
          </div>
        </div>
      `
    });
    await sleep(800);

    // Right Column
    console.log('Adding Hero Right Column...');
    const heroRight = await client.callTool('elementor-mcp-add-flexbox', {
      post_id: postId,
      parent_id: heroId,
      position: 1,
      direction: 'column',
      padding: 20
    });
    const heroRightId = getElementId(heroRight);
    await sleep(1000);

    // Animated Mockup Image Box
    console.log('Adding Animated Earth Image to Right Column...');
    await client.callTool('elementor-mcp-add-html', {
      post_id: postId,
      parent_id: heroRightId,
      position: 0,
      html: `
        <style>
        @keyframes float-hero {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(0.5deg); }
        }
        @keyframes float-badge-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(8px) translateX(-4px); }
        }
        @keyframes float-badge-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(6px); }
        }
        @keyframes float-badge-3 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(6px) translateX(5px); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .hero-image-wrapper {
          position: relative;
          width: 100%;
          max-width: 460px;
          aspect-ratio: 1;
          margin: 0 auto;
        }
        .hero-glow-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 256px;
          height: 256px;
          background: radial-gradient(circle, rgba(229,175,43,0.15) 0%, rgba(15,45,99,0.15) 100%);
          border-radius: 50%;
          filter: blur(48px);
          pointer-events: none;
          z-index: 1;
        }
        .hero-glass-card {
          position: absolute;
          inset: 8px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 14px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: float-hero 6s ease-in-out infinite;
          z-index: 2;
          box-sizing: border-box;
          width: calc(100% - 16px);
          height: calc(100% - 16px);
        }
        .hero-inner-media {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: inset 0 0 20px rgba(0,0,0,0.4);
        }
        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
        }
        .hero-image-wrapper:hover .hero-image {
          transform: scale(1.05);
        }
        .hero-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(6, 24, 59, 0.8) 0%, transparent 100%);
          pointer-events: none;
        }
        .hero-status-hud {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 12px;
          padding: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .hero-hud-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .hero-hud-icon-box {
          padding: 6px;
          border-radius: 8px;
          background: rgba(229, 175, 43, 0.2);
          color: #E5AF2B;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-hud-meta {
          text-align: left;
        }
        .hero-hud-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 8px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .hero-hud-value {
          font-family: 'Playfair Display', serif;
          font-size: 11px;
          font-weight: 700;
          color: #ffffff;
          margin: 2px 0 0 0;
        }
        .hero-hud-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          font-weight: 600;
          color: #E5AF2B;
          background: rgba(229, 175, 43, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
          border: 1px solid rgba(229, 175, 43, 0.2);
        }
        .hero-floating-badge {
          position: absolute;
          padding: 10px 14px;
          border-radius: 12px;
          background: rgba(10, 34, 78, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 10px 25px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          gap: 10px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          pointer-events: none;
          z-index: 3;
          box-sizing: border-box;
        }
        .hero-fb-icon-box {
          padding: 6px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-fb-meta {
          text-align: left;
        }
        .hero-fb-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 8px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }
        .hero-fb-value {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #ffffff;
          margin: 2px 0 0 0;
        }
        .fb-automate {
          top: -16px;
          left: 24px;
          animation: float-badge-1 4.5s ease-in-out infinite;
        }
        .fb-automate .hero-fb-icon-box {
          background: rgba(229, 175, 43, 0.15);
          color: #E5AF2B;
        }
        .fb-security {
          top: 112px;
          right: -16px;
          animation: float-badge-2 5s ease-in-out infinite 0.5s;
        }
        .fb-security .hero-fb-icon-box {
          background: rgba(16, 185, 129, 0.15);
          color: #10B981;
        }
        .fb-energy {
          bottom: 32px;
          left: -16px;
          animation: float-badge-3 5.5s ease-in-out infinite 1s;
        }
        .fb-energy .hero-fb-icon-box {
          background: rgba(245, 158, 11, 0.15);
          color: #F59E0B;
        }
        .spin-icon {
          animation: spin-slow 10s linear infinite;
        }
        </style>
        <div class="hero-image-wrapper">
          <div class="hero-glow-core"></div>
          
          <div class="hero-glass-card">
            <div class="hero-inner-media">
              <img src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=800&q=80" alt="Digital Solutions Core" class="hero-image" referrerPolicy="no-referrer" />
              <div class="hero-vignette"></div>
              
              <div class="hero-status-hud">
                <div class="hero-hud-left">
                  <div class="hero-hud-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/></svg>
                  </div>
                  <div class="hero-hud-meta">
                    <h4 class="hero-hud-title">SYSTEM METRICS</h4>
                    <p class="hero-hud-value">Techno-Solutions Core</p>
                  </div>
                </div>
                <span class="hero-hud-badge">ACTIVE</span>
              </div>
            </div>
          </div>
          
          <div class="hero-floating-badge fb-automate">
            <div class="hero-fb-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="spin-icon"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <div class="hero-fb-meta">
              <h4 class="hero-fb-title">AUTOMATE</h4>
              <p class="hero-fb-value">Workflows</p>
            </div>
          </div>
          
          <div class="hero-floating-badge fb-security">
            <div class="hero-fb-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 11 2 2 4-4"/></svg>
            </div>
            <div class="hero-fb-meta">
              <h4 class="hero-fb-title">SECURITY</h4>
              <p class="hero-fb-value">Smart Nodes</p>
            </div>
          </div>
          
          <div class="hero-floating-badge fb-energy">
            <div class="hero-fb-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            </div>
            <div class="hero-fb-meta">
              <h4 class="hero-fb-title">ENERGY</h4>
              <p class="hero-fb-value">Solar Grid</p>
            </div>
          </div>
        </div>
      `
    });
    await sleep(1500);

    // 3. Add About Section (2 Columns)
    console.log('Adding About Section...');
    const aboutSec = await client.callTool('elementor-mcp-add-flexbox', {
      post_id: postId,
      parent_id: '',
      position: 2,
      direction: 'row',
      justify: 'space-between',
      align: 'flex-start',
      padding: 60,
      background_color: '#ffffff'
    });
    const aboutId = getElementId(aboutSec);
    await sleep(1000);

    // Left Column
    const leftCol = await client.callTool('elementor-mcp-add-flexbox', {
      post_id: postId,
      parent_id: aboutId,
      position: 0,
      direction: 'column'
    });
    const leftColId = getElementId(leftCol);
    await sleep(800);

    await client.callTool('elementor-mcp-add-heading', {
      post_id: postId,
      parent_id: leftColId,
      position: 0,
      title: 'CORPORATE ADVISORY',
      title_color: '#e5af2b',
      typography_typography: 'custom',
      typography_font_family: 'Inter',
      typography_font_size: { size: 12, unit: 'px' },
      typography_font_weight: '700'
    });
    await sleep(800);

    await client.callTool('elementor-mcp-add-heading', {
      post_id: postId,
      parent_id: leftColId,
      position: 1,
      title: 'Empowering Enterprises with Intelligence & Performance',
      title_color: '#0f2d63',
      typography_typography: 'custom',
      typography_font_family: 'Playfair Display',
      typography_font_size: { size: 28, unit: 'px' },
      typography_font_weight: '700'
    });
    await sleep(800);

    await client.callTool('elementor-mcp-add-text-editor', {
      post_id: postId,
      parent_id: leftColId,
      position: 2,
      editor: `<p style="color: #5b6470; font-size: 15px; line-height: 1.7; margin-top: 15px;">Techno-Solutions is a leading Digital Transformation company helping organizations embrace the future through intelligent technology solutions.</p>
<p style="color: #5b6470; font-size: 15px; line-height: 1.7; margin-top: 15px;">We combine business consulting, automation, Artificial Intelligence, blockchain technologies, IoT, renewable energy, and smart infrastructure to deliver measurable business outcomes. Our mission is to make enterprises faster, smarter, and more profitable through technology.</p>`
    });
    await sleep(1000);

    // Right Column
    const rightCol = await client.callTool('elementor-mcp-add-flexbox', {
      post_id: postId,
      parent_id: aboutId,
      position: 1,
      direction: 'column'
    });
    const rightColId = getElementId(rightCol);
    await sleep(800);

    await client.callTool('elementor-mcp-add-text-editor', {
      post_id: postId,
      parent_id: rightColId,
      position: 0,
      editor: `<div style='background-color: #F8F9FC; border: 1px solid #ECECEC; padding: 30px; border-radius: 24px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.02);'>
  <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80' style='width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 15px;' />
  <h4 style='font-family: "Playfair Display", serif; font-size: 20px; font-weight: 700; color: #1B1B1B; margin: 0 0 5px 0;'>Sanjeev Goel</h4>
  <p style='color: #E5AF2B; font-weight: 600; font-size: 12px; margin-bottom: 15px;'>FOUNDER & CHIEF CONSULTANT</p>
  <div style='text-align: left; font-size: 13px; color: #5B6470; line-height: 1.8;'>
    <p style='margin: 5px 0;'><strong>📍 Address:</strong> 218 AGCR Enclave, Near Karkardoma Metro Station, Delhi 110092 | India</p>
    <p style='margin: 5px 0;'><strong>📞 Phone:</strong> +91 9811841782</p>
    <p style='margin: 5px 0;'><strong>✉️ Email:</strong> info2sanjeev@gmail.com</p>
  </div>
</div>`
    });
    await sleep(1000);

    // 4. Services Title section
    console.log('Adding Services Title Section...');
    const servicesTitleSec = await client.callTool('elementor-mcp-add-flexbox', {
      post_id: postId,
      parent_id: '',
      position: 3,
      direction: 'column',
      justify: 'center',
      align: 'center',
      padding: 60,
      background_color: '#f8f9fc'
    });
    const servicesTitleId = getElementId(servicesTitleSec);
    await sleep(1000);

    await client.callTool('elementor-mcp-add-heading', {
      post_id: postId,
      parent_id: servicesTitleId,
      position: 0,
      title: 'CORE CAPABILITIES',
      title_color: '#e5af2b',
      align: 'center',
      typography_typography: 'custom',
      typography_font_family: 'Inter',
      typography_font_size: { size: 12, unit: 'px' },
      typography_font_weight: '700'
    });
    await sleep(800);

    await client.callTool('elementor-mcp-add-heading', {
      post_id: postId,
      parent_id: servicesTitleId,
      position: 1,
      title: 'Our Professional Technology Solutions',
      title_color: '#0f2d63',
      align: 'center',
      typography_typography: 'custom',
      typography_font_family: 'Playfair Display',
      typography_font_size: { size: 36, unit: 'px' },
      typography_font_weight: '700'
    });
    await sleep(1000);

    // 5. Services Grid Section
    console.log('Adding Services Grid Section...');
    const servicesGridSec = await client.callTool('elementor-mcp-add-flexbox', {
      post_id: postId,
      parent_id: '',
      position: 4,
      direction: 'row',
      justify: 'space-between',
      align: 'stretch',
      padding: 60,
      background_color: '#f8f9fc'
    });
    const servicesGridId = getElementId(servicesGridSec);
    await sleep(1000);

    for (let i = 0; i < SERVICES.length; i++) {
      const s = SERVICES[i];
      const cardBox = await client.callTool('elementor-mcp-add-flexbox', {
        post_id: postId,
        parent_id: servicesGridId,
        position: i,
        direction: 'column',
        padding: 25,
        background_color: '#ffffff'
      });
      const cardBoxId = getElementId(cardBox);
      await sleep(800);

      await client.callTool('elementor-mcp-add-image', {
        post_id: postId,
        parent_id: cardBoxId,
        position: 0,
        image: { url: s.image }
      });
      await sleep(800);

      await client.callTool('elementor-mcp-add-heading', {
        post_id: postId,
        parent_id: cardBoxId,
        position: 1,
        title: s.title,
        title_color: '#0f2d63',
        typography_typography: 'custom',
        typography_font_family: 'Playfair Display',
        typography_font_size: { size: 18, unit: 'px' },
        typography_font_weight: '700'
      });
      await sleep(800);

      await client.callTool('elementor-mcp-add-text-editor', {
        post_id: postId,
        parent_id: cardBoxId,
        position: 2,
        editor: `<p style="font-size:13px; color:#5b6470; margin-top:10px; margin-bottom:15px; line-height:1.6;">${s.description}</p>`
      });
      await sleep(800);

      await client.callTool('elementor-mcp-add-button', {
        post_id: postId,
        parent_id: cardBoxId,
        position: 3,
        text: 'Explore Solution',
        link: { url: `/${s.slug}/` },
        background_color: '#0f2d63',
        button_text_color: '#ffffff'
      });
      await sleep(800);
    }

    // 6. Add Process Section
    console.log('Adding Process Section...');
    const processSec = await client.callTool('elementor-mcp-add-flexbox', {
      post_id: postId,
      parent_id: '',
      position: 5,
      direction: 'column',
      justify: 'center',
      align: 'center',
      padding: 60,
      background_color: '#ffffff'
    });
    const processId = getElementId(processSec);
    await sleep(1000);

    await client.callTool('elementor-mcp-add-heading', {
      post_id: postId,
      parent_id: processId,
      position: 0,
      title: 'HOW WE WORK',
      title_color: '#e5af2b',
      align: 'center',
      typography_typography: 'custom',
      typography_font_family: 'Inter',
      typography_font_size: { size: 12, unit: 'px' },
      typography_font_weight: '700'
    });
    await sleep(800);

    await client.callTool('elementor-mcp-add-heading', {
      post_id: postId,
      parent_id: processId,
      position: 1,
      title: 'Strategic Delivery Lifecycle',
      title_color: '#0f2d63',
      align: 'center',
      typography_typography: 'custom',
      typography_font_family: 'Playfair Display',
      typography_font_size: { size: 36, unit: 'px' },
      typography_font_weight: '700'
    });
    await sleep(1000);

    // Process row
    const processRow = await client.callTool('elementor-mcp-add-flexbox', {
      post_id: postId,
      parent_id: processId,
      position: 2,
      direction: 'row',
      justify: 'space-between',
      align: 'stretch',
      padding: 20
    });
    const processRowId = getElementId(processRow);
    await sleep(1000);

    for (let i = 0; i < PROCESS_STEPS.length; i++) {
      const step = PROCESS_STEPS[i];
      const stepBox = await client.callTool('elementor-mcp-add-flexbox', {
        post_id: postId,
        parent_id: processRowId,
        position: i,
        direction: 'column',
        padding: 20,
        background_color: '#f8f9fc'
      });
      const stepBoxId = getElementId(stepBox);
      await sleep(800);

      await client.callTool('elementor-mcp-add-heading', {
        post_id: postId,
        parent_id: stepBoxId,
        position: 0,
        title: step.step,
        title_color: '#e5af2b',
        typography_typography: 'custom',
        typography_font_family: 'Inter',
        typography_font_size: { size: 24, unit: 'px' },
        typography_font_weight: '800'
      });
      await sleep(800);

      await client.callTool('elementor-mcp-add-heading', {
        post_id: postId,
        parent_id: stepBoxId,
        position: 1,
        title: step.name,
        title_color: '#0f2d63',
        typography_typography: 'custom',
        typography_font_family: 'Playfair Display',
        typography_font_size: { size: 16, unit: 'px' },
        typography_font_weight: '700'
      });
      await sleep(800);
    }

    // 7. Add Consultation / Contact Section
    console.log('Adding Contact Section...');
    const contactSec = await client.callTool('elementor-mcp-add-flexbox', {
      post_id: postId,
      parent_id: '',
      position: 6,
      direction: 'row',
      justify: 'space-between',
      align: 'flex-start',
      padding: 60,
      background_color: '#0a224e'
    });
    const contactSecId = getElementId(contactSec);
    await sleep(1000);

    // Left Column
    const cntLeft = await client.callTool('elementor-mcp-add-flexbox', {
      post_id: postId,
      parent_id: contactSecId,
      position: 0,
      direction: 'column'
    });
    const cntLeftId = getElementId(cntLeft);
    await sleep(800);

    await client.callTool('elementor-mcp-add-heading', {
      post_id: postId,
      parent_id: cntLeftId,
      position: 0,
      title: 'GET IN TOUCH',
      title_color: '#e5af2b',
      typography_typography: 'custom',
      typography_font_family: 'Inter',
      typography_font_size: { size: 12, unit: 'px' },
      typography_font_weight: '700'
    });
    await sleep(800);

    await client.callTool('elementor-mcp-add-heading', {
      post_id: postId,
      parent_id: cntLeftId,
      position: 1,
      title: 'Talk to an Advisory Architect Today',
      title_color: '#ffffff',
      typography_typography: 'custom',
      typography_font_family: 'Playfair Display',
      typography_font_size: { size: 32, unit: 'px' },
      typography_font_weight: '700'
    });
    await sleep(800);

    await client.callTool('elementor-mcp-add-text-editor', {
      post_id: postId,
      parent_id: cntLeftId,
      position: 2,
      editor: `<div style='font-size: 15px; color: #a5b1c2; line-height: 1.8; margin-top: 20px;'>
  <p>Whether you need business automation, AI implementation, blockchain consulting, smart home installation, or solar solutions, our experts are ready to help. Reach out to Sanjeev Goel directly using the provided form or contact parameters.</p>
  <p style='margin-top: 20px;'><strong>📍 Delhi Office:</strong> 218 AGCR Enclave, Near Karkardoma Metro Station, Delhi 110092 | India</p>
  <p><strong>📞 Phone:</strong> +91 9811841782</p>
  <p><strong>✉️ Email:</strong> info2sanjeev@gmail.com</p>
</div>`
    });
    await sleep(1000);

    // Right Column Form Card
    const cntRight = await client.callTool('elementor-mcp-add-flexbox', {
      post_id: postId,
      parent_id: contactSecId,
      position: 1,
      direction: 'column'
    });
    const cntRightId = getElementId(cntRight);
    await sleep(800);

    await client.callTool('elementor-mcp-add-text-editor', {
      post_id: postId,
      parent_id: cntRightId,
      position: 0,
      editor: `<div style='background-color: #FFFFFF; padding: 40px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); width: 100%; box-sizing: border-box;'>
  <h3 style='font-family: "Playfair Display", serif; font-size: 22px; font-weight: 700; color: #0F2D63; margin-bottom: 5px;'>Request a Free Consultation</h3>
  <p style='font-size: 12px; color: #5B6470; margin-bottom: 20px;'>Our expert advisors respond directly within 12 business hours.</p>
  <form style='display: flex; flex-direction: column; gap: 15px;'>
    <input type='text' placeholder='Your Name' style='padding: 12px; border: 1px solid #ECECEC; border-radius: 8px; font-size: 14px; width: 100%; box-sizing: border-box;' />
    <input type='email' placeholder='Your Email' style='padding: 12px; border: 1px solid #ECECEC; border-radius: 8px; font-size: 14px; width: 100%; box-sizing: border-box;' />
    <textarea placeholder='Message Details...' rows='4' style='padding: 12px; border: 1px solid #ECECEC; border-radius: 8px; font-size: 14px; resize: none; width: 100%; box-sizing: border-box;'></textarea>
    <button type='button' style='background-color: #0F2D63; color: #FFFFFF; font-weight: 700; padding: 14px; border: none; border-radius: 8px; cursor: pointer; font-size: 14px;'>Submit Inquiry</button>
  </form>
</div>`
    });
    await sleep(1000);

    // 8. Add Footer
    await addFooter(client, postId);

    console.log(`\n==============================================`);
    console.log(`SUCCESS: Rebuilt Homepage Natively!`);
    console.log(`==============================================`);

  } catch (err) {
    console.error('Fatal Error rebuilding native homepage:', err);
  } finally {
    client.close();
  }
}

main();
