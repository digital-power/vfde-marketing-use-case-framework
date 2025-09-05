import { useState } from 'react'
import { generatePhaseMarkdown, copyToClipboard, downloadMarkdown, type PhaseData } from '@/utils/markdownGenerator'

// Simple markdown to HTML converter for preview
function markdownToHtml(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gm, '<h3 style="font-size: 16px; font-weight: 600; color: #1f2937; margin: 16px 0 8px 0;">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 style="font-size: 18px; font-weight: 700; color: #1f2937; margin: 20px 0 12px 0;">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 style="font-size: 24px; font-weight: 700; color: #1f2937; margin: 24px 0 16px 0;">$1</h1>')
    
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 600;">$1</strong>')
    
    // Tables - Process them in sections separated by headers or horizontal rules
    .replace(/(?:^|\n)(#[^\n]+\n)?((?:\|[^\n]+\|\n?)+)/gm, (_match, header, tableContent) => {
      let result = header || ''
      
      const rows = tableContent.trim().split('\n').filter((row: string) => row.trim())
      const tableRows = rows
        .filter((row: string) => !row.includes('---')) // Skip separator rows
        .map((row: string) => {
          const cells = row.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell)
          const isHeader = row.includes('Name') && row.includes('Role') || 
                          row.includes('Scoring Dimension') || 
                          row.includes('Score')
          const cellTag = isHeader ? 'th' : 'td'
          const cellStyle = isHeader ? 
            'padding: 8px 12px; border: 1px solid #d1d5db; background: #f9fafb; font-weight: 600; font-size: 14px;' :
            'padding: 8px 12px; border: 1px solid #d1d5db; font-size: 14px;'
          
          const cellsHtml = cells.map((cell: string) => `<${cellTag} style="${cellStyle}">${cell}</${cellTag}>`).join('')
          return `<tr>${cellsHtml}</tr>`
        })
      
      if (tableRows.length > 0) {
        result += `<table style="width: 100%; border-collapse: collapse; margin: 12px 0;">${tableRows.join('')}</table>`
      }
      
      return result
    })
    
    // Line breaks
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
}

interface MarkdownExportProps {
  phases: PhaseData[]
  currentPhase?: number
}

export function MarkdownExport({ phases, currentPhase }: MarkdownExportProps) {
  const [showPreview, setShowPreview] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [previewMode, setPreviewMode] = useState<'rendered' | 'raw'>('rendered')

  const currentPhaseData = currentPhase ? phases.find(p => p.id === currentPhase) : null
  
  const generateMarkdown = () => {
    if (currentPhaseData) {
      return generatePhaseMarkdown(currentPhaseData)
    }
    return 'No phase selected for export.'
  }

  const handleCopy = async () => {
    const markdown = generateMarkdown()
    const success = await copyToClipboard(markdown)
    if (success) {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  const handleDownload = () => {
    const markdown = generateMarkdown()
    const filename = currentPhaseData 
      ? `phase-${currentPhase}-${currentPhaseData.title.toLowerCase().replace(/\s+/g, '-')}.md`
      : 'phase-export.md'
    downloadMarkdown(markdown, filename)
  }

  return (
    <div style={{
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '20px',
      marginTop: '20px'
    }}>
      <h3 style={{
        color: '#b91c1c',
        marginBottom: '15px',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        Export to Confluence
      </h3>
      
      {currentPhaseData && (
        <div style={{ marginBottom: '15px' }}>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0
          }}>
            Exporting: <strong>Phase {currentPhase}: {currentPhaseData.title}</strong>
          </p>
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button
          onClick={handleCopy}
          style={{
            background: copySuccess ? '#b91c1c' : '#bd3333',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (!copySuccess) e.currentTarget.style.background = '#b91c1c'
          }}
          onMouseLeave={(e) => {
            if (!copySuccess) e.currentTarget.style.background = '#bd3333'
          }}
        >
          {copySuccess ? '✅ Copied!' : '📋 Copy Markdown'}
        </button>
        
        <button
          onClick={handleDownload}
          style={{
            background: '#6b7280',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#4b5563'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#6b7280'}
        >
          📥 Download .md
        </button>
        
        <button
          onClick={() => setShowPreview(!showPreview)}
          style={{
            background: 'white',
            color: '#374151',
            border: '1px solid #d1d5db',
            padding: '10px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
        >
          {showPreview ? '👁️ Hide Preview' : '👀 Preview'}
        </button>
      </div>

      {showPreview && (
        <div style={{
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          padding: '15px',
          marginTop: '15px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '15px'
          }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              margin: 0
            }}>
              Preview:
            </h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setPreviewMode('rendered')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  background: previewMode === 'rendered' ? '#bd3333' : 'white',
                  color: previewMode === 'rendered' ? 'white' : '#374151',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Rendered
              </button>
              <button
                onClick={() => setPreviewMode('raw')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  background: previewMode === 'raw' ? '#bd3333' : 'white',
                  color: previewMode === 'raw' ? 'white' : '#374151',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Raw Markdown
              </button>
            </div>
          </div>
          
          <div style={{
            maxHeight: '400px',
            overflow: 'auto',
            overflowY: 'scroll',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            padding: '15px',
            background: previewMode === 'rendered' ? 'white' : '#f8fafc'
          }}>
            {previewMode === 'rendered' ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: markdownToHtml(generateMarkdown())
                }}
                style={{
                  lineHeight: '1.6',
                  color: '#374151'
                }}
              />
            ) : (
              <pre style={{
                fontSize: '12px',
                color: '#4b5563',
                whiteSpace: 'pre-wrap',
                margin: 0,
                fontFamily: 'ui-monospace, SFMono-Regular, Monaco, Consolas, monospace'
              }}>
                {generateMarkdown()}
              </pre>
            )}
          </div>
        </div>
      )}
      
      <p style={{
        fontSize: '12px',
        color: '#6b7280',
        marginTop: '10px',
        fontStyle: 'italic'
      }}>
        💡 Tip: Copy the markdown and paste directly into your Confluence page for formatted content.
      </p>
    </div>
  )
}