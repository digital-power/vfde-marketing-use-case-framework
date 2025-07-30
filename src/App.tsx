import { useState } from 'react'
import { PhaseTimeline } from '@/components/PhaseTimeline'
import { PhaseNavigation } from '@/components/PhaseNavigation'
import { MarkdownExport } from '@/components/MarkdownExport'
import { PhaseDetailView } from '@/components/PhaseDetailView'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { phases } from '@/data/phases'
import type { ViewMode, FormData } from '@/types'
import type { PhaseData } from '@/utils/markdownGenerator'

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('timeline')
  const [currentPhase, setCurrentPhase] = useState(1)
  const [formData, setFormData] = useLocalStorage<FormData>('marketingFlowData', {})

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const goToPhase = (phaseId: number) => {
    setCurrentPhase(phaseId)
    setViewMode('detail')
  }


  const progressValue = (currentPhase / phases.length) * 100

  // Prepare phase data for markdown export
  const phaseData: PhaseData[] = phases.map(phase => ({
    ...phase,
    formData,
    checklist: []
  }))

  return (
    <div style={{ 
      fontFamily: "'Sansation', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      margin: 0,
      padding: '20px',
      backgroundColor: '#f8f9fa',
      overflowX: 'hidden',
      minHeight: '100vh'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          color: '#22c55e',
          marginBottom: '15px',
          fontSize: '28px',
          textAlign: 'center' as const,
          fontWeight: '700'
        }}>
          Digital marketing use case framework
        </h1>
        
        <p style={{
          textAlign: 'center' as const,
          color: '#6b7280',
          fontSize: '16px',
          marginBottom: '30px',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          A comprehensive framework for developing and implementing marketing use cases, 
          from initial ideation to production optimization.
        </p>
        
        <div style={{ textAlign: 'center' as const, marginBottom: '30px' }}>
          <button
            style={{
              background: viewMode === 'timeline' ? '#16a34a' : '#22c55e',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              margin: '0 8px',
              fontFamily: 'inherit',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              fontSize: '14px',
              boxShadow: viewMode === 'timeline' ? '0 4px 12px rgba(34, 197, 94, 0.3)' : 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#16a34a'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = viewMode === 'timeline' ? '#16a34a' : '#22c55e'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
            onClick={() => setViewMode('timeline')}
          >
            Process Overview
          </button>
          <button
            style={{
              background: viewMode === 'detail' ? '#16a34a' : '#22c55e',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              margin: '0 8px',
              fontFamily: 'inherit',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              fontSize: '14px',
              boxShadow: viewMode === 'detail' ? '0 4px 12px rgba(34, 197, 94, 0.3)' : 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#16a34a'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = viewMode === 'detail' ? '#16a34a' : '#22c55e'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
            onClick={() => setViewMode('detail')}
          >
            Detailed Planning
          </button>
        </div>
        
        {viewMode === 'timeline' && (
          <div className="max-w-4xl mx-auto">
            <PhaseTimeline onPhaseClick={goToPhase} />
          </div>
        )}
        
        {viewMode === 'detail' && (
          <div>
            <PhaseNavigation 
              currentPhase={currentPhase}
              onPhaseSelect={setCurrentPhase}
            />
            
            <PhaseDetailView 
              phaseNumber={currentPhase}
              formData={formData} 
              onFormChange={handleFormChange} 
            />
            
            <div style={{ marginTop: '30px' }}>
              <div style={{
                background: '#e5e7eb',
                height: '8px',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: 'linear-gradient(90deg, #22c55e, #16a34a)',
                  height: '100%',
                  width: `${progressValue}%`,
                  transition: 'width 0.3s ease',
                  borderRadius: '4px'
                }} />
              </div>
              <div style={{
                textAlign: 'center' as const,
                marginTop: '8px',
                fontSize: '14px',
                color: '#6b7280'
              }}>
                Phase {currentPhase} of {phases.length}
              </div>
            </div>
            
            {/* Markdown Export Component */}
            <MarkdownExport phases={phaseData} currentPhase={currentPhase} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App