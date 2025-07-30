interface FormFieldProps {
  type: 'input' | 'textarea' | 'select'
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  options?: string[]
  rows?: number
  className?: string
}

export function FormField({ 
  type, 
  label, 
  value, 
  onChange, 
  placeholder = '', 
  options = [], 
  rows = 4,
  className = ''
}: FormFieldProps) {
  const isEmpty = !value || !value.trim()
  
  const baseStyle = {
    padding: '12px',
    border: isEmpty ? '2px solid #fca5a5' : '2px solid #e5e7eb',
    borderRadius: '6px',
    fontFamily: 'inherit',
    fontSize: '14px',
    transition: 'border-color 0.2s ease',
    width: '100%',
    backgroundColor: isEmpty ? '#fef2f2' : 'white'
  }

  // Focus style applied via onFocus/onBlur handlers

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column' as const,
      ...className && { className }
    }}>
      <label style={{
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '8px',
        fontSize: '14px'
      }}>
        {label}
      </label>
      
      {type === 'input' && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={baseStyle}
          onFocus={(e) => e.target.style.borderColor = '#22c55e'}
          onBlur={(e) => {
            const isEmpty = !e.target.value || !e.target.value.trim()
            e.target.style.borderColor = isEmpty ? '#fca5a5' : '#e5e7eb'
            e.target.style.backgroundColor = isEmpty ? '#fef2f2' : 'white'
          }}
        />
      )}
      
      {type === 'textarea' && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          style={{
            ...baseStyle,
            resize: 'vertical' as const,
            minHeight: '100px'
          }}
          onFocus={(e) => e.target.style.borderColor = '#22c55e'}
          onBlur={(e) => {
            const isEmpty = !e.target.value || !e.target.value.trim()
            e.target.style.borderColor = isEmpty ? '#fca5a5' : '#e5e7eb'
            e.target.style.backgroundColor = isEmpty ? '#fef2f2' : 'white'
          }}
        />
      )}
      
      {type === 'select' && (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={baseStyle}
          onFocus={(e) => e.target.style.borderColor = '#22c55e'}
          onBlur={(e) => {
            const isEmpty = !e.target.value || !e.target.value.trim()
            e.target.style.borderColor = isEmpty ? '#fca5a5' : '#e5e7eb'
            e.target.style.backgroundColor = isEmpty ? '#fef2f2' : 'white'
          }}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}