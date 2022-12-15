import React, {useEffect, useState} from 'react';
import {DateRangePicker} from '@mantine/dates';

import {useMediaQuery} from '@mantine/hooks';

import {nasaApi} from '../../api/nasaApi';

import style from './SearchParameters.module.scss';

const SearchParametersContainer: React.FC = () => {
    let today = new Date();
    let tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
    const [value, setValue] = useState<[Date | null, Date | null]>([today, tomorrow]);

    const changeDate = (e: [(Date | null), (Date | null)]) => {
        let days = 0;
        if (e[0] && e[1]) {
            days = e[1]?.getDate() - e[0]?.getDate();
            if (days <= 7) {
                setValue([e[0], e[1]]);
            }
        }
    };

    const isMobile = useMediaQuery('(max-width: 755px)');

    useEffect(() => {
        const year1 = value[0]?.getFullYear();
        const month1 = value[0]?.getMonth() ? value[0]?.getMonth() + 1 : 1;
        const date1 = value[0]?.getDate();

        const firstDateForApi = year1 + '-' + month1 + '-' + date1;

        const year2 = value[1]?.getFullYear();
        const month2 = value[1]?.getMonth() ? value[1]?.getMonth() + 1 : 1;
        const date2 = value[1]?.getDate();

        const secondDateForApi = year2 + '-' + month2 + '-' + date2;

        nasaApi.getAsteroids(firstDateForApi, secondDateForApi).then();
    }, [value]);

    return (
        <div className={style.searchParameters}>
            <DateRangePicker
                dropdownType={isMobile ? 'modal' : 'popover'}
                label="Judgment Day"
                placeholder="Pick dates range"
                value={value}
                onChange={changeDate}
                className={style.dataRange}
            />
        </div>
    );
};

export default SearchParametersContainer;