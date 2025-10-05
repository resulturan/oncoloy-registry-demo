import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OntologyState } from '../../types';
import { mcodeTemplate } from '../../data/mcodeTemplate';

const initialState: OntologyState = {
  selectedOntology: 'mcode',
  selectedElements: [
    'patientIdentifier',
    'birthDate',
    'sex',
    'primaryDiagnosis',
    'primarySite',
    'T_category',
    'N_category',
    'M_category',
    'histology',
    'morphologyCode',
    'vitalStatus',
  ],
  expandedNodes: [],
  selectedElementDetails: null,
  mcodeTemplate: mcodeTemplate,
};

const ontologySlice = createSlice({
  name: 'ontology',
  initialState,
  reducers: {
    setSelectedOntology: (state, action: PayloadAction<'mcode' | 'naaccr'>) => {
      state.selectedOntology = action.payload;
    },
    toggleElement: (state, action: PayloadAction<string>) => {
      const index = state.selectedElements.indexOf(action.payload);
      if (index > -1) {
        state.selectedElements.splice(index, 1);
      } else {
        state.selectedElements.push(action.payload);
      }
    },
    selectAllMandatory: (state) => {
      if (state.mcodeTemplate) {
        const mandatoryElements: string[] = [];
        Object.values(state.mcodeTemplate).forEach((category) => {
          category.forEach((element) => {
            if (element.mandatory) {
              mandatoryElements.push(element.element_name);
            }
          });
        });
        state.selectedElements = mandatoryElements;
      }
    },
    toggleExpandedNode: (state, action: PayloadAction<string>) => {
      const index = state.expandedNodes.indexOf(action.payload);
      if (index > -1) {
        state.expandedNodes.splice(index, 1);
      } else {
        state.expandedNodes.push(action.payload);
      }
    },
    setSelectedElementDetails: (state, action: PayloadAction<string | null>) => {
      state.selectedElementDetails = action.payload;
    },
  },
});

export const {
  setSelectedOntology,
  toggleElement,
  selectAllMandatory,
  toggleExpandedNode,
  setSelectedElementDetails,
} = ontologySlice.actions;

export default ontologySlice.reducer;
