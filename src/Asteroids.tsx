import React, {useEffect} from 'react';

import './Asteroids.css';

import Particles from './components/Particles';
import HeaderContainer from './components/Header/HeaderContainer';

function Asteroids() {
    const audioSrc = require('../src/assets/audio/zvezdnye-voyny-p-yanyy-dart-veyder.mp3');
    useEffect(() => {
        const backgroundMusic = document.getElementById('backgroundMusic') as HTMLAudioElement;
        if (backgroundMusic) {
            backgroundMusic.play().catch(() => {
                document.addEventListener('mousemove', () => {
                    backgroundMusic.play();
                });
            });
        }
    }, []);

    return (
        <>
            <div className="Asteroids">
                <HeaderContainer/>
            </div>
            <div id="particles-js"><Particles/></div>
            <audio id="backgroundMusic" loop>
                <source src={audioSrc} type="audio/mpeg"/>
            </audio>
        </>

    );
}

export default Asteroids;
