import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProcessingState, LogEntry, PatientProcessingProgress } from '../../types';

const initialState: ProcessingState = {
  status: 'idle',
  overallProgress: 0,
  patientProgress: {},
  logs: [],
  timelineRange: { start: '2023-01-01', end: new Date().toISOString().split('T')[0] },
  processingMode: 'Standard',
  extractOptional: true,
  allowInference: true,
};

const processingSlice = createSlice({
  name: 'processing',
  initialState,
  reducers: {
    startProcessing: (state) => {
      state.status = 'processing';
      state.overallProgress = 0;
      state.logs = [];
    },
    setOverallProgress: (state, action: PayloadAction<number>) => {
      state.overallProgress = action.payload;
    },
    setPatientProgress: (
      state,
      action: PayloadAction<{ patientId: string; progress: PatientProcessingProgress }>
    ) => {
      state.patientProgress[action.payload.patientId] = action.payload.progress;
    },
    addLog: (state, action: PayloadAction<LogEntry>) => {
      state.logs.push(action.payload);
    },
    completeProcessing: (state) => {
      state.status = 'completed';
      state.overallProgress = 100;
    },
    failProcessing: (state) => {
      state.status = 'failed';
    },
    resetProcessing: (state) => {
      state.status = 'idle';
      state.overallProgress = 0;
      state.patientProgress = {};
      state.logs = [];
    },
    setTimelineRange: (state, action: PayloadAction<{ start: string; end: string }>) => {
      state.timelineRange = action.payload;
    },
    setProcessingMode: (state, action: PayloadAction<'Basic' | 'Standard' | 'Comprehensive'>) => {
      state.processingMode = action.payload;
    },
    setExtractOptional: (state, action: PayloadAction<boolean>) => {
      state.extractOptional = action.payload;
    },
    setAllowInference: (state, action: PayloadAction<boolean>) => {
      state.allowInference = action.payload;
    },
  },
});

export const {
  startProcessing,
  setOverallProgress,
  setPatientProgress,
  addLog,
  completeProcessing,
  failProcessing,
  resetProcessing,
  setTimelineRange,
  setProcessingMode,
  setExtractOptional,
  setAllowInference,
} = processingSlice.actions;

export default processingSlice.reducer;
