import {call, put, takeEvery} from '@redux-saga/core/effects';

import {AxiosResponse} from 'axios';

import {setPreloaderStatus} from '../reducers/appReducer';
import {AsteroidsResponseType, nasaApi} from '../../api/nasaApi';
import {initializedAsteroids} from '../reducers/asteroidsReducer';

export function* fetchAsteroidsWorker(action: ReturnType<typeof fetchAsteroids>) {
    try {
        yield put(setPreloaderStatus({status: 'loading'}));
        const res: AxiosResponse<AsteroidsResponseType> = yield call(nasaApi.getAsteroids, action.start_date, action.end_date);
        yield put(initializedAsteroids({data: res.data}));
        yield put(setPreloaderStatus({status: 'succeeded'}));
    } catch (err) {

    }
}

export const fetchAsteroids = (start_date: string, end_date: string) => ({type: 'ASTEROIDS/FETCH_ASTEROIDS', start_date, end_date});

export function* asteroidsWatcher() {
    yield takeEvery('ASTEROIDS/FETCH_ASTEROIDS', fetchAsteroidsWorker);
}

