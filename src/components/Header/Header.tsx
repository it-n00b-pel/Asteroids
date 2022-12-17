import React from 'react';

import style from './Header.module.scss';

const Header: React.FC = () => {
    return (
        <div className={style.header}>
            <div className={style.toolbar}>
                <a href="#sss">NeoWs</a>
                <h3>Near Earth Object Web Service</h3>
                <div className={style.basket}>

                </div>
            </div>


        </div>
    );
};

export default Header;