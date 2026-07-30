import fs from 'fs';

try {
  const fileContent = fs.readFileSync('techno_solutions_elementor_homepage.json', 'utf8');
  const data = JSON.parse(fileContent);
  
  let index = 0;
  function inspect(element) {
    if (!element) return;
    
    if (element.elType === 'widget' && element.widgetType === 'text-editor') {
      const settings = element.settings || {};
      const editor = settings.editor || '';
      console.log(`--- WIDGET ${index} (Text Editor) ---`);
      console.log(editor);
      console.log('\n');
    }
    index++;
    
    if (element.elements && Array.isArray(element.elements)) {
      element.elements.forEach(inspect);
    }
  }
  
  if (Array.isArray(data.content)) {
    data.content.forEach(inspect);
  }
} catch (err) {
  console.error('Error:', err);
}
