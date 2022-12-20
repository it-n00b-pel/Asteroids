import React, {useEffect, useState} from 'react';

import {useAppSelector} from '../store/store';

const OnlyScrollPositionHabdler: React.FC = () => {
    const hazardousFromStore = useAppSelector(state => state.searchParam.hazardous);
    const [scrollPosition, setScrollPosition] = useState(0);

    const scrollHandler = () => {
        if (window.scrollY) {
            setScrollPosition(window.scrollY);
        }

    };
    useEffect(() => {
        if (hazardousFromStore) {
            window.document.documentElement.scrollIntoView({block: 'start'});
        } else {
            window.document.documentElement.scroll({top: scrollPosition, behavior: 'smooth'});
        }
    }, [hazardousFromStore]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, []);
    return (
        <></>
    );
};

export default OnlyScrollPositionHabdler;