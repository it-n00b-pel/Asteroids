import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AsteroidsResponseType, AsteroidType, Links} from '../../api/nasaApi';

const slice = createSlice({
    name: 'asteroids',
    initialState: {
        links: {} as Links,
        element_count: 0,
        asteroids: [] as AsteroidType[],
    },
    reducers: {
        initializedAsteroids(state, action: PayloadAction<{ data: AsteroidsResponseType }>) {
            state.links = action.payload.data.links;
            state.element_count = action.payload.data.element_count;
            state.asteroids = [];
            let newAsteroids = [];
            for (const newAsteroidsKey in action.payload.data.near_earth_objects) {
                newAsteroids.push(...action.payload.data.near_earth_objects[`${newAsteroidsKey}`]);
            }
            newAsteroids.sort((a, b) =>
                Date.parse(a.close_approach_data[0].close_approach_date_full.toString())
                - Date.parse(b.close_approach_data[0].close_approach_date_full.toString()));
            state.asteroids = newAsteroids;
        },
    },
});

export const asteroidsReducer = slice.reducer;
export const {initializedAsteroids} = slice.actions;

export type ActionForAsteroidsReducer = ReturnType<typeof initializedAsteroids>