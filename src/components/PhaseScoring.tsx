import { ScoringSlider } from './ScoringSlider'
import { phaseContent } from '@/data/phases'

interface PhaseScoringProps {
  phaseId: number
  scores: Record<string, number>
  onScoreChange: (axisId: string, value: number) => void
}

export function PhaseScoring({ phaseId, scores, onScoreChange }: PhaseScoringProps) {
  const phase = phaseContent[phaseId]
  
  if (!phase || !phase.scoringAxes) {
    return null
  }


  return (
    <div style={{
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      border: '1px solid #0369a1',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '25px',
      boxShadow: '0 2px 8px rgba(3, 105, 161, 0.1)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '24px'
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          background: '#0369a1',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          📊
        </div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#0c4a6e',
          margin: 0
        }}>
          {`${phase.scoringTitle} Scoring`}
        </h3>
      </div>

      {/* Scoring Axes */}
      <div style={{
        display: 'grid',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {phase.scoringAxes.map(axis => (
          <ScoringSlider
            key={axis.id}
            axis={axis}
            value={scores[axis.id] || 3}
            onChange={(value) => onScoreChange(axis.id, value)}
          />
        ))}
      </div>

    </div>
  )
}