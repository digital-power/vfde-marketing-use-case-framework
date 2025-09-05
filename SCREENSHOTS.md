# Screenshot Generation Guide

This guide explains how to automatically generate screenshots of all pages in the Digital Marketing Use Case Framework web application.

## 🖼️ Available Scripts

The following npm scripts are available for screenshot generation:

```bash
# Take screenshots of all pages
bun run screenshots

# Generate PDF from existing screenshots  
bun run pdf

# Do both: screenshots + PDF generation
bun run docs
```

## 📋 Prerequisites

1. **Development server must be running**: Start the dev server first:
   ```bash
   bun run dev
   ```

2. **Required dependencies**: Playwright is automatically installed when running `bun install`

## 📸 What Gets Captured

The screenshot script captures:

1. **Timeline Overview** - Process overview showing all 9 phases
2. **Phase 1-9 Detail Views** - Individual phase forms and content
3. **Markdown Export Feature** - Export functionality preview

### Generated Files

Screenshots are saved to the `screenshots/` directory with descriptive names:
- `01-timeline-overview.png` - Process timeline view
- `02-phase-2-assessment.png` - Phase 2 detail view  
- `03-phase-3-requirements.png` - Phase 3 detail view
- ... (and so on for all phases)
- `11-markdown-export.png` - Export feature

## 📄 PDF Generation

The PDF generator creates a professional document containing:
- **Cover page** with title and generation date
- **All screenshots** as individual pages with titles
- **Formatted layout** optimized for sharing

Output: `marketing-framework-screenshots.pdf` in the project root

## 🛠️ Customization

### Screenshot Settings
Edit `scripts/screenshot.js` to customize:
- **Viewport size**: Default 1440x900
- **Wait times**: Adjust timeouts for animations
- **Browser type**: Currently uses Chromium (headless)

### PDF Settings  
Edit `scripts/generate-pdf.js` to customize:
- **Page format**: Default A4
- **Margins**: Default 20px all sides  
- **Styling**: Custom CSS in HTML template

## 🚀 Usage Examples

### Basic Usage
```bash
# Make sure dev server is running (http://localhost:5174)
bun run dev

# In another terminal, generate screenshots and PDF
bun run docs
```

### Individual Operations
```bash
# Just screenshots
bun run screenshots

# Just PDF (requires existing screenshots)
bun run pdf
```

### Updating Sample Images
The scripts automatically update the sample images used in documentation:
- `images/timeline.png` - Updated with current timeline view
- `images/phase.png` - Updated with current phase view
- `phase.png` - Root directory sample

## 🎨 Theme Updates

When the app's color theme changes (like the recent green → red update), run:
```bash
bun run docs
```

This ensures all screenshots reflect the current visual design.

## 📁 File Structure

```
├── scripts/
│   ├── screenshot.js      # Screenshot automation
│   └── generate-pdf.js    # PDF generation
├── screenshots/           # Generated screenshot files
│   ├── 01-timeline-overview.png
│   ├── 02-phase-2-assessment.png
│   └── ...
├── images/               # Documentation images
│   ├── timeline.png
│   └── phase.png
└── marketing-framework-screenshots.pdf  # Generated PDF
```

## 🔧 Troubleshooting

### Common Issues

1. **"Timeout exceeded" errors**
   - Ensure dev server is running on http://localhost:5174
   - Check if app is fully loaded before running screenshots

2. **"No screenshots found" for PDF**  
   - Run `bun run screenshots` first
   - Check that `screenshots/` directory contains .png files

3. **Blurry or missing content**
   - Increase wait times in the script
   - Check viewport size settings

### Manual Verification
After generation, verify:
- All expected screenshot files exist
- PDF opens correctly and contains all pages
- Images show the current app theme/styling

## 📋 Notes

- Screenshots are taken in headless mode for consistency
- Full page screenshots capture entire content (scrollable)
- PDF generation preserves image quality
- Compatible with macOS, Linux, and Windows
- Uses Playwright for reliable browser automation