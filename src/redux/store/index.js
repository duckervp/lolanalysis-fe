import { configureStore } from '@reduxjs/toolkit';

import accountReducer from '../slice/accountSlice';

export default configureStore({
  reducer: { account: accountReducer },
  devTools: process.env.NODE_ENV !== 'production',
});
