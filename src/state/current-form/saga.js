import { takeEvery, put, select, call } from 'redux-saga/effects';
import {
  ADD_SUBINPUT,
  ADD_SUBINPUT_SUCCESS,
  CHANGE_TYPE,
  CHANGE_QUESTION,
  DELETE_INPUT,
  DELETE_INPUT_SUCCESS,
  ON_LOAD,
  ADD_CONDITION,
  addSubInputSuccess,
  changeQuestionSuccess,
  addSubInput,
  changeTypeSuccess,
  deleteInputSuccess,
  onLoadSuccess,
  addConditionSuccess,
  deleteSetOfInputsSuccess,
  ADD_CONDITION_SUCCESS
} from './index';
import { fetchHistory } from '../../indexed-db';

export default function* () {
  yield takeEvery(ADD_SUBINPUT, onAddSubInput);
  yield takeEvery(ADD_SUBINPUT_SUCCESS, onRefresh);
  yield takeEvery(CHANGE_QUESTION, onChangingQuestion);
  yield takeEvery(CHANGE_TYPE, onChangeType);
  yield takeEvery(DELETE_INPUT, onInputDelete);
  yield takeEvery(DELETE_INPUT_SUCCESS, onRefresh);
  yield takeEvery(ON_LOAD, onRefresh);
  yield takeEvery(ADD_CONDITION, onAddCondition),
    yield takeEvery(ADD_CONDITION_SUCCESS, onRefresh)
}

function* onRefresh(action) {
  try {
    const oldStore = yield call(fetchHistory);
    const currentForm = oldStore.currentForm;
    if (currentForm.lastInputId) {
      yield put(onLoadSuccess(currentForm))
    }
    else {
      currentForm.lastInputId = 1;
      yield put(onLoadSuccess(currentForm));
    }

  } catch (e) {
    console.log('Sth went wrong')
  }
}

function* onAddCondition(action) {
  const { payload } = action;
  try {
    yield put(addConditionSuccess(payload))
  } catch (e) {
    console.log('Sth went wrong')
  }
}

function* onAddSubInput(action) {
  const { payload } = action;
  try {
    yield put(addSubInputSuccess(payload))
  } catch (e) {
    console.log('Sth went wrong')
  }
}

function* onChangingQuestion(action) {
  try {
    yield put(changeQuestionSuccess(action.payload))
  } catch (e) {
    console.log('Sth went wrong')
  }
};

function* onChangeType(action) {
  console.log(action.payload)
  try {
    yield put(changeTypeSuccess(action.payload))
  } catch (e) {
    console.log('Sth went wrong')
  }
};

function* onInputDelete(action) {
  const { payload } = action;
  const { id, parentId } = payload;
  const state = yield select();
  const inputs = state.currentForm.inputs;
  const newSetOfInputs = inputs.filter(input => input.id !== id)
    .filter(input => input.parentId !== id);
  if (parentId) {
    const newSetOfParentChildren = inputs.filter(input => input.id === parentId)[0].childrenIds
      .filter(childrenId => childrenId !== id);
    try {
      yield put(deleteInputSuccess({ id, parentId, newSetOfParentChildren }))
    } catch (e) {
      console.log('Sth went wrong')
    }
  }
  try {
    yield put(deleteSetOfInputsSuccess(newSetOfInputs))
  } catch (e) {
    console.log('Sth went wrong')
  }
};
