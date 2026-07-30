import fs from 'fs';

try {
  const homeHtml = fs.readFileSync('rendered-home.html', 'utf8');
  const servicesHtml = fs.readFileSync('rendered-services.html', 'utf8');
  
  const homeBodyMatch = homeHtml.match(/<body[^>]*>/i);
  const servicesBodyMatch = servicesHtml.match(/<body[^>]*>/i);
  
  console.log('=== HOMEPAGE BODY CLASS ===');
  console.log(homeBodyMatch ? homeBodyMatch[0] : 'Not found');
  
  console.log('\n=== SERVICES PAGE BODY CLASS ===');
  console.log(servicesBodyMatch ? servicesBodyMatch[0] : 'Not found');
  
  // Find the first few child elements of body for both
  const homeTargetIndex = homeHtml.indexOf('<body');
  const homeSlice = homeHtml.substring(homeTargetIndex, homeTargetIndex + 1200);
  console.log('\n=== HOMEPAGE FIRST 1200 CHARS OF BODY ===');
  console.log(homeSlice);
  
  const servicesTargetIndex = servicesHtml.indexOf('<body');
  const servicesSlice = servicesHtml.substring(servicesTargetIndex, servicesTargetIndex + 1200);
  console.log('\n=== SERVICES FIRST 1200 CHARS OF BODY ===');
  console.log(servicesSlice);
  
} catch (err) {
  console.error(err);
}
