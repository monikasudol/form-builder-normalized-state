import { handleActions, createAction } from 'redux-actions';

const initialState = {
  isFormCreated: true,
  inputs: [],
  lastInputId: 0
};

const CREATE_NEW_FORM = 'current-form: create-new-form';
const ADD_INPUT = 'current-form: create-add-input';
export const CHANGE_QUESTION = 'current-form: change-question';
const CHANGE_QUESTION_SUCCESS = 'current-form: change-question-success';
export const CHANGE_TYPE = 'current-form: change-type';
const CHANGE_TYPE_SUCCESS = 'current-form: change-type-success';
export const ADD_SUBINPUT = 'current-form: add-subinput';
export const ADD_SUBINPUT_SUCCESS = 'current-form: add-subinput-success';
export const DELETE_INPUT = 'current-form: delete-input';
export const DELETE_INPUT_SUCCESS = 'current-form: delete-input-success';
export const ON_LOAD = 'current-from: on-load';
const ON_LOAD_SUCCESS = 'current-from: on-load-success';
export const ADD_CONDITION = 'current-form: add-condition';
export const ADD_CONDITION_SUCCESS = 'current-form: add-condition-success';
const DELETE_SET_OF_INPUTS_SUCCESS = 'current-form: delete-set-of-inputs-success';

export const currentFormReducer = handleActions({
  [CREATE_NEW_FORM]: (state) => ({
    ...state,
    isFormCreated: true,
    lastInputId: 1
  }),

  [ADD_INPUT]: (state, { payload }) => ({
    ...state,
    inputs: [...state.inputs,
    {
      question: payload.question,
      id: payload.id,
      condition: { type: 'text' },
      childrenIds: []
    }],
    lastInputId: state.lastInputId + 1
  }),

  [CHANGE_QUESTION_SUCCESS]: (state, { payload }) => ({
    ...state,
    inputs: [...state.inputs.map(input => {
      if (input.id === payload.id) {
        input.question = payload.question;
        return input;
      } else {
        return input;
      }
    })],
  }),

  [ADD_SUBINPUT_SUCCESS]: (state, { payload }) => ({
    ...state,
    inputs: [...state.inputs.map(input => {
      if (input.id === payload.parentId) {
        input.childrenIds = [...input.childrenIds, payload.id];
        return input;
      } else {
        return input;
      }
    }), payload],
    lastInputId: state.lastInputId + 1
  }),

  [ON_LOAD_SUCCESS]: (state, { payload }) => ({
    ...state,
    inputs: payload.inputs,
    isFormCreated: true,
    lastInputId: payload.lastInputId
  }),

  [ADD_CONDITION_SUCCESS]: (state, { payload }) => ({
    ...state,
    inputs: [...state.inputs.map(input => {
      if (input.id === payload.id) {
        input.condition = payload.condition;
        return input;
      } else {
        return input;
      }
    })]
  }),

  [DELETE_SET_OF_INPUTS_SUCCESS]: (state, { payload }) => ({
    ...state,
    inputs: [...payload]
  }),

  [CHANGE_TYPE_SUCCESS]: (state, { payload }) => ({
    ...state,
    inputs: [...state.inputs.map(input => {
      if (input.id === payload.id) {
        input.condition.type = payload.type;
        return input;
      } else {
        return input;
      }
    })],
  }),

  [DELETE_INPUT_SUCCESS]: (state, { payload }) => ({
    ...state,
    inputs: [...state.inputs.filter(input => input.id !== payload.id)
      .map(input => {
        if (input.id === payload.parentId) {
          input.childrenIds = payload.newSetOfParentChildren;
          return input;
        } else {
          return input;
        }
      })]
  })

}, initialState);

export const onLoad = createAction(ON_LOAD);
export const onLoadSuccess = createAction(ON_LOAD_SUCCESS);
export const createNewForm = createAction(CREATE_NEW_FORM);
export const addInput = createAction(ADD_INPUT);
export const addSubInputSuccess = createAction(ADD_SUBINPUT_SUCCESS);
export const changeQuestion = createAction(CHANGE_QUESTION);
export const changeQuestionSuccess = createAction(CHANGE_QUESTION_SUCCESS);
export const changeType = createAction(CHANGE_TYPE);
export const changeTypeSuccess = createAction(CHANGE_TYPE_SUCCESS);
export const addSubInput = createAction(ADD_SUBINPUT);
export const deleteInput = createAction(DELETE_INPUT);
export const deleteInputSuccess = createAction(DELETE_INPUT_SUCCESS);
export const addCondition = createAction(ADD_CONDITION);
export const addConditionSuccess = createAction(ADD_CONDITION_SUCCESS);
export const deleteSetOfInputsSuccess = createAction(DELETE_SET_OF_INPUTS_SUCCESS)
