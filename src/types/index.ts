// Patient and Cohort Types
export interface Patient {
  id: string;
  mrn: string;
  name: string;
  age: number;
  sex: string;
  primaryDiagnosis: string;
  diagnosisDate: string;
  documentCount: number;
  lastUpdate: string;
  facility?: string;
}

export interface FilterCriteria {
  dateRange: [string, string] | null;
  cancerTypes: string[];
  facility: string;
  ageRange: [number, number];
  gender: string[];
}

// Document Types
export interface Document {
  id: string;
  patientId: string;
  title: string;
  date: string;
  type: 'Pathology' | 'Clinical Notes' | 'Radiology' | 'Lab Results' | 'Treatment';
  provider: string;
  format: 'PDF' | 'Text' | 'FHIR';
  content?: string;
}

// mCODE Ontology Types
export interface MCODEElement {
  element_name: string;
  description: string;
  instructions: string;
  example_values: string[];
  data_type: 'string' | 'date' | 'boolean' | 'array';
  mandatory: boolean;
  infer_allowed: boolean;
  reference_guideline: string;
}

export interface MCODECategory {
  [categoryName: string]: MCODEElement[];
}

export interface MCODETemplate {
  Patient: MCODEElement[];
  'Primary Cancer Condition': MCODEElement[];
  'Secondary Cancer Condition': MCODEElement[];
  'TNM and Stage Group': MCODEElement[];
  'Histology / Morphology': MCODEElement[];
  'Tumor Markers': MCODEElement[];
  'Treatment (Procedures, Meds, Radiation)': MCODEElement[];
  'Disease Status / Recurrence': MCODEElement[];
  Outcome: MCODEElement[];
}

// Processing Types
export interface LogEntry {
  timestamp: string;
  severity: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  message: string;
  patientId?: string;
}

export interface PatientProcessingProgress {
  patientId: string;
  progress: number;
  status: string;
  categoryProgress: Record<string, number>;
  complete: boolean;
  hasWarnings: boolean;
  hasErrors: boolean;
}

// Validation Types
export interface Provenance {
  documentId: string;
  documentTitle: string;
  highlightedText: string;
}

export interface ExtractedValue {
  value: string | boolean | number | any[];
  confidence: number;
  status: 'confirmed' | 'needs_review' | 'rejected';
  alternatives?: { value: string; confidence: number }[];
  provenance: Provenance[];
  reasoning?: string;
  inferred?: boolean;
}

export interface BiomarkerTest extends ExtractedValue {
  marker: string;
  result: string;
  normalizedValue: string;
  interpretation?: string;
  units?: string;
}

export interface TreatmentEntry extends ExtractedValue {
  procedure?: string;
  modality?: string;
  regimen?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  dose?: string;
  extent?: string;
  target?: string;
  intent?: string;
}

export interface MCODEResult {
  Patient: {
    patientIdentifier?: ExtractedValue;
    birthDate?: ExtractedValue;
    sex?: ExtractedValue;
  };
  'Primary Cancer Condition': {
    primaryDiagnosis?: ExtractedValue;
    primarySite?: ExtractedValue;
    laterality?: ExtractedValue;
  };
  'Secondary Cancer Condition': {
    metastaticDiagnosis?: ExtractedValue;
    metastaticSite?: ExtractedValue;
  };
  'TNM and Stage Group': {
    T_category?: ExtractedValue;
    N_category?: ExtractedValue;
    M_category?: ExtractedValue;
    stageGroup?: ExtractedValue;
  };
  'Histology / Morphology': {
    histology?: ExtractedValue;
    morphologyCode?: ExtractedValue;
  };
  'Tumor Markers': {
    biomarkerTests?: BiomarkerTest[];
  };
  'Treatment (Procedures, Meds, Radiation)': {
    surgicalProcedure?: TreatmentEntry[];
    radiationTherapy?: TreatmentEntry[];
    systemicTherapy?: TreatmentEntry[];
    treatmentIntent?: ExtractedValue;
  };
  'Disease Status / Recurrence': {
    recurrenceIndicator?: ExtractedValue;
    dateOfRecurrence?: ExtractedValue;
    diseaseStatus?: ExtractedValue;
  };
  Outcome: {
    vitalStatus?: ExtractedValue;
    dateOfDeath?: ExtractedValue;
    causeOfDeath?: ExtractedValue;
  };
}

// Redux State Types
export interface CohortState {
  filters: FilterCriteria;
  patients: Patient[];
  selectedPatientIds: string[];
  currentPage: number;
  pageSize: number;
}

export interface DocumentsState {
  currentPatientId: string;
  documents: Record<string, Document[]>;
  selectedDocumentId: string | null;
  timelineZoom: 'day' | 'week' | 'month' | 'year';
  activeFilters: string[];
}

export interface OntologyState {
  selectedOntology: 'mcode' | 'naaccr';
  selectedElements: string[];
  expandedNodes: string[];
  selectedElementDetails: string | null;
  mcodeTemplate: MCODETemplate | null;
}

export interface ProcessingState {
  status: 'idle' | 'processing' | 'completed' | 'failed';
  overallProgress: number;
  patientProgress: Record<string, PatientProcessingProgress>;
  logs: LogEntry[];
  timelineRange: { start: string; end: string };
  processingMode: 'Basic' | 'Standard' | 'Comprehensive';
  extractOptional: boolean;
  allowInference: boolean;
}

export interface ValidationState {
  currentPatientId: string;
  results: Record<string, MCODEResult>;
  activeTab: string;
  filterMode: string;
  sortBy: string;
  provenanceOpen: boolean;
  selectedElementForProvenance: string | null;
}

export interface RootState {
  cohort: CohortState;
  documents: DocumentsState;
  ontology: OntologyState;
  processing: ProcessingState;
  validation: ValidationState;
}
