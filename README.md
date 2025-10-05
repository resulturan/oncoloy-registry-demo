# Oncology Registry Automation - Demo Application

A comprehensive demonstration application showcasing an automated oncology data extraction workflow using **mCODE** (Minimal Common Oncology Data Elements). This is a frontend-only React application designed for presentations and demonstrations.

> **Note:** This is a demo application with NO backend, NO database, and NO real API calls. All data is mocked for presentation purposes.

## 🎯 Overview

This application demonstrates the complete workflow of oncology registry automation, from patient cohort selection through mCODE element extraction and validation. It features:

- **5-page workflow** covering the entire data extraction process
- **Realistic medical documents** with authentic clinical content
- **Interactive mCODE element selection** with tree-based UI
- **Animated extraction simulation** with real-time progress
- **Comprehensive validation interface** with provenance tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

Install the dependencies:

```bash
pnpm install
```

### Development

Start the dev server:

```bash
pnpm dev
```

The app will be available at [http://localhost:80](http://localhost:80)

### Production Build

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## 📋 Application Flow

### 1. **Cohort Selection** (`/cohort-selection`)
- Filter patients by diagnosis date, cancer type, facility, age, and gender
- Sortable patient table with 15 mock patients
- Multi-select patients for processing
- Export and save cohort functionality

### 2. **Document Browsing** (`/documents/:patientId`)
- Browse patient documents chronologically
- Interactive timeline visualization
- Filter by document type (Pathology, Clinical Notes, Radiology, Lab Results, Treatment)
- Realistic document viewer with PDF-style display
- 20+ synthetic documents per patient including:
  - Radiology reports (CT, PET-CT)
  - Pathology reports with molecular testing
  - Lab results (CBC, CMP, NGS panels)
  - Clinical consultation notes
  - Treatment records (surgery, chemo, radiation)

### 3. **Ontology Selection** (`/ontology-selection`)
- Interactive mCODE element tree
- View detailed element information (description, instructions, examples)
- Mandatory vs optional element indicators
- Element extraction success rate metrics
- Reference guidelines integration

### 4. **Processing & Extraction** (`/processing`)
- Animated real-time processing simulation
- Step-by-step progress (Initialize → Extract → Validate → Complete)
- Per-patient progress tracking
- Category-level progress breakdown
- Live extraction log with severity levels (INFO, SUCCESS, WARNING, ERROR)
- Auto-navigation to Review page upon completion

### 5. **Review & Validation** (`/review/:patientId`)
- Summary dashboard with extraction statistics
- Tabbed interface for mCODE categories
- Element validation cards with:
  - Extracted values and confidence scores
  - Alternative values and normalization
  - Provenance (source documents)
  - Confirm/Edit/Reject actions
- Special handling for biomarker tests (array elements)
- Export options (JSON, FHIR)
- Submit to registry (mock)

## 🛠️ Technology Stack

- **React 18.3+** with TypeScript (strict mode)
- **Redux Toolkit** for state management
- **React Router v6** for navigation
- **Ant Design (antd)** for UI components
- **Rsbuild** as build tool

## 📁 Project Structure

```
src/
├── components/
│   └── pages/              # 5 main page components
│       ├── CohortSelectionPage.tsx
│       ├── DocumentBrowsingPage.tsx
│       ├── OntologySelectionPage.tsx
│       ├── ProcessingPage.tsx
│       └── ReviewValidationPage.tsx
├── store/
│   ├── slices/            # Redux slices (5 domains)
│   │   ├── cohortSlice.ts
│   │   ├── documentsSlice.ts
│   │   ├── ontologySlice.ts
│   │   ├── processingSlice.ts
│   │   └── validationSlice.ts
│   ├── hooks.ts           # Typed Redux hooks
│   └── index.ts           # Store configuration
├── data/                  # Mock data
│   ├── mockPatients.ts
│   ├── mockDocuments.ts
│   ├── documentTemplates.ts
│   ├── mcodeTemplate.ts
│   └── sampleResults.ts
├── types/                 # TypeScript interfaces
├── App.tsx                # Router configuration
└── index.tsx             # Entry point with Redux Provider
```

## 🎨 Key Features

### Realistic Medical Documents
- **CT Chest Reports** - Detailed radiology findings with measurements
- **PET-CT Reports** - Nuclear medicine with SUV values
- **Pathology Reports** - Surgical pathology with IHC and molecular testing
- **Lab Results** - CBC, CMP with reference ranges
- **Molecular Testing** - NGS panels with EGFR, ALK, PD-L1 results
- **Clinical Notes** - Oncology consultations and treatment plans
- **Operative Reports** - Detailed surgical procedures
- **Treatment Orders** - Chemotherapy and radiation therapy plans

### PDF-Style Document Viewer
- Authentic PDF appearance for medical reports
- Dark gray background with white page
- Professional typography (Times New Roman for PDFs, Courier New for text)
- Page headers and footers
- Scrollable content for long documents

### Interactive Processing Simulation
- 10-15 second animated extraction
- Real-time progress bars and logs
- Category-level progress tracking
- Simulated extraction confidence scores

### Comprehensive Validation
- Element-by-element review
- Provenance tracking to source documents
- Alternative values with confidence scores
- Batch validation actions

## 🔧 Configuration

The application is configured via:
- `rsbuild.config.ts` - Build configuration (port 80, title)
- `tsconfig.json` - TypeScript strict mode
- `src/App.tsx` - Ant Design theme (primary color: #0098DA)

## 📚 Documentation

- See [README_DEMO.md](./README_DEMO.md) for detailed application documentation
- See [CLAUDE.md](./CLAUDE.md) for architecture and development notes

## 🎯 Use Cases

This demo application is ideal for:
- **Presentations** - Showcase oncology data automation workflows
- **Stakeholder demos** - Demonstrate mCODE extraction capabilities
- **Training** - Explain oncology registry automation concepts
- **Development reference** - Example of React + Redux + Ant Design architecture

## ⚠️ Important Notes

- **Demo Only:** No real data processing or storage
- **Mock Data:** All 15 patients and documents are synthetic
- **Frontend Only:** No backend API calls
- **Presentation Ready:** Optimized for 1920x1080 screens

## 📄 License

This is a demonstration application for presentation purposes.

---

Built with ❤️ using React, Redux Toolkit, Ant Design, and Rsbuild
