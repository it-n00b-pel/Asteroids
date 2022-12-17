import createSagaMiddleware from 'redux-saga';
import {combineReducers, configureStore, ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {ActionTypeForAppReducer, appReducer} from './reducers/appReducer';
import {ActionForAsteroidsReducer, asteroidsReducer} from './reducers/asteroidsReducer';
import {asteroidsWatcher} from './saga/asteroidSaga';
import {ActionsTypeFoeSearchParametersReducer, searchParametersReducer} from './reducers/searchParametersReducer';

const rootReducer = combineReducers({
    app: appReducer,
    asteroids: asteroidsReducer,
    searchParam: searchParametersReducer,
});

const sagaMiddleware = createSagaMiddleware();

function* rootWatcher() {
    yield asteroidsWatcher();
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).prepend(sagaMiddleware),
});

sagaMiddleware.run(rootWatcher);

type AppActionsType = ActionTypeForAppReducer | ActionForAsteroidsReducer | ActionsTypeFoeSearchParametersReducer
export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
window.store = store;