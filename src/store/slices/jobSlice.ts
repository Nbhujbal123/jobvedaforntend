import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { JobSearchFilters } from '@/types/job.types';

interface JobState {
  filters: JobSearchFilters;
  savedJobIds: string[];
}

const initialState: JobState = {
  filters: {},
  savedJobIds: [],
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<JobSearchFilters>) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {};
    },
    toggleSavedJob: (state, action: PayloadAction<string>) => {
      const jobId = action.payload;
      state.savedJobIds = state.savedJobIds.includes(jobId)
        ? state.savedJobIds.filter((id) => id !== jobId)
        : [...state.savedJobIds, jobId];
    },
  },
});

export const { setFilters, resetFilters, toggleSavedJob } = jobSlice.actions;
export default jobSlice.reducer;
