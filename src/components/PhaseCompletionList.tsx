interface PhaseCompletionListProps {
  questions: string[]
  phaseNumber: number
  formData: Record<string, string>
  onFormChange: (field: string, value: string) => void
}

export function PhaseCompletionList({ 
  questions, 
  phaseNumber, 
  formData, 
  onFormChange 
}: PhaseCompletionListProps) {
  return (
    <div style={{ 
      marginTop: '30px', 
      padding: '20px', 
      backgroundColor: '#fef3c7', 
      borderRadius: '8px', 
      border: '1px solid #f59e0b' 
    }}>
      <h3 style={{ 
        fontSize: '18px', 
        fontWeight: '600', 
        color: '#1f2937', 
        marginBottom: '15px' 
      }}>
        Phase Completion Checklist
      </h3>
      <div style={{ display: 'grid', gap: '10px' }}>
        {questions.map((question, index) => (
          <label 
            key={index} 
            style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '8px', 
              fontSize: '14px', 
              color: '#1f2937' 
            }}
          >
            <input 
              type="checkbox" 
              style={{ marginTop: '2px' }}
              checked={formData[`question${phaseNumber}_${index}`] === 'true'}
              onChange={(e) => onFormChange(`question${phaseNumber}_${index}`, e.target.checked.toString())}
            />
            <span style={{ lineHeight: '1.5' }}>{question}</span>
          </label>
        ))}
      </div>
    </div>
  )
}