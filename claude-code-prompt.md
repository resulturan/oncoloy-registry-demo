# Prompt for Claude Code: Oncology Registry Automation Demo App

## Project Overview
Create a **demo/presentation application** for an Oncology Registry Automation system. This is a frontend-only showcase application designed to demonstrate the user workflow and interface concepts during presentations. The app should have visually appealing, polished UI pages that walk through the complete workflow from cohort selection to data validation.

**Important**: This is a demo app with NO backend, NO database, and NO real API calls. All data should be mocked/hardcoded for presentation purposes.

## Technology Stack
- **Framework**: React 18+ with TypeScript
- **State Management**: Redux Toolkit
- **UI Library**: Ant Design (antd) - use their comprehensive component library
- **Routing**: React Router v6
- **Icons**: @ant-design/icons
- **Styling**: Ant Design built-in styling + CSS modules where needed

## Project Setup
Initialize a new React TypeScript project with Vite, install Redux Toolkit, Ant Design, and React Router. Create a clean, professional project structure.

## Application Flow (5 Main Pages)

The application should implement these 5 pages in sequence, following the user journey:

### Page 1: Cohort Selection
### Page 2: Document Browsing
### Page 3: Ontology & Guideline Selection
### Page 4: Processing & Extraction
### Page 5: Review & Validation

## Detailed Page Requirements

### 1. Cohort Selection Page (`/cohort-selection`)

**Purpose**: Allow users to search and select patients for processing

**Layout**:
- App header with title "Oncology Registry Automation", user avatar, settings icon
- Filter panel on the left (collapsible):
  - Date range picker for diagnosis dates
  - Multi-select for cancer types (Lung, Breast, Colon, etc.)
  - Input for facility/provider
  - Demographics filters (age range, gender checkboxes)
  - "Apply Filters" and "Reset" buttons
- Main content area:
  - Results summary: "Showing 50 patients matching criteria"
  - Ant Design Table with columns:
    - Checkbox (for selection)
    - Patient ID/MRN
    - Name
    - Age
    - Primary Diagnosis
    - Diagnosis Date
    - Document Count (with badge)
    - Last Update
  - Pagination controls
  - Table should be sortable
- Action bar at bottom:
  - "X patients selected" indicator
  - "Process Selected" primary button (navigates to document browsing)
  - "Save Cohort" button
  - "Export" button

**Mock Data**: Create 50+ mock patient records with realistic names, MRNs, diagnoses, dates

**Redux State**: Store selected patient IDs, filter criteria, current page

---

### 2. Document Browsing Page (`/documents/:patientId`)

**Purpose**: Browse and preview patient documents in chronological order

**Layout**:
- Header breadcrumb: "Cohort Selection > Document Browsing"
- Left sidebar (200px):
  - List of selected patients with status icons
  - Current patient highlighted
  - Click to switch patients
  - Small patient summary card (photo, name, MRN, diagnosis)
- Top section: 
  - Interactive timeline component showing document distribution
  - Horizontal timeline with year/month markers
  - Colored circles/bars representing document clusters
  - Zoom controls (day/week/month/year views)
  - Use recharts or custom SVG for visualization
- Middle section:
  - Document category filter chips:
    - "All Documents" "Pathology" "Clinical Notes" "Radiology" "Lab Results" "Treatment"
    - Show count badges on each
- Document list (center):
  - Card-based layout showing documents
  - Each card shows:
    - Document icon (different colors by type)
    - Title
    - Date
    - Source provider
    - Format badge (PDF, Text, FHIR)
    - Preview button
- Right panel (collapsible):
  - Document viewer when a document is clicked
  - For demo: Show sample text/mock PDF preview
  - Document metadata section
- Bottom action bar:
  - "Previous Patient" and "Next Patient" buttons
  - "Proceed to Ontology Selection" primary button

**Mock Data**: 
- Multiple document types per patient
- Realistic document titles and dates spanning several years
- Timeline should show clustering of documents around diagnosis/treatment periods

**Redux State**: Current patient, selected document, timeline zoom level, active filters

---

### 3. Ontology & Guideline Selection Page (`/ontology-selection`)

**Purpose**: Select mCODE ontology and review data elements to extract

**Layout**:
- Header breadcrumb: "... > Ontology Selection"
- Top section: Ontology cards
  - Large card for "mCODE" (recommended badge)
  - Card shows: logo/icon, version, element count, description
  - "Select" button (pre-selected for demo)
  - Other ontology cards: NAACCR (grayed out for demo)
- Main content (two-panel layout):
  - **Left Panel (40%)**: mCODE Element Tree
    - Collapsible tree structure with Ant Design Tree component
    - Categories (with icons):
      ```
      📁 Patient (3 elements)
        ☑️ patientIdentifier *
        ☑️ birthDate *
        ☑️ sex *
      📁 Primary Cancer Condition (3 elements)
        ☑️ primaryDiagnosis *
        ☑️ primarySite *
        ☐ laterality
      📁 Secondary Cancer Condition (2 elements)
        ☐ metastaticDiagnosis
        ☐ metastaticSite
      📁 TNM and Stage Group (4 elements)
        ☑️ T_category *
        ☑️ N_category *
        ☑️ M_category *
        ☐ stageGroup
      📁 Histology / Morphology (2 elements)
        ☑️ histology *
        ☑️ morphologyCode *
      📁 Tumor Markers (1 element)
        ☐ biomarkerTests (array)
      📁 Treatment (4 elements)
        ☐ surgicalProcedure (inferrable)
        ☐ radiationTherapy (inferrable)
        ☐ systemicTherapy (inferrable)
        ☐ treatmentIntent
      📁 Disease Status / Recurrence (3 elements)
        ☐ recurrenceIndicator
        ☐ dateOfRecurrence
        ☐ diseaseStatus
      📁 Outcome (3 elements)
        ☑️ vitalStatus *
        ☐ dateOfDeath
        ☐ causeOfDeath
      ```
    - Use checkboxes with indeterminate state for categories
    - * = mandatory (red asterisk)
    - Visual icons for: mandatory, optional, inferrable, array
    - Search box at top of tree
    - "Select All Mandatory" button
    - Category badges showing element counts
  
  - **Right Panel (60%)**: Element Details
    - When an element is clicked in tree, show detailed card:
      - Element name (large, bold)
      - Data type badge (string/date/boolean/array)
      - Mandatory badge (if applicable)
      - "Inference Allowed" badge (if applicable)
      - Description (from mCODE template)
      - Instructions section (expandable)
      - Example values (as tags/chips)
      - Reference guideline link
      - Mock confidence metrics: "This element has 94% extraction success rate"
    - If no element selected: Show mCODE overview info

- Bottom section:
  - "Reference Guidelines" tabbed section (collapsible):
    - Tabs: "AJCC Staging" "SEER Guidelines" "mCODE Docs" "ICD-O-3"
    - Show mock guideline content in cards
- Action bar:
  - Element selection summary: "18 mandatory, 5 optional selected"
  - "Back" button
  - "Proceed to Processing" primary button

**Mock Data**: Use the full mCODE template structure provided below

**Redux State**: Selected ontology, checked elements, expanded tree nodes, selected element for details

---

### 4. Processing & Extraction Page (`/processing`)

**Purpose**: Show real-time extraction progress with animated visualizations

**Layout**:
- Header: "Processing 15 patients..."
- Timeline selector section (top):
  - Visual timeline slider with dual handles
  - Start/end date displays
  - Preset buttons: "Last 6 months" "1 year" "5 years" "All time"
  - Document count within range: "127 documents in selected range"
- Processing options card:
  - Radio group: Basic / Standard / Comprehensive
  - Switch: "Extract Optional Elements"
  - Switch: "Allow Inference for Treatments"
  - Priority selector dropdown
- Large progress section:
  - Overall progress bar (animated)
  - Percentage and time remaining
  - Ant Design Steps component showing: Initialize → Extract → Validate → Complete
- Patient-level progress:
  - Grid of patient cards (3-4 columns)
  - Each card shows:
    - Patient name and MRN
    - Circular progress indicator (Ant Design Progress circle)
    - Current status text: "Extracting TNM staging..."
    - Element category progress bars
    - Success/warning/error icon when complete
- Category breakdown card:
  - Horizontal stacked bar chart showing progress by category
  - Use different colors for each category
  - Legend: Patient, Primary Cancer, TNM, Histology, Treatments, etc.
- Live extraction log (bottom):
  - Ant Design List with auto-scroll
  - Log entries with timestamps, severity badges, messages:
    ```
    [14:23:45] [INFO] Starting extraction for patient MRN-P10001
    [14:23:47] [SUCCESS] ✓ Extracted patientIdentifier: MRN-P10001 (99% confidence)
    [14:23:48] [INFO] Searching pathology reports for histology...
    [14:23:50] [SUCCESS] ✓ Found T_category: cT2b (98% confidence)
    [14:23:51] [WARNING] ⚠ N_category not explicit, inferring from clinical notes
    [14:23:53] [SUCCESS] ✓ Extracted biomarkerTests: 4 tests found
    [14:23:55] [INFO] Processing complete for MRN-P10001
    ```
  - Filter buttons: All / Info / Success / Warning / Error
  - Search box
- Action controls:
  - "Pause" button
  - "Cancel" button (with confirmation modal)
- Auto-navigation: When processing completes (use setTimeout for demo), show success message and auto-navigate to Review page

**Animations**: 
- Use CSS transitions and Ant Design's loading components
- Simulate progressive extraction over 10-15 seconds
- Update progress bars smoothly
- Add new log entries every 500ms-1s

**Redux State**: Processing status, progress percentages, log entries, selected timeline range

---

### 5. Review & Validation Page (`/review/:patientId`)

**Purpose**: Review and validate extracted mCODE elements with provenance

**Layout**:
- Header breadcrumb: "... > Review & Validation"
- Top summary dashboard:
  - Large stats cards:
    - "Extraction Complete" with checkmark
    - "18/18 Mandatory Elements" with percentage
    - "8/12 Optional Elements" 
    - "5 Items Need Review" with warning badge
  - Category completion badges:
    ```
    ✓ Patient: 3/3 (100%)
    ✓ Primary Cancer: 3/3 (100%)
    ⚠ TNM Staging: 3/4 (75%)
    ✓ Histology: 2/2 (100%)
    ℹ Treatment: 2/4 (50%)
    ```
  - Export buttons: "Export JSON" "Export FHIR" "Submit to Registry"
- Left sidebar:
  - Patient list with validation status icons
  - Current patient highlighted
- Main content area (two-panel):
  
  **Left Panel (60%): Element Review Interface**
  - Ant Design Tabs for mCODE categories:
    - Patient
    - Primary Cancer Condition
    - Secondary Cancer Condition
    - TNM and Stage Group
    - Histology/Morphology
    - Tumor Markers
    - Treatment
    - Disease Status/Recurrence
    - Outcome
  - Each tab badge shows completion status
  
  - Within each tab, show element cards:
  
    **Example Card: Primary Cancer Condition → primaryDiagnosis**
    ```
    ┌─────────────────────────────────────────────────────────┐
    │ primaryDiagnosis                    ⚠ NEEDS REVIEW      │
    │ string | Mandatory | No Inference                       │
    ├─────────────────────────────────────────────────────────┤
    │ Extracted Value:                                        │
    │ ┌─────────────────────────────────────────────────────┐ │
    │ │ Non-small cell lung carcinoma (adenocarcinoma       │ │
    │ │ subtype)                                            │ │
    │ └─────────────────────────────────────────────────────┘ │
    │                                                         │
    │ Alternative Values:                                     │
    │ • Lung adenocarcinoma (78% confidence)                  │
    │ • NSCLC adenocarcinoma (72% confidence)                 │
    │                                                         │
    │ Normalization:                                          │
    │ ICD-O-3: 8140/3 (Adenocarcinoma, NOS)                  │
    │ SNOMED CT: 254632001 (NSCLC)                           │
    │                                                         │
    │ Confidence: [████████░░] 85%                           │
    │                                                         │
    │ [✓ Confirm] [✎ Edit] [✗ Reject] [📄 View Source]      │
    └─────────────────────────────────────────────────────────┘
    ```
  
    **Example Card: TNM → T_category (Validated)**
    ```
    ┌─────────────────────────────────────────────────────────┐
    │ T_category                          ✓ VALIDATED         │
    │ string | Mandatory | No Inference                       │
    ├─────────────────────────────────────────────────────────┤
    │ Extracted Value:                                        │
    │ ┌─────────────────────────────────────────────────────┐ │
    │ │ cT2b                                                │ │
    │ └─────────────────────────────────────────────────────┘ │
    │                                                         │
    │ Details:                                                │
    │ • Prefix: c (clinical)                                  │
    │ • Tumor size: 3.8 cm (from radiology)                   │
    │ • Category: T2b (>4cm but ≤5cm)                        │
    │                                                         │
    │ Confidence: [██████████] 98%                           │
    │                                                         │
    │ ✓ Confirmed by Dr. Smith on 2025-10-05                 │
    │                                                         │
    │ [View AJCC Guideline] [📄 View Source]                 │
    └─────────────────────────────────────────────────────────┘
    ```
  
    **Example Card: Biomarker Tests (Array)**
    ```
    ┌─────────────────────────────────────────────────────────┐
    │ biomarkerTests                      ✓ VALIDATED         │
    │ array | Optional | No Inference                         │
    ├─────────────────────────────────────────────────────────┤
    │ 4 biomarker tests extracted:                            │
    │                                                         │
    │ ┌───────────────────────────────────────────────────┐   │
    │ │ [1] EGFR                        [██████████] 99%  │   │
    │ │     Result: Exon 21 L858R mutation positive       │   │
    │ │     Normalized: EGFR L858R                        │   │
    │ │     Interpretation: activating                    │   │
    │ │     [✓ Confirm] [✎ Edit] [✗ Remove]              │   │
    │ └───────────────────────────────────────────────────┘   │
    │                                                         │
    │ ┌───────────────────────────────────────────────────┐   │
    │ │ [2] ALK                         [██████████] 98%  │   │
    │ │     Result: Fusion negative                       │   │
    │ │     Normalized: ALK neg                           │   │
    │ │     Interpretation: negative                      │   │
    │ │     [✓ Confirm] [✎ Edit] [✗ Remove]              │   │
    │ └───────────────────────────────────────────────────┘   │
    │                                                         │
    │ ┌───────────────────────────────────────────────────┐   │
    │ │ [3] PD-L1                       [██████████] 100% │   │
    │ │     Result: Tumor proportion score 50%            │   │
    │ │     Value: 50% (intermediate expression)          │   │
    │ │     [✓ Confirm] [✎ Edit] [✗ Remove]              │   │
    │ └───────────────────────────────────────────────────┘   │
    │                                                         │
    │ ┌───────────────────────────────────────────────────┐   │
    │ │ [4] KRAS                        [█████████░] 95%  │   │
    │ │     Result: G12C negative                         │   │
    │ │     Normalized: KRAS G12C -                       │   │
    │ │     [✓ Confirm] [✎ Edit] [✗ Remove]              │   │
    │ └───────────────────────────────────────────────────┘   │
    │                                                         │
    │ [+ Add New Biomarker Test]                              │
    └─────────────────────────────────────────────────────────┘
    ```
  
  **Right Panel (40%): Provenance & Explainability**
  - Shown when user clicks "View Source" button
  - Document viewer showing source PDF/text
  - Highlighted regions showing where data was extracted
  - Ant Design Drawer or fixed panel
  - Tabs:
    1. **Source Documents**:
       - List of documents contributing to this element
       - Click to view with highlights
       - Page numbers and snippets
    2. **Extraction Logic**:
       - Step-by-step explanation:
         ```
         How was "cT2b" extracted?
         
         1. ✓ Found radiology report dated 2025-01-12
         2. ✓ Located tumor measurement: "3.8 cm mass in right upper lobe"
         3. ✓ Applied AJCC 8th edition TNM criteria:
            • T2: Tumor >3 cm but ≤5 cm
            • Subclass b: >4 cm category
         4. ✓ Prefix: Clinical staging (no surgical pathology)
         5. ✓ Result: cT2b
         
         Reference: AJCC 8th Edition, Lung Cancer Staging
         Confidence: 98%
         ```
       - Clickable guideline references
    3. **Alternative Values**:
       - Show other possible interpretations with confidence
       - Explanation of why primary value was chosen

- Filter/action toolbar (above element cards):
  - Filter dropdown: "All Elements" "Needs Review" "High Confidence" "Low Confidence" "Mandatory Only"
  - Sort dropdown: "By Category" "By Confidence" "By Status"
  - Batch actions: "Confirm All High Confidence (>95%)" "Flag All Low Confidence"
  - Search box
  
- Floating action buttons (bottom-right):
  - "Previous Patient"
  - "Next Patient"
  - "Export Data" (shows modal with format options)
  - "Submit to Registry" (primary button, shows success modal)

**Interaction Behaviors**:
- Clicking "Confirm" turns card green, shows checkmark, updates stats
- Clicking "Edit" opens inline editor with save/cancel
- Clicking "Reject" marks red, prompts for reason, updates stats
- Clicking "View Source" opens right panel with document viewer
- Hovering over confidence bar shows tooltip with details
- All actions update Redux state and re-render immediately

**Mock Data**: Use the complete mCODE sample result JSON provided below

**Redux State**: 
- All extracted elements with validation status
- Currently viewing patient
- Currently viewing element
- Filter/sort settings
- Provenance panel open/closed state

---

## Redux Store Structure

```typescript
interface RootState {
  cohort: {
    filters: FilterCriteria;
    patients: Patient[];
    selectedPatientIds: string[];
    currentPage: number;
  };
  documents: {
    currentPatientId: string;
    documents: Document[];
    selectedDocumentId: string | null;
    timelineZoom: 'day' | 'week' | 'month' | 'year';
    activeFilters: string[];
  };
  ontology: {
    selectedOntology: 'mcode' | 'naaccr';
    selectedElements: string[];
    expandedNodes: string[];
    selectedElementDetails: string | null;
  };
  processing: {
    status: 'idle' | 'processing' | 'completed' | 'failed';
    overallProgress: number;
    patientProgress: Record<string, number>;
    logs: LogEntry[];
    timelineRange: { start: string; end: string };
  };
  validation: {
    currentPatientId: string;
    results: Record<string, MCODEResult>;
    activeTab: string;
    filterMode: string;
    provenanceOpen: boolean;
    selectedElementForProvenance: string | null;
  };
}
```

## Mock Data to Include

### mCODE Template JSON
```json
{
  "Patient": [
    {
      "element_name": "patientIdentifier",
      "description": "Unique identifier(s) for the patient (e.g. MRN, national ID).",
      "instructions": "Extract one or more stable identifiers (medical record number, national registry number). Use verbatim where given.",
      "example_values": ["MRN12345", "SSN-999-99-9999"],
      "data_type": "string",
      "mandatory": true,
      "infer_allowed": false,
      "reference_guideline": "mCODE_Patient_Profile.pdf"
    },
    {
      "element_name": "birthDate",
      "description": "Date of birth of the patient.",
      "instructions": "Extract from demographic data. Use format YYYY-MM-DD.",
      "example_values": ["1963-07-22"],
      "data_type": "date",
      "mandatory": true,
      "infer_allowed": false,
      "reference_guideline": "mCODE_Patient_Profile.pdf"
    },
    {
      "element_name": "sex",
      "description": "Biological sex at birth/Gender identity as recorded.",
      "instructions": "Normalize to one of {Male, Female, Other, Unknown}. Use reported term.",
      "example_values": ["Female", "Male", "Unknown"],
      "data_type": "string",
      "mandatory": true,
      "infer_allowed": false,
      "reference_guideline": "mCODE_Patient_Profile.pdf"
    }
  ],
  "Primary Cancer Condition": [
    {
      "element_name": "primaryDiagnosis",
      "description": "The primary cancer diagnosis (e.g. carcinoma type) for the first tumor.",
      "instructions": "Extract the diagnosis verbatim. Normalize to ICD-O-3 and SNOMED CT where possible.",
      "example_values": ["Lung adenocarcinoma", "Invasive ductal carcinoma breast"],
      "data_type": "string",
      "mandatory": true,
      "infer_allowed": false,
      "reference_guideline": "mCODE_Condition_Profile.pdf"
    },
    {
      "element_name": "primarySite",
      "description": "Anatomical site / topography (e.g. lung, left upper lobe).",
      "instructions": "Extract organ, laterality, lobe information. Map to ICD-O topography codes if available.",
      "example_values": ["Left lung, upper lobe", "Right breast, upper outer quadrant"],
      "data_type": "string",
      "mandatory": true,
      "infer_allowed": false,
      "reference_guideline": "mCODE_Condition_Profile.pdf"
    },
    {
      "element_name": "laterality",
      "description": "Tumor laterality (Left, Right, Bilateral, Unknown).",
      "instructions": "Extract if explicitly stated. If bilateral involvement, mark Bilateral.",
      "example_values": ["Left", "Right", "Bilateral", "Unknown"],
      "data_type": "string",
      "mandatory": false,
      "infer_allowed": false,
      "reference_guideline": "mCODE_Condition_Profile.pdf"
    }
  ],
  "Secondary Cancer Condition": [
    {
      "element_name": "metastaticDiagnosis",
      "description": "Diagnosis for a metastatic or secondary cancer condition.",
      "instructions": "If metastases are documented (e.g. liver metastasis), extract the diagnosis and site.",
      "example_values": ["Liver metastasis from lung adenocarcinoma"],
      "data_type": "string",
      "mandatory": false,
      "infer_allowed": false,
      "reference_guideline": "mCODE_RelatedCondition_Profile.pdf"
    },
    {
      "element_name": "metastaticSite",
      "description": "Anatomical site of metastasis.",
      "instructions": "Extract the anatomical location(s) of metastatic spread, including laterality/lobe if given.",
      "example_values": ["Liver (right lobe)", "Bone (femur)"],
      "data_type": "string",
      "mandatory": false,
      "infer_allowed": false,
      "reference_guideline": "mCODE_RelatedCondition_Profile.pdf"
    }
  ],
  "TNM and Stage Group": [
    {
      "element_name": "T_category",
      "description": "Tumor size / invasion (T) component in TNM.",
      "instructions": "Extract exactly as cT, pT or yT when reported (e.g. cT2a, pT1b).",
      "example_values": ["cT2a", "pT1b"],
      "data_type": "string",
      "mandatory": true,
      "infer_allowed": false,
      "reference_guideline": "mCODE_Staging_Profile.pdf"
    },
    {
      "element_name": "N_category",
      "description": "Regional lymph node involvement (N) component.",
      "instructions": "Extract as cN or pN (e.g. N0, N1, N3).",
      "example_values": ["N0", "N1"],
      "data_type": "string",
      "mandatory": true,
      "infer_allowed": false,
      "reference_guideline": "mCODE_Staging_Profile.pdf"
    },
    {
      "element_name": "M_category",
      "description": "Distant metastasis (M) component.",
      "instructions": "Extract as cM / pM (e.g. M0, M1).",
      "example_values": ["M0", "M1"],
      "data_type": "string",
      "mandatory": true,
      "infer_allowed": false,
      "reference_guideline": "mCODE_Staging_Profile.pdf"
    },
    {
      "element_name": "stageGroup",
      "description": "Stage grouping (e.g. Stage I, Stage IIIB).",
      "instructions": "Extract stage group if explicitly stated (e.g. Stage IIA).",
      "example_values": ["Stage IB", "Stage IIIB"],
      "data_type": "string",
      "mandatory": false,
      "infer_allowed": false,
      "reference_guideline": "mCODE_Staging_Profile.pdf"
    }
  ],
  "Histology / Morphology": [
    {
      "element_name": "histology",
      "description": "Histologic subtype / morphology of tumor.",
      "instructions": "Extract from pathology (e.g. adenocarcinoma, squamous). Normalize to ICD-O-3 histology codes.",
      "example_values": ["Adenocarcinoma", "Squamous cell carcinoma"],
      "data_type": "string",
      "mandatory": true,
      "infer_allowed": false,
      "reference_guideline": "mCODE_Histology_Profile.pdf"
    },
    {
      "element_name": "morphologyCode",
      "description": "ICD-O-3 morphology / behavior code.",
      "instructions": "Map histology to ICD-O-3 morphology and behavior codes (e.g. 8140/3).",
      "example_values": ["8140/3", "8070/3"],
      "data_type": "string",
      "mandatory": true,
      "infer_allowed": false,
      "reference_guideline": "mCODE_Histology_Profile.pdf"
    }
  ],
  "Tumor Markers": [
    {
      "element_name": "biomarkerTests",
      "description": "Collection of tumor biomarker / genetic test results.",
      "instructions": "For each biomarker (e.g. EGFR, ALK, PD-L1), extract test name, value, interpretation, units as applicable.",
      "example_values": ["EGFR T790M positive", "ALK fusion negative", "PD-L1 60%"],
      "data_type": "array",
      "mandatory": false,
      "infer_allowed": false,
      "reference_guideline": "mCODE_Biomarker_Profile.pdf"
    }
  ],
  "Treatment (Procedures, Meds, Radiation)": [
    {
      "element_name": "surgicalProcedure",
      "description": "Surgical procedure(s) performed as part of cancer care.",
      "instructions": "Extract the surgical procedure name, date, extent (e.g. lobectomy, wedge resection).",
      "example_values": ["Left upper lobectomy (2025-03-10)"],
      "data_type": "array",
      "mandatory": false,
      "infer_allowed": true,
      "reference_guideline": "mCODE_Treatment_Profile.pdf"
    },
    {
      "element_name": "radiationTherapy",
      "description": "Radiation therapy details.",
      "instructions": "Capture modality, dose, fractionation, target volume and dates.",
      "example_values": ["IMRT 60 Gy in 30 fx (2025-04-01 to 2025-05-05)"],
      "data_type": "array",
      "mandatory": false,
      "infer_allowed": true,
      "reference_guideline": "mCODE_Treatment_Profile.pdf"
    },
    {
      "element_name": "systemicTherapy",
      "description": "Systemic (medical) cancer therapy details.",
      "instructions": "Extract regimen, agent names, start/stop dates, dose if available, and therapy intent.",
      "example_values": ["Cisplatin + Pemetrexed (2025-03-20 to 2025-06-20)"],
      "data_type": "array",
      "mandatory": false,
      "infer_allowed": true,
      "reference_guideline": "mCODE_Treatment_Profile.pdf"
    },
    {
      "element_name": "treatmentIntent",
      "description": "Intent of therapy (curative, neoadjuvant, adjuvant, palliative).",
      "instructions": "Extract intent when mentioned; normalize to controlled vocabulary.",
      "example_values": ["Adjuvant", "Palliative", "Neoadjuvant"],
      "data_type": "string",
      "mandatory": false,
      "infer_allowed": false,
      "reference_guideline": "mCODE_Treatment_Profile.pdf"
    }
  ],
  "Disease Status / Recurrence": [
    {
      "element_name": "recurrenceIndicator",
      "description": "Whether a recurrence / relapse is present.",
      "instructions": "If text states recurrence or relapse, set indicator True; otherwise False or Not Reported.",
      "example_values": ["True", "False"],
      "data_type": "boolean",
      "mandatory": false,
      "infer_allowed": false,
      "reference_guideline": "mCODE_Status_Profile.pdf"
    },
    {
      "element_name": "dateOfRecurrence",
      "description": "Date of documented recurrence or relapse.",
      "instructions": "Extract date (YYYY-MM-DD) if recurrence is present.",
      "example_values": ["2027-08-15"],
      "data_type": "date",
      "mandatory": false,
      "infer_allowed": false,
      "reference_guideline": "mCODE_Status_Profile.pdf"
    },
    {
      "element_name": "diseaseStatus",
      "description": "Current disease status (e.g. Stable, Progressive, Remission).",
      "instructions": "Extract descriptive status; normalize to controlled terms.",
      "example_values": ["Disease Free", "Stable Disease", "Progressive Disease"],
      "data_type": "string",
      "mandatory": false,
      "infer_allowed": false,
      "reference_guideline": "mCODE_Status_Profile.pdf"
    }
  ],
  "Outcome": [
    {
      "element_name": "vitalStatus",
      "description": "Patient's vital status (Alive / Dead).",
      "instructions": "Extract whether patient is alive or deceased. Use date of death if available.",
      "example_values": ["Alive", "Dead"],
      "data_type": "string",
      "mandatory": true,
      "infer_allowed": false,
      "reference_guideline": "mCODE_Outcome_Profile.pdf"
    },
    {
      "element_name": "dateOfDeath",
      "description": "Date on which patient died (if deceased).",
      "instructions": "Extract death date (YYYY-MM-DD) when recorded.",
      "example_values": ["2030-11-02"],
      "data_type": "date",
      "mandatory": false,
      "infer_allowed": false,
      "reference_guideline": "mCODE_Outcome_Profile.pdf"
    },
    {
      "element_name": "causeOfDeath",
      "description": "The cause of death if documented (cancer vs non-cancer).",
      "instructions": "Extract text specifying cause of death, normalize where possible.",
      "example_values": ["Lung cancer progression", "Cardiac arrest"],
      "data_type": "string",
      "mandatory": false,
      "infer_allowed": false,
      "reference_guideline": "mCODE_Outcome_Profile.pdf"
    }
  ]
}
```

### mCODE Sample Result JSON (for validation page)
```json
{
  "Patient": {
    "patientIdentifier": {
      "value": "MRN-P10001",
      "confidence": 0.99,
      "status": "confirmed",
      "provenance": [
        {
          "documentId": "doc-123",
          "documentTitle": "Registration Form",
          "highlightedText": "Medical Record Number: MRN-P10001"
        }
      ]
    },
    "birthDate": {
      "value": "1967-09-23",
      "confidence": 1.0,
      "status": "confirmed",
      "provenance": [
        {
          "documentId": "doc-123",
          "documentTitle": "Registration Form",
          "highlightedText": "Date of Birth: 09/23/1967"
        }
      ]
    },
    "sex": {
      "value": "Female",
      "confidence": 1.0,
      "status": "confirmed",
      "provenance": [
        {
          "documentId": "doc-123",
          "documentTitle": "Registration Form",
          "highlightedText": "Sex: Female"
        }
      ]
    }
  },
  "Primary Cancer Condition": {
    "primaryDiagnosis": {
      "value": "Non-small cell lung carcinoma (adenocarcinoma subtype)",
      "confidence": 0.85,
      "status": "needs_review",
      "alternatives": [
        { "value": "Lung adenocarcinoma", "confidence": 0.78 },
        { "value": "NSCLC adenocarcinoma", "confidence": 0.72 }
      ],
      "provenance": [
        {
          "documentId": "doc-456",
          "documentTitle": "Pathology Report",
          "highlightedText": "Diagnosis: Non-small cell lung carcinoma, adenocarcinoma subtype"
        }
      ],
      "reasoning": "Extracted from pathology report. Normalized to ICD-O-3: 8140/3 and SNOMED CT: 254632001"
    },
    "primarySite": {
      "value": "Right lung, upper lobe",
      "confidence": 0.99,
      "status": "confirmed",
      "provenance": [
        {
          "documentId": "doc-789",
          "documentTitle": "Radiology Report - CT Chest",
          "highlightedText": "3.8 cm mass in the right upper lobe"
        }
      ]
    },
    "laterality": {
      "value": "Right",
      "confidence": 0.99,
      "status": "confirmed",
      "provenance": [
        {
          "documentId": "doc-789",
          "documentTitle": "Radiology Report - CT Chest",
          "highlightedText": "right upper lobe"
        }
      ]
    }
  },
  "Secondary Cancer Condition": {
    "metastaticDiagnosis": {
      "value": "Bone metastasis from lung primary",
      "confidence": 0.92,
      "status": "confirmed",
      "provenance": [
        {
          "documentId": "doc-901",
          "documentTitle": "Bone Scan Report",
          "highlightedText": "Metastatic lesion in left femur consistent with lung primary"
        }
      ]
    },
    "metastaticSite": {
      "value": "Left femur",
      "confidence": 0.95,
      "status": "confirmed",
      "provenance": [
        {
          "documentId": "doc-901",
          "documentTitle": "Bone Scan Report",
          "highlightedText": "Metastatic lesion in left femur"
        }
      ]
    }
  },
  "TNM and Stage Group": {
    "T_category": {
      "value": "cT2b",
      "confidence": 0.98,
      "status": "confirmed",
      "provenance": [
        {
          "documentId": "doc-789",
          "documentTitle": "Radiology Report - CT Chest",
          "highlightedText": "3.8 cm mass in the right upper lobe"
        }
      ],
      "reasoning": "T2b assigned based on tumor size 3.8 cm (>3cm but ≤5cm) per AJCC 8th edition"
    },
    "N_category": {
      "value": "cN1",
      "confidence": 0.88,
      "status": "confirmed",
      "provenance": [
        {
          "documentId": "doc-789",
          "documentTitle": "Radiology Report - CT Chest",
          "highlightedText": "Enlarged ipsilateral mediastinal lymph node"
        }
      ]
    },
    "M_category": {
      "value": "cM1",
      "confidence": 0.87,
      "status": "needs_review",
      "alternatives": [
        { "value": "M1a", "confidence": 0.33 },
        { "value": "M1b", "confidence": 0.52 }
      ],
      "provenance": [
        {
          "documentId": "doc-901",
          "documentTitle": "Bone Scan Report",
          "highlightedText": "Bone metastases present"
        }
      ],
      "reasoning": "M1 assigned due to bone metastases. AJCC 8th edition requires subcategory specification."
    },
    "stageGroup": {
      "value": "Stage IV",
      "confidence": 0.95,
      "status": "confirmed",
      "provenance": [
        {
          "documentId": "doc-234",
          "documentTitle": "Oncology Consult Note",
          "highlightedText": "Stage IV NSCLC with bone metastases"
        }
      ]
    }
  },
  "Histology / Morphology": {
    "histology": {
      "value": "Adenocarcinoma",
      "confidence": 1.0,
      "status": "confirmed",
      "provenance": [
        {
          "documentId": "doc-456",
          "documentTitle": "Pathology Report",
          "highlightedText": "Histology: Adenocarcinoma"
        }
      ]
    },
    "morphologyCode": {
      "value": "8140/3",
      "confidence": 1.0,
      "status": "confirmed",
      "provenance": [
        {
          "documentId": "doc-456",
          "documentTitle": "Pathology Report",
          "highlightedText": "ICD-O-3: 8140/3"
        }
      ]
    }
  },
  "Tumor Markers": {
    "biomarkerTests": [
      {
        "marker": "EGFR",
        "result": "Exon 21 L858R mutation positive",
        "normalizedValue": "EGFR L858R",
        "interpretation": "activating",
        "confidence": 0.99,
        "status": "confirmed",
        "provenance": [
          {
            "documentId": "doc-567",
            "documentTitle": "Molecular Testing Report",
            "highlightedText": "EGFR Exon 21 L858R mutation detected"
          }
        ]
      },
      {
        "marker": "ALK",
        "result": "Fusion negative",
        "normalizedValue": "ALK neg",
        "interpretation": "negative",
        "confidence": 0.98,
        "status": "confirmed",
        "provenance": [
          {
            "documentId": "doc-567",
            "documentTitle": "Molecular Testing Report",
            "highlightedText": "No ALK rearrangement detected by FISH"
          }
        ]
      },
      {
        "marker": "PD-L1",
        "result": "Tumor proportion score 50%",
        "normalizedValue": "50%",
        "units": "%",
        "interpretation": "intermediate expression",
        "confidence": 1.0,
        "status": "confirmed",
        "provenance": [
          {
            "documentId": "doc-567",
            "documentTitle": "Molecular Testing Report",
            "highlightedText": "PD-L1 TPS = 50%"
          }
        ]
      },
      {
        "marker": "KRAS",
        "result": "G12C negative",
        "normalizedValue": "KRAS G12C -",
        "interpretation": "negative",
        "confidence": 0.95,
        "status": "confirmed",
        "provenance": [
          {
            "documentId": "doc-567",
            "documentTitle": "Molecular Testing Report",
            "highlightedText": "KRAS G12C mutation not detected"
          }
        ]
      }
    ]
  },
  "Treatment (Procedures, Meds, Radiation)": {
    "surgicalProcedure": [
      {
        "procedure": "Video-assisted thoracoscopic lobectomy",
        "date": "2025-03-05",
        "extent": "right upper lobectomy, margins negative",
        "confidence": 0.96,
        "status": "confirmed",
        "inferred": false,
        "provenance": [
          {
            "documentId": "doc-678",
            "documentTitle": "Operative Report",
            "highlightedText": "Procedure: VATS right upper lobectomy"
          }
        ]
      }
    ],
    "radiationTherapy": [
      {
        "modality": "Intensity-modulated radiotherapy (IMRT)",
        "dose": "66 Gy in 33 fractions",
        "startDate": "2025-06-01",
        "endDate": "2025-07-15",
        "target": "Mediastinal lymph nodes",
        "confidence": 0.94,
        "status": "confirmed",
        "inferred": true,
        "provenance": [
          {
            "documentId": "doc-789",
            "documentTitle": "Radiation Oncology Note",
            "highlightedText": "Plan: IMRT 66 Gy/33 fx to mediastinum"
          }
        ]
      }
    ],
    "systemicTherapy": [
      {
        "regimen": "Carboplatin + Pemetrexed",
        "startDate": "2025-04-01",
        "endDate": "2025-07-01",
        "intent": "Adjuvant",
        "confidence": 0.88,
        "status": "confirmed",
        "inferred": true,
        "provenance": [
          {
            "documentId": "doc-890",
            "documentTitle": "Oncology Progress Note",
            "highlightedText": "Started adjuvant carboplatin/pemetrexed chemotherapy"
          }
        ]
      },
      {
        "regimen": "Osimertinib (EGFR TKI)",
        "startDate": "2025-08-01",
        "endDate": "2027-10-15",
        "dose": "80 mg daily",
        "intent": "Maintenance / targeted",
        "confidence": 0.96,
        "status": "confirmed",
        "inferred": true,
        "provenance": [
          {
            "documentId": "doc-901",
            "documentTitle": "Medication Orders",
            "highlightedText": "Osimertinib 80mg PO daily"
          }
        ]
      },
      {
        "regimen": "Pembrolizumab",
        "startDate": "2027-11-01",
        "endDate": "2028-03-01",
        "dose": "200 mg every 3 weeks",
        "intent": "Immunotherapy for recurrent disease",
        "confidence": 0.92,
        "status": "confirmed",
        "inferred": true,
        "provenance": [
          {
            "documentId": "doc-912",
            "documentTitle": "Infusion Orders",
            "highlightedText": "Pembrolizumab 200mg IV q3weeks"
          }
        ]
      }
    ],
    "treatmentIntent": {
      "value": "Curative (surgery + adjuvant), then maintenance / recurrence therapy",
      "confidence": 0.85,
      "status": "confirmed",
      "provenance": [
        {
          "documentId": "doc-234",
          "documentTitle": "Oncology Consult Note",
          "highlightedText": "Treatment plan: Curative intent with surgery followed by adjuvant therapy"
        }
      ]
    }
  },
  "Disease Status / Recurrence": {
    "recurrenceIndicator": {
      "value": true,
      "confidence": 0.97,
      "status": "confirmed",
      "provenance": [
        {
          "documentId": "doc-1023",
          "documentTitle": "Brain MRI Report",
          "highlightedText": "New brain metastasis consistent with recurrent disease"
        }
      ]
    },
    "dateOfRecurrence": {
      "value": "2027-10-20",
      "confidence": 0.95,
      "status": "confirmed",
      "provenance": [
        {
          "documentId": "doc-1023",
          "documentTitle": "Brain MRI Report",
          "highlightedText": "Study date: 10/20/2027"
        }
      ]
    },
    "diseaseStatus": {
      "value": "Progressive Disease",
      "confidence": 0.93,
      "status": "confirmed",
      "provenance": [
        {
          "documentId": "doc-1034",
          "documentTitle": "Oncology Progress Note",
          "highlightedText": "Assessment: Progressive disease with new CNS involvement"
        }
      ]
    }
  },
  "Outcome": {
    "vitalStatus": {
      "value": "Dead",
      "confidence": 1.0,
      "status": "confirmed",
      "provenance": [
        {
          "documentId": "doc-1145",
          "documentTitle": "Death Certificate",
          "highlightedText": "Date of Death: 02/28/2029"
        }
      ]
    },
    "dateOfDeath": {
      "value": "2029-02-28",
      "confidence": 1.0,
      "status": "confirmed",
      "provenance": [
        {
          "documentId": "doc-1145",
          "documentTitle": "Death Certificate",
          "highlightedText": "Date of Death: 02/28/2029"
        }
      ]
    },
    "causeOfDeath": {
      "value": "Progression of CNS metastases",
      "confidence": 0.94,
      "status": "confirmed",
      "provenance": [
        {
          "documentId": "doc-1145",
          "documentTitle": "Death Certificate",
          "highlightedText": "Cause of Death: Progressive brain metastases from lung cancer"
        }
      ]
    }
  }
}
```

## Design & Styling Guidelines

1. **Color Scheme**:
   - Primary: Ant Design blue (#1890ff)
   - Success: Green (#52c41a) for validated/confirmed
   - Warning: Orange (#faad14) for needs review
   - Error: Red (#ff4d4f) for rejected/errors
   - Info: Light blue (#1890ff) for optional/informational
   - Purple: (#722ed1) for inferred elements

2. **Typography**:
   - Use Ant Design's default typography
   - Headers: Bold, larger sizes
   - Element names: Medium weight, 14-16px
   - Body text: Regular, 14px
   - Monospace for codes/IDs

3. **Spacing**:
   - Generous padding and margins
   - Card-based layouts with shadows
   - Clear visual hierarchy
   - Breathing room between sections

4. **Animations**:
   - Smooth transitions (200-300ms)
   - Fade-in for content loading
   - Progress bar animations
   - Hover effects on interactive elements
   - Loading spinners for async operations

5. **Icons**:
   - Use @ant-design/icons extensively
   - Consistent icon usage across similar elements
   - Icons for: success ✓, warning ⚠, error ✗, info ℹ, edit ✎, view 📄, etc.

6. **Responsive**:
   - Must look good on 1920x1080 (presentation screen)
   - Collapsible sidebars for smaller screens
   - Maintain readability at all sizes

## Implementation Notes

1. **No Real Functionality Needed**:
   - Mock all API calls with setTimeout delays
   - Hardcode all responses
   - Simulate processing with timers
   - No authentication required

2. **State Management**:
   - Use Redux Toolkit for global state
   - Create slices for each page/domain
   - Use Redux DevTools for debugging

3. **Routing**:
   - Use React Router for navigation
   - Route structure:
     - `/` → Redirect to `/cohort-selection`
     - `/cohort-selection`
     - `/documents/:patientId`
     - `/ontology-selection`
     - `/processing`
     - `/review/:patientId`

4. **Data Flow**:
   - Cohort selection → stores selected patient IDs
   - Document browsing → stores current patient context
   - Ontology selection → stores selected elements
   - Processing → simulates extraction, stores results
   - Review → displays results, allows validation updates

5. **Code Organization**:
   - Separate components by page
   - Reusable UI components in `/components/ui/`
   - Redux slices in `/store/slices/`
   - Mock data in `/data/` folder
   - Types in `/types/`

6. **Focus on Visual Polish**:
   - This is for presentation, so make it beautiful
   - Use animations judiciously
   - Add micro-interactions (hover states, button feedback)
   - Ensure consistent styling across all pages
   - Use loading states and skeleton screens

## Deliverables

Create a fully functional demo application with:
1. All 5 pages implemented as specified
2. Clean, modern UI using Ant Design
3. Smooth navigation between pages
4. Mock data integration from the mCODE JSONs
5. Redux state management working
6. Responsive layout
7. README with instructions to run the demo

The application should be presentation-ready, visually impressive, and demonstrate the complete oncology registry automation workflow without requiring any backend services.
