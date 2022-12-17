import React from 'react';

import {Skeleton} from '@mantine/core';

import style from '../Asteroids/Asteroid/Asteroid.module.scss';

const SkeletonForAsteroid: React.FC = () => {
    return (
        <div className={style.asteroid} style={{padding: 16}}>

            <div className={style.name}>
                <Skeleton height={22} radius="xl" width={'40%'}/>
            </div>
            <div className={style.avatar}>
                <Skeleton height={100} circle mb="xl" style={{margin: '0 auto'}}/>
            </div>

            <Skeleton height={18} radius="xl" width={'65%'} style={{margin: '10px 0'}}/>
            <Skeleton height={18} radius="xl" width={'95%'} style={{margin: '10px 0'}}/>
            <Skeleton height={18} radius="xl" width={'95%'} style={{margin: '10px 0'}}/>
            <Skeleton height={18} radius="xl" width={'95%'} style={{margin: '10px 0'}}/>
            <Skeleton height={18} radius="xl" width={'95%'} style={{margin: '10px 0'}}/>
            <Skeleton height={18} radius="xl" width={'95%'} style={{margin: '10px 0'}}/>

            <div className={style.firedBtn}>
                <Skeleton height={31} radius="sm" width={'22%'} style={{margin: '15px 0'}}/>
            </div>


        </div>
    );
};

export default SkeletonForAsteroid;