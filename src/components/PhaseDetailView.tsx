import { FormField } from '@/components/FormField'
import { PhaseCompletionList } from '@/components/PhaseCompletionList'
import { PhaseScoring } from '@/components/PhaseScoring'
import { useState } from 'react'
import { phaseContent, categoryColors } from '@/data/phases'

interface PhaseDetailViewProps {
  phaseNumber: number
  formData: Record<string, string>
  onFormChange: (field: string, value: string) => void
}

export function PhaseDetailView({ 
  phaseNumber, 
  formData, 
  onFormChange
}: PhaseDetailViewProps) {
  const content = phaseContent[phaseNumber]
  
  if (!content) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
        Phase {phaseNumber} content not yet available
      </div>
    )
  }

  const [stakeholders, setStakeholders] = useState([
    { 
      id: 'owner', 
      name: formData.ownerName || '', 
      role: formData.ownerRole || '', 
      company: formData.ownerCompany || '',
      team: formData.ownerTeam || '',
      email: formData.ownerEmail || '', 
      remarks: formData.ownerRemarks || '' 
    },
    { 
      id: 'support', 
      name: formData.supportName || '', 
      role: formData.supportRole || '', 
      company: formData.supportCompany || '',
      team: formData.supportTeam || '',
      email: formData.supportEmail || '', 
      remarks: formData.supportRemarks || '' 
    }
  ])

  const [roleOptions, setRoleOptions] = useState([
    'Digital Marketeer',
    'Data Engineer', 
    'Data Scientist',
    'DevOps Engineer',
    'Product Owner',
    'Finance',
    'Technical Web Analyst',
  ])

  const [companyOptions, setCompanyOptions] = useState([
    'Digital Power',
    'Vodafone'
  ])

  const [teamOptions, setTeamOptions] = useState([
    'Orbit',
    'Octo'
  ])

  const [showExpectedRoles, setShowExpectedRoles] = useState(false)

  const addStakeholder = () => {
    const newId = `stakeholder-${Date.now()}`
    setStakeholders([...stakeholders, { id: newId, name: '', role: '', company: '', team: '', email: '', remarks: '' }])
  }

  const removeStakeholder = (id: string) => {
    if (stakeholders.length > 1) {
      setStakeholders(prev => prev.filter(s => s.id !== id))
    }
  }

  const updateStakeholder = (id: string, field: string, value: string) => {
    setStakeholders(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))
    // Also update formData for persistence
    if (id === 'owner') {
      onFormChange(`owner${field.charAt(0).toUpperCase() + field.slice(1)}`, value)
    } else if (id === 'support') {
      onFormChange(`support${field.charAt(0).toUpperCase() + field.slice(1)}`, value)
    }
  }

  const addRoleOption = (newRole: string) => {
    if (newRole && !roleOptions.includes(newRole)) {
      setRoleOptions([...roleOptions, newRole])
    }
  }

  const addCompanyOption = (newCompany: string) => {
    if (newCompany && !companyOptions.includes(newCompany)) {
      setCompanyOptions([...companyOptions, newCompany])
    }
  }

  const addTeamOption = (newTeam: string) => {
    if (newTeam && !teamOptions.includes(newTeam)) {
      setTeamOptions([...teamOptions, newTeam])
    }
  }

  const CustomSelect = ({ value, options, onSelect, onAddNew, placeholder }: {
    value: string
    options: string[]
    onSelect: (value: string) => void
    onAddNew: (value: string) => void
    placeholder: string
  }) => {
    const [newValue, setNewValue] = useState('')
    const [showAddNew, setShowAddNew] = useState(false)

    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <select
          value={value}
          onChange={(e) => {
            if (e.target.value === 'ADD_NEW') {
              setShowAddNew(true)
            } else {
              onSelect(e.target.value)
            }
          }}
          style={{
            width: '100%',
            padding: '8px 30px 8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            outline: 'none',
            backgroundColor: 'white',
            appearance: 'none',
            backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"12\\" height=\\"8\\" viewBox=\\"0 0 12 8\\"><path fill=\\"%23666\\" d=\\"M6 8L0 2h12z\\"/></svg>")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px center',
            backgroundSize: '12px 8px'
          }}
        >
          <option value="">{placeholder}</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
          <option value="ADD_NEW">+ Add new...</option>
        </select>
        
        {showAddNew && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 10,
            backgroundColor: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            padding: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder={`Enter new ...`}
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '12px',
                marginBottom: '6px'
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onAddNew(newValue)
                  onSelect(newValue)
                  setNewValue('')
                  setShowAddNew(false)
                } else if (e.key === 'Escape') {
                  setNewValue('')
                  setShowAddNew(false)
                }
              }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={() => {
                  onAddNew(newValue)
                  onSelect(newValue)
                  setNewValue('')
                  setShowAddNew(false)
                }}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#bd3333',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Add
              </button>
              <button
                onClick={() => {
                  setNewValue('')
                  setShowAddNew(false)
                }}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{
      display: 'block',
      background: 'white',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      borderLeft: '5px solid #bd3333',
      animation: 'fadeIn 0.3s ease-in'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '25px'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          background: '#bd3333',
          color: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '700',
          fontSize: '24px'
        }}>
          {phaseNumber}
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{
            background: categoryColors[content.category] || '#bd3333',
            color: 'white',
            padding: '6px 15px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '10px',
            display: 'inline-block'
          }}>
            {content.category}
          </div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1f2937',
            margin: 0
          }}>
            {content.title}
          </h2>
        </div>
      </div>
      
      <div style={{
        background: '#f9fafb',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '25px'
      }}>
        {/* Phase Description - Highlighted Block */}
        <div style={{
          background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
          border: '1px solid #bd3333',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '25px',
          boxShadow: '0 2px 8px rgba(189, 51, 51, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              background: '#bd3333',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              ℹ
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#b91c1c',
              margin: 0
            }}>
              Phase Description
            </h3>
          </div>
          <p style={{ 
            color: '#b91c1c', 
            fontSize: '16px', 
            margin: 0, 
            lineHeight: '1.6',
            fontWeight: '500'
          }}>
            {content.description}
          </p>
        </div>

        {/* Key Activities - Highlighted Block */}
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          border: '1px solid #3b82f6',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '25px',
          boxShadow: '0 2px 8px rgba(59, 130, 246, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              background: '#3b82f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              ⚡
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#1e40af',
              margin: 0
            }}>
              Key Activities
            </h3>
          </div>
          <ul style={{ 
            color: '#1e40af', 
            fontSize: '16px', 
            paddingLeft: '20px', 
            lineHeight: '1.6',
            margin: 0,
            fontWeight: '500'
          }}>
            {content.activities?.map((activity, index) => (
              <li key={index} style={{ marginBottom: '8px' }} dangerouslySetInnerHTML={{ __html: activity }} />
            ))}
          </ul>
        </div>

        {/* Dynamic Form Sections */}
        {content.formFields && (() => {
          const sections = content.formFields.reduce((acc, field) => {
            const section = field.section || 'General'
            if (!acc[section]) acc[section] = []
            acc[section].push(field)
            return acc
          }, {} as Record<string, typeof content.formFields>)

          return Object.entries(sections).map(([sectionName, fields]) => (
            <div key={sectionName} style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '15px' }}>
                {sectionName}
              </h3>
              <div style={{ display: 'grid', gap: '20px', paddingRight: '10px' }}>
                {fields.map(field => (
                  <FormField
                    key={field.id}
                    type={field.type}
                    label={field.label}
                    value={formData[field.id] || ''}
                    onChange={(value) => onFormChange(field.id, value)}
                    placeholder={field.placeholder}
                    rows={field.rows}
                  />
                ))}
              </div>
            </div>
          ))
        })()}

        <div style={{ marginTop: '30px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            marginBottom: '15px' 
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
              Stakeholders
            </h3>
            <button
              onClick={() => setShowExpectedRoles(!showExpectedRoles)}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '1px solid #d1d5db',
                backgroundColor: showExpectedRoles ? '#3b82f6' : '#f9fafb',
                color: showExpectedRoles ? 'white' : '#6b7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!showExpectedRoles) {
                  e.currentTarget.style.backgroundColor = '#e5e7eb'
                  e.currentTarget.style.borderColor = '#9ca3af'
                }
              }}
              onMouseLeave={(e) => {
                if (!showExpectedRoles) {
                  e.currentTarget.style.backgroundColor = '#f9fafb'
                  e.currentTarget.style.borderColor = '#d1d5db'
                }
              }}
              title="Show expected roles for this phase"
            >
              i
            </button>
          </div>
          
          {showExpectedRoles && (
            <div style={{ 
              marginBottom: '20px', 
              padding: '16px', 
              backgroundColor: '#eff6ff', 
              borderRadius: '8px', 
              border: '1px solid #bfdbfe',
              borderLeft: '4px solid #3b82f6'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#3b82f6',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  👥
                </div>
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#1e40af' 
                }}>
                  Expected roles for this phase:
                </span>
              </div>
              <div style={{ 
                fontSize: '14px', 
                color: '#1e40af',
                lineHeight: '1.5'
              }}>
                {content.expectedRoles && content.expectedRoles.length > 0 ? (
                  content.expectedRoles.map((role, index) => (
                    <div key={index} style={{ marginBottom: '4px' }}>
                      • {role}
                    </div>
                  ))
                ) : (
                  <div style={{ color: '#6b7280', fontStyle: 'italic' }}>
                    No specific roles defined for this phase
                  </div>
                )}
              </div>
            </div>
          )}
    

          <div style={{ marginBottom: '20px' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'separate',
              borderSpacing: '0',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{ 
                    padding: '15px', 
                    textAlign: 'left', 
                    borderBottom: '1px solid #d1d5db',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    width: '12%'
                  }}>
                    Name
                  </th>
                  <th style={{ 
                    padding: '15px', 
                    textAlign: 'left', 
                    borderBottom: '1px solid #d1d5db',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    width: '12%'
                  }}>
                    Role
                  </th>
                  <th style={{ 
                    padding: '15px', 
                    textAlign: 'left', 
                    borderBottom: '1px solid #d1d5db',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    width: '12%'
                  }}>
                    Company
                  </th>
                  <th style={{ 
                    padding: '15px', 
                    textAlign: 'left', 
                    borderBottom: '1px solid #d1d5db',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    width: '12%'
                  }}>
                    Team
                  </th>
                  <th style={{ 
                    padding: '15px', 
                    textAlign: 'left', 
                    borderBottom: '1px solid #d1d5db',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    width: '12%'
                  }}>
                    Email
                  </th>
                  <th style={{ 
                    padding: '15px', 
                    textAlign: 'left', 
                    borderBottom: '1px solid #d1d5db',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    width: '30%'
                  }}>
                    Involvement & Responsibilities
                  </th>
                  <th style={{ 
                    padding: '15px 25px 15px 15px', 
                    textAlign: 'center', 
                    borderBottom: '1px solid #d1d5db',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    width: '10%'
                  }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {stakeholders.map((stakeholder, index) => (
                  <tr key={stakeholder.id}>
                    <td style={{ 
                      padding: '15px', 
                      borderBottom: index < stakeholders.length - 1 ? '1px solid #e5e7eb' : 'none',
                      verticalAlign: 'top'
                    }}>
                      <input
                        type="text"
                        value={stakeholder.name}
                        onChange={(e) => updateStakeholder(stakeholder.id, 'name', e.target.value)}
                        placeholder="Enter name"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </td>
                    <td style={{ 
                      padding: '15px', 
                      borderBottom: index < stakeholders.length - 1 ? '1px solid #e5e7eb' : 'none',
                      verticalAlign: 'top'
                    }}>
                      <CustomSelect
                        value={stakeholder.role}
                        options={roleOptions}
                        onSelect={(value) => updateStakeholder(stakeholder.id, 'role', value)}
                        onAddNew={addRoleOption}
                        placeholder="Select role"
                      />
                    </td>
                    <td style={{ 
                      padding: '15px', 
                      borderBottom: index < stakeholders.length - 1 ? '1px solid #e5e7eb' : 'none',
                      verticalAlign: 'top'
                    }}>
                      <CustomSelect
                        value={stakeholder.company}
                        options={companyOptions}
                        onSelect={(value) => updateStakeholder(stakeholder.id, 'company', value)}
                        onAddNew={addCompanyOption}
                        placeholder="Select company"
                      />
                    </td>
                    <td style={{ 
                      padding: '15px', 
                      borderBottom: index < stakeholders.length - 1 ? '1px solid #e5e7eb' : 'none',
                      verticalAlign: 'top'
                    }}>
                      <CustomSelect
                        value={stakeholder.team}
                        options={teamOptions}
                        onSelect={(value) => updateStakeholder(stakeholder.id, 'team', value)}
                        onAddNew={addTeamOption}
                        placeholder="Select team"
                      />
                    </td>
                    <td style={{ 
                      padding: '15px', 
                      borderBottom: index < stakeholders.length - 1 ? '1px solid #e5e7eb' : 'none',
                      verticalAlign: 'top'
                    }}>
                      <input
                        type="email"
                        value={stakeholder.email}
                        onChange={(e) => updateStakeholder(stakeholder.id, 'email', e.target.value)}
                        placeholder="Enter email"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </td>
                    <td style={{ 
                      padding: '15px', 
                      borderBottom: index < stakeholders.length - 1 ? '1px solid #e5e7eb' : 'none',
                      verticalAlign: 'top'
                    }}>
                      <textarea
                        value={stakeholder.remarks}
                        onChange={(e) => updateStakeholder(stakeholder.id, 'remarks', e.target.value)}
                        placeholder="Describe involvement..."
                        rows={1}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          outline: 'none',
                          resize: 'vertical',
                          minHeight: '36px',
                          height: '36px',
                          fontFamily: 'inherit',
                          lineHeight: '1.2',
                          boxSizing: 'border-box'
                        }}
                      />
                    </td>
                    <td style={{ 
                      padding: '15px 25px 15px 15px', 
                      borderBottom: index < stakeholders.length - 1 ? '1px solid #e5e7eb' : 'none',
                      verticalAlign: 'top',
                      textAlign: 'center'
                    }}>
                      {stakeholders.length > 1 && (
                        <button
                          onClick={() => removeStakeholder(stakeholder.id)}
                          style={{
                            padding: '6px 10px',
                            backgroundColor: '#f3f4f6',
                            border: '1px dashed #9ca3af',
                            borderRadius: '6px',
                            color: '#374151',
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#e5e7eb'
                            e.currentTarget.style.borderColor = '#6b7280'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#f3f4f6'
                            e.currentTarget.style.borderColor = '#9ca3af'
                          }}
                        >
                          −
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button
            onClick={addStakeholder}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: '#f3f4f6',
              border: '1px dashed #9ca3af',
              borderRadius: '6px',
              color: '#374151',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e5e7eb'
              e.currentTarget.style.borderColor = '#6b7280'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6'
              e.currentTarget.style.borderColor = '#9ca3af'
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>+</span>
            Add Stakeholder
          </button>
          
        </div>

        {/* Spacing after stakeholder section */}
        <div style={{ marginBottom: '30px' }} />

        {/* Phase Scoring */}
        {content.scoringAxes && (
          <PhaseScoring
            phaseId={phaseNumber}
            scores={(() => {
              const scores: Record<string, number> = {}
              if (content.scoringAxes) {
                content.scoringAxes.forEach(axis => {
                  const storedValue = formData[`score_${axis.id}`]
                  scores[axis.id] = storedValue ? parseInt(storedValue) : 3
                })
              }
              return scores
            })()}
            onScoreChange={(axisId, value) => onFormChange(`score_${axisId}`, value.toString())}
          />
        )}

        <PhaseCompletionList 
          questions={content.checklistQuestions || []}
          phaseNumber={phaseNumber}
          formData={formData}
          onFormChange={onFormChange}
        />

      </div>
    </div>
  )
}