import type { PhaseContent } from "../phases"

export const phase4: PhaseContent = {
  id: 4,
  title: "Phase 4: Technical Design & Planning",
  category: "Design",
  description: "This phase focuses on creating the technical blueprint for the solution. The team designs the architecture, data models, and integration plans needed to build a scalable and maintainable system.",
  activities: [
    "Design technical architecture",
    "Define data models and schemas",
    "Plan system integration and scalability requirements",
  ],
  expectedRoles: [
    "Data Engineer (Owner)",
    "Data Scientist (Support)",
    "DevOps Engineer (Support)",
    "Product Owner (Validation)"
  ],
  checklistQuestions: [
    "Is the technical architecture fully designed?",
    "Are data models and schemas defined?",
    "Is the system integration plan complete?",
    "Are scalability and performance requirements addressed?",
    "Is the design reviewed and approved by stakeholders?"
  ],
  deliverables: [
    "Technical architecture",
    "Implementation plan",
  ],
  formFields: [
    {
      id: "architectureDesign",
      label: "What is the technical architecture design?",
      type: "textarea",
      placeholder: "Describe the overall technical architecture and system components, including data flow, infrastructure, and technology stack...",
      rows: 4,
      section: "Architecture Design"
    },
    {
      id: "dataModels",
      label: "What are the data models and schemas?",
      type: "textarea",
      placeholder: "Define input and output of data...",
      rows: 3,
      section: "Data Design"
    }
  ],
  scoringAxes: [
    {
      id: "technicalComplexity",
      label: "Technical Complexity",
      description: "Complexity of the technical implementation",
      scaleLabels: ["Very Low", "Low", "Moderate", "High", "Very High"],
      inverse: true,
    },
    {
      id: "scalabilityPotential",
      label: "Scalability Potential",
      description: "Ability to expand and grow impact",
      scaleLabels: ["Limited", "Small", "Moderate", "High", "Unlimited"],
    },
    {
      id: "reusability",
      label: "Reusability",
      description: "Potential to reuse components for other use cases",
      scaleLabels: ["Single-use", "Limited", "Some", "High", "Universal"],
    }
  ],
  scoringTitle: "Technical",
}