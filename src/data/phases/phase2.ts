import type { PhaseContent } from "../phases"

export const phase2: PhaseContent = {
  id: 2,
  title: "Phase 2: Business Case Assessment",
  category: "Assessment",
  description: "This phase validates the business opportunity and ensures there's a strong case for moving forward. The focus is on understanding ROI, resource requirements, and technical feasibility.",
  activities: [
    "Calculate expected ROI and business value",
    "Assess technical feasibility and resource requirements",
    "Identify marketing and operational resources needed",
    "Evaluate risks and mitigation strategies"
  ],
  expectedRoles: [
    "Product Owner (Owner)",
    "Data Scientist (Support)",
    "Data Engineer (Support)",
    "Finance (Support)"
  ],
  checklistQuestions: [
    "Has the quantified business value and ROI been projected?",
    "Is the feasibility of the business case assessed?",
    "Are the required resources identified and available?",
    "Are the risks and mitigation strategies defined?",
    "Are the timelines and milestones established?"
  ],
  deliverables: [
    "Business case document",
    "ROI analysis",
    "Resource requirements",
    "Timeline and milestones",
    "Go/no-go decision"
  ],
  formFields: [
    {
      id: "businessValueValidation",
      label: "What is the expected return on investment (ROI) and business value?",
      type: "textarea",
      placeholder: "Provide specific revenue impact projections, cost savings or efficiency gains...",
      rows: 4,
      section: "Business Case"
    },
    {
      id: "technicalFeasibilityAssessment",
      label: "What technical expertise and resources are required?",
      type: "textarea",
      placeholder: "Evaluate technical team capabilities, required infrastructure and integration complexity...",
      rows: 4,
      section: "Resources"
    },
    {
      id: "marketingOperationalResources",
      label: "What marketing or operational resources are required?",
      type: "textarea",
      placeholder: "Evaluate marketing team capacity, operational support and any additional resources needed...",
      rows: 4,
      section: "Resources"
    },
    {
      id: "riskAssessment",
      label: "What are the key risks and mitigation strategies?",
      type: "textarea",
      placeholder: "Identify potential risks related to data quality, technical feasibility, and operational impact...",
      rows: 4,
      section: "Risk Management"
    },
    {
      id: "timelineAndMilestones",
      label: "What is the estimated timeline and key milestones?",
      type: "textarea",
      placeholder: "Outline the expected timeline for implementation, including key milestones and deliverables...",
      rows: 3,
      section: "Timeline",
    }
  ],
  scoringAxes: [
    {
      id: "revenueImpact",
      label: "Revenue Potential",
      description: "Expected annual revenue impact",
      scaleLabels: ["Minimal", "Low", "Moderate", "High", "Very High"],
    }, 
    {
      id: "resourceRequirements",
      label: "Resource Requirements",
      description: "Resource requirements to implement this use case",
      scaleLabels: ["Very Low", "Low", "Moderate", "High", "Very High"],
      inverse: true,
    },
    {
      id: "riskLevel",
      label: "Risk Level",
      description: "Level of technical, business and operational risks",
      scaleLabels: ["Very Low", "Low", "Moderate", "High", "Very High"],
      inverse: true,
    }
  ],
  scoringTitle: "Business Case"
}