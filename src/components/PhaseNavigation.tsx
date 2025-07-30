import { phases } from '@/data/phases'

interface PhaseNavigationProps {
  currentPhase: number
  onPhaseSelect: (phaseId: number) => void
}

export function PhaseNavigation({ currentPhase, onPhaseSelect }: PhaseNavigationProps) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'nowrap' as const,
      gap: '6px',
      marginBottom: '30px',
      justifyContent: 'center',
      overflowX: 'auto' as const
    }}>
      {phases.map((phase) => {
        const isActive = currentPhase === phase.id
        return (
          <button
            key={phase.id}
            style={{
              background: isActive ? '#22c55e' : 'white',
              color: isActive ? 'white' : '#22c55e',
              border: '2px solid #22c55e',
              padding: '6px 12px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: '600',
              fontSize: '11px',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              minWidth: 'fit-content',
              whiteSpace: 'nowrap' as const
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = '#f0fdf4'
              }
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isActive ? '#22c55e' : 'white'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
            onClick={() => onPhaseSelect(phase.id)}
          >
            <div style={{
              background: isActive ? 'white' : '#dcfce7',
              color: '#22c55e',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: '700'
            }}>
              {phase.id}
            </div>
            <span>{phase.category}</span>
          </button>
        )
      })}
    </div>
  )
}