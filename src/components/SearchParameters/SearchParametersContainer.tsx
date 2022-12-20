import React, {useEffect, useState} from 'react';
import {DateRangePicker} from '@mantine/dates';

import {useMediaQuery} from '@mantine/hooks';

import {Group, Radio, Switch, useMantineTheme} from '@mantine/core';

import {IconClearAll, IconComet} from '@tabler/icons';

import {useAppDispatch, useAppSelector} from '../../store/store';

import {fetchAsteroids} from '../../store/saga/asteroidSaga';

import {changeDateFilter, changeHazardousFilter, changeUnitsFilter, UnitsType} from '../../store/reducers/searchParametersReducer';

import style from './SearchParameters.module.scss';

const SearchParametersContainer: React.FC = () => {

    const {start_date, end_date} = useAppSelector(state => state.searchParam);
    const [date, setDate] = useState<[Date | null, Date | null]>([start_date, end_date]);

    const unitsFromStore = useAppSelector(state => state.searchParam.units);
    const [units, setUnits] = useState<UnitsType>(unitsFromStore);

    const hazardousFromStore = useAppSelector(state => state.searchParam.hazardous);
    const [hazardous, setHazardous] = useState<boolean>(hazardousFromStore);

    const isLoading = useAppSelector(state => state.app.status) === 'loading';
    const dispatch = useAppDispatch();

    const changeDateHandler = (e: [(Date | null), (Date | null)]) => {
        let days = 0;
        if (e[0] && e[1]) {
            days = e[1]?.getDate() - e[0]?.getDate();
            if (days <= 7) {
                window.document.documentElement.scroll({top: 0, behavior: 'smooth'});
                dispatch(changeDateFilter({start_date: e[0], end_date: e[1]}));
                setDate([e[0], e[1]]);
            }
        }
    };

    const changeUnitsHandler = (e: string) => {
        dispatch(changeUnitsFilter({units: e as UnitsType}));
        setUnits(e as 'kilometers' | 'miles');
    };

    const changeHazardousHandler = () => {
        dispatch(changeHazardousFilter({hazardous: !hazardous}));
        setHazardous(!hazardous);
    };

    const isMobile = useMediaQuery('(max-width: 755px)');

    const theme = useMantineTheme();

    useEffect(() => {
        const year1 = date[0]?.getFullYear();
        const month1 = date[0]?.getMonth() ? date[0]?.getMonth() + 1 : 1;
        const date1 = date[0]?.getDate();

        const firstDateForApi = year1 + '-' + month1 + '-' + date1;

        const year2 = date[1]?.getFullYear();
        const month2 = date[1]?.getMonth() ? date[1]?.getMonth() + 1 : 1;
        const date2 = date[1]?.getDate();

        const secondDateForApi = year2 + '-' + month2 + '-' + date2;
        dispatch(fetchAsteroids(firstDateForApi, secondDateForApi));

    }, [start_date, end_date, date, dispatch]);

    return (
        <div className={style.searchParameters}>
            <DateRangePicker
                dropdownType={isMobile ? 'modal' : 'popover'}
                label="Judgment Day"
                placeholder="Pick dates range"
                value={date}
                onChange={changeDateHandler}
                className={style.dataRange}
                disabled={isLoading}
            />

            <div className={style.radioAndSwitch}>
                <Radio.Group
                    name="favoriteFramework"
                    label="Select units"
                    spacing="sm"
                    className={style.radioGroup}
                    value={units}
                    onChange={changeUnitsHandler}
                >
                    <Radio disabled={isLoading} value="kilometers" label="Kilometers"/>
                    <Radio disabled={isLoading} value="miles" label="Miles"/>
                </Radio.Group>

                <Group position="center">
                    <Switch
                        disabled={isLoading}
                        size="lg"
                        color={theme.colorScheme = 'dark'}
                        onLabel={<IconClearAll size={22} stroke={2.5} color={theme.colors.green[6]}/>}
                        offLabel={<IconComet size={22} stroke={2.5} color={theme.colors.red[6]}/>}
                        style={{fontSize: '22px'}}
                        onChange={changeHazardousHandler}
                    />
                </Group>
            </div>
        </div>
    );
};

export default SearchParametersContainer;