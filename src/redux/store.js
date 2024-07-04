import { createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import cartRedux from './cartRedux';
import userRedux from './userRedux';

const rootReducer = combineReducers({
  cart : cartRedux,
  user: userRedux
});

const persistedReducer = persistReducer({
  key: 'root',
  storage,
}, rootReducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export default store;
export { persistor };