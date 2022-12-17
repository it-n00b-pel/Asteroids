import React from 'react';

import {IconShoppingCart} from '@tabler/icons';
import {Indicator} from '@mantine/core';

import {Link} from 'react-scroll';

import style from './Header.module.scss';

const Header: React.FC = () => {
    return (
        <div className={style.header}>
            <div className={style.toolbar}>
                <Link to="main"
                      spy={true}
                      smooth={true}
                      offset={0}
                      duration={500}
                >NeoWs</Link>

                <h3>Near Earth Object Web Service</h3>
                <div className={style.basket}>
                    <Indicator label={10} showZero={false} dot={false} inline size={16}>
                        <IconShoppingCart size={'36px'}/>
                    </Indicator>
                </div>
            </div>


        </div>
    );
};

export default Header;