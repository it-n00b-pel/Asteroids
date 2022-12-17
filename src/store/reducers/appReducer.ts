import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {fetchAsteroids} from '../saga/asteroidSaga';

const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
    },
    reducers: {
        setPreloaderStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status;
        },
        setError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        },
    },
});

export const appReducer = slice.reducer;
export const {setError, setPreloaderStatus} = slice.actions;
export type ActionTypeForAppReducer = ReturnType<typeof setPreloaderStatus> | ReturnType<typeof setError> | ReturnType<typeof fetchAsteroids>;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'