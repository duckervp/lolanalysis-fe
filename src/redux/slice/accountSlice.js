import { createSlice } from '@reduxjs/toolkit';

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    gameName: '',
    puuid: '',
    tagLine: '',
  },
  reducers: {
    setAccount: (state, { payload }) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAccount } = accountSlice.actions;

export const selectCurrentAccount = (state) => state?.account;

export const selectCurrentAccountPuuid = (state) => state?.account?.puuid;

export const selectCurrentAccountName = (state) => state?.account?.gameName;

export default accountSlice.reducer;
