import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  budgetGive: []  // Assuming this is meant to store the array of budget distributions
};

export const promotionSlice = createSlice({
  name: 'promotions',
  initialState,
  reducers: {
    setBudgetGive: (state, action) => {
      state.budgetGive = action.payload;
    },
    clear: (state) => {
      state.budgetGive = [];
    },
    addElement: (state, action) => {
      state.budgetGive.push(action.payload);  // Adds the new element to the budgetGive array
    //   console.log(state);
    }
  }
});

// Exporting the action creators
export const { setBudgetGive, clear, addElement } = promotionSlice.actions;

// Exporting the reducer
export default promotionSlice.reducer;
