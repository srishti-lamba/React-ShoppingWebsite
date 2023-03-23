import { createSlice } from '@reduxjs/toolkit';

const initialState = null;



export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      let user = {
        id: action.payload.id,
        userName: action.payload.userName,
        isAdmin: action.payload.isAdmin
      }
      return {...state, user}
    },
    resetUser: (state) => {
      return initialState
    },
  }
});

export const { setUser, resetUser} = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.user;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default userSlice.reducer;
