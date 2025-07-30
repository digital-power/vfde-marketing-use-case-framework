import type { FormData } from '@/types'
import { phaseContent } from '@/data/phases'

export interface PhaseData {
  id: number
  title: string
  category: string
  formData: FormData
  checklist: never[] // Keeping for compatibility but empty
}

// Generate scoring section for a phase
function generateScoringMarkdown(phaseId: number, formData: FormData): string {
  const phase = phaseContent[phaseId]
  if (!phase || !phase.scoringAxes) {
    return ''
  }

  let markdown = `# ${phase.scoringTitle} Scoring\n`

  // Create scoring table
  markdown += `| Scoring Dimension | Score | Rating | Description |\n`
  markdown += `|:------------------|:------|:-------|:-------------|\n`
  
  let hasScores = false
  phase.scoringAxes.forEach(axis => {
    const storedValue = formData[`score_${axis.id}`]
    const rawScore = storedValue ? parseInt(storedValue) : 3
    const rating = axis.scaleLabels[rawScore - 1] || 'N/A'
    
    // For display purposes, show the effective score (inverse logic applied)
    const effectiveScore = axis.inverse ? (6 - rawScore) : rawScore
    
    // Check if this is not a default score (3)
    if (storedValue) {
      hasScores = true
    }
    
    // Show both raw score for user understanding and effective score for calculations
    const scoreDisplay = axis.inverse ? `${effectiveScore}/5 (${rawScore} inverted)` : `${effectiveScore}/5`
    markdown += `| ${axis.label} | ${scoreDisplay} | ${rating} | ${axis.description} |\n`
  })
  
  if (!hasScores) {
    markdown += `\n*No custom scores have been set for this phase. Default scores (3/5) are shown above.*\n\n`
  } else {
    // Calculate average score and provide interpretation
    const scores = phase.scoringAxes.map(axis => {
      const storedValue = formData[`score_${axis.id}`]
      const rawScore = storedValue ? parseInt(storedValue) : 3
      // Handle inverse scoring - if marked as inverse, flip the score (1->5, 2->4, 3->3, 4->2, 5->1)
      return axis.inverse ? (6 - rawScore) : rawScore
    })
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length
    
    let interpretation = ''
    if (averageScore >= 4) {
      interpretation = 'Strong potential - high priority for implementation'
    } else if (averageScore >= 3.5) {
      interpretation = 'Good potential - recommended for implementation'
    } else if (averageScore >= 3) {
      interpretation = 'Moderate potential - requires further evaluation'
    } else if (averageScore >= 2.5) {
      interpretation = 'Limited potential - consider improvements or alternatives'
    } else {
      interpretation = 'Low potential - not recommended for current implementation'
    }
    
    markdown += `\n**Overall Assessment:** ${averageScore.toFixed(1)}/5 - ${interpretation}\n\n`
  }
  
  return markdown
}

// Generate stakeholders section for a phase
function generateStakeholdersMarkdown(formData: FormData): string {
  // Check if there's stakeholder data
  const hasOwnerData = formData.ownerName || formData.ownerRole || formData.ownerCompany || formData.ownerTeam || formData.ownerEmail || formData.ownerRemarks
  const hasSupportData = formData.supportName || formData.supportRole || formData.supportCompany || formData.supportTeam || formData.supportEmail || formData.supportRemarks
  
  if (!hasOwnerData && !hasSupportData) {
    return ''
  }

  let markdown = `# Stakeholders\n`
  markdown += `| Name | Role | Company | Team | Email | Involvement & Responsibilities |\n`
  markdown += `|:-----|:-----|:--------|:-----|:------|:-------------------------------|\n`
  
  // Owner row (only if has data)
  if (hasOwnerData) {
    const ownerName = formData.ownerName || '-'
    const ownerRole = formData.ownerRole || '-'
    const ownerCompany = formData.ownerCompany || '-'
    const ownerTeam = formData.ownerTeam || '-'
    const ownerEmail = formData.ownerEmail || '-'
    const ownerRemarks = formData.ownerRemarks || '-'
    markdown += `| ${ownerName} | ${ownerRole} | ${ownerCompany} | ${ownerTeam} | ${ownerEmail} | ${ownerRemarks} |\n`
  }
  
  // Support row (only if has data)
  if (hasSupportData) {
    const supportName = formData.supportName || '-'
    const supportRole = formData.supportRole || '-'
    const supportCompany = formData.supportCompany || '-'
    const supportTeam = formData.supportTeam || '-'
    const supportEmail = formData.supportEmail || '-'
    const supportRemarks = formData.supportRemarks || '-'
    markdown += `| ${supportName} | ${supportRole} | ${supportCompany} | ${supportTeam} | ${supportEmail} | ${supportRemarks} |\n`
  }
  
  return markdown
}

// Get form fields dynamically from phase data
function getPhaseFormFields(phaseId: number): string[] {
  const phase = phaseContent[phaseId]
  if (!phase || !phase.formFields) return []
  
  // Get all form field IDs from the phase data
  const formFieldIds = phase.formFields.map(field => field.id)
  
  // Add stakeholder fields that are common across phases
  const stakeholderFields = [
    'ownerName', 'ownerRole', 'ownerCompany', 'ownerTeam', 'ownerEmail', 'ownerRemarks',
    'supportName', 'supportRole', 'supportCompany', 'supportTeam', 'supportEmail', 'supportRemarks'
  ]
  
  return [...formFieldIds, ...stakeholderFields]
}

export function generatePhaseMarkdown(phase: PhaseData): string {
  const { title, formData } = phase

  let markdown = `# ${title}\n`

  // Get form fields specific to this phase
  const phaseFormFields = getPhaseFormFields(phase.id)
  const relevantFormData = Object.entries(formData).filter(([key, value]) => 
    value && value.trim() && phaseFormFields.includes(key)
  )
  
  if (relevantFormData.length > 0) {
    // Generate sections dynamically based on phase form fields
    const currentPhase = phaseContent[phase.id]
    if (currentPhase && currentPhase.formFields) {
      // Group fields by section
      const fieldsBySection: Record<string, typeof currentPhase.formFields> = {}
      
      currentPhase.formFields.forEach(field => {
        const section = field.section || 'General'
        if (!fieldsBySection[section]) {
          fieldsBySection[section] = []
        }
        fieldsBySection[section].push(field)
      })
      
      // Generate markdown for each section
      Object.entries(fieldsBySection).forEach(([sectionName, fields]) => {
        const fieldsWithData = fields.filter(field => 
          formData[field.id] && formData[field.id].trim()
        )
        
        if (fieldsWithData.length > 0) {
          markdown += `## ${sectionName}\n\n`
          fieldsWithData.forEach(field => {
            const value = formData[field.id]
            markdown += `### ${field.label}\n${value}\n\n`
          })
        }
      })
    } else {
      // Fallback for phases without form field definitions
      relevantFormData.forEach(([key, value]) => {
        // Skip stakeholder fields - they're handled separately
        if (key.includes('owner') || key.includes('support')) return
        
        // Convert camelCase to readable format
        const fieldName = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())
          .replace(/([a-z])([A-Z])/g, '$1 $2')
          .replace(/\b\w/g, l => l.toUpperCase())
        markdown += `**${fieldName}:** ${value}\n\n`
      })
    }
  } else {
    markdown += `## Details\n\n`
    markdown += `*No specific details have been entered for this phase yet.*\n\n`
  }
  
  // Add stakeholders section
  const stakeholdersMarkdown = generateStakeholdersMarkdown(formData)
  if (stakeholdersMarkdown) {
    markdown += `\n${stakeholdersMarkdown}`
  }
  
  // Add scoring section
  const scoringMarkdown = generateScoringMarkdown(phase.id, formData)
  if (scoringMarkdown) {
    markdown += `\n${scoringMarkdown}`
  }
  
  // Add checklist status from phase data
  const phaseData = phaseContent[phase.id]
  const phaseChecklistQuestions = phaseData?.checklistQuestions || []
  if (phaseChecklistQuestions.length > 0) {
    markdown += `## Phase Completion Checklist\n\n`
    const completedChecklistItems = phaseChecklistQuestions.filter((_, index) => 
      formData[`question${phase.id}_${index}`] === 'true'
    )
    
    phaseChecklistQuestions.forEach((question, index) => {
      const isChecked = formData[`question${phase.id}_${index}`] === 'true'
      const checkbox = isChecked ? '✅' : '❌'
      markdown += `${checkbox} ${question}\n`
    })
    
    const checklistProgress = Math.round((completedChecklistItems.length / phaseChecklistQuestions.length) * 100)
    markdown += `\n**Checklist Progress:** ${completedChecklistItems.length}/${phaseChecklistQuestions.length} items completed (${checklistProgress}%)\n\n`
  }

  
  return markdown
}

export function generateAllPhasesMarkdown(phases: PhaseData[]): string {
  let markdown = `# Marketing Use Case Development Framework\n\n`
  
  // Add executive summary based on form data using phase-specific field mapping
  const phasesWithData = phases.filter(phase => {
    const phaseFormFields = getPhaseFormFields(phase.id)
    const relevantFormData = Object.entries(phase.formData).filter(([key, value]) => 
      value && value.trim() && phaseFormFields.includes(key)
    )
    return relevantFormData.length > 0
  })
  
  const totalPhases = phases.length
  const completedPhases = phasesWithData.length
  const overallProgress = totalPhases > 0 ? Math.round((completedPhases / totalPhases) * 100) : 0
  
  markdown += `## Executive Summary\n\n`
  markdown += `**Overall Progress:** ${completedPhases}/${totalPhases} phases have form data (${overallProgress}%)\n\n`
  
  
  // Add phase overview with field counts
  markdown += `## Phase Overview\n\n`
  phases.forEach(phase => {
    const phaseFormFields = getPhaseFormFields(phase.id)
    const relevantFormData = Object.entries(phase.formData).filter(([key, value]) => 
      value && value.trim() && phaseFormFields.includes(key)
    )
    const hasData = relevantFormData.length > 0
    const status = hasData ? '✅' : '🔴'
    const statusText = hasData ? `In Progress (${relevantFormData.length}/${phaseFormFields.length} fields)` : 'Not Started'
    
    markdown += `- **Phase ${phase.id}: ${phase.title}** ${status} ${statusText}\n`
  })
  markdown += `\n---\n\n`
  
  // Add detailed phase information
  phases.forEach((phase, index) => {
    markdown += generatePhaseMarkdown(phase)
    if (index < phases.length - 1) {
      markdown += `\n---\n\n`
    }
  })
  
  return markdown
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
    return false
  }
}

export function downloadMarkdown(content: string, filename: string = 'marketing-framework.md'): void {
  const blob = new Blob([content], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}