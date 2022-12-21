import {call, put, takeEvery} from '@redux-saga/core/effects';

import {AxiosError, AxiosResponse} from 'axios';

import {setError, setPreloaderStatus} from '../reducers/appReducer';
import {AsteroidsResponseType, nasaApi} from '../../api/nasaApi';
import {initializedAsteroids, initializedNewAsteroids} from '../reducers/asteroidsReducer';

export const fetchAsteroids = (start_date: string, end_date: string) => ({type: 'ASTEROIDS/FETCH_ASTEROIDS', start_date, end_date});

export function* fetchAsteroidsWorker(action: ReturnType<typeof fetchAsteroids>) {
    try {
        yield put(setPreloaderStatus({status: 'loading'}));
        const res: AxiosResponse<AsteroidsResponseType> = yield call(nasaApi.getAsteroids, action.start_date, action.end_date);
        yield put(initializedAsteroids({data: res.data}));
        yield put(setPreloaderStatus({status: 'succeeded'}));
    } catch (err) {
        yield put(errorHandler(err as AxiosError));
    }
}

export const fetchNewAsteroids = (next: string) => ({type: 'ASTEROIDS/FETCH_NEW_ASTEROIDS', next});

export function* fetchNewAsteroidsWorker(action: ReturnType<typeof fetchNewAsteroids>) {
    try {
        yield put(setPreloaderStatus({status: 'loading'}));
        const res: AxiosResponse<AsteroidsResponseType> = yield call(nasaApi.getNewAsteroids, action.next);
        yield put(initializedNewAsteroids({data: res.data}));
        yield put(setPreloaderStatus({status: 'succeeded'}));
    } catch (err) {
        yield put(errorHandler(err as AxiosError));
    }
}

export const errorHandler = (err: AxiosError) => ({type: 'ASTEROIDS/ERROR', err});

export function* errorWorker(action: ReturnType<typeof errorHandler>) {
    const err = action.err;
    const error = err.response?.data ? (err.response?.data as ({ message: string })).message : err.message + ', more details in the console';
    yield put(setError({error}));
    yield put(setPreloaderStatus({status: 'failed'}));
    // console.log((e.response?.data as ({ message: string })).message);
}

export function* asteroidsWatcher() {
    yield takeEvery('ASTEROIDS/FETCH_ASTEROIDS', fetchAsteroidsWorker);
    yield takeEvery('ASTEROIDS/FETCH_NEW_ASTEROIDS', fetchNewAsteroidsWorker);
    yield takeEvery('ASTEROIDS/ERROR', errorWorker);
}

