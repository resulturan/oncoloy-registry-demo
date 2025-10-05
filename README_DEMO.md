# Oncology Registry Automation Demo App

A comprehensive demo application showcasing an automated oncology registry workflow using mCODE (Minimal Common Oncology Data Elements) extraction and validation.

## Overview

This is a **frontend-only demonstration application** designed for presentations. It simulates the complete workflow of oncology data extraction from patient cohort selection through to validated mCODE element submission.

**Important:** All data is mocked/hardcoded. There is NO backend, NO database, and NO real API calls.

## Technology Stack

- **React 18.3+** with TypeScript
- **Redux Toolkit** for state management
- **Ant Design (antd)** for UI components
- **React Router v6** for navigation
- **Rsbuild** as the build tool

## Features

### 1. Cohort Selection (`/cohort-selection`)
- Filter patients by diagnosis date, cancer type, facility, age, and gender
- Sortable patient table with pagination
- Select multiple patients for processing
- Export and save cohort functionality (mock)

### 2. Document Browsing (`/documents/:patientId`)
- Browse patient documents chronologically
- Interactive timeline visualization
- Filter by document type (Pathology, Clinical Notes, Radiology, Lab Results, Treatment)
- Document viewer with metadata
- Navigate between selected patients

### 3. Ontology Selection (`/ontology-selection`)
- Interactive mCODE element tree with checkboxes
- View detailed element information (description, instructions, examples)
- Mandatory vs optional element indicators
- Select all mandatory elements
- Element extraction success rates

### 4. Processing & Extraction (`/processing`)
- Animated real-time processing simulation
- Step-by-step progress (Initialize → Extract → Validate → Complete)
- Per-patient progress tracking with circular progress indicators
- Category-level progress breakdown
- Live extraction log with severity levels (INFO, SUCCESS, WARNING, ERROR)
- Automatic navigation to Review page upon completion

### 5. Review & Validation (`/review/:patientId`)
- Summary dashboard with statistics
- Tabbed interface for mCODE categories
- Element validation cards showing:
  - Extracted values with confidence levels
  - Alternative values and normalization
  - Provenance (source documents)
  - Confirm/Edit/Reject actions
- Special handling for biomarker tests (array elements)
- Export options (JSON, FHIR)
- Submit to registry (mock)

## Installation & Running

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Setup
\`\`\`bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
# App will be available at http://localhost:3000

# Build for production
pnpm build

# Preview production build
pnpm preview
\`\`\`

## Application Flow

1. **Start** → `/cohort-selection`
   - Select patients from the table
   - Click "Process Selected"

2. **Navigate** → `/documents/:patientId`
   - Browse patient documents
   - View timeline
   - Click "Proceed to Ontology Selection"

3. **Select Elements** → `/ontology-selection`
   - Choose mCODE elements to extract
   - Review element details
   - Click "Proceed to Processing"

4. **Extract Data** → `/processing`
   - Watch automated extraction simulation
   - View real-time logs
   - Auto-navigates to Review when complete

5. **Validate** → `/review/:patientId`
   - Review extracted elements
   - Confirm/reject values
   - View provenance
   - Export or submit to registry

## Mock Data

The application includes:
- **15 mock patients** with realistic demographics and diagnoses
- **20+ documents per patient** spanning multiple years
- **Complete mCODE template** with all element definitions
- **Fully populated sample results** for validation demonstration

All data is located in `src/data/`:
- `mockPatients.ts` - Patient cohort data
- `mockDocuments.ts` - Document generator
- `mcodeTemplate.ts` - mCODE element definitions
- `sampleResults.ts` - Extracted mCODE results

## Project Structure

\`\`\`
src/
├── components/
│   ├── pages/              # Main page components
│   │   ├── CohortSelectionPage.tsx
│   │   ├── DocumentBrowsingPage.tsx
│   │   ├── OntologySelectionPage.tsx
│   │   ├── ProcessingPage.tsx
│   │   └── ReviewValidationPage.tsx
│   └── ui/                 # Reusable UI components (future)
├── store/
│   ├── slices/             # Redux slices for each domain
│   │   ├── cohortSlice.ts
│   │   ├── documentsSlice.ts
│   │   ├── ontologySlice.ts
│   │   ├── processingSlice.ts
│   │   └── validationSlice.ts
│   ├── hooks.ts            # Typed Redux hooks
│   └── index.ts            # Store configuration
├── data/                   # Mock data
├── types/                  # TypeScript type definitions
├── App.tsx                 # Main app with routing
└── index.tsx              # Entry point with Redux provider
\`\`\`

## Key Features for Presentations

### Visual Polish
- Smooth animations and transitions
- Color-coded status indicators
- Progress bars and circular progress
- Hover effects on interactive elements
- Professional Ant Design components

### Realistic Workflow
- Multi-step process mirrors real oncology registry workflow
- Simulated extraction with timing and logs
- Confidence scores and alternative values
- Provenance tracking to source documents

### Interactive Elements
- All buttons and controls are functional
- Navigation between pages works seamlessly
- State is preserved across the workflow
- Modal dialogs for exports and actions

## Customization

### Adding More Patients
Edit `src/data/mockPatients.ts` to add more patient records.

### Modifying mCODE Elements
Edit `src/data/mcodeTemplate.ts` to change element definitions.

### Changing Extraction Results
Edit `src/data/sampleResults.ts` to modify validation data.

### Styling
- Global styles: `src/App.css`
- Ant Design theme: `src/App.tsx` (ConfigProvider)

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Performance Notes

- Optimized for 1920x1080 presentation screens
- Responsive design for smaller screens
- Smooth animations (can be disabled if needed)
- Fast load times with Rsbuild

## License

This is a demonstration application for presentation purposes.

## Support

For questions or issues with the demo, please refer to:
- Ant Design documentation: https://ant.design
- React documentation: https://react.dev
- Redux Toolkit documentation: https://redux-toolkit.js.org
