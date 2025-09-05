import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF() {
  const screenshotsDir = path.join(__dirname, '..', 'screenshots');
  const outputPath = path.join(__dirname, '..', 'marketing-framework-screenshots.pdf');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  try {
    // Check if screenshots exist
    const files = await fs.promises.readdir(screenshotsDir);
    const pngFiles = files.filter(f => f.endsWith('.png')).sort();
    
    if (pngFiles.length === 0) {
      console.log('❌ No screenshots found. Run screenshot script first.');
      return;
    }

    console.log('📄 Generating PDF from screenshots...');

    // Create HTML content with all images
    let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Digital Marketing Use Case Framework - Screenshots</title>
        <style>
            body {
                margin: 0;
                padding: 20px;
                font-family: 'Arial', sans-serif;
                background: #f8f9fa;
            }
            .page {
                background: white;
                margin-bottom: 40px;
                page-break-after: always;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .page:last-child {
                page-break-after: avoid;
            }
            h1 {
                color: #bd3333;
                text-align: center;
                margin-bottom: 30px;
                font-size: 28px;
            }
            h2 {
                color: #374151;
                margin-bottom: 15px;
                font-size: 18px;
            }
            img {
                max-width: 100%;
                height: auto;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .filename {
                font-size: 14px;
                color: #6b7280;
                margin-top: 10px;
                text-align: center;
                font-style: italic;
            }
            .cover-page {
                text-align: center;
                padding: 60px 20px;
            }
            .date {
                color: #6b7280;
                font-size: 16px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="page cover-page">
            <h1 style="font-size: 36px; margin-bottom: 20px;">Digital Marketing Use Case Framework</h1>
            <h2 style="font-size: 24px; color: #6b7280; margin-bottom: 40px;">Application Screenshots</h2>
            <p style="font-size: 18px; color: #374151; line-height: 1.6;">
                A comprehensive framework for developing and implementing marketing use cases,<br>
                from initial ideation to production optimization.
            </p>
            <p class="date">Generated on ${new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })}</p>
        </div>
    `;

    // Add each screenshot as a page
    for (const file of pngFiles) {
      const filePath = path.join(screenshotsDir, file);
      const imageBuffer = await fs.promises.readFile(filePath);
      const base64Image = imageBuffer.toString('base64');
      
      // Extract meaningful title from filename
      const title = formatScreenshotTitle(file);
      
      htmlContent += `
        <div class="page">
            <h2>${title}</h2>
            <img src="data:image/png;base64,${base64Image}" alt="${title}">
            <div class="filename">${file}</div>
        </div>
      `;
    }

    htmlContent += `
    </body>
    </html>`;

    // Set the HTML content
    await page.setContent(htmlContent, { waitUntil: 'networkidle' });

    // Generate PDF
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        bottom: '20px',
        left: '20px',
        right: '20px'
      }
    });

    console.log(`✅ PDF generated successfully!`);
    console.log(`📁 Location: ${outputPath}`);
    console.log(`📊 Contains ${pngFiles.length + 1} pages (cover + ${pngFiles.length} screenshots)`);

  } catch (error) {
    console.error('❌ Error generating PDF:', error);
  } finally {
    await browser.close();
  }
}

function formatScreenshotTitle(filename) {
  // Remove file extension and number prefix
  let title = filename.replace(/\.png$/, '').replace(/^\d{2}-/, '');
  
  // Convert dashes to spaces and capitalize
  title = title.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  // Special formatting for specific cases
  title = title.replace(/^Timeline/, 'Timeline - Process');
  title = title.replace(/^Phase (\d+)/, 'Phase $1 -');
  title = title.replace(/Markdown Export/, 'Markdown Export Feature');
  
  return title;
}

// Run the PDF generation
generatePDF().catch(console.error);