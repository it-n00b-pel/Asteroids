import {Button, Card, Checkbox} from '@mantine/core';
import React, {useState} from 'react';

import {AsteroidType} from '../../../api/nasaApi';

import danger from '../../../assets/img/dangerAsteroid-100.png';
import noDanger from '../../../assets/img/noDangerAsteroid-100.png';
import bruce from '../../../assets/img/BruceW.png';

import style from './Asteroid.module.scss';

type AsteroidPropsType = {
    asteroid: AsteroidType
}

const Asteroid: React.FC<AsteroidPropsType> = ({asteroid}) => {

    const [st, setStyle] = useState(style.bruce);

    const onClickHandler = () => {
        setStyle(style.bruceStart);
        setTimeout(() => {
            setStyle(style.bruce);
        }, 1000);
    };

    const avatar = asteroid.is_potentially_hazardous_asteroid ?
        <img src={danger} alt="danger asteroid"/>
        : <img src={noDanger} alt="no danger asteroid"/>;

    return (

        <Card withBorder className={style.asteroid}>
            <div className={style.name}><h3>Name: {asteroid.name}</h3></div>
            <div className={style.avatar}>{avatar} </div>

            <div className={style.someInfo}><h4>Is hazardous asteroid</h4>
                <Checkbox
                    checked={asteroid.is_potentially_hazardous_asteroid}
                    disabled
                    style={{marginLeft: 20}}
                />
            </div>

            <div className={style.someInfo}><h4>Close approach data</h4><span>{asteroid.close_approach_data[0].close_approach_date_full.toString()}</span>
            </div>

            <div>
                <div className={style.someInfo}><h4>Estimated diameter min</h4><span>{asteroid.estimated_diameter.kilometers.estimated_diameter_min}</span></div>
                <div className={style.someInfo}><h4>Estimated diameter max</h4><span>{asteroid.estimated_diameter.kilometers.estimated_diameter_max}</span></div>
            </div>


            <div className={style.someInfo}><h4>Relative velocity</h4><span>{asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour}</span></div>

            <div className={style.someInfo}><h4>Miss distance</h4><span>{asteroid.close_approach_data[0].miss_distance.kilometers}</span></div>

            <div className={style.firedBtn}>
                <Button onClick={onClickHandler} variant="gradient" gradient={{from: 'orange', to: 'red'}}>Fired</Button>
            </div>

            <div className={st}>
                <img src={bruce} alt="" style={{width: 270}}/>
            </div>


        </Card>

    );
};

export default Asteroid;