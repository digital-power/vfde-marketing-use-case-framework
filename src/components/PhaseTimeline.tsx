import { phases, phaseContent } from '@/data/phases'
import { useState } from 'react'

interface PhaseTimelineProps {
  onPhaseClick: (phaseId: number) => void
}

export function PhaseTimeline({ onPhaseClick }: PhaseTimelineProps) {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null)
  return (
    <div style={{
      position: 'relative',
      padding: '20px 0'
    }}>
      {/* Timeline line with gradient - exactly like original */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        width: '4px',
        background: 'linear-gradient(180deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
        transform: 'translateX(-50%)',
        content: ''
      }} />
      
      {phases.map((phase, index) => (
        <div
          key={phase.id}
          style={{
            position: 'relative',
            marginBottom: '40px',
            width: '100%',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
          }}
          onClick={() => onPhaseClick(phase.id)}
        >
          {/* Phase content with exact original styling */}
          <div
            style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              borderRadius: '12px',
              padding: '25px',
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.1)',
              borderLeft: index % 2 === 0 ? 'none' : '5px solid #22c55e',
              borderRight: index % 2 === 0 ? '5px solid #22c55e' : 'none',
              position: 'relative',
              transition: 'all 0.3s ease',
              marginLeft: index % 2 === 0 ? '0' : '55%',
              marginRight: index % 2 === 0 ? '55%' : '0',
              textAlign: index % 2 === 0 ? 'right' as const : 'left' as const
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.1)'
            }}
          >
            <div style={{
              display: 'inline-block',
              background: getCategoryColor(phase.category),
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              marginBottom: '15px'
            }}>
              {phase.category}
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '10px'
            }}>
              {phase.title}
            </div>
            
            <div style={{ 
              marginTop: '15px',
              display: 'flex',
              justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start'
            }}>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setExpandedPhase(expandedPhase === phase.id ? null : phase.id)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#16a34a',
                  padding: '0',
                  flexDirection: index % 2 === 0 ? 'row-reverse' : 'row'
                }}
              >
                <span style={{
                  transform: expandedPhase === phase.id ? 'rotate(90deg)' : 
                    index % 2 === 0 ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  fontSize: '12px'
                }}>
                  ▶
                </span>
                Deliverables
              </button>
            </div>
            {expandedPhase === phase.id && (
              <div style={{
                marginTop: '8px',
                animation: 'fadeIn 0.2s ease-in',
                display: 'flex',
                flexDirection: 'column',
                alignItems: index % 2 === 0 ? 'flex-end' : 'flex-start'
              }}>
                {phaseContent[phase.id]?.deliverables?.map((deliverable, idx) => (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '6px',
                      fontSize: '13px',
                      color: '#4b5563',
                      flexDirection: index % 2 === 0 ? 'row-reverse' : 'row'
                    }}
                  >
                    <span style={{
                      color: '#22c55e',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      ✓
                    </span>
                    <span>{deliverable}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Phase number circle with exact original styling */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50px',
            height: '50px',
            background: '#22c55e',
            color: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            fontSize: '18px',
            zIndex: 2,
            border: '4px solid white',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}>
            {phase.id}
          </div>
        </div>
      ))}

      {/* Mobile responsive styles using media queries */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .timeline-mobile .phase-content {
            margin-left: 70px !important;
            margin-right: 0 !important;
            text-align: left !important;
            border-left: 5px solid #22c55e !important;
            border-right: none !important;
          }
          .timeline-mobile::before {
            left: 30px !important;
          }
          .timeline-mobile .phase-number {
            left: 30px !important;
            transform: translateY(-50%) !important;
          }
        }
      `}</style>
    </div>
  )
}

// Helper function to get exact category colors from original
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Discovery': '#15803d',
    'Assessment': '#16a34a', 
    'Requirements': '#22c55e',
    'Design': '#16a34a',
    'Development': '#16a34a',
    'Validation': '#15803d',
    'Implementation': '#166534',
    'Monitoring': '#14532d',
    'Optimization': '#052e16'
  }
  return colors[category] || '#22c55e'
}