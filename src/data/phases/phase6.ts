import type { PhaseContent } from "../phases"

export const phase6: PhaseContent = {
  id: 6,
  title: "Phase 6: Validation",
  category: "Validation",
  description: "This phase validates the solution with real users and data on a controlled testing environment to ensure it meets business requirements.",
  activities: [
    "Validate solution with real users and scenarios",
    "Run controlled experiments to validate behavior",
    "Gather user feedback and performance metrics",
  ],
  expectedRoles: [
    "Product Owner (Owner)",
    "Digital Marketing Specialist (Support)",
    "Technical Web Analyst (Support)",
    "Data Engineer (Support)",
  ],
  checklistQuestions: [
    "Has the solution been tested with real users?",
    "Are the results of user testing documented?",
  ],
  deliverables: [
    "Validation results",
    "Performance metrics",
    "User feedback",
  ],
  formFields: [
    {
      id: "userTesting",
      label: "What are the results of user testing?",
      type: "textarea",
      placeholder: "Document user testing sessions, feedback, and iterations...",
      rows: 4,
      section: "User Validation"
    },
    {
      id: "performanceValidation",
      label: "What are the results of performance validation?",
      type: "textarea",
      placeholder: "Validate system performance under real-world conditions, think of process time and accuracy...",
      rows: 3,
      section: "Performance Testing"
    },
    {
      id: "stakeholderFeedback",
      label: "What feedback have stakeholders provided?",
      type: "textarea",
      placeholder: "Document stakeholder feedback and approval decisions...",
      rows: 3,
      section: "Approval Process"
    }
  ],
  scoringAxes: [
    {
      id: "userSatisfaction",
      label: "User Satisfaction",
      description: "Satisfaction level of users with the solution",
      scaleLabels: ["Very Low", "Low", "Moderate", "High", "Very High"],
    },
    {
      id: "performanceReliability",
      label: "Performance Reliability",
      description: "Reliability of the solution under expected load",
      scaleLabels: ["Very Poor", "Poor", "Average", "Good", "Excellent"],
    },
    {
      id: "feedbackProcessingEffort",
      label: "Feedback Processing Effort",
      description: "Effort required to process and implement feedback",
      scaleLabels: ["Very Low", "Low", "Moderate", "High", "Very High"],
      inverse: true,
    }
  ],
  scoringTitle: "Validation",
}