import type { Phase } from '@/types'

// Import individual phase data
import { phase1 } from './phases/phase1'
import { phase2 } from './phases/phase2'
import { phase3 } from './phases/phase3'
import { phase4 } from './phases/phase4'
import { phase5 } from './phases/phase5'
import { phase6 } from './phases/phase6'
import { phase7 } from './phases/phase7'
import { phase8 } from './phases/phase8'
import { phase9 } from './phases/phase9'

export interface FormField {
  id: string
  label: string
  type: 'input' | 'textarea'
  placeholder?: string
  rows?: number
  section?: string
}

export interface ScoringAxis {
  id: string
  label: string
  description: string
  scaleLabels: [string, string, string, string, string] // 5-point scale labels
  inverse?: boolean // true for axes where higher values are worse (like complexity, risk)
}

export interface PhaseContent {
  id: number
  title: string
  category: string
  description?: string
  activities?: string[]
  expectedRoles?: string[]
  checklistQuestions?: string[]
  formFields?: FormField[]
  scoringAxes?: ScoringAxis[]
  scoringTitle?: string
  deliverables?: string[]
}

// Combine all phase content from individual files
export const phaseContent: Record<number, PhaseContent> = {
  1: phase1,
  2: phase2,
  3: phase3,
  4: phase4,
  5: phase5,
  6: phase6,
  7: phase7,
  8: phase8,
  9: phase9
}

// Derive phases array from phaseContent to eliminate duplication
export const phases: Phase[] = Object.values(phaseContent).map(phase => ({
  id: phase.id,
  title: phase.title,
  category: phase.category
}))

export const categoryColors: Record<string, string> = {
  Discovery: "bg-green-800",
  Assessment: "bg-green-600", 
  Requirements: "bg-green-500",
  Design: "bg-green-400",
  Development: "bg-green-600",
  Validation: "bg-green-700",
  Implementation: "bg-green-800",
  Monitoring: "bg-green-900",
  Optimization: "bg-gray-900"
}

