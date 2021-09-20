import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './features/auth/authSlice';
import projectReducer from './features/project/projectSlice';
import boardReducer from './features/board/boardSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  board: boardReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['project', 'board'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
