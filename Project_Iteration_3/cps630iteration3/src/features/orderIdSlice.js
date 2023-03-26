import { createSlice } from '@reduxjs/toolkit';

const initialState = null;



export const orderIdSlice = createSlice({
  name: 'orderId',
  initialState,
  reducers: {
    setOrderId: (state, action) => {
      return {...state, orderId: action.payload}
    },
    resetOrderId: (state) => {
      return initialState
    },
  }
});

export const { setOrderId, resetOrderId} = orderIdSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOrderId = (state) => state.orderId;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default orderIdSlice.reducer;
