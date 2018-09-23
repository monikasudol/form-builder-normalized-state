import { combineReducers } from 'redux';
import { currentFormReducer } from './current-form';

export const rootReducer = combineReducers({
  currentForm: currentFormReducer
});
