// Realistic document content templates for each type

export const documentTemplates = {
  registrationForm: `PATIENT REGISTRATION FORM
Memorial Hospital - Cancer Registry

Date: 01/15/2023
Medical Record Number: MRN-P10001

DEMOGRAPHICS:
Name: Sarah Johnson
Date of Birth: 09/23/1967 (Age: 58)
Sex: Female
Address: 123 Main Street, Cityville, ST 12345
Phone: (555) 123-4567
Email: sjohnson@email.com

INSURANCE:
Primary: Blue Cross Blue Shield
Policy Number: BC123456789
Group Number: GRP-ABC-001

EMERGENCY CONTACT:
Name: Robert Johnson (Spouse)
Phone: (555) 123-4568
Relationship: Husband

PRIMARY CARE PHYSICIAN:
Dr. Michael Primary, MD
Primary Care Associates
Phone: (555) 234-5678

Facility: Memorial Hospital
Registration Date: 01/15/2023
Registered By: Jane Admin, RN`,

  ctChestReport: `RADIOLOGY REPORT - CT CHEST WITH CONTRAST

Patient: Sarah Johnson
MRN: MRN-P10001
Date of Exam: 02/10/2023
Ordering Physician: Dr. Robert Pulmonologist
Radiologist: Dr. Sarah Radiologist, MD

CLINICAL INDICATION:
Persistent cough and weight loss. Rule out malignancy.

TECHNIQUE:
Multidetector CT of the chest was performed with intravenous contrast administration (100 mL Omnipaque 350). Axial images were obtained at 1.25mm slice thickness with coronal and sagittal reformats.

FINDINGS:

LUNGS:
- Right upper lobe: 3.8 cm spiculated mass with pleural retraction, centered in the anterior segment. Demonstrates heterogeneous enhancement. SUV max on recent PET-CT: 8.5.
- Left lung: Clear. No nodules or masses.
- No cavitation or calcification within the mass.

PLEURA:
- Mild pleural thickening adjacent to right upper lobe mass.
- No pleural effusion bilaterally.

MEDIASTINUM:
- Enlarged right paratracheal lymph node measuring 1.8 cm (short axis).
- Subcarinal nodes within normal limits.
- No pericardial effusion.

CHEST WALL/BONES:
- No chest wall invasion identified.
- Degenerative changes of thoracic spine.
- No suspicious osseous lesions.

UPPER ABDOMEN:
- Limited views show normal liver, spleen, and adrenal glands.
- No suspicious lesions in visualized upper abdomen.

IMPRESSION:
1. 3.8 cm spiculated mass in right upper lobe, highly suspicious for primary lung malignancy. Tissue diagnosis recommended.
2. Enlarged right paratracheal lymph node (1.8 cm), concerning for nodal metastasis.
3. No evidence of distant metastatic disease in the chest.

RECOMMENDATION:
- CT-guided biopsy or bronchoscopy for tissue diagnosis
- Staging PET-CT (if not already performed)
- Clinical correlation recommended

Dr. Sarah Radiologist, MD
Board Certified Radiologist
Electronically signed: 02/10/2023 14:30`,

  petCtReport: `PET-CT WHOLE BODY REPORT

Patient: Sarah Johnson
MRN: MRN-P10001
Date of Exam: 02/15/2023
Ordering Physician: Dr. Robert Pulmonologist
Nuclear Medicine Physician: Dr. Sarah Radiologist, MD

CLINICAL INDICATION:
Newly diagnosed right upper lobe lung mass. Staging evaluation.

RADIOPHARMACEUTICAL:
12.5 mCi F-18 FDG IV
Blood glucose at time of injection: 92 mg/dL
Uptake time: 60 minutes

TECHNIQUE:
Whole body PET-CT from skull base to mid-thigh performed on a Siemens Biograph mCT scanner. Low-dose CT for attenuation correction and anatomic localization.

FINDINGS:

HYPERMETABOLIC FOCI:
1. Right upper lobe mass: Intense FDG uptake, SUV max 8.5, corresponding to known 3.8 cm spiculated mass on diagnostic CT.

2. Right paratracheal lymph node: Moderate FDG uptake, SUV max 4.2, measuring 1.8 cm on CT.

3. Left femoral metaphysis: Focal area of increased uptake, SUV max 6.8, with subtle sclerotic changes on CT. Concerning for osseous metastasis.

ORGANS WITHOUT ABNORMAL UPTAKE:
- Brain (limited evaluation without diagnostic CT)
- Bilateral neck nodes - physiologic
- Thyroid - normal
- Heart - normal myocardial uptake
- Liver/Spleen - normal
- Kidneys/Adrenals - normal
- Bowel - physiologic uptake
- Bone marrow - normal pattern

IMPRESSION:
1. Hypermetabolic right upper lobe lung mass (SUV max 8.5) - consistent with primary lung malignancy.

2. FDG-avid right paratracheal lymph node (SUV max 4.2) - concerning for regional nodal metastasis (N2 disease).

3. Hypermetabolic focus in left femoral metaphysis (SUV max 6.8) - concerning for osseous metastatic disease (M1 disease).

4. No other sites of distant metastatic disease identified.

CLINICAL STAGING (provisional):
Suggest clinical stage cT2bN2M1 based on imaging findings.
Histologic confirmation recommended.

Dr. Sarah Radiologist, MD
Board Certified Nuclear Medicine/Radiology
Electronically signed: 02/15/2023 16:45`,

  pathologyReport: `SURGICAL PATHOLOGY REPORT

Patient: Sarah Johnson
MRN: MRN-P10001
Date of Service: 02/20/2023
Specimen Received: 02/20/2023 09:15
Report Date: 02/22/2023
Pathologist: Dr. Michael Pathologist, MD

SPECIMEN:
A. Right upper lobe lung, CT-guided core needle biopsy

CLINICAL HISTORY:
58-year-old female with 3.8 cm right upper lobe mass on CT. History of 40 pack-year smoking. Biopsy for diagnosis.

GROSS DESCRIPTION:
Received in formalin labeled "right upper lobe biopsy" are three core needle biopsy fragments of tan-pink tissue measuring 1.5 cm in aggregate. Entirely submitted in cassette A1.

MICROSCOPIC DESCRIPTION:
Sections show lung parenchyma with infiltrating malignant neoplasm. The tumor is composed of irregular glands and acini lined by columnar to cuboidal cells with enlarged hyperchromatic nuclei, prominent nucleoli, and moderate amounts of eosinophilic cytoplasm. Tumor cells demonstrate cytologic atypia with high nuclear to cytoplasmic ratio. Mitotic figures are readily identified (8 per 10 HPF). Areas of lepidic growth pattern are present. No squamous differentiation or neuroendocrine features identified.

IMMUNOHISTOCHEMISTRY:
CK7: Positive (tumor cells)
TTF-1: Positive (nuclear, tumor cells)
Napsin A: Positive (cytoplasmic, tumor cells)
p40: Negative
Synaptophysin: Negative
Chromogranin: Negative
Ki-67: 35% proliferation index

MOLECULAR STUDIES:
Reflex molecular testing ordered - see separate molecular report.

DIAGNOSIS:
A. Right upper lobe lung, core needle biopsy:
   - ADENOCARCINOMA, consistent with primary lung origin
   - Histologic grade: Moderately differentiated (Grade 2)
   - Acinar and lepidic growth patterns present

ICD-O-3 MORPHOLOGY CODE: 8140/3 (Adenocarcinoma, NOS)
ICD-O-3 TOPOGRAPHY CODE: C34.1 (Upper lobe, lung)

COMMENT:
The morphologic and immunohistochemical findings are diagnostic of primary pulmonary adenocarcinoma. Reflex molecular testing (EGFR, ALK, ROS1, BRAF, PD-L1) has been ordered and will be reported separately when available.

PATHOLOGIC STAGING (limited by biopsy):
pTx (tumor size/extent cannot be assessed on biopsy)
Regional lymph nodes and distant metastases: Clinical correlation required

Dr. Michael Pathologist, MD, FCAP
Board Certified Anatomic & Clinical Pathology
Electronically signed: 02/22/2023 14:20`,

  cbcReport: `LABORATORY REPORT - COMPLETE BLOOD COUNT

Patient: Sarah Johnson
MRN: MRN-P10001
Date Collected: 02/22/2023 08:00
Date Reported: 02/22/2023 10:15
Ordering Physician: Dr. Jennifer Oncologist
Performed By: Central Laboratory

TEST NAME              RESULT      UNITS       REFERENCE RANGE    FLAG
------------------------------------------------------------------------
WBC                    7.2         K/uL        4.0-11.0
RBC                    4.45        M/uL        4.0-5.2
Hemoglobin             13.5        g/dL        12.0-16.0
Hematocrit             40.2        %           36.0-46.0
MCV                    90.3        fL          80.0-100.0
MCH                    30.3        pg          27.0-33.0
MCHC                   33.6        g/dL        32.0-36.0
RDW                    13.2        %           11.5-14.5
Platelet Count         250         K/uL        150-400

DIFFERENTIAL:
Neutrophils            62.5        %           40.0-70.0
Lymphocytes            28.3        %           20.0-40.0
Monocytes              7.2         %           2.0-10.0
Eosinophils            1.5         %           0.0-5.0
Basophils              0.5         %           0.0-2.0

Absolute Neutrophils   4.50        K/uL        2.0-7.0
Absolute Lymphocytes   2.04        K/uL        1.0-4.0
Absolute Monocytes     0.52        K/uL        0.2-1.0
Absolute Eosinophils   0.11        K/uL        0.0-0.5
Absolute Basophils     0.04        K/uL        0.0-0.2

INTERPRETATION:
All parameters within normal limits. No anemia. White cell count and differential normal. Adequate platelet count.

Performed on: Sysmex XN-3000 Automated Hematology Analyzer
Reviewed by: John Smith, MT(ASCP)
Laboratory Director: Dr. Lisa LabDirector, MD
CLIA #: 12D3456789`,

  cmpReport: `LABORATORY REPORT - COMPREHENSIVE METABOLIC PANEL

Patient: Sarah Johnson
MRN: MRN-P10001
Date Collected: 02/22/2023 08:00
Date Reported: 02/22/2023 10:30
Ordering Physician: Dr. Jennifer Oncologist
Performed By: Central Laboratory

TEST NAME              RESULT      UNITS       REFERENCE RANGE    FLAG
------------------------------------------------------------------------
GLUCOSE                95          mg/dL       70-100
BUN                    16          mg/dL       7-20
CREATININE             0.9         mg/dL       0.6-1.2
eGFR                   >60         mL/min      >60
BUN/Creatinine Ratio   17.8        ratio       8-20

ELECTROLYTES:
Sodium                 140         mmol/L      135-145
Potassium              4.2         mmol/L      3.5-5.0
Chloride               102         mmol/L      98-107
CO2                    26          mmol/L      22-30
Anion Gap              12          mmol/L      8-16
Calcium                9.6         mg/dL       8.5-10.5

LIVER FUNCTION:
Total Protein          7.2         g/dL        6.0-8.0
Albumin                4.1         g/dL        3.5-5.0
Globulin               3.1         g/dL        2.0-3.5
A/G Ratio              1.3         ratio       1.0-2.5
Total Bilirubin        0.6         mg/dL       0.2-1.2
Alkaline Phosphatase   78          U/L         35-125
AST (SGOT)             24          U/L         10-40
ALT (SGPT)             28          U/L         10-40

INTERPRETATION:
All parameters within normal limits. Normal renal function. Normal electrolytes. Liver enzymes within normal range. Normal glucose.

Specimen Type: Serum (Gold top tube)
Performed on: Roche Cobas c501 Chemistry Analyzer
Reviewed by: Mary Johnson, MT(ASCP)
Laboratory Director: Dr. Lisa LabDirector, MD
CLIA #: 12D3456789`,

  molecularReport: `MOLECULAR PATHOLOGY REPORT

Patient: Sarah Johnson
MRN: MRN-P10001
Specimen: Right upper lobe lung biopsy (Path #S23-12345)
Date Received: 02/23/2023
Report Date: 03/01/2023
Medical Director: Dr. Robert MolPath, MD, PhD

CLINICAL HISTORY:
58-year-old female with newly diagnosed lung adenocarcinoma. Molecular profiling for targeted therapy selection.

SPECIMEN INFORMATION:
FFPE tissue block from core needle biopsy, right upper lobe
Tumor Content: 60% by pathologist review
Tissue Quality: Adequate for NGS analysis

TESTING PERFORMED:
Comprehensive Solid Tumor NGS Panel (185 genes)
- DNA sequencing: coverage >500x
- RNA sequencing for fusions
- PD-L1 IHC (22C3 pharmDx)

RESULTS:

ACTIONABLE MUTATIONS DETECTED:

1. EGFR (Epidermal Growth Factor Receptor) - POSITIVE
   Exon 21: c.2573T>G (p.L858R)
   Variant Allele Frequency: 42%
   Classification: TIER I - Strong clinical significance

   Interpretation: Activating mutation associated with sensitivity to EGFR tyrosine kinase inhibitors (erlotinib, gefitinib, afatinib, osimertinib). First-line targeted therapy recommended per NCCN guidelines.

2. TP53 (Tumor Protein p53)
   Exon 7: c.743G>A (p.R248Q)
   Variant Allele Frequency: 48%
   Classification: TIER II - Likely oncogenic

   Interpretation: Common TP53 mutation in lung adenocarcinoma. No specific targeted therapy. May influence prognosis.

FUSIONS: NEGATIVE
- ALK rearrangement: Not detected
- ROS1 rearrangement: Not detected
- RET rearrangement: Not detected
- NTRK1/2/3 fusions: Not detected

ADDITIONAL MARKERS:

PD-L1 EXPRESSION (22C3 IHC):
Tumor Proportion Score (TPS): 50%
Classification: HIGH EXPRESSION
Interpretation: PD-L1 TPS ≥50% - eligible for single-agent pembrolizumab as first-line therapy per FDA approval.

COPY NUMBER VARIATIONS:
- MET amplification: Not detected
- ERBB2 (HER2) amplification: Not detected

OTHER MUTATIONS DETECTED:
None with established clinical significance

MUTATIONS NOT DETECTED IN KEY GENES:
KRAS, BRAF, PIK3CA, PTEN, STK11, KEAP1, MET exon 14 skipping

MICROSATELLITE STATUS: Stable (MSS)
TUMOR MUTATIONAL BURDEN: 6.2 mutations/Mb (Intermediate)

SUMMARY:
This lung adenocarcinoma harbors an EGFR L858R mutation (42% VAF), which is sensitive to EGFR tyrosine kinase inhibitors. PD-L1 expression is high (TPS 50%), indicating eligibility for immunotherapy. No ALK or ROS1 rearrangements detected.

THERAPEUTIC IMPLICATIONS:
1. EGFR-TKI therapy (osimertinib preferred) - TIER I recommendation
2. Alternative: Pembrolizumab monotherapy (PD-L1 TPS ≥50%)
3. Standard chemotherapy remains an option

CLINICAL TRIALS:
Patient may be eligible for EGFR-targeted therapy trials. See ClinicalTrials.gov for current options.

Methodology: Next-Generation Sequencing (Illumina NextSeq), PD-L1 IHC (Dako 22C3)
Assay validated per CAP/CLIA guidelines

Robert MolPath, MD, PhD
Board Certified Molecular Genetic Pathology
Electronically signed: 03/01/2023 15:30`,

  oncologyConsult: `ONCOLOGY CONSULTATION NOTE

Patient: Sarah Johnson
MRN: MRN-P10001
Date of Service: 03/05/2023
Attending: Dr. Jennifer Oncologist, MD
Location: Memorial Hospital Cancer Center

CHIEF COMPLAINT:
New diagnosis of lung adenocarcinoma for treatment planning.

HISTORY OF PRESENT ILLNESS:
Ms. Johnson is a pleasant 58-year-old female referred for evaluation and management of newly diagnosed lung adenocarcinoma. She initially presented to her PCP with 2-month history of persistent cough and unintentional 10-pound weight loss. Non-smoker, but significant secondhand smoke exposure (husband smokes).

ONCOLOGIC HISTORY:
- 02/10/23: CT chest showing 3.8 cm right upper lobe mass with mediastinal LAD
- 02/15/23: PET-CT confirming hypermetabolic RUL mass (SUV 8.5), right paratracheal node (SUV 4.2), and left femoral lesion (SUV 6.8) concerning for bone metastasis
- 02/20/23: CT-guided biopsy confirming adenocarcinoma, lung primary
- 03/01/23: Molecular testing: EGFR L858R mutation positive, ALK negative, PD-L1 TPS 50%

CLINICAL STAGE: cT2bN2M1 (Stage IV)

PAST MEDICAL HISTORY:
- Hypertension (controlled on lisinopril)
- Hyperlipidemia (controlled on atorvastatin)
- No prior cancer history
- No diabetes

MEDICATIONS:
1. Lisinopril 10mg PO daily
2. Atorvastatin 20mg PO daily
3. Omeprazole 20mg PO daily (for GERD)

ALLERGIES: NKDA

SOCIAL HISTORY:
- Never smoker (0 pack-years)
- Secondhand smoke exposure: Husband smokes 1 PPD x 30 years
- Alcohol: Social (1-2 drinks/week)
- Retired teacher
- Lives with husband, independent ADLs
- Good social support

FAMILY HISTORY:
- Father: Died age 75, colon cancer
- Mother: Living age 82, hypertension
- Sister: Breast cancer age 62 (ER+)
- No lung cancer in family

REVIEW OF SYSTEMS:
Constitutional: Weight loss 10 lbs over 2 months, occasional night sweats, fatigue
Respiratory: Persistent dry cough, no hemoptysis, no dyspnea at rest
Cardiac: No chest pain, no palpitations
MSK: Mild left hip pain (site of bone met), no other bone pain
Neuro: No headaches, no focal deficits
Other systems: Negative

PHYSICAL EXAMINATION:
Vitals: BP 128/82, HR 76, RR 16, Temp 98.6°F, O2 Sat 97% RA
General: Well-appearing, no acute distress
HEENT: PERRL, EOMI, OP clear
Neck: No LAD, no JVD
Lungs: Clear to auscultation bilaterally, no wheezing
Heart: RRR, no m/r/g
Abdomen: Soft, NT/ND, no HSM
Extremities: No edema, left hip tender to palpation
Neuro: CN II-XII intact, strength 5/5 throughout
Skin: No rash

LABORATORY DATA (02/22/23):
CBC: WBC 7.2, Hgb 13.5, Plt 250 - all WNL
CMP: Normal renal/hepatic function
CEA: 8.5 (mildly elevated)

IMAGING REVIEW:
- CT Chest 02/10/23: 3.8cm RUL mass, mediastinal LAD
- PET-CT 02/15/23: Hypermetabolic RUL mass, N2 node, bone met left femur
- Brain MRI 03/02/23: No intracranial metastases

PATHOLOGY:
Lung adenocarcinoma, moderately differentiated
ICD-O: 8140/3

MOLECULAR RESULTS:
- EGFR: Exon 21 L858R mutation POSITIVE (42% VAF)
- ALK: Negative
- ROS1: Negative
- PD-L1 TPS: 50% (HIGH)
- TMB: 6.2 mut/Mb

ASSESSMENT & PLAN:

DIAGNOSIS: Stage IV lung adenocarcinoma (cT2bN2M1), EGFR L858R mutated, PD-L1 high

TREATMENT PLAN:
Given EGFR L858R mutation, patient is excellent candidate for targeted therapy with EGFR tyrosine kinase inhibitor.

1. SYSTEMIC THERAPY:
   First-line: Osimertinib 80mg PO daily
   - Superior PFS and OS vs older EGFR-TKIs
   - Better CNS penetration (prophylactic brain protection)
   - Generally well-tolerated
   - Alternative: Chemotherapy + pembrolizumab (PD-L1 ≥50%), but EGFR-TKI preferred per NCCN

2. SUPPORTIVE CARE:
   - Orthopedic evaluation for left femoral lesion (consider prophylactic stabilization vs radiation)
   - Bone-modifying agent: Denosumab 120mg SC q4weeks
   - Antiemetics PRN
   - Continue PPI for GERD (risk with TKI therapy)

3. MONITORING:
   - Baseline: ECG (QTc), LFTs, CXR
   - CT chest/abdomen/pelvis q8-12 weeks
   - Brain MRI q12 weeks (or sooner if symptoms)
   - Monitor for TKI toxicities: rash, diarrhea, paronychia, ILD

4. BONE METASTASIS:
   - Radiation oncology consult for left femoral lesion
   - Consider palliative RT vs prophylactic fixation

5. GENETIC COUNSELING:
   - Family history of cancer - refer for germline testing consideration

PROGNOSIS DISCUSSION:
Extensive discussion with patient and husband regarding stage IV disease. Explained this is not curable but highly treatable. With EGFR-targeted therapy, median PFS 18-20 months, median OS 38-39 months. She understands treatment is palliative but can provide excellent quality of life and disease control. She is motivated to proceed.

GOALS OF CARE: Active treatment with intent to maximize quality and quantity of life.

FOLLOW-UP: Return in 2 weeks to assess treatment tolerance. Urgent return for: fever, shortness of breath, severe diarrhea, concerning rash.

Time spent: 60 minutes (>50% counseling)

Jennifer Oncologist, MD
Board Certified Medical Oncology
Electronically signed: 03/05/2023 16:45`,

  operativeReport: `OPERATIVE REPORT

Patient: Sarah Johnson
MRN: MRN-P10001
Date of Surgery: 03/05/2025
Surgeon: Dr. David Surgeon, MD, FACS
Assistant: Dr. Lisa ResidentSurgeon, MD
Anesthesia: Dr. Robert Anesthesiologist, MD

PREOPERATIVE DIAGNOSIS:
Right upper lobe lung adenocarcinoma, cT2bN2M1, status post neoadjuvant therapy with near-complete response, isolated residual disease

POSTOPERATIVE DIAGNOSIS: Same

PROCEDURE PERFORMED:
Video-Assisted Thoracoscopic Surgery (VATS) Right Upper Lobectomy with Mediastinal Lymph Node Dissection

ANESTHESIA: General endotracheal anesthesia with single-lung ventilation

INDICATIONS:
58-year-old female with EGFR+ lung adenocarcinoma who achieved near-complete response to osimertinib. Residual 1.2cm lesion in RUL. MDT consensus for surgical resection given excellent performance status and isolated disease.

PROCEDURE IN DETAIL:
After informed consent, patient was brought to the OR and placed supine. General anesthesia induced and double-lumen ETT placed. Patient positioned in left lateral decubitus with appropriate padding. Right chest prepped and draped in sterile fashion.

VATS ACCESS:
- Utility incision: 4cm incision in 5th intercostal space, anterior axillary line
- Camera port: 1cm incision in 7th intercostal space, mid-axillary line
- Anterior port: 1cm incision in 3rd intercostal space, anterior axillary line

EXPLORATION:
Right lung deflated. Thoracoscopic examination revealed:
- Small fibrotic scar in RUL anterior segment (prior tumor site)
- No pleural studding or effusion
- No gross LAD
- Excellent surgical planes

LYMPH NODE DISSECTION:
Systematic mediastinal lymph node dissection performed:
- Station 2R (right paratracheal): 3 nodes removed
- Station 4R (right lower paratracheal): 4 nodes removed
- Station 7 (subcarinal): 2 nodes removed
- Station 8/9 (paraesophageal/inferior pulmonary ligament): 2 nodes removed
All nodes appeared benign, small (<1cm)

LOBECTOMY:
Right upper lobe isolated. Structures divided with endoscopic staplers:
1. Pulmonary artery branches (anterior and posterior ascending): 3 firings of vascular stapler
2. Superior pulmonary vein: 1 firing vascular stapler
3. Right upper lobe bronchus: 1 firing of bronchial stapler (reinforced)
4. Fissure completed: 2 firings parenchymal stapler

Lobe removed via utility incision in specimen bag. Sent for frozen section.

FROZEN SECTION RESULT:
- Residual adenocarcinoma: 1.2cm, >95% treatment effect, grade 1
- Bronchial margin: Negative
- Vascular margins: Negative

HEMOSTASIS & CLOSURE:
Thorough irrigation. Hemostasis confirmed. Two 28Fr chest tubes placed (posterior and apical). Bronchial stump and vascular stumps inspected - intact. Lung inflated - good expansion of RML and RLL. Ports closed in layers with absorbable suture. Skin approximated with subcuticular suture.

SPECIMENS:
1. Right upper lobe: Sent to pathology
2. Mediastinal lymph nodes (labeled by station): Sent to pathology

DRAINS: Two 28Fr chest tubes to -20cm suction

COMPLICATIONS: None

ESTIMATED BLOOD LOSS: 75mL

FLUIDS: 1200mL crystalloid

URINE OUTPUT: 300mL clear yellow

CONDITION: Patient extubated in OR, transferred to PACU in stable condition

PLAN:
- ICU admission overnight (routine post-thoracotomy)
- Chest tubes to suction, wean per protocol
- Aggressive pulmonary toilet, incentive spirometry
- Pain control: Epidural + PO analgesics
- DVT prophylaxis: SCDs + enoxaparin when not bleeding
- CXR in PACU and POD1
- Final pathology pending

David Surgeon, MD, FACS
Board Certified Thoracic Surgery
Electronically signed: 03/05/2025 14:30`,

  chemoOrders: `CHEMOTHERAPY TREATMENT ORDERS

Patient: Sarah Johnson
MRN: MRN-P10001
Date: 04/01/2025
Ordering Physician: Dr. Jennifer Oncologist, MD

DIAGNOSIS: Stage IV lung adenocarcinoma (EGFR+), status post RUL lobectomy

REGIMEN: Carboplatin + Pemetrexed (Adjuvant)
CYCLE: 1 of 4 planned
DAY: 1 of 21-day cycle

HEIGHT: 165 cm (5'5")
WEIGHT: 68 kg (150 lbs)
BSA: 1.76 m²

ALLERGIES: NKDA

BASELINE LABS (03/30/2025):
- ANC: 2800/µL (>1500 required) ✓
- Platelets: 185,000/µL (>100,000 required) ✓
- Hemoglobin: 12.8 g/dL
- Creatinine: 0.8 mg/dL (CrCl >45 required) ✓
- Total Bilirubin: 0.6 mg/dL
- AST/ALT: WNL ✓

PRE-MEDICATIONS:
1. Dexamethasone 12mg PO - give at home day prior, morning of, and evening of chemotherapy
2. Ondansetron 16mg PO - 30 minutes prior to chemotherapy
3. Famotidine 20mg IV - 30 minutes prior to chemotherapy
4. Diphenhydramine 25mg IV - 30 minutes prior to carboplatin

CHEMOTHERAPY ORDERS:

1. PEMETREXED 880mg IV (500 mg/m² x 1.76 m² = 880mg)
   - Mix in 100mL NS
   - Infuse over 10 minutes
   - Administer FIRST

2. CARBOPLATIN AUC 5 = 555mg IV (Calvert formula)
   - CrCl (Cockcroft-Gault): 95 mL/min
   - Dose = 5 x (95 + 25) = 600mg (round to 555mg per protocol)
   - Mix in 250mL D5W
   - Infuse over 30 minutes
   - Administer AFTER pemetrexed

SUPPORTIVE MEDICATIONS:

VITAMIN SUPPLEMENTATION (reduce toxicity):
- Folic acid 1mg PO daily (start 7 days before, continue during treatment)
- Vitamin B12 1000mcg IM q9weeks (started 1 week before cycle 1)

POST-CHEMOTHERAPY:
- Ondansetron 8mg PO Q8H PRN nausea x 3 days
- Prochlorperazine 10mg PO Q6H PRN breakthrough nausea
- Loperamide 2mg PO after first loose stool, then 2mg after each loose stool (max 16mg/day)

GROWTH FACTOR SUPPORT:
- Pegfilgrastim 6mg SC on Day 2 (>24 hours post-chemo, <14 days)

MONITORING:
- CBC with diff Day 8 and Day 15
- CMP Day 15
- If ANC <1000 or Plt <75,000: Hold next cycle, assess weekly

NEXT CYCLE: Day 22 (04/22/2025) pending blood counts

TREATMENT PLAN:
Total 4 cycles planned. Re-staging CT after cycle 2 and cycle 4.

NURSING NOTES:
- Verify informed consent on file
- Verify pregnancy test negative (if applicable)
- Monitor vital signs per protocol
- Flush line between medications
- Extravasation risk: MODERATE (Carboplatin)

PHARMACIST VERIFICATION: John PharmD - Verified doses and calculations correct

Jennifer Oncologist, MD
Board Certified Medical Oncology
Electronically signed: 04/01/2025 09:00

PATIENT EDUCATION COMPLETED:
✓ Side effects discussed (nausea, fatigue, myelosuppression, neuropathy risk)
✓ Neutropenic precautions reviewed
✓ Emergency contact numbers provided
✓ Patient verbalized understanding

RN: Sarah ChemoNurse, RN, OCN
Time: 09:15`,

  radiationConsult: `RADIATION ONCOLOGY CONSULTATION

Patient: Sarah Johnson
MRN: MRN-P10001
Date of Consultation: 05/15/2025
Attending: Dr. Lisa Radiation Oncologist, MD
Location: Memorial Hospital Radiation Oncology

CHIEF COMPLAINT:
Residual mediastinal lymphadenopathy post-chemotherapy, referred for adjuvant radiation therapy.

HISTORY OF PRESENT ILLNESS:
Ms. Johnson is a 58-year-old female with Stage IV lung adenocarcinoma (EGFR L858R+) who underwent RUL lobectomy in March 2025 following response to osimertinib. She recently completed 4 cycles of adjuvant carboplatin/pemetrexed with good tolerance. Restaging CT shows residual 1.5cm right paratracheal lymph node (decreased from 1.8cm pre-op). Referred for consideration of consolidative radiation to mediastinum.

ONCOLOGIC HISTORY:
- Feb 2023: Diagnosed cT2bN2M1 lung adenocarcinoma, EGFR L858R+
- Feb 2023-Feb 2025: Osimertinib with excellent response
- Mar 2025: VATS RUL lobectomy, pT1bN0M0 (path complete response in primary tumor)
- Apr-May 2025: 4 cycles adjuvant carboplatin/pemetrexed
- Current: Residual mediastinal LAD, considering radiation

PATHOLOGY REVIEW:
- 3/5/25 Surgical pathology: RUL adenocarcinoma with >95% treatment effect, 1.2cm residual
- Margins negative
- 11 lymph nodes examined, all negative (pN0)
- Final stage: ypT1bN0M0 (post-treatment)

IMAGING REVIEW:
- CT chest 5/10/25:
  * Status post RUL lobectomy, expected changes
  * Right paratracheal node 1.5 x 1.2 cm (previously 1.8cm)
  * No new lesions
  * Left femoral lesion stable (bone met, on denosumab)

PAST MEDICAL HISTORY:
- Hypertension (controlled)
- Hyperlipidemia (controlled)
- GERD

MEDICATIONS:
1. Osimertinib 80mg PO daily (resumed post-chemo)
2. Denosumab 120mg SC q4weeks
3. Lisinopril 10mg PO daily
4. Atorvastatin 20mg PO daily
5. Omeprazole 20mg PO daily

ALLERGIES: NKDA

SOCIAL HISTORY:
- Never smoker (0 pack-years)
- Secondhand smoke exposure
- ECOG PS 1
- Lives with husband
- Retired teacher

PHYSICAL EXAMINATION:
Vitals: BP 122/78, HR 72, RR 14, O2 Sat 98% RA
General: Well-appearing, NAD
HEENT: Normal
Neck: Healed surgical scar, no LAD
Lungs: Decreased breath sounds right upper, otherwise clear
Heart: RRR
Abdomen: Soft, NT
Extremities: No edema
Skin: Mild EGFR-related acneiform rash (grade 1)

ASSESSMENT:
58-year-old female with lung adenocarcinoma status post multimodality therapy with residual mediastinal lymphadenopathy. Excellent candidate for consolidative radiation therapy to the mediastinum.

RADIATION TREATMENT PLAN:

TARGET DEFINITION:
- GTV (Gross Tumor Volume): Residual 1.5cm right paratracheal node
- CTV (Clinical Target Volume): GTV + 0.5cm margin + ipsilateral mediastinal nodal stations (2R, 4R)
- PTV (Planning Target Volume): CTV + 0.5cm margin for setup/motion

TECHNIQUE:
- Intensity-Modulated Radiation Therapy (IMRT)
- 4D-CT simulation for respiratory motion assessment
- Daily IGRT with CBCT verification
- Respiratory gating if needed for tumor motion >5mm

DOSE/FRACTIONATION:
- 66 Gy in 33 fractions (2 Gy per fraction)
- 5 fractions per week (Monday-Friday)
- Total treatment time: 6.5 weeks
- Start date: 06/01/2025 (pending simulation)

DOSE CONSTRAINTS (per RTOG):
- Spinal cord: Max dose <45 Gy
- Esophagus: Mean dose <34 Gy, V60 <40%
- Heart: Mean dose <26 Gy, V40 <40%
- Right lung: V20 <30%, Mean dose <20 Gy
- Left lung: V5 <55%
- Brachial plexus: Max dose <60 Gy

CONCURRENT SYSTEMIC THERAPY:
- Continue osimertinib during radiation (no radiosensitization concern)
- Hold if grade 3+ pneumonitis develops

SIMULATION:
Scheduled for 05/22/2025
- 4D-CT simulation in supine position
- Custom immobilization: Alpha cradle or wing board
- IV contrast for vessel delineation
- Planning CT with 2mm slices

TREATMENT SCHEDULE:
- Planning: 1 week post-simulation
- Start date: 06/01/2025
- Weekly on-treatment visits
- Weekly CBC, CMP (monitor for myelosuppression)

ANTICIPATED TOXICITIES:

ACUTE (During/within 3 months):
- Fatigue (80%): Grade 1-2 expected
- Esophagitis (60%): Grade 1-2, manage with viscous lidocaine, PPI
- Pneumonitis (15%): Low risk, monitor clinically and with imaging
- Dermatitis (30%): Mild, manage with aloe/aquaphor
- Cough (40%): Usually mild

LATE (>3 months):
- Pulmonary fibrosis (<10%): Monitor PFTs at 3, 6, 12 months
- Esophageal stricture (<5%): Rare at this dose
- Cardiac toxicity (<5%): Long-term follow-up
- Brachial plexopathy (<1%): Very rare

SUPPORTIVE CARE:
- Ondansetron 8mg PO BID PRN nausea
- Viscous lidocaine 15mL PO QID PRN esophagitis
- Continue PPI (omeprazole 40mg daily during RT)
- Aquaphor for skin care to treatment field
- Incentive spirometry

MONITORING DURING TREATMENT:
- Weekly evaluation by radiation oncologist
- CBC, CMP weekly
- Assess for pneumonitis symptoms (dyspnea, cough, fever)
- Pulmonary function tests at baseline and 3 months post-RT

FOLLOW-UP PLAN:
- Week 7 (end of treatment): Final assessment
- 6-8 weeks post-RT: CT chest (expect inflammation, compare to baseline)
- 3 months: Clinical eval + CT chest
- 6 months: Clinical eval + CT chest + PFTs
- Then q3-6 months per medical oncology

DISCUSSION WITH PATIENT:
Extensive discussion regarding risks/benefits of radiation therapy. Explained treatment course, acute and late side effects, and expected outcomes. Patient understands radiation is consolidative treatment for residual disease. She is agreeable to proceed. Questions answered. Informed consent obtained.

RECOMMENDATION:
Proceed with IMRT to mediastinum, 66 Gy in 33 fractions, starting 06/01/2025.

Time spent: 45 minutes (counseling and coordination of care)

Lisa Radiation Oncologist, MD
Board Certified Radiation Oncology
Electronically signed: 05/15/2025 15:30`,
};
