import { configureStore } from '@reduxjs/toolkit';
import cohortReducer from './slices/cohortSlice';
import documentsReducer from './slices/documentsSlice';
import ontologyReducer from './slices/ontologySlice';
import processingReducer from './slices/processingSlice';
import validationReducer from './slices/validationSlice';

export const store = configureStore({
  reducer: {
    cohort: cohortReducer,
    documents: documentsReducer,
    ontology: ontologyReducer,
    processing: processingReducer,
    validation: validationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
