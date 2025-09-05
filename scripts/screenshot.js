import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function takeScreenshots() {
  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, '..', 'screenshots');
  try {
    await fs.promises.mkdir(screenshotsDir, { recursive: true });
  } catch (error) {
    // Directory already exists
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  try {
    // Wait for the dev server to be available
    console.log('Waiting for dev server at http://localhost:5174...');
    await page.goto('http://localhost:5174', { waitUntil: 'networkidle' });
    
    // Take timeline view screenshot
    console.log('Taking timeline view screenshot...');
    await page.click('button:has-text("Process Overview")');
    await page.waitForTimeout(1000); // Wait for animation
    await page.screenshot({
      path: path.join(screenshotsDir, '01-timeline-overview.png'),
      fullPage: true
    });

    // Switch to detail view
    await page.click('button:has-text("Detailed Planning")');
    await page.waitForTimeout(1000);

    // Take screenshots of all 9 phases
    for (let i = 1; i <= 9; i++) {
      console.log(`Taking phase ${i} screenshot...`);
      
      // Click on phase navigation button using a more specific selector
      await page.locator(`button:has(div:text("${i}"))`).click();
      await page.waitForTimeout(1500); // Wait for content to load
      
      // Take full page screenshot
      await page.screenshot({
        path: path.join(screenshotsDir, `${String(i).padStart(2, '0')}-phase-${i}-${getPhaseCategory(i).toLowerCase().replace(/\s+/g, '-')}.png`),
        fullPage: true
      });
    }

    // Take markdown export screenshot (from phase 1)
    console.log('Taking markdown export screenshot...');
    await page.locator(`button:has(div:text("1"))`).click();
    await page.waitForTimeout(1000);
    
    // Scroll to markdown export section
    const exportSection = page.locator('h3:has-text("Export to Confluence")');
    if (await exportSection.count() > 0) {
      await exportSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
    }

    // Click preview button if it exists
    const previewButton = page.locator('button:has-text("Preview")');
    if (await previewButton.count() > 0) {
      await previewButton.click();
      await page.waitForTimeout(1000);
    }

    await page.screenshot({
      path: path.join(screenshotsDir, '11-markdown-export.png'),
      fullPage: true
    });

    console.log(`\n✅ Successfully captured ${10} screenshots!`);
    console.log(`Screenshots saved to: ${screenshotsDir}`);
    
    // List all created files
    const files = await fs.promises.readdir(screenshotsDir);
    console.log('\n📁 Created files:');
    files.sort().forEach(file => {
      console.log(`   ${file}`);
    });

  } catch (error) {
    console.error('Error taking screenshots:', error);
  } finally {
    await browser.close();
  }
}

function getPhaseCategory(phaseNumber) {
  const categories = {
    1: 'Discovery',
    2: 'Assessment', 
    3: 'Requirements',
    4: 'Design',
    5: 'Development',
    6: 'Validation',
    7: 'Implementation',
    8: 'Monitoring',
    9: 'Optimization'
  };
  return categories[phaseNumber] || 'Unknown';
}

// Run the screenshot function
takeScreenshots().catch(console.error);