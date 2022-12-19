import React, {useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from '../../store/store';

import SkeletonForAsteroid from '../skeleton/SkeletonForAsteroid';

import blackHole from '../../assets/img/blackHole.png';

import {fetchNewAsteroids} from '../../store/saga/asteroidSaga';

import {AsteroidType} from '../../api/nasaApi';

import Asteroid from './Asteroid/Asteroid';

import style from './Asteroids.module.scss';

interface Interface {
    [asteroid: string]: AsteroidType[];
}

const AsteroidsContainer: React.FC = () => {
    const near_earth_objects = useAppSelector(state => state.asteroids.near_earth_objects) as Interface;
    const next = useAppSelector(state => state.asteroids.links.next);
    const hazardousFromStore = useAppSelector(state => state.searchParam.hazardous);
    const isLoading = useAppSelector(state => state.app.status) === 'loading';
    const dispatch = useAppDispatch();
    const [fetching, setFetching] = useState(false);

    let newAsteroids: AsteroidType[] = [];

    for (const newAsteroidsKey in near_earth_objects) {
        newAsteroids = [...newAsteroids, ...near_earth_objects[newAsteroidsKey]];
    }

    newAsteroids.sort((a, b) =>
        Date.parse(a.close_approach_data[0].close_approach_date_full.toString())
        - Date.parse(b.close_approach_data[0].close_approach_date_full.toString()));

    newAsteroids = hazardousFromStore ? [...newAsteroids].filter(asteroid => asteroid.is_potentially_hazardous_asteroid) : newAsteroids;

    const scrollHandler = () => {
        if (document.body.offsetHeight - (window.scrollY + window.innerHeight) < 100) {
            setFetching(true);
        }
    };

    useEffect(() => {
        if (fetching && !hazardousFromStore) {
            dispatch(fetchNewAsteroids(next));
        }
    }, [fetching]);

    useEffect(() => {
        if (!isLoading) setFetching(false);
    }, [isLoading]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    // display blackHole-preloader for first render
    if (isLoading && newAsteroids.length === 0) {
        return <div className={'blackHole'}>
            <img src={blackHole} alt=""/>
        </div>;
    }

    return (
        <div className={style.asteroids}>
            {newAsteroids.map(asteroid => isLoading ? <SkeletonForAsteroid key={asteroid.id}/> : <Asteroid key={asteroid.id} asteroid={asteroid}/>)}
        </div>
    );
};

export default AsteroidsContainer;
