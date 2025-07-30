import type { ScoringAxis } from '@/data/phases'

interface ScoringSliderProps {
  axis: ScoringAxis
  value: number
  onChange: (value: number) => void
}

export function ScoringSlider({ axis, value, onChange }: ScoringSliderProps) {
  const greenColor = '#22c55e' // Use green for selected states
  
  return (
    <div style={{
      padding: '16px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      background: 'white'
    }}>
      {/* Axis Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px'
      }}>
        <div style={{ flex: 1 }}>
          <h4 style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#1f2937',
            margin: 0,
            marginBottom: '4px'
          }}>
            {axis.label}
          </h4>
          <p style={{
            fontSize: '13px',
            color: '#6b7280',
            margin: 0
          }}>
            {axis.description}
          </p>
        </div>
        <div style={{
          fontSize: '18px',
          fontWeight: '700',
          color: greenColor,
          minWidth: '32px',
          textAlign: 'center'
        }}>
          {value}
        </div>
      </div>

      {/* 5-Point Scale Buttons */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '12px'
      }}>
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            onClick={() => onChange(score)}
            style={{
              flex: 1,
              padding: '8px 4px',
              border: value === score ? `2px solid ${greenColor}` : '1px solid #d1d5db',
              borderRadius: '6px',
              background: value === score ? `${greenColor}15` : 'white',
              color: value === score ? greenColor : '#6b7280',
              fontSize: '14px',
              fontWeight: value === score ? '600' : '400',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              if (value !== score) {
                e.currentTarget.style.borderColor = greenColor
                e.currentTarget.style.background = `${greenColor}08`
              }
            }}
            onMouseLeave={(e) => {
              if (value !== score) {
                e.currentTarget.style.borderColor = '#d1d5db'
                e.currentTarget.style.background = 'white'
              }
            }}
          >
            {score}
          </button>
        ))}
      </div>

      {/* Scale Labels */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '8px'
      }}>
        {axis.scaleLabels.map((label, index) => (
          <span
            key={index}
            style={{
              fontSize: '11px',
              color: value === index + 1 ? greenColor : '#9ca3af',
              fontWeight: value === index + 1 ? '600' : '400',
              textAlign: 'center',
              flex: 1,
              transition: 'color 0.2s ease'
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}