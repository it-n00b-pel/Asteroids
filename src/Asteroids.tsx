import React, {useEffect} from 'react';

import './Asteroids.css';

import Particles from './components/Particles';
import HeaderContainer from './components/Header/HeaderContainer';
import SearchParametersContainer from './components/SearchParameters/SearchParametersContainer';
import AsteroidsContainer from './components/Asteroids/AsteroidsContainer';
import OnlyScrollPositionHabdler from './components/OnlyScrollPositionHabdler';

function Asteroids() {
    const audioSrc = require('../src/assets/audio/zvezdnye-voyny-p-yanyy-dart-veyder.mp3');
    useEffect(() => {
        const backgroundMusic = document.getElementById('backgroundMusic') as HTMLAudioElement;
        if (backgroundMusic) {
            backgroundMusic.play().catch(() => {
                document.addEventListener('click', () => {
                    backgroundMusic.play();
                });
            });
        }
    }, []);

    return (
        <>
            <div className="Asteroids">
                <div id="main"></div>
                <div className="stickyBlock">
                    <HeaderContainer/>
                    <SearchParametersContainer/>
                </div>

                <AsteroidsContainer/>
                <OnlyScrollPositionHabdler/>

            </div>
            <div id="particles-js"><Particles/></div>
            <audio id="backgroundMusic" loop>
                <source src={audioSrc} type="audio/mpeg"/>
            </audio>
        </>

    );
}

export default Asteroids;
