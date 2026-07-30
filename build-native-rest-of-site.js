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

const BLOG_POSTS = [
  {
    id: "b1",
    title: "The Ultimate Guide to Digital Transformation in Delhi NCR",
    slug: "digital-transformation-delhi",
    summary: "How top organizations in Delhi, Noida, and Gurgaon are leveraging digital consulting services to modernize their corporate upskilling and transition seamlessly to cloud operations.",
    category: "Digital Transformation",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "b2",
    title: "How Business Automation Solutions Drive Efficiency for Indian SMEs",
    slug: "business-automation-solutions-smes",
    summary: "Streamlining operations, eliminating manual bottlenecks, and integrating custom ERP/CRM APIs for high-efficiency, zero-bottleneck workflows.",
    category: "Automation",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "b3",
    title: "The Rise of Generative AI: Choosing an AI Solutions Provider in India",
    slug: "ai-solutions-provider-india",
    summary: "Harnessing neural networks, Agentic AI, and Gemini/ChatGPT API custom setups to build real-world productivity gains and secure automation.",
    category: "Artificial Intelligence",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "b4",
    title: "Smart Homes & Solar Energy: Navigating Intelligent, Eco-Friendly Living in Delhi",
    slug: "smart-homes-solar-energy-delhi",
    summary: "Combining smart lighting, biometrics, and high-conversion rooftop solar panel grids for carbon-negative, fully secure residential and commercial spaces.",
    category: "Smart Systems & Solar",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80"
  }
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
  
  console.log('headerContainer raw result:', JSON.stringify(headerContainer, null, 2));
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
    title_color: '#e5af2b',
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
    editor: '<p style="color: #ffffff; opacity: 0.8; font-size: 13px; line-height: 1.6; margin-top: 10px;">Empowering organizations with digital-first strategies, process automation, and intelligent AI models.</p>'
  });
  await sleep(800);

  // Column 2: Solutions
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
    title_color: '#ffffff',
    typography_typography: 'custom',
    typography_font_family: 'Inter',
    typography_font_size: { size: 13, unit: 'px' },
    typography_font_weight: '700'
  });
  await sleep(800);

  await client.callTool('elementor-mcp-add-icon-list', {
    post_id: postId,
    parent_id: col2Id,
    position: 1,
    view: 'traditional',
    icon_list: [
      { text: 'Digital Transformation', link: { url: '/digital-transformation-solutions/' } },
      { text: 'Business Automation', link: { url: '/business-automation-solutions/' } },
      { text: 'Artificial Intelligence', link: { url: '/artificial-intelligence-solutions/' } }
    ]
  });
  await sleep(800);

  // Column 3: Quick Links
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
    title: 'QUICK LINKS',
    title_color: '#ffffff',
    typography_typography: 'custom',
    typography_font_family: 'Inter',
    typography_font_size: { size: 13, unit: 'px' },
    typography_font_weight: '700'
  });
  await sleep(800);

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
  await sleep(800);

  // Column 4: Get In Touch
  const col4 = await client.callTool('elementor-mcp-add-flexbox', {
    post_id: postId,
    parent_id: footerId,
    position: 3,
    direction: 'column'
  });
  const col4Id = getElementId(col4);
  await sleep(800);

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
  await sleep(800);

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
  await sleep(1000);
}

async function main() {
  const client = new MCPClient();
  try {
    console.log('Connecting to Elementor MCP...');
    await client.connect();

    // Rebuild static pages natively
    const PAGES = {
      about: {
        id: 21,
        name: "About Us",
        builder: async (postId) => {
          // Banner
          const banner = await client.callTool('elementor-mcp-add-flexbox', {
            post_id: postId,
            parent_id: '',
            position: 1,
            direction: 'column',
            justify: 'center',
            align: 'center',
            padding: 80,
            background_color: '#0a224e'
          });
          const bannerId = getElementId(banner);
          await sleep(1000);

          await client.callTool('elementor-mcp-add-heading', {
            post_id: postId,
            parent_id: bannerId,
            position: 0,
            title: 'WHO WE ARE',
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
            parent_id: bannerId,
            position: 1,
            title: 'About Techno-Solutions',
            title_color: '#ffffff',
            align: 'center',
            typography_typography: 'custom',
            typography_font_family: 'Playfair Display',
            typography_font_size: { size: 36, unit: 'px' },
            typography_font_weight: '700'
          });
          await sleep(800);

          await client.callTool('elementor-mcp-add-text-editor', {
            post_id: postId,
            parent_id: bannerId,
            position: 2,
            editor: '<p style="color: #ffffff; opacity: 0.8; font-size: 16px; text-align: center; max-width: 600px; margin: 15px auto 0 auto;">Your Trusted Technology Partner in driving world-class Digital Transformation & Business Automation.</p>'
          });
          await sleep(1000);

          // Content Box
          const contentSec = await client.callTool('elementor-mcp-add-flexbox', {
            post_id: postId,
            parent_id: '',
            position: 2,
            direction: 'row',
            justify: 'space-between',
            align: 'flex-start',
            padding: 60
          });
          const contentSecId = getElementId(contentSec);
          await sleep(1000);

          // Left col
          const leftCol = await client.callTool('elementor-mcp-add-flexbox', {
            post_id: postId,
            parent_id: contentSecId,
            position: 0,
            direction: 'column'
          });
          const leftColId = getElementId(leftCol);
          await sleep(800);

          await client.callTool('elementor-mcp-add-heading', {
            post_id: postId,
            parent_id: leftColId,
            position: 0,
            title: 'Empowering Enterprises with Intelligence & Performance',
            title_color: '#1b1b1b',
            typography_typography: 'custom',
            typography_font_family: 'Playfair Display',
            typography_font_size: { size: 28, unit: 'px' },
            typography_font_weight: '700'
          });
          await sleep(800);

          await client.callTool('elementor-mcp-add-text-editor', {
            post_id: postId,
            parent_id: leftColId,
            position: 1,
            editor: `<p style="color: #5b6470; font-size: 15px; line-height: 1.7; margin-top: 15px;">Techno-Solutions is a leading Digital Transformation company helping organizations embrace the future through intelligent technology solutions. We specialize in designing robust, scalable ecosystems that optimize manual overhead and automate complex architectures.</p>
<p style="color: #5b6470; font-size: 15px; line-height: 1.7; margin-top: 15px;">We combine business consulting, automation, Artificial Intelligence, blockchain technologies, IoT, renewable energy, and smart infrastructure to deliver measurable business outcomes. Whether you are a startup, SME, enterprise, educational institution, or government organization, we deliver innovative solutions that improve efficiency, reduce costs, and accelerate digital transformation.</p>
<div style="background-color: #f8f9fc; border-left: 4px solid #e5af2b; padding: 20px; border-radius: 0 16px 16px 0; margin-top: 25px;">
  <h4 style="font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: #0f2d63; margin-bottom: 5px;">Our Mission</h4>
  <p style="color: #5b6470; font-style: italic; font-size: 14px; margin: 0;">"Our mission is simple: Helping organizations become faster, smarter, and more profitable through technology."</p>
</div>`
          });
          await sleep(1000);

          // Right col Leadership
          const rightCol = await client.callTool('elementor-mcp-add-flexbox', {
            post_id: postId,
            parent_id: contentSecId,
            position: 1,
            direction: 'column'
          });
          const rightColId = getElementId(rightCol);
          await sleep(800);

          await client.callTool('elementor-mcp-add-text-editor', {
            post_id: postId,
            parent_id: rightColId,
            position: 0,
            editor: `<div style='background-color: #FFFFFF; border: 1px solid #ECECEC; padding: 30px; border-radius: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.02); text-align: center;'>
  <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80' style='width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 15px;' />
  <h4 style='font-family: "Playfair Display", serif; font-size: 20px; font-weight: 700; color: #1B1B1B; margin: 0 0 5px 0;'>Sanjeev Goel</h4>
  <p style='color: #E5AF2B; font-weight: 600; font-size: 12px; margin-bottom: 15px;'>FOUNDER & CHIEF CONSULTANT</p>
  <p style='font-size:13px; color:#5b6470; line-height:1.6; margin-bottom: 20px;'>Sanjeev Goel guides digital strategies, renewable solar designs, and enterprise systems implementation across regional branches.</p>
  <div style='text-align: left; font-size: 13px; color: #5B6470; line-height: 1.8; border-top: 1px solid #ECECEC; padding-top: 15px;'>
    <p style='margin: 5px 0;'><strong>📍 Address:</strong> 218 AGCR Enclave, Near Karkardoma Metro Station, Delhi 110092 | India</p>
    <p style='margin: 5px 0;'><strong>📞 Phone:</strong> +91 9811841782</p>
    <p style='margin: 5px 0;'><strong>✉️ Email:</strong> info2sanjeev@gmail.com</p>
  </div>
</div>`
          });
          await sleep(1000);
        }
      },
      services: {
        id: 17,
        name: "Services List",
        builder: async (postId) => {
          // Banner
          const banner = await client.callTool('elementor-mcp-add-flexbox', {
            post_id: postId,
            parent_id: '',
            position: 1,
            direction: 'column',
            justify: 'center',
            align: 'center',
            padding: 80,
            background_color: '#0a224e'
          });
          const bannerId = getElementId(banner);
          await sleep(1000);

          await client.callTool('elementor-mcp-add-heading', {
            post_id: postId,
            parent_id: bannerId,
            position: 0,
            title: 'EXPLORE OFFERS',
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
            parent_id: bannerId,
            position: 1,
            title: 'Our Elite Core Services',
            title_color: '#ffffff',
            align: 'center',
            typography_typography: 'custom',
            typography_font_family: 'Playfair Display',
            typography_font_size: { size: 36, unit: 'px' },
            typography_font_weight: '700'
          });
          await sleep(800);

          await client.callTool('elementor-mcp-add-text-editor', {
            post_id: postId,
            parent_id: bannerId,
            position: 2,
            editor: '<p style="color: #ffffff; opacity: 0.8; font-size: 16px; text-align: center; max-width: 600px; margin: 15px auto 0 auto;">We engineer enterprise-quality, ISO-level structures and processes designed strictly within your budget parameters.</p>'
          });
          await sleep(1000);

          // Services Grid Parent Container
          const gridSec = await client.callTool('elementor-mcp-add-flexbox', {
            post_id: postId,
            parent_id: '',
            position: 2,
            direction: 'row',
            justify: 'space-between',
            align: 'stretch',
            padding: 60
          });
          const gridSecId = getElementId(gridSec);
          await sleep(1000);

          // Row 1 Column 1
          const col1 = await client.callTool('elementor-mcp-add-flexbox', {
            post_id: postId,
            parent_id: gridSecId,
            position: 0,
            direction: 'column'
          });
          const col1Id = getElementId(col1);
          await sleep(800);

          // Re-populate individual columns inside flex row
          for (let i = 0; i < SERVICES.length; i++) {
            const s = SERVICES[i];
            
            // Re-use grid container
            const cardBox = await client.callTool('elementor-mcp-add-flexbox', {
              post_id: postId,
              parent_id: gridSecId,
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
        }
      },
      blog: {
        id: 25,
        name: "Blog List",
        builder: async (postId) => {
          // Banner
          const banner = await client.callTool('elementor-mcp-add-flexbox', {
            post_id: postId,
            parent_id: '',
            position: 1,
            direction: 'column',
            justify: 'center',
            align: 'center',
            padding: 80,
            background_color: '#0a224e'
          });
          const bannerId = getElementId(banner);
          await sleep(1000);

          await client.callTool('elementor-mcp-add-heading', {
            post_id: postId,
            parent_id: bannerId,
            position: 0,
            title: 'OUR INSIGHTS',
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
            parent_id: bannerId,
            position: 1,
            title: 'Corporate Knowledge Hub',
            title_color: '#ffffff',
            align: 'center',
            typography_typography: 'custom',
            typography_font_family: 'Playfair Display',
            typography_font_size: { size: 36, unit: 'px' },
            typography_font_weight: '700'
          });
          await sleep(1000);

          // Grid
          const gridSec = await client.callTool('elementor-mcp-add-flexbox', {
            post_id: postId,
            parent_id: '',
            position: 2,
            direction: 'row',
            justify: 'space-between',
            align: 'stretch',
            padding: 60
          });
          const gridSecId = getElementId(gridSec);
          await sleep(1000);

          for (let i = 0; i < BLOG_POSTS.length; i++) {
            const b = BLOG_POSTS[i];
            const card = await client.callTool('elementor-mcp-add-flexbox', {
              post_id: postId,
              parent_id: gridSecId,
              position: i,
              direction: 'column',
              padding: 20,
              background_color: '#ffffff'
            });
            const cardId = getElementId(card);
            await sleep(800);

            await client.callTool('elementor-mcp-add-image', {
              post_id: postId,
              parent_id: cardId,
              position: 0,
              image: { url: b.image }
            });
            await sleep(800);

            await client.callTool('elementor-mcp-add-heading', {
              post_id: postId,
              parent_id: cardId,
              position: 1,
              title: b.title,
              title_color: '#0f2d63',
              typography_typography: 'custom',
              typography_font_family: 'Playfair Display',
              typography_font_size: { size: 18, unit: 'px' },
              typography_font_weight: '700'
            });
            await sleep(800);

            await client.callTool('elementor-mcp-add-text-editor', {
              post_id: postId,
              parent_id: cardId,
              position: 2,
              editor: `<p style="font-size:13px; color:#5b6470; margin-top:10px; margin-bottom:15px; line-height:1.6;">${b.summary}</p>`
            });
            await sleep(800);

            await client.callTool('elementor-mcp-add-button', {
              post_id: postId,
              parent_id: cardId,
              position: 3,
              text: 'Read Article',
              link: { url: `/blog/${b.slug}/` },
              background_color: '#0f2d63',
              button_text_color: '#ffffff'
            });
            await sleep(800);
          }
        }
      },
      contact: {
        id: 29,
        name: "Contact Us",
        builder: async (postId) => {
          // Banner
          const banner = await client.callTool('elementor-mcp-add-flexbox', {
            post_id: postId,
            parent_id: '',
            position: 1,
            direction: 'column',
            justify: 'center',
            align: 'center',
            padding: 80,
            background_color: '#0a224e'
          });
          const bannerId = getElementId(banner);
          await sleep(1000);

          await client.callTool('elementor-mcp-add-heading', {
            post_id: postId,
            parent_id: bannerId,
            position: 0,
            title: 'GET IN TOUCH',
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
            parent_id: bannerId,
            position: 1,
            title: 'Contact Our Corporate Office',
            title_color: '#ffffff',
            align: 'center',
            typography_typography: 'custom',
            typography_font_family: 'Playfair Display',
            typography_font_size: { size: 36, unit: 'px' },
            typography_font_weight: '700'
          });
          await sleep(800);

          await client.callTool('elementor-mcp-add-text-editor', {
            post_id: postId,
            parent_id: bannerId,
            position: 2,
            editor: '<p style="color: #ffffff; opacity: 0.8; font-size: 16px; text-align: center; max-width: 600px; margin: 15px auto 0 auto;">We respond within 12 business hours.</p>'
          });
          await sleep(1000);

          // Content section (2 cols)
          const contactSec = await client.callTool('elementor-mcp-add-flexbox', {
            post_id: postId,
            parent_id: '',
            position: 2,
            direction: 'row',
            justify: 'space-between',
            align: 'flex-start',
            padding: 60
          });
          const contactSecId = getElementId(contactSec);
          await sleep(1000);

          // Left
          const leftCol = await client.callTool('elementor-mcp-add-flexbox', {
            post_id: postId,
            parent_id: contactSecId,
            position: 0,
            direction: 'column'
          });
          const leftColId = getElementId(leftCol);
          await sleep(800);

          await client.callTool('elementor-mcp-add-heading', {
            post_id: postId,
            parent_id: leftColId,
            position: 0,
            title: 'Corporate Headquarters',
            title_color: '#0f2d63',
            typography_typography: 'custom',
            typography_font_family: 'Playfair Display',
            typography_font_size: { size: 24, unit: 'px' },
            typography_font_weight: '700'
          });
          await sleep(800);

          await client.callTool('elementor-mcp-add-text-editor', {
            post_id: postId,
            parent_id: leftColId,
            position: 1,
            editor: `<div style='font-size: 15px; color: #5B6470; line-height: 1.8; margin-top: 15px;'>
  <p>Our consultation desks and solution architectures are available 24/7 for strategic accounts.</p>
  <p style='margin-top: 20px;'><strong>📍 Address:</strong> 218 AGCR Enclave, Delhi 110092 | India</p>
  <p><strong>📞 Phone:</strong> +91 9811841782</p>
  <p><strong>✉️ Email:</strong> info2sanjeev@gmail.com</p>
</div>`
          });
          await sleep(1000);

          // Right
          const rightCol = await client.callTool('elementor-mcp-add-flexbox', {
            post_id: postId,
            parent_id: contactSecId,
            position: 1,
            direction: 'column'
          });
          const rightColId = getElementId(rightCol);
          await sleep(800);

          await client.callTool('elementor-mcp-add-text-editor', {
            post_id: postId,
            parent_id: rightColId,
            position: 0,
            editor: `<div style='background-color: #FFFFFF; border: 1px solid #ECECEC; padding: 40px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);'>
  <h3 style='font-family: "Playfair Display", serif; font-size: 22px; font-weight: 700; color: #0F2D63; margin-bottom: 5px;'>Request a Free Consultation</h3>
  <p style='font-size: 12px; color: #5B6470; margin-bottom: 20px;'>Our advisory team responds directly within 12 business hours.</p>
  <form style='display: flex; flex-direction: column; gap: 15px;'>
    <input type='text' placeholder='Your Name' style='padding: 12px; border: 1px solid #ECECEC; border-radius: 8px; font-size: 14px; width:100%; box-sizing:border-box;' />
    <input type='email' placeholder='Your Email' style='padding: 12px; border: 1px solid #ECECEC; border-radius: 8px; font-size: 14px; width:100%; box-sizing:border-box;' />
    <textarea placeholder='Message Details...' rows='4' style='padding: 12px; border: 1px solid #ECECEC; border-radius: 8px; font-size: 14px; resize: none; width:100%; box-sizing:border-box;'></textarea>
    <button type='button' style='background-color: #0F2D63; color: #FFFFFF; font-weight: 700; padding: 14px; border: none; border-radius: 8px; cursor: pointer; font-size:14px;'>Submit Inquiry</button>
  </form>
</div>`
          });
          await sleep(1000);
        }
      }
    };

    // 1. Loop and build native static pages (SKIPPED: Already completed)
    console.log('Skipping static pages (About Us, Services List, Blog List, Contact Us) - Already Built Natively.');

    // 2. Loop and build native service subpages (SKIPPED: Already completed)
    console.log('Skipping service subpages - Already Built Natively.');
    /*
    const SERVICES_MAP = {
      "digital-transformation": 33,
      "business-automation": 37,
      "artificial-intelligence": 41,
      "blockchain-crypto": 45,
      "smart-home": 49,
      "solar-energy": 53
    };

    for (const service of SERVICES) {
      const pageId = SERVICES_MAP[service.id];
      if (!pageId) continue;
      
      console.log(`\n==============================================`);
      console.log(`REBUILDING NATIVE SERVICE SUBPAGE: ${service.title} (ID: ${pageId})...`);
      console.log(`==============================================`);
      
      console.log('Clearing old page content...');
      await client.callTool('elementor-mcp-delete-page-content', { post_id: pageId });
      await sleep(1500);

      // Force canvas layout
      await client.callTool('elementor-mcp-update-page-settings', {
        post_id: pageId,
        settings: {
          template: 'elementor_canvas',
          page_template: 'elementor_canvas'
        }
      });
      await sleep(1500);

      // Add Header
      await addHeader(client, pageId);

      // Banner Container
      const banner = await client.callTool('elementor-mcp-add-flexbox', {
        post_id: pageId,
        parent_id: '',
        position: 1,
        direction: 'column',
        justify: 'center',
        align: 'center',
        padding: 80,
        background_color: '#0a224e'
      });
      const bannerId = getElementId(banner);
      await sleep(1000);

      await client.callTool('elementor-mcp-add-heading', {
        post_id: pageId,
        parent_id: bannerId,
        position: 0,
        title: service.badge.toUpperCase(),
        title_color: '#e5af2b',
        align: 'center',
        typography_typography: 'custom',
        typography_font_family: 'Inter',
        typography_font_size: { size: 12, unit: 'px' },
        typography_font_weight: '700'
      });
      await sleep(800);

      await client.callTool('elementor-mcp-add-heading', {
        post_id: pageId,
        parent_id: bannerId,
        position: 1,
        title: service.title,
        title_color: '#ffffff',
        align: 'center',
        typography_typography: 'custom',
        typography_font_family: 'Playfair Display',
        typography_font_size: { size: 36, unit: 'px' },
        typography_font_weight: '700'
      });
      await sleep(1000);

      // Content Box (2 Columns)
      const contentSec = await client.callTool('elementor-mcp-add-flexbox', {
        post_id: pageId,
        parent_id: '',
        position: 2,
        direction: 'row',
        justify: 'space-between',
        align: 'flex-start',
        padding: 60
      });
      const contentSecId = getElementId(contentSec);
      await sleep(1000);

      // Left Column (Details)
      const leftCol = await client.callTool('elementor-mcp-add-flexbox', {
        post_id: pageId,
        parent_id: contentSecId,
        position: 0,
        direction: 'column'
      });
      const leftColId = getElementId(leftCol);
      await sleep(800);

      await client.callTool('elementor-mcp-add-image', {
        post_id: pageId,
        parent_id: leftColId,
        position: 0,
        image: { url: service.image }
      });
      await sleep(1000);

      await client.callTool('elementor-mcp-add-heading', {
        post_id: pageId,
        parent_id: leftColId,
        position: 1,
        title: 'Solution Overview',
        title_color: '#1b1b1b',
        typography_typography: 'custom',
        typography_font_family: 'Playfair Display',
        typography_font_size: { size: 24, unit: 'px' },
        typography_font_weight: '700'
      });
      await sleep(800);

      await client.callTool('elementor-mcp-add-text-editor', {
        post_id: pageId,
        parent_id: leftColId,
        position: 2,
        editor: `<p style="color: #5b6470; font-size: 15px; line-height: 1.7; margin-top: 15px;">${service.description}</p>
<p style="color: #5b6470; font-size: 15px; line-height: 1.7; margin-top: 15px;">We deploy tailored software architectures, security boundaries, and enterprise databases ensuring maximum performance. Our integration processes comply with high performance metrics and strict SLA criteria.</p>`
      });
      await sleep(1000);

      // Right Column (Consultation form/box)
      const rightCol = await client.callTool('elementor-mcp-add-flexbox', {
        post_id: pageId,
        parent_id: contentSecId,
        position: 1,
        direction: 'column'
      });
      const rightColId = getElementId(rightCol);
      await sleep(800);

      await client.callTool('elementor-mcp-add-text-editor', {
        post_id: pageId,
        parent_id: rightColId,
        position: 0,
        editor: `<div style='background-color: #FFFFFF; border: 1px solid #ECECEC; padding: 30px; border-radius: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.02);'>
  <h4 style='font-family: "Playfair Display", serif; font-size: 18px; font-weight: 700; color: #0f2d63; margin-bottom: 15px;'>Consult an Expert</h4>
  <p style='font-size: 13px; color: #5B6470; line-height: 1.6; margin-bottom: 20px;'>Talk to Sanjeev Goel directly to schedule your custom architecture audit and plan deployment budgets.</p>
  <div style='font-size: 13px; color: #5B6470; line-height: 1.8; border-top: 1px solid #ECECEC; padding-top: 15px;'>
    <p style='margin: 5px 0;'><strong>📞 Phone:</strong> +91 9811841782</p>
    <p style='margin: 5px 0;'><strong>✉️ Email:</strong> info2sanjeev@gmail.com</p>
  </div>
  <a href="/contact/" style="display:block; text-align:center; background:#0f2d63; color:#ffffff; padding:12px; border-radius:8px; font-weight:700; text-decoration:none; margin-top:20px; font-size:13px;">Book Custom Audit</a>
</div>`
      });
      await sleep(1000);

      // Add Footer
      await addFooter(client, pageId);

      console.log(`SUCCESS: Rebuilt ${service.title}`);
    }
    */

    // 3. Loop and build native blog subpages
    const BLOG_MAP = {
      "digital-transformation-delhi": 57,
      "business-automation-solutions-smes": 61,
      "ai-solutions-provider-india": 65,
      "smart-homes-solar-energy-delhi": 69
    };
    
    const BLOG_CONTENTS = {
      "digital-transformation-delhi": `<p style="color: #5b6470; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">In today’s rapidly evolving digital landscape, businesses in Delhi NCR must adapt, innovate, and transform to stay competitive. As a premier Digital Transformation Company in Delhi, Techno-Solutions is at the forefront of this revolution. Our Digital Consulting Services assess your current digital maturity, identify technological gaps, and build tailored strategic roadmaps for sustainable corporate upskilling and modern deployment.</p>
<h3 style="font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #0f2d63; margin-top: 30px; margin-bottom: 15px;">Why Digital Transformation Matters Now</h3>
<p style="color: #5b6470; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">Many legacy businesses struggle with siloed systems, manual operations, and outdated technology stacks. By embracing enterprise automation, firms can reduce operational bottlenecks and enhance customer experience.</p>
<h3 style="font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #0f2d63; margin-top: 30px; margin-bottom: 15px;">Our Strategic Framework</h3>
<ol style="color: #5b6470; font-size: 16px; line-height: 1.8; padding-left: 20px; margin-bottom: 20px;">
  <li><strong>Comprehensive Mature Audits:</strong> We evaluate your business models against leading industry standards.</li>
  <li><strong>Cloud Adoption & Migration:</strong> Move safely to modern cloud structures like AWS, Azure, or Google Cloud with zero downtime.</li>
  <li><strong>AI & Analytics Integration:</strong> Inject intelligent prediction models into your daily CRM and core decision pipelines.</li>
</ol>`,
      "business-automation-solutions-smes": `<p style="color: #5b6470; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">Techno-Solutions is a leading provider of Business Automation Solutions. We streamline operations, eliminate paper-based processes, and accelerate workflows. By connecting low-code platforms and custom ERPs, we help startups, SMEs, and large enterprises transition into highly productive organizations.</p>
<h3 style="font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #0f2d63; margin-top: 30px; margin-bottom: 15px;">The Direct ROI of Workflow Automation</h3>
<ul style="color: #5b6470; font-size: 16px; line-height: 1.8; padding-left: 20px; margin-bottom: 20px;">
  <li><strong>Reduced Error Rates:</strong> Manual data entry and file transfers are prone to human mistakes. Automation reduces this to near-zero.</li>
  <li><strong>Faster Approvals:</strong> Routing invoice, leave, and expense claims automatically ensures rapid decision-making.</li>
  <li><strong>Optimized Resources:</strong> Employees can focus on high-value strategy rather than repetitive copy-paste jobs.</li>
</ul>
<h3 style="font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #0f2d63; margin-top: 30px; margin-bottom: 15px;">Scaling with Microsoft Power Platform & Low-Code</h3>
<p style="color: #5b6470; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">We utilize Microsoft Power Automate, Copilot Studio, and custom APIs to bridge gaps between HubSpot, Zoho, Salesforce, and Tally, ensuring complete, end-to-end operational visibility.</p>`,
      "ai-solutions-provider-india": `<p style="color: #5b6470; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">AI has transitioned from a buzzword into a critical business driver. As an AI Solutions Provider India, Techno-Solutions helps corporate leaders design, implement, and audit cognitive solutions safely within their budget boundaries.</p>
<h3 style="font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #0f2d63; margin-top: 30px; margin-bottom: 15px;">Key Pillars of Modern AI Implementation</h3>
<ol style="color: #5b6470; font-size: 16px; line-height: 1.8; padding-left: 20px; margin-bottom: 20px;">
  <li><strong>Generative AI & LLM Integrations:</strong> Connect the Gemini API or ChatGPT securely to parse corporate data, draft responses, or search documents.</li>
  <li><strong>Agentic AI & Custom Workflows:</strong> Deploy autonomous, self-guided agents that trigger workflows, communicate across channels, and automate tasks.</li>
  <li><strong>Intelligent Document Processing (OCR):</strong> Turn physical invoices, receipts, and forms into structured digital database entries in seconds.</li>
</ol>`,
      "smart-homes-solar-energy-delhi": `<p style="color: #5b6470; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">Rethink your living and working environments. Modern spaces demand double the efficiency: seamless automation alongside green energy. At Techno-Solutions, we design and install high-performance smart ecosystems tailored for Delhi NCR's unique environment.</p>
<h3 style="font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #0f2d63; margin-top: 30px; margin-bottom: 15px;">Why Upgrading is Essential</h3>
<ul style="color: #5b6470; font-size: 16px; line-height: 1.8; padding-left: 20px; margin-bottom: 20px;">
  <li><strong>Significant Utility Reductions:</strong> Commercial rooftop solar panels and net-metering can cut electric bills by up to 32%.</li>
  <li><strong>Military-Grade Security:</strong> Combine high-definition CCTV, video door phones, and encrypted biometric door locks for total peace of mind.</li>
  <li><strong>Intelligent HVAC & Ambience:</strong> Manage lights and climate voice controls, scheduling systems, and smart meshes.</li>
</ul>`
    };

    for (const post of BLOG_POSTS) {
      if (post.slug === "digital-transformation-delhi" || post.slug === "business-automation-solutions-smes") {
        console.log(`Skipping blog page: ${post.title} - Already Built Natively.`);
        continue;
      }
      const pageId = BLOG_MAP[post.slug];
      if (!pageId) continue;
      
      console.log(`\n==============================================`);
      console.log(`REBUILDING NATIVE BLOG DETAIL PAGE: ${post.title} (ID: ${pageId})...`);
      console.log(`==============================================`);
      
      console.log('Clearing old page content...');
      await client.callTool('elementor-mcp-delete-page-content', { post_id: pageId });
      await sleep(1500);

      // Force canvas layout
      await client.callTool('elementor-mcp-update-page-settings', {
        post_id: pageId,
        settings: {
          template: 'elementor_canvas',
          page_template: 'elementor_canvas'
        }
      });
      await sleep(1500);

      // Add Header
      await addHeader(client, pageId);

      // Banner Container
      const banner = await client.callTool('elementor-mcp-add-flexbox', {
        post_id: pageId,
        parent_id: '',
        position: 1,
        direction: 'column',
        justify: 'center',
        align: 'center',
        padding: 80,
        background_color: '#0a224e'
      });
      const bannerId = getElementId(banner);
      await sleep(1000);

      await client.callTool('elementor-mcp-add-heading', {
        post_id: pageId,
        parent_id: bannerId,
        position: 0,
        title: post.category.toUpperCase(),
        title_color: '#e5af2b',
        align: 'center',
        typography_typography: 'custom',
        typography_font_family: 'Inter',
        typography_font_size: { size: 12, unit: 'px' },
        typography_font_weight: '700'
      });
      await sleep(800);

      await client.callTool('elementor-mcp-add-heading', {
        post_id: pageId,
        parent_id: bannerId,
        position: 1,
        title: post.title,
        title_color: '#ffffff',
        align: 'center',
        typography_typography: 'custom',
        typography_font_family: 'Playfair Display',
        typography_font_size: { size: 28, unit: 'px' },
        typography_font_weight: '700'
      });
      await sleep(1000);

      // Content Box (1 centered column)
      const contentSec = await client.callTool('elementor-mcp-add-flexbox', {
        post_id: pageId,
        parent_id: '',
        position: 2,
        direction: 'column',
        justify: 'center',
        align: 'center',
        padding: 60
      });
      const contentSecId = getElementId(contentSec);
      await sleep(1000);

      await client.callTool('elementor-mcp-add-image', {
        post_id: pageId,
        parent_id: contentSecId,
        position: 0,
        image: { url: post.image }
      });
      await sleep(1000);

      await client.callTool('elementor-mcp-add-text-editor', {
        post_id: pageId,
        parent_id: contentSecId,
        position: 1,
        editor: `<div style="max-width: 800px; margin: 30px auto 0 auto; text-align: left;">
  ${BLOG_CONTENTS[post.slug] || '<p>Content details coming soon...</p>'}
</div>`
      });
      await sleep(1000);

      // Add Footer
      await addFooter(client, pageId);

      console.log(`SUCCESS: Rebuilt blog: ${post.title}`);
    }

    console.log('\n==============================================');
    console.log('ALL STATIC PAGES, SERVICE SUBPAGES, & BLOG PAGES SUCCESSFULLY REBUILT NATIVELY!');
    console.log('==============================================');

  } catch (err) {
    console.error('Fatal Error building native pages:', err);
  } finally {
    client.close();
  }
}

main();
