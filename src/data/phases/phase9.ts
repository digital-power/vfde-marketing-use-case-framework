import type { PhaseContent } from '../phases'

export const phase9: PhaseContent = {
  id: 9,
  title: "Phase 9: Optimization & Iteration",
  category: "Optimization",
  description: "This phase focuses on continuous improvement of the solution based on production data and user feedback.",
  activities: [
    "Optimize system performance and efficiency",
    "Add new features based on user feedback",
    "Refine model parameters based on production data",
    "Improve operational processes and workflows"
  ],
  expectedRoles: [
    "Product Manager (Owner)",
    "Data Scientist (Support)"
  ],
  checklistQuestions: [
    "Are optimization opportunities identified and prioritized?",
    "Are new features delivering expected value?",
    "Is model performance improving over time?",
    "Are operational processes efficient?",
    "Is continuous improvement cycle established?"
  ],
  formFields: [
    {
      id: "optimizations",
      label: "What optimizations can be made?",
      type: "textarea",
      placeholder: "Document performance improvements, efficiency gains, and optimizations...",
      rows: 4,
      section: "System Optimization"
    },
    {
      id: "featureEnhancements",
      label: "What feature enhancements are planned?",
      type: "textarea",
      placeholder: "Plan and document new features based on user feedback and needs...",
      rows: 3,
      section: "Product Development"
    },
    {
      id: "modelImprovement",
      label: "What model improvements are needed?",
      type: "textarea",
      placeholder: "Document model improvements, retraining, and performance gains...",
      rows: 3,
      section: "Model Enhancement"
    },
    {
      id: "processImprovement",
      label: "What operational process improvements can be made?",
      type: "textarea",
      placeholder: "Ways to optimize operational processes, workflows, and team efficiency...",
      rows: 3,
      section: "Process Improvement"
    },
  ],
  scoringAxes: [
    {
      id: 'featureValue',
      label: 'Feature Value',
      description: 'Value delivered by new features based on user feedback',
      scaleLabels: ['No Value', 'Low Value', 'Medium Value', 'High Value', 'Very High Value'],
    },
    {
      id: 'modelPerformance',
      label: 'Model Performance',
      description: 'Improvement in model performance based on production data',
      scaleLabels: ['Very Poor', 'Poor', 'Average', 'Good', 'Excellent'],
    },
    {
      id: 'processEfficiency',
      label: 'Process Efficiency',
      description: 'Efficiency of operational processes and workflows',
      scaleLabels: ['Very Inefficient', 'Inefficient', 'Average', 'Efficient', 'Very Efficient'],
    }
  ],
  scoringTitle: "Optimization & Iteration Scoring Assessment",
  deliverables: [
    'Optimization plan',
    'Performance improvements',
    'Lessons learned',
    'Next iteration roadmap'
  ]
}