import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AsteroidType} from '../../api/nasaApi';

const slice = createSlice({
    name: 'basket',
    initialState: {
        asteroids: [] as AsteroidType[],
        totalCount: 0,
    },
    reducers: {
        addAsteroidToBasket(state, action: PayloadAction<{ asteroid: AsteroidType }>) {
            state.asteroids.push(action.payload.asteroid);
            state.totalCount = state.asteroids.length;
        },
        removeFromBasket(state, action: PayloadAction<{ id: string }>) {
            state.asteroids = state.asteroids.filter(a => a.id !== action.payload.id);
            state.totalCount = state.asteroids.length;
        },
    },
});

export const basketReducer = slice.reducer;
export const {addAsteroidToBasket, removeFromBasket} = slice.actions;

export type ActionForBasketReducer = ReturnType<typeof addAsteroidToBasket> | ReturnType<typeof removeFromBasket>