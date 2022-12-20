import {AsteroidType} from '../api/nasaApi';

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('asteroids');
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {

    }
};

export const saveState = (state: { basket: { asteroids: AsteroidType[], totalCount: number } }) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('asteroids', serializedState);
    } catch {

    }
};