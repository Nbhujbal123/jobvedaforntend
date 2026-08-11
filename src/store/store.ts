import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import jobReducer from '@/store/slices/jobSlice';
import uiReducer from '@/store/slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
