import React from 'react';

import {useAppSelector} from '../../store/store';

import SkeletonForAsteroid from '../skeleton/SkeletonForAsteroid';

import Asteroid from './Asteroid/Asteroid';

import style from './Asteroids.module.scss';

const AsteroidsContainer: React.FC = () => {
    const asteroids = useAppSelector(state => state.asteroids.asteroids);
    const hazardousFromStore = useAppSelector(state => state.searchParam.hazardous);
    const isLoading = useAppSelector(state => state.app.status) === 'loading';

    const filteredAsteroids = hazardousFromStore ? [...asteroids].filter(asteroid => asteroid.is_potentially_hazardous_asteroid) : asteroids;

    return (
        <div className={style.asteroids}>
            {filteredAsteroids.map(asteroid => isLoading ? <SkeletonForAsteroid/> : <Asteroid key={asteroid.id} asteroid={asteroid}/>)}
        </div>
    );
};

export default AsteroidsContainer;