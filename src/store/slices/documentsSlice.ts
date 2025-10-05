import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DocumentsState } from '../../types';

const initialState: DocumentsState = {
  currentPatientId: '',
  documents: {},
  selectedDocumentId: null,
  timelineZoom: 'month',
  activeFilters: [],
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setCurrentPatient: (state, action: PayloadAction<string>) => {
      state.currentPatientId = action.payload;
    },
    setDocuments: (state, action: PayloadAction<{ patientId: string; documents: any[] }>) => {
      state.documents[action.payload.patientId] = action.payload.documents;
    },
    setSelectedDocument: (state, action: PayloadAction<string | null>) => {
      state.selectedDocumentId = action.payload;
    },
    setTimelineZoom: (state, action: PayloadAction<'day' | 'week' | 'month' | 'year'>) => {
      state.timelineZoom = action.payload;
    },
    toggleDocumentFilter: (state, action: PayloadAction<string>) => {
      const index = state.activeFilters.indexOf(action.payload);
      if (index > -1) {
        state.activeFilters.splice(index, 1);
      } else {
        state.activeFilters.push(action.payload);
      }
    },
    resetDocumentFilters: (state) => {
      state.activeFilters = [];
    },
  },
});

export const {
  setCurrentPatient,
  setDocuments,
  setSelectedDocument,
  setTimelineZoom,
  toggleDocumentFilter,
  resetDocumentFilters,
} = documentsSlice.actions;

export default documentsSlice.reducer;
