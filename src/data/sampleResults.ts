import { MCODEResult } from '../types';

export const sampleMCODEResult: MCODEResult = {
  Patient: {
    patientIdentifier: {
      value: 'MRN-P10001',
      confidence: 0.99,
      status: 'confirmed',
      provenance: [
        {
          documentId: 'P10001-doc-001',
          documentTitle: 'Registration Form',
          highlightedText: 'Medical Record Number: MRN-P10001',
        },
      ],
    },
    birthDate: {
      value: '1967-09-23',
      confidence: 1.0,
      status: 'confirmed',
      provenance: [
        {
          documentId: 'P10001-doc-001',
          documentTitle: 'Registration Form',
          highlightedText: 'Date of Birth: 09/23/1967',
        },
      ],
    },
    sex: {
      value: 'Female',
      confidence: 1.0,
      status: 'confirmed',
      provenance: [
        {
          documentId: 'P10001-doc-001',
          documentTitle: 'Registration Form',
          highlightedText: 'Sex: Female',
        },
      ],
    },
  },
  'Primary Cancer Condition': {
    primaryDiagnosis: {
      value: 'Non-small cell lung carcinoma (adenocarcinoma subtype)',
      confidence: 0.85,
      status: 'needs_review',
      alternatives: [
        { value: 'Lung adenocarcinoma', confidence: 0.78 },
        { value: 'NSCLC adenocarcinoma', confidence: 0.72 },
      ],
      provenance: [
        {
          documentId: 'P10001-doc-004',
          documentTitle: 'Pathology Report',
          highlightedText: 'Diagnosis: Non-small cell lung carcinoma, adenocarcinoma subtype',
        },
      ],
      reasoning: 'Extracted from pathology report. Normalized to ICD-O-3: 8140/3 and SNOMED CT: 254632001',
    },
    primarySite: {
      value: 'Right lung, upper lobe',
      confidence: 0.99,
      status: 'confirmed',
      provenance: [
        {
          documentId: 'P10001-doc-002',
          documentTitle: 'Radiology Report - CT Chest',
          highlightedText: '3.8 cm mass in the right upper lobe',
        },
      ],
    },
    laterality: {
      value: 'Right',
      confidence: 0.99,
      status: 'confirmed',
      provenance: [
        {
          documentId: 'P10001-doc-002',
          documentTitle: 'Radiology Report - CT Chest',
          highlightedText: 'right upper lobe',
        },
      ],
    },
  },
  'Secondary Cancer Condition': {
    metastaticDiagnosis: {
      value: 'Bone metastasis from lung primary',
      confidence: 0.92,
      status: 'confirmed',
      provenance: [
        {
          documentId: 'P10001-doc-010',
          documentTitle: 'Bone Scan Report',
          highlightedText: 'Metastatic lesion in left femur consistent with lung primary',
        },
      ],
    },
    metastaticSite: {
      value: 'Left femur',
      confidence: 0.95,
      status: 'confirmed',
      provenance: [
        {
          documentId: 'P10001-doc-010',
          documentTitle: 'Bone Scan Report',
          highlightedText: 'Metastatic lesion in left femur',
        },
      ],
    },
  },
  'TNM and Stage Group': {
    T_category: {
      value: 'cT2b',
      confidence: 0.98,
      status: 'confirmed',
      provenance: [
        {
          documentId: 'P10001-doc-002',
          documentTitle: 'Radiology Report - CT Chest',
          highlightedText: '3.8 cm mass in the right upper lobe',
        },
      ],
      reasoning: 'T2b assigned based on tumor size 3.8 cm (>3cm but ≤5cm) per AJCC 8th edition',
    },
    N_category: {
      value: 'cN1',
      confidence: 0.88,
      status: 'confirmed',
      provenance: [
        {
          documentId: 'P10001-doc-002',
          documentTitle: 'Radiology Report - CT Chest',
          highlightedText: 'Enlarged ipsilateral mediastinal lymph node',
        },
      ],
    },
    M_category: {
      value: 'cM1',
      confidence: 0.87,
      status: 'needs_review',
      alternatives: [
        { value: 'M1a', confidence: 0.33 },
        { value: 'M1b', confidence: 0.52 },
      ],
      provenance: [
        {
          documentId: 'P10001-doc-010',
          documentTitle: 'Bone Scan Report',
          highlightedText: 'Bone metastases present',
        },
      ],
      reasoning: 'M1 assigned due to bone metastases. AJCC 8th edition requires subcategory specification.',
    },
    stageGroup: {
      value: 'Stage IV',
      confidence: 0.95,
      status: 'confirmed',
      provenance: [
        {
          documentId: 'P10001-doc-008',
          documentTitle: 'Oncology Consult Note',
          highlightedText: 'Stage IV NSCLC with bone metastases',
        },
      ],
    },
  },
  'Histology / Morphology': {
    histology: {
      value: 'Adenocarcinoma',
      confidence: 1.0,
      status: 'confirmed',
      provenance: [
        {
          documentId: 'P10001-doc-004',
          documentTitle: 'Pathology Report',
          highlightedText: 'Histology: Adenocarcinoma',
        },
      ],
    },
    morphologyCode: {
      value: '8140/3',
      confidence: 1.0,
      status: 'confirmed',
      provenance: [
        {
          documentId: 'P10001-doc-004',
          documentTitle: 'Pathology Report',
          highlightedText: 'ICD-O-3: 8140/3',
        },
      ],
    },
  },
  'Tumor Markers': {
    biomarkerTests: [
      {
        marker: 'EGFR',
        result: 'Exon 21 L858R mutation positive',
        normalizedValue: 'EGFR L858R',
        interpretation: 'activating',
        confidence: 0.99,
        status: 'confirmed',
        value: 'EGFR L858R',
        provenance: [
          {
            documentId: 'P10001-doc-007',
            documentTitle: 'Molecular Testing Report',
            highlightedText: 'EGFR Exon 21 L858R mutation detected',
          },
        ],
      },
      {
        marker: 'ALK',
        result: 'Fusion negative',
        normalizedValue: 'ALK neg',
        interpretation: 'negative',
        confidence: 0.98,
        status: 'confirmed',
        value: 'ALK neg',
        provenance: [
          {
            documentId: 'P10001-doc-007',
            documentTitle: 'Molecular Testing Report',
            highlightedText: 'No ALK rearrangement detected by FISH',
          },
        ],
      },
      {
        marker: 'PD-L1',
        result: 'Tumor proportion score 50%',
        normalizedValue: '50%',
        units: '%',
        interpretation: 'intermediate expression',
        confidence: 1.0,
        status: 'confirmed',
        value: '50%',
        provenance: [
          {
            documentId: 'P10001-doc-007',
            documentTitle: 'Molecular Testing Report',
            highlightedText: 'PD-L1 TPS = 50%',
          },
        ],
      },
      {
        marker: 'KRAS',
        result: 'G12C negative',
        normalizedValue: 'KRAS G12C -',
        interpretation: 'negative',
        confidence: 0.95,
        status: 'confirmed',
        value: 'KRAS G12C -',
        provenance: [
          {
            documentId: 'P10001-doc-007',
            documentTitle: 'Molecular Testing Report',
            highlightedText: 'KRAS G12C mutation not detected',
          },
        ],
      },
    ],
  },
  'Treatment (Procedures, Meds, Radiation)': {
    surgicalProcedure: [
      {
        procedure: 'Video-assisted thoracoscopic lobectomy',
        date: '2025-03-05',
        extent: 'right upper lobectomy, margins negative',
        confidence: 0.96,
        status: 'confirmed',
        inferred: false,
        value: 'VATS right upper lobectomy',
        provenance: [
          {
            documentId: 'P10001-doc-011',
            documentTitle: 'Operative Report',
            highlightedText: 'Procedure: VATS right upper lobectomy',
          },
        ],
      },
    ],
    radiationTherapy: [
      {
        modality: 'Intensity-modulated radiotherapy (IMRT)',
        dose: '66 Gy in 33 fractions',
        startDate: '2025-06-01',
        endDate: '2025-07-15',
        target: 'Mediastinal lymph nodes',
        confidence: 0.94,
        status: 'confirmed',
        inferred: true,
        value: 'IMRT 66 Gy/33 fx',
        provenance: [
          {
            documentId: 'P10001-doc-014',
            documentTitle: 'Radiation Oncology Note',
            highlightedText: 'Plan: IMRT 66 Gy/33 fx to mediastinum',
          },
        ],
      },
    ],
    systemicTherapy: [
      {
        regimen: 'Carboplatin + Pemetrexed',
        startDate: '2025-04-01',
        endDate: '2025-07-01',
        intent: 'Adjuvant',
        confidence: 0.88,
        status: 'confirmed',
        inferred: true,
        value: 'Carboplatin + Pemetrexed',
        provenance: [
          {
            documentId: 'P10001-doc-012',
            documentTitle: 'Oncology Progress Note',
            highlightedText: 'Started adjuvant carboplatin/pemetrexed chemotherapy',
          },
        ],
      },
      {
        regimen: 'Osimertinib (EGFR TKI)',
        startDate: '2025-08-01',
        endDate: '2027-10-15',
        dose: '80 mg daily',
        intent: 'Maintenance / targeted',
        confidence: 0.96,
        status: 'confirmed',
        inferred: true,
        value: 'Osimertinib 80mg daily',
        provenance: [
          {
            documentId: 'P10001-doc-016',
            documentTitle: 'Medication Orders',
            highlightedText: 'Osimertinib 80mg PO daily',
          },
        ],
      },
      {
        regimen: 'Pembrolizumab',
        startDate: '2027-11-01',
        endDate: '2028-03-01',
        dose: '200 mg every 3 weeks',
        intent: 'Immunotherapy for recurrent disease',
        confidence: 0.92,
        status: 'confirmed',
        inferred: true,
        value: 'Pembrolizumab 200mg q3weeks',
        provenance: [
          {
            documentId: 'P10001-doc-019',
            documentTitle: 'Infusion Orders',
            highlightedText: 'Pembrolizumab 200mg IV q3weeks',
          },
        ],
      },
    ],
    treatmentIntent: {
      value: 'Curative (surgery + adjuvant), then maintenance / recurrence therapy',
      confidence: 0.85,
      status: 'confirmed',
      provenance: [
        {
          documentId: 'P10001-doc-008',
          documentTitle: 'Oncology Consult Note',
          highlightedText: 'Treatment plan: Curative intent with surgery followed by adjuvant therapy',
        },
      ],
    },
  },
  'Disease Status / Recurrence': {
    recurrenceIndicator: {
      value: true,
      confidence: 0.97,
      status: 'confirmed',
      provenance: [
        {
          documentId: 'P10001-doc-017',
          documentTitle: 'Brain MRI Report',
          highlightedText: 'New brain metastasis consistent with recurrent disease',
        },
      ],
    },
    dateOfRecurrence: {
      value: '2027-10-20',
      confidence: 0.95,
      status: 'confirmed',
      provenance: [
        {
          documentId: 'P10001-doc-017',
          documentTitle: 'Brain MRI Report',
          highlightedText: 'Study date: 10/20/2027',
        },
      ],
    },
    diseaseStatus: {
      value: 'Progressive Disease',
      confidence: 0.93,
      status: 'confirmed',
      provenance: [
        {
          documentId: 'P10001-doc-018',
          documentTitle: 'Oncology Progress Note',
          highlightedText: 'Assessment: Progressive disease with new CNS involvement',
        },
      ],
    },
  },
  Outcome: {
    vitalStatus: {
      value: 'Alive',
      confidence: 1.0,
      status: 'confirmed',
      provenance: [
        {
          documentId: 'P10001-doc-020',
          documentTitle: 'Recent Progress Note',
          highlightedText: 'Patient continues active treatment',
        },
      ],
    },
  },
};
