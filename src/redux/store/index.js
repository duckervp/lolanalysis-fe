import storage from "redux-persist/lib/storage";
import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from 'redux-persist'

import accountReducer from '../slice/accountSlice';

const accountPersistConfig = {
  key: 'account',
  storage
}

const store = configureStore({
  reducer: { account: persistReducer(accountPersistConfig, accountReducer)},
  middleware: getDefaultMiddleware => getDefaultMiddleware(
    {
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }
  ),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export default store;