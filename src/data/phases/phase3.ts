import type { PhaseContent } from "../phases"

export const phase3: PhaseContent = {
  id: 3,
  title: "Phase 3: Requirements Gathering",
  category: "Requirements",
  description: "This phase focuses on gathering detailed functional and non-functional requirements. The team captures specific system behavior, performance expectations, and constraints to ensure the solution meets all stakeholder needs.",
  activities: [
    "Gather functional requirements and user stories",
    "Define non-functional requirements on system performance, scalability, and security",
    "Document system constraints and dependencies",
    "Validate requirements with stakeholders"
  ],
  expectedRoles: [
    "Product Owner (Support)",
  ],
  checklistQuestions: [
    "Are all functional requirements clearly documented?",
    "Are non-functional requirements defined with measurable criteria?",
    "Have system constraints and dependencies been identified?",
    "Are requirements validated and approved by stakeholders?",
  ],
  deliverables: [
    "Requirements document",
    "Acceptance criteria",
    "System constraints",
  ],
  formFields: [
    {
      id: "functionalRequirements",
      label: "What are the functional requirements?",
      type: "textarea",
      placeholder: "Define what the system must do - specific features, user stories, and business logic...",
      rows: 4,
      section: "Functional"
    },
    {
      id: "nonFunctionalRequirements",
      label: "What are the non-functional requirements?",
      type: "textarea",
      placeholder: "Define performance, scalability, security, usability, and reliability requirements...",
      rows: 4,
      section: "Non-Functional"
    },
    {
      id: "systemConstraints",
      label: "What are the system constraints & dependencies?",
      type: "textarea",
      placeholder: "Identify technical constraints, regulatory requirements, and system dependencies...",
      rows: 3,
      section: "Constraints"
    },
    {
      id: "acceptanceCriteria",
      label: "What are the acceptance criteria?",
      type: "textarea",
      placeholder: "Define measurable criteria for validating that requirements are met...",
      rows: 3,
      section: "Validation"
    }
  ],
  scoringAxes: [
    {
      id: "requirementsClarity",
      label: "Requirements Clarity",
      description: "How well-defined and clear the requirements are",
      scaleLabels: ["Vague", "Unclear", "Moderate", "Clear", "Crystal Clear"],
    },
    {
      id: "stakeholderAlignment",
      label: "Stakeholder Alignment",
      description: "Level of agreement among stakeholders on requirements",
      scaleLabels: ["Poor", "Limited", "Good", "Strong", "Perfect"],
    },
    {
      id: "requirementsComplexity",
      label: "Requirements Complexity",
      description: "Complexity of the requirements",
      scaleLabels: ["Very Low", "Low", "Moderate", "High", "Very High"],
      inverse: true,
    },
    {
      id: "changeRisk",
      label: "Requirements Change Risk",
      description: "Risk of requirements changing during development",
      scaleLabels: ["Very Low", "Low", "Moderate", "High", "Very High"],
      inverse: true,
    }
  ],
  scoringTitle: "Requirements Gathering",
}