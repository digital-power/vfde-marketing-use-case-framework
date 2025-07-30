import type { PhaseContent } from '../phases'

export const phase1: PhaseContent = {
  id: 1,
  title: "Phase 1: Discovery ",
  category: "Ideation",
  description: "This starting phase focuses on clearly defining the business opportunity, to make sure that all stakeholders are aligned on the objectives and scope. It also includes identifying the data requirements and additional ML models needed to address the business problem.",
  activities: [
    "Define the business opportunity",
    "Align on objectives and scope",
    "Identify data needs and availability",
    "Evaluate existing models and identify gaps"
  ],
  expectedRoles: [
    "Digital Marketing Manager (Owner)",
    "Data Scientist (Support)"
  ],
  checklistQuestions: [
    "Has the business opportunity been clearly defined?",
    "Are the stakeholders identified and aligned?",
    "Are the success criteria and KPIs defined?",
  ],
  formFields: [
    {
      id: "useCaseName",
      label: "Use case name",
      type: "input",
      placeholder: "e.g., Customer Churn Prediction",
      section: "General Information"
    },
    {
      id: "useCaseExplanation", 
      label: "Brief explanation of use case",
      type: "textarea",
      placeholder: "Briefly describe what this use case aims to achieve...",
      rows: 3,
      section: "General Information"
    },
    {
      id: "businessProblem",
      label: "What business problem are we solving and for which customer segments?",
      type: "textarea", 
      placeholder: "Describe the specific business problem and target segments...",
      rows: 3,
      section: "Business Context"
    },
    {
      id: "successMetrics",
      label: "How will we measure success?",
      type: "textarea",
      placeholder: "Define success metrics and KPIs...",
      rows: 3,
      section: "Business Context"
    },
    {
      id: "dataAvailability",
      label: "What data do we need and is it available?",
      type: "textarea",
      placeholder: "List required data sources and their availability...",
      rows: 3, 
      section: "Data Requirements"
    },
    {
      id: "modelAssessment",
      label: "Can we use existing machine learning models as is or do we need to customize them?",
      type: "textarea",
      placeholder: "Assess existing model capabilities and requirements...",
      rows: 3,
      section: "Data Requirements"
    }
  ],
  scoringAxes: [
    {
      id: 'strategicAlignment',
      label: 'Strategic Alignment',
      description: 'How well it aligns with company strategy',
      scaleLabels: ['Poor', 'Limited', 'Good', 'Strong', 'Perfect'],
    },
    {
      id: 'customerValue',
      label: 'Customer Value',
      description: 'Direct benefit to customers',
      scaleLabels: ['Low', 'Minor', 'Moderate', 'High', 'Exceptional'],
    },
    {
      id: 'dataAvailability',
      label: 'Data Availability',
      description: 'Quality and accessibility of required data',
      scaleLabels: ['Poor', 'Limited', 'Average', 'Good', 'Excellent'],
    }
  ],
  scoringTitle: "Ideation",
  deliverables: [
    'Use case definition',
    'Data availability assessment', 
    'Success metrics',
    'Go/No-go decision'
  ]
}