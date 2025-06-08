import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlices';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import emotionsReducer from './slices/emotionSlices';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'emotions'],
};

const rootReducer = combineReducers({
  user: userReducer,
  emotions: emotionsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
