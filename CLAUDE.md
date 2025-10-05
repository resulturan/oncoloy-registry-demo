# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **Oncology Registry Automation Demo Application** - a frontend-only React application showcasing an automated oncology data extraction workflow using mCODE (Minimal Common Oncology Data Elements). Built with Rsbuild, Redux Toolkit, Ant Design, and TypeScript.

**Important:** This is a demo/presentation app with NO backend, NO database, and NO real API calls. All data is mocked.

## Development Commands

- **Start dev server**: `pnpm dev` (opens at http://localhost:3000)
- **Build for production**: `pnpm build`
- **Preview production build**: `pnpm preview`
- **Install dependencies**: `pnpm install`

## Application Architecture

### Tech Stack
- **React 18.3+** with TypeScript (strict mode)
- **Redux Toolkit** for state management
- **React Router v6** for navigation
- **Ant Design (antd)** for UI components
- **Rsbuild** as build tool

### Application Flow

The application follows a 5-page workflow:

1. **Cohort Selection** (`/cohort-selection`) - Filter and select patients
2. **Document Browsing** (`/documents/:patientId`) - Browse patient documents with timeline
3. **Ontology Selection** (`/ontology-selection`) - Select mCODE elements to extract
4. **Processing** (`/processing`) - Animated extraction simulation
5. **Review & Validation** (`/review/:patientId`) - Validate extracted data with provenance

### Project Structure

```
src/
├── components/pages/       # Main page components (5 pages)
├── store/
│   ├── slices/            # Redux slices (cohort, documents, ontology, processing, validation)
│   ├── hooks.ts           # Typed Redux hooks (useAppDispatch, useAppSelector)
│   └── index.ts           # Store configuration
├── data/                  # Mock data (patients, documents, mCODE template, results)
├── types/                 # TypeScript interfaces
├── App.tsx                # Router configuration
└── index.tsx             # Entry point with Redux Provider
```

### Redux State Management

The application uses 5 Redux slices:

- **cohortSlice**: Patient selection, filters, pagination
- **documentsSlice**: Document browsing, timeline, filters
- **ontologySlice**: mCODE element selection, tree state
- **processingSlice**: Extraction progress, logs, patient progress
- **validationSlice**: Validation results, provenance, element status

### Mock Data

All mock data is in `src/data/`:
- `mockPatients.ts` - 15 realistic patient records
- `mockDocuments.ts` - Document generator (20+ docs per patient)
- `mcodeTemplate.ts` - Complete mCODE element definitions
- `sampleResults.ts` - Fully populated extraction results

### Key Implementation Notes

1. **Navigation Flow**: Pages navigate in sequence. Processing page auto-advances to Review after completion.

2. **State Persistence**: Redux state persists during workflow. Selected patients carry through all pages.

3. **Simulated Processing**: Processing page uses setTimeout to simulate extraction over 10-15 seconds with animated progress.

4. **Provenance Tracking**: Each extracted element includes source document references shown in drawers.

5. **Validation Actions**: Elements can be confirmed/rejected, updating status in Redux state.

### TypeScript Configuration

- Strict type checking enabled
- Module resolution: bundler
- JSX runtime: `react-jsx`
- All types defined in `src/types/index.ts`

### Styling

- Ant Design theme configured in App.tsx (ConfigProvider)
- Custom CSS in App.css (transitions, scrollbars, hover effects)
- Color scheme: Primary (#1890ff), Success (#52c41a), Warning (#faad14), Error (#ff4d4f)
