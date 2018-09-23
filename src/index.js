import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createEngine from 'redux-storage-engine-indexed-db';
import * as storage from 'redux-storage';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { rootReducer } from './state';
import rootSaga from './state/saga';

import { Store, set, get, keys } from 'idb-keyval';

// logs: ["hello", "foo"]


set('hello', 'world')
  .then(() => console.log('It worked!'))
  .catch(err => console.log('It failed!', err));
get('current-form').then(val => console.log(val));

const customStore = new Store('custom-db-name', 'custom-store-name');
set('foo', 'bar', customStore);

const sagaMiddleware = createSagaMiddleware();
const engine = createEngine('current-form');

const reducer = storage.rootReducer;

const reduxMiddlewares = [
  sagaMiddleware,
  storage.createMiddleware(engine)
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(...reduxMiddlewares)
));

sagaMiddleware.run(rootSaga);
const createStoreWithMiddleware = applyMiddleware(...reduxMiddlewares)(createStore);
const storeToIndexedDB = createStoreWithMiddleware(rootReducer);

const load = storage.createLoader(engine);

store.subscribe(() => {
  return {
    currentForm: store.getState().currentForm,
}})

const storageToLoad = load(storeToIndexedDB);

load(storeToIndexedDB)
    .then((newState) => console.log('Loaded state:', newState))
    .catch(() => console.log('Failed to load previous state'));

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
