import { Document } from '../types';
import { documentTemplates } from './documentTemplates';

export const generateMockDocuments = (patientId: string): Document[] => {
  const baseDate = new Date('2023-01-01');
  const documents: Document[] = [];

  // Registration and initial documents
  documents.push({
    id: `${patientId}-doc-001`,
    patientId,
    title: 'Patient Registration Form',
    date: '2023-01-15',
    type: 'Clinical Notes',
    provider: 'Registration Dept',
    format: 'Text',
    content: documentTemplates.registrationForm,
  });

  // Radiology reports
  documents.push({
    id: `${patientId}-doc-002`,
    patientId,
    title: 'CT Chest with Contrast',
    date: '2023-02-10',
    type: 'Radiology',
    provider: 'Dr. Sarah Radiologist',
    format: 'PDF',
    content: documentTemplates.ctChestReport,
  });

  documents.push({
    id: `${patientId}-doc-003`,
    patientId,
    title: 'PET-CT Whole Body',
    date: '2023-02-15',
    type: 'Radiology',
    provider: 'Dr. Sarah Radiologist',
    format: 'PDF',
    content: documentTemplates.petCtReport,
  });

  // Pathology reports
  documents.push({
    id: `${patientId}-doc-004`,
    patientId,
    title: 'Pathology Report - Biopsy',
    date: '2023-02-20',
    type: 'Pathology',
    provider: 'Dr. Michael Pathologist',
    format: 'PDF',
    content: documentTemplates.pathologyReport,
  });

  // Lab results
  documents.push({
    id: `${patientId}-doc-005`,
    patientId,
    title: 'Complete Blood Count',
    date: '2023-02-22',
    type: 'Lab Results',
    provider: 'Central Laboratory',
    format: 'Text',
    content: documentTemplates.cbcReport,
  });

  documents.push({
    id: `${patientId}-doc-006`,
    patientId,
    title: 'Comprehensive Metabolic Panel',
    date: '2023-02-22',
    type: 'Lab Results',
    provider: 'Central Laboratory',
    format: 'Text',
    content: documentTemplates.cmpReport,
  });

  // Molecular testing
  documents.push({
    id: `${patientId}-doc-007`,
    patientId,
    title: 'Molecular Testing Report - NGS Panel',
    date: '2023-03-01',
    type: 'Lab Results',
    provider: 'Molecular Diagnostics Lab',
    format: 'PDF',
    content: documentTemplates.molecularReport,
  });

  // Clinical notes
  documents.push({
    id: `${patientId}-doc-008`,
    patientId,
    title: 'Oncology Initial Consult',
    date: '2023-03-05',
    type: 'Clinical Notes',
    provider: 'Dr. Jennifer Oncologist',
    format: 'Text',
    content: documentTemplates.oncologyConsult,
  });

  documents.push({
    id: `${patientId}-doc-009`,
    patientId,
    title: 'Pulmonology Consult',
    date: '2023-02-25',
    type: 'Clinical Notes',
    provider: 'Dr. Robert Pulmonologist',
    format: 'Text',
    content: 'PULMONOLOGY CONSULTATION\n\nPatient: Sarah Johnson\nMRN: MRN-P10001\nDate: 02/25/2023\n\nCHIEF COMPLAINT: Persistent cough and abnormal chest X-ray\n\nHISTORY: 58-year-old female referred for evaluation of 2-month history of persistent dry cough and 10-pound unintentional weight loss. Recent chest X-ray showed right upper lobe opacity.\n\nPAST MEDICAL HISTORY: Hypertension, GERD, never smoker but significant secondhand smoke exposure.\n\nPHYSICAL EXAM: Lungs clear to auscultation bilaterally. No wheezing or rhonchi.\n\nASSESSMENT: Concerning lung mass on imaging. Recommend CT chest for further evaluation and possible bronchoscopy.\n\nDr. Robert Pulmonologist, MD',
  });

  // Bone scan
  documents.push({
    id: `${patientId}-doc-010`,
    patientId,
    title: 'Bone Scan Report',
    date: '2023-02-18',
    type: 'Radiology',
    provider: 'Dr. Sarah Radiologist',
    format: 'PDF',
    content: 'Metastatic lesion in left femur consistent with lung primary...',
  });

  // Operative report
  documents.push({
    id: `${patientId}-doc-011`,
    patientId,
    title: 'Operative Report - VATS Lobectomy',
    date: '2025-03-05',
    type: 'Treatment',
    provider: 'Dr. David Surgeon',
    format: 'PDF',
    content: documentTemplates.operativeReport,
  });

  // Chemotherapy documentation
  documents.push({
    id: `${patientId}-doc-012`,
    patientId,
    title: 'Chemotherapy Orders - Cycle 1',
    date: '2025-04-01',
    type: 'Treatment',
    provider: 'Dr. Jennifer Oncologist',
    format: 'Text',
    content: documentTemplates.chemoOrders,
  });

  documents.push({
    id: `${patientId}-doc-013`,
    patientId,
    title: 'Chemotherapy Administration Record',
    date: '2025-04-01',
    type: 'Treatment',
    provider: 'Infusion Center',
    format: 'Text',
    content: 'Carboplatin AUC 5, Pemetrexed 500 mg/m2 administered without complications...',
  });

  // Radiation oncology
  documents.push({
    id: `${patientId}-doc-014`,
    patientId,
    title: 'Radiation Oncology Consult',
    date: '2025-05-15',
    type: 'Treatment',
    provider: 'Dr. Lisa Radiation Oncologist',
    format: 'Text',
    content: documentTemplates.radiationConsult,
  });

  // Follow-up imaging
  documents.push({
    id: `${patientId}-doc-015`,
    patientId,
    title: 'CT Chest - 3 Month Follow-up',
    date: '2025-07-10',
    type: 'Radiology',
    provider: 'Dr. Sarah Radiologist',
    format: 'PDF',
    content: 'Post-treatment changes. No evidence of recurrence...',
  });

  // Targeted therapy
  documents.push({
    id: `${patientId}-doc-016`,
    patientId,
    title: 'Medication Orders - Osimertinib',
    date: '2025-08-01',
    type: 'Treatment',
    provider: 'Dr. Jennifer Oncologist',
    format: 'Text',
    content: 'Osimertinib 80mg PO daily. EGFR-targeted maintenance therapy...',
  });

  // Recurrence documentation
  documents.push({
    id: `${patientId}-doc-017`,
    patientId,
    title: 'Brain MRI',
    date: '2027-10-20',
    type: 'Radiology',
    provider: 'Dr. Mark Neuroradiologist',
    format: 'PDF',
    content: 'New brain metastasis consistent with recurrent disease, 2.1 cm right parietal lesion...',
  });

  documents.push({
    id: `${patientId}-doc-018`,
    patientId,
    title: 'Oncology Progress Note',
    date: '2027-10-25',
    type: 'Clinical Notes',
    provider: 'Dr. Jennifer Oncologist',
    format: 'Text',
    content: 'Assessment: Progressive disease with new CNS involvement. Discussed immunotherapy options...',
  });

  // Immunotherapy
  documents.push({
    id: `${patientId}-doc-019`,
    patientId,
    title: 'Infusion Orders - Pembrolizumab',
    date: '2027-11-01',
    type: 'Treatment',
    provider: 'Dr. Jennifer Oncologist',
    format: 'Text',
    content: 'Pembrolizumab 200mg IV q3weeks for recurrent NSCLC...',
  });

  // Later follow-ups
  documents.push({
    id: `${patientId}-doc-020`,
    patientId,
    title: 'CT Chest - Disease Progression',
    date: '2028-05-15',
    type: 'Radiology',
    provider: 'Dr. Sarah Radiologist',
    format: 'PDF',
    content: 'Interval progression of CNS and bone metastases...',
  });

  return documents;
};
