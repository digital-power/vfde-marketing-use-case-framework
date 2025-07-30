import type { PhaseContent } from "../phases"

export const phase5: PhaseContent = {
  id: 5,
  title: "Phase 5: Development",
  category: "Development",
  description: "This phase focuses on building the solution according to the technical design and requirements. The development team implements the system components, features, and functionality as specified in earlier phases.",
  activities: [
    "Develop solution components according to technical specifications",
    "Implement functional requirements and business logic",
    "Build data pipelines and system integrations",
    "Create user interfaces and API endpoints"
  ],
  expectedRoles: [
    "Data Engineer (Owner)",
    "DevOps Engineer (Support)",
    "Product Owner (Validation)"
  ],
  checklistQuestions: [
    "Are all functional and non-functional requirements implemented?",
    "Is the code following established coding standards (testing, documentation, etc.)?",
    "Is basic functionality working as expected when tested?"
  ],
  deliverables: [
    "Developed solution",
    "Unit/integration tests",
    "Documentation",
  ],
  formFields: [
    {
      id: "developmentProgress",
      label: "What is the current development progress?",
      type: "textarea",
      placeholder: "Describe development progress, completed features, and implementation status against requirements...",
      rows: 4,
      section: "Development Progress"
    },
    {
      id: "implementedFeatures",
      label: "What features have been implemented?",
      type: "textarea",
      placeholder: "List completed features, functionality, and system components that have been built...",
      rows: 4,
      section: "Feature Implementation"
    },
    {
      id: "technicalChallenges",
      label: "What technical challenges have been encountered?",
      type: "textarea",
      placeholder: "Document technical challenges, blockers, and how they were resolved or are being addressed...",
      rows: 3,
      section: "Technical Challenges"
    },
    {
      id: "codeQuality",
      label: "How is code quality being maintained?",
      type: "textarea",
      placeholder: "Describe code review processes, coding standards compliance, and quality assurance measures...",
      rows: 3,
      section: "Code Quality"
    }
  ],
  scoringAxes: [
    {
      id: "implementationProgress",
      label: "Implementation Progress",
      description: "Current state of development completion",
      scaleLabels: ["Behind", "Delayed", "On Track", "Ahead", "Complete"],
    },
    {
      id: "testCoverage",
      label: "Test Coverage",
      description: "Extent of unit and integration tests covering the codebase",
      scaleLabels: ["Very Low", "Low", "Moderate", "High", "Very High"],
    },
    {
      id: "codeQuality",
      label: "Code Quality",
      description: "Maintainability and quality of developed code",
      scaleLabels: ["Poor", "Below Standards", "Acceptable", "Good", "Excellent"],
    }
  ],
  scoringTitle: "Development",
}