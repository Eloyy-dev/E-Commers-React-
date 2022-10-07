import { createSlice } from '@reduxjs/toolkit';

export const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState: true,
    reducers: {
        setLoading: (state, action) => {
            const isLoading = action.payload
            return isLoading
        }
    }
})

export const { setLoading } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;
