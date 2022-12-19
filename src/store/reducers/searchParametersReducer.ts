import {createSlice, PayloadAction} from '@reduxjs/toolkit';

let today = new Date();

const slice = createSlice({
    name: 'searchParameters',
    initialState: {
        start_date: new Date(),
        end_date: new Date(today.getTime() + (24 * 60 * 60 * 1000)),
        units: 'kilometers' as UnitsType,
        hazardous: false,
    },
    reducers: {
        changeHazardousFilter(state, action: PayloadAction<{ hazardous: boolean }>) {
            state.hazardous = action.payload.hazardous;
        },
        changeDateFilter(state, action: PayloadAction<{ start_date: Date, end_date: Date }>) {
            state.end_date = action.payload.end_date;
            state.start_date = action.payload.start_date;
        },
        changeUnitsFilter(state, action: PayloadAction<{ units: UnitsType }>) {
            state.units = action.payload.units;
        },
    },
});

export const {changeHazardousFilter, changeDateFilter, changeUnitsFilter} = slice.actions;
export const searchParametersReducer = slice.reducer;

export type UnitsType = 'kilometers' | 'miles'

export type ActionsTypeFoeSearchParametersReducer = ReturnType<typeof changeHazardousFilter> | ReturnType<typeof changeDateFilter> | ReturnType<typeof changeUnitsFilter>