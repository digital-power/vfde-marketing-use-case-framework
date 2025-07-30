# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern frontend-only interactive web application for marketing use case development that provides a structured 8-phase framework for taking marketing ideas from ideation through optimization. The application features React, TypeScript, Tailwind CSS, and includes markdown export functionality for easy copy-paste into Confluence.

## Architecture

The application follows a modern frontend-only architecture:

### Frontend (React + TypeScript + Vite)
- **React 18**: Modern React with hooks and TypeScript
- **Vite**: Lightning-fast build tool and development server  
- **Tailwind CSS**: Utility-first styling with custom green theme
- **shadcn/ui**: Beautiful, accessible UI components
- **Bun**: Fast JavaScript package manager
- **localStorage**: Client-side data persistence
- **Markdown Export**: Generate formatted documentation for Confluence

### Key Directories
```
├── src/
│   ├── components/        # Reusable React components
│   │   ├── phases/        # Phase-specific components
│   │   └── ui/            # shadcn/ui components
│   ├── hooks/             # Custom React hooks (useLocalStorage)
│   ├── types/             # TypeScript type definitions
│   ├── data/              # Static data (phases, colors)
│   └── utils/             # Utility functions (markdown generation)
├── public/                # Static assets
└── dist/                  # Build output (generated)
```

## Development Commands

### Start Development Environment
```bash
# Single command to start development
bun run dev

# Install dependencies (first time setup)
bun install
```

### Common Development Tasks
```bash
# Development
bun install              # Install dependencies
bun run dev             # Start dev server
bun run build           # Build for production
bun run preview         # Preview build

# Add UI components
bunx shadcn add [component-name]
```

## Key Components

### React Components
- **App.tsx**: Main application with view switching logic
- **PhaseTimeline**: Visual timeline component for process overview
- **PhaseNavigation**: Phase selector for detail view
- **FormField**: Reusable form input component with validation
- **ChecklistSection**: Interactive checklist with persistence
- **PhaseDetailView**: Generic component that dynamically renders all phases based on data

### Data Management
- **useLocalStorage**: Custom hook for localStorage with type safety
- **Types**: TypeScript interfaces for FormData, Phase, ChecklistItem
- **Client-side Storage**: All data persisted locally via localStorage

### Styling System
- **Tailwind Config**: Custom green color scheme matching original design
- **Component Styling**: Consistent spacing, typography, and animations
- **Responsive Design**: Mobile-first approach with breakpoints

## Markdown Export Features

### Export Functionality
- **Phase-specific Export**: Export individual phase data to markdown
- **Complete Framework Export**: Export all phases with progress summary
- **Confluence Ready**: Formatted markdown optimized for Confluence paste
- **Copy to Clipboard**: One-click copy functionality
- **Download Support**: Save markdown files locally

### Export Components
- **MarkdownExport**: Main export component with preview and options
- **markdownGenerator**: Utility functions for markdown generation

## Configuration Files

### Configuration
- `vite.config.ts`: Vite build configuration with path aliases
- `tailwind.config.js`: Tailwind CSS with custom green theme
- `tsconfig.app.json`: TypeScript configuration with strict mode
- `components.json`: shadcn/ui component configuration
- `package.json`: Project dependencies and scripts

## Development Workflow

### Adding New Phases
1. Update `src/data/phases.ts` with new phase data including:
   - Basic phase info (id, title, category, description)
   - Activities and expected roles
   - Checklist questions
   - Form fields with sections, labels, and types
2. The PhaseDetailView component will automatically render the new phase
3. Update markdown generator to include new phase data if needed

### Styling Guidelines
- Use Tailwind utility classes for consistency
- Follow existing component patterns for spacing/typography
- Maintain green color scheme: `text-green-500`, `bg-green-50`, etc.
- Use shadcn/ui components for form inputs and UI elements

### Type Safety
- All components use TypeScript interfaces
- Form data uses strict typing via FormData interface
- API responses are typed for better development experience