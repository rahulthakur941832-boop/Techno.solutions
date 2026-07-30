import fs from 'fs';

try {
  const content = fs.readFileSync('techno_solutions_elementor_homepage.json', 'utf8');
  const data = JSON.parse(content);
  console.log('JSON Keys:', Object.keys(data));
  if (data.title) console.log('Title:', data.title);
  if (data.type) console.log('Type:', data.type);
  if (data.content && Array.isArray(data.content)) {
    console.log('Number of top-level content elements:', data.content.length);
    data.content.forEach((el, index) => {
      console.log(`- Index ${index}: ID=${el.id}, ElType=${el.elType}, IsInner=${el.isInner || false}`);
      if (el.elements && el.elements.length > 0) {
        console.log(`  Sub-elements count: ${el.elements.length}`);
        el.elements.forEach((sub, subIdx) => {
          console.log(`    * Sub-Index ${subIdx}: ID=${sub.id}, ElType=${sub.elType}, WidgetType=${sub.widgetType || 'N/A'}`);
        });
      }
    });
  }
} catch (err) {
  console.error('Error:', err.message);
}
