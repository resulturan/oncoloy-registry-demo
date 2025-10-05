import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ValidationState, MCODEResult } from '../../types';

const initialState: ValidationState = {
  currentPatientId: '',
  results: {},
  activeTab: 'Patient',
  filterMode: 'all',
  sortBy: 'category',
  provenanceOpen: false,
  selectedElementForProvenance: null,
};

const validationSlice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    setCurrentValidationPatient: (state, action: PayloadAction<string>) => {
      state.currentPatientId = action.payload;
    },
    setPatientResult: (
      state,
      action: PayloadAction<{ patientId: string; result: MCODEResult }>
    ) => {
      state.results[action.payload.patientId] = action.payload.result;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setFilterMode: (state, action: PayloadAction<string>) => {
      state.filterMode = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setProvenanceOpen: (state, action: PayloadAction<boolean>) => {
      state.provenanceOpen = action.payload;
    },
    setSelectedElementForProvenance: (state, action: PayloadAction<string | null>) => {
      state.selectedElementForProvenance = action.payload;
    },
    updateElementStatus: (
      state,
      action: PayloadAction<{
        patientId: string;
        category: string;
        element: string;
        status: 'confirmed' | 'needs_review' | 'rejected';
      }>
    ) => {
      const { patientId, category, element, status } = action.payload;
      if (state.results[patientId]) {
        const categoryData = (state.results[patientId] as any)[category];
        if (categoryData && categoryData[element]) {
          if (Array.isArray(categoryData[element])) {
            // Handle array elements like biomarkerTests
            categoryData[element].forEach((item: any) => {
              item.status = status;
            });
          } else {
            categoryData[element].status = status;
          }
        }
      }
    },
  },
});

export const {
  setCurrentValidationPatient,
  setPatientResult,
  setActiveTab,
  setFilterMode,
  setSortBy,
  setProvenanceOpen,
  setSelectedElementForProvenance,
  updateElementStatus,
} = validationSlice.actions;

export default validationSlice.reducer;
