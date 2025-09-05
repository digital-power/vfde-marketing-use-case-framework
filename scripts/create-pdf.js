import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createPDF() {
  const screenshotsDir = path.join(__dirname, '..', 'screenshots');
  const pdfPath = path.join(__dirname, '..', 'marketing-framework-screenshots.pdf');
  
  // Get all PNG files and sort them in the correct order
  const files = await fs.promises.readdir(screenshotsDir);
  const pngFiles = files.filter(file => file.endsWith('.png'));
  
  // Define the correct order: timeline first, then phases 1-9, then markdown export
  const orderedFiles = [];
  
  // Add timeline overview first
  const timelineFile = pngFiles.find(f => f.includes('timeline-overview'));
  if (timelineFile) orderedFiles.push(timelineFile);
  
  // Add phases 1-9 in order
  for (let i = 1; i <= 9; i++) {
    const phaseFile = pngFiles.find(f => f.includes(`phase-${i}-`));
    if (phaseFile) orderedFiles.push(phaseFile);
  }
  
  // Add markdown export last
  const exportFile = pngFiles.find(f => f.includes('markdown-export'));
  if (exportFile) orderedFiles.push(exportFile);
  
  // Use the ordered files
  const sortedPngFiles = orderedFiles;

  console.log(`Found ${pngFiles.length} screenshots to convert to PDF`);
  console.log('Order:', sortedPngFiles);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  
  try {
    // Create HTML content with all images
    let htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            margin: 0;
            padding: 0;
        }
        .page {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            page-break-after: always;
            background: white;
        }
        .page:last-child {
            page-break-after: avoid;
        }
        img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
    </style>
</head>
<body>`;

    for (const file of sortedPngFiles) {
      const imagePath = path.join(screenshotsDir, file);
      const imageBase64 = await fs.promises.readFile(imagePath, 'base64');
      htmlContent += `
    <div class="page">
        <img src="data:image/png;base64,${imageBase64}" alt="${file}">
    </div>`;
    }
    
    htmlContent += `
</body>
</html>`;

    // Create a temporary HTML file
    const tempHtmlPath = path.join(__dirname, 'temp.html');
    await fs.promises.writeFile(tempHtmlPath, htmlContent);
    
    const page = await context.newPage();
    await page.goto(`file://${tempHtmlPath}`);
    
    // Generate PDF
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    
    // Clean up temp file
    await fs.promises.unlink(tempHtmlPath);
    
    console.log(`✅ PDF created successfully: ${pdfPath}`);
    console.log(`📄 Contains ${sortedPngFiles.length} pages`);
    
  } catch (error) {
    console.error('Error creating PDF:', error);
  } finally {
    await browser.close();
  }
}

createPDF().catch(console.error);