import React from 'react';

import {NotificationsProvider} from '@mantine/notifications';

import Header from './Header';

const HeaderContainer: React.FC = () => {

    return (
        <NotificationsProvider position="bottom-left" zIndex={2077}>
            <Header/>
        </NotificationsProvider>
    );
};

export default HeaderContainer;