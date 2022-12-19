import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AsteroidsResponseType, AsteroidType, Links} from '../../api/nasaApi';
import {fetchNewAsteroids} from '../saga/asteroidSaga';

const slice = createSlice({
    name: 'asteroids',
    initialState: {
        links: {} as Links,
        element_count: 0,
        asteroids: [] as AsteroidType[],
        near_earth_objects: {},
    },
    reducers: {
        initializedAsteroids(state, action: PayloadAction<{ data: AsteroidsResponseType }>) {
            state.links = action.payload.data.links;
            state.element_count = action.payload.data.element_count;
            state.near_earth_objects = {};
            state.near_earth_objects = {...state.near_earth_objects, ...action.payload.data.near_earth_objects};
        },
        initializedNewAsteroids(state, action: PayloadAction<{ data: AsteroidsResponseType }>) {
            state.links = action.payload.data.links;
            state.near_earth_objects = {...state.near_earth_objects, ...action.payload.data.near_earth_objects};
        },
    },
});

export const asteroidsReducer = slice.reducer;
export const {initializedAsteroids, initializedNewAsteroids} = slice.actions;

export type ActionForAsteroidsReducer = ReturnType<typeof initializedAsteroids> | ReturnType<typeof initializedNewAsteroids> | ReturnType<typeof fetchNewAsteroids>