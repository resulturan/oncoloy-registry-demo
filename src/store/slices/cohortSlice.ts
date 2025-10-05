import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CohortState, FilterCriteria } from '../../types';
import { mockPatients } from '../../data/mockPatients';

const initialState: CohortState = {
  filters: {
    dateRange: null,
    cancerTypes: [],
    facility: '',
    ageRange: [0, 100],
    gender: [],
  },
  patients: mockPatients,
  selectedPatientIds: [],
  currentPage: 1,
  pageSize: 10,
};

const cohortSlice = createSlice({
  name: 'cohort',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterCriteria>) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    togglePatientSelection: (state, action: PayloadAction<string>) => {
      const index = state.selectedPatientIds.indexOf(action.payload);
      if (index > -1) {
        state.selectedPatientIds.splice(index, 1);
      } else {
        state.selectedPatientIds.push(action.payload);
      }
    },
    selectAllPatients: (state) => {
      state.selectedPatientIds = state.patients.map((p) => p.id);
    },
    deselectAllPatients: (state) => {
      state.selectedPatientIds = [];
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setFilters,
  resetFilters,
  togglePatientSelection,
  selectAllPatients,
  deselectAllPatients,
  setCurrentPage,
} = cohortSlice.actions;

export default cohortSlice.reducer;
