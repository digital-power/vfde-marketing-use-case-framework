import type { PhaseContent } from "../phases"

export const phase8: PhaseContent = {
  id: 8,
  title: "Phase 8: Deployment & Monitoring",
  category: "Deployment",
  description: "This phase focuses on deploying the solution to production and monitoring its performance to ensure all works as expected.",
  activities: [
    "Deploy solution to production environment",
    "Set up monitoring dashboards and alerts",
    "Inform end users about the go-live",
    "Monitor and resolve production issues"
  ],
  expectedRoles: [
    "Data Engineer (Owner)",
    "DevOps Engineer (Support)",
    "Product Owner (Support)"
  ],
  checklistQuestions: [
    "Is the solution successfully deployed to production?",
    "Are monitoring dashboards and alerts configured?",
    "Are users ready to use the solution?",
  ],
  deliverables: [
    "Deployed solution",
    "Monitoring dashboard",
    "Communication plan"
  ],
  formFields: [
    {
      id: "deploymentPlan",
      label: "What is the deployment strategy?",
      type: "textarea",
      placeholder: "Document deployment strategy, timeline, and rollback procedures...",
      rows: 4,
      section: "Deployment Strategy"
    },
    {
      id: "userTraining",
      label: "What training is being provided to users?",
      type: "textarea",
      placeholder: "Document training materials if needed and elaborate on user adoption...",
      rows: 3,
      section: "User Enablement"
    },
    {
      id: "communicationPlan",
      label: "How will you communicate changes to stakeholders?",
      type: "textarea",
      placeholder: "Document communication plan for stakeholders, including go-live announcements and support agreements...",
      rows: 3,
      section: "Communication Plan"
    },
    {
      id: "monitoringSetup",
      label: "How will you monitor the solution?",
      type: "textarea",
      placeholder: "Establish monitoring processes, alerting mechanisms, rollback procedures...",
      rows: 3,
      section: "Monitoring"
    }
  ],
  scoringAxes: [
    {
      id: "deploymentComplexity",
      label: "Deployment Complexity",
      description: "Complexity of the deployment process",
      scaleLabels: ["Very Simple", "Simple", "Moderate", "Complex", "Very Complex"],
      inverse: true,
    },
    {
      id: "monitoringReadiness",
      label: "Monitoring Readiness",
      description: "Quality and completeness of monitoring setup",
      scaleLabels: ["Poor", "Limited", "Adequate", "Good", "Excellent"],
    },
    {
      id: "userReadiness",
      label: "User Readiness",
      description: "How prepared users are for the new solution",
      scaleLabels: ["Not Ready", "Limited", "Somewhat Ready", "Ready", "Fully Prepared"],
    },
    {
      id: "deploymentRisk",
      label: "Deployment Risk",
      description: "Risk level of the deployment process",
      scaleLabels: ["Very Low", "Low", "Moderate", "High", "Very High"],
      inverse: true,
    }
  ],
  scoringTitle: "Deployment & Monitoring",
}