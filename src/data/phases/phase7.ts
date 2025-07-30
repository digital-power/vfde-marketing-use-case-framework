import type { PhaseContent } from "../phases"

export const phase7: PhaseContent = {
  id: 7,
  title: "Phase 7: Process Feedback",
  category: "Feedback",
  description: "This phase focuses on processing feedback from the validation phase and validating that the solution meets all requirements and expectations before deployment on production.",
  activities: [
    "Process feedback from validation phase",
    "Validate improved solution meets all requirements",
    "Obtain final approval from key stakeholders",
    "Update documentation with implementation details"
  ],
  expectedRoles: [
    "Data Engineer (Owner)",
    "Product Owner (Support)"
  ],
  checklistQuestions: [
    "Has all feedback been processed and addressed?",
    "Does the updated solution still meet all functional and non-functional requirements?",
    "Is the solution ready for deployment?"
  ],
  deliverables: [
    "Updated solution",
    "Final approval from stakeholders",
    "Deployment readiness assessment"
  ],
  formFields: [
    {
      id: "feedbackAnalysis",
      label: "What feedback has been addressed?",
      type: "textarea",
      placeholder: "Document feedback addressed based on user feedback...",
      rows: 4,
      section: "Feedback"
    },
    {
      id: "requirementsValidation",
      label: "Have all requirements been validated?",
      type: "textarea",
      placeholder: "Validate that the solution still meets all functional and non-functional requirements...",
      rows: 3,
      section: "Requirements Validation"
    },
    {
      id: "stakeholderSignoff",
      label: "Do you have final approval from stakeholders?",
      type: "textarea",
      placeholder: "Document the final approval from key stakeholders, mention names and any additional comments...",
      rows: 3,
      section: "Approval"
    },
    {
      id: "lessonsLearned",
      label: "What lessons have been learned during the development of this solution?",
      type: "textarea",
      placeholder: "Document lessons learned and recommendations for future implementations...",
      rows: 3,
      section: "Lessons Learned"
    }
  ],
  scoringAxes: [
    {
      id: "requirementCompliance",
      label: "Requirements Compliance",
      description: "How well the solution meets all functional and non-functional requirements",
      scaleLabels: ["Poor", "Partial", "Good", "Strong", "Complete"],
    },
    {
      id: "deploymentReadiness",
      label: "Deployment Readiness",
      description: "How ready the solution is for production deployment",
      scaleLabels: ["Not Ready", "Some Issues", "Nearly Ready", "Ready", "Fully Ready"],
    },
    {
      id: "deploymentRisk",
      label: "Deployment Risk",
      description: "Risk associated with deploying the solution to production",
      scaleLabels: ["Very Low", "Low", "Moderate", "High", "Very High"],
      inverse: true,
    }
  ],
  scoringTitle: "Process Feedback & Validation",
}