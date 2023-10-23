import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import orderReducer from '../features/orderIdSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    orderId: orderReducer,
  },
});
