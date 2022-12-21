import React, {useEffect} from 'react';

import {IconShoppingCart, IconTrash, IconX} from '@tabler/icons';
import {Checkbox, Indicator, Modal, Table} from '@mantine/core';

import {Link} from 'react-scroll';

import {useDisclosure} from '@mantine/hooks';

import {showNotification} from '@mantine/notifications';

import {useAppDispatch, useAppSelector} from '../../store/store';

import {removeFromBasket} from '../../store/reducers/basketReducer';

import {setError} from '../../store/reducers/appReducer';

import style from './Header.module.scss';


const Header: React.FC = () => {
    const [opened, {close, open}] = useDisclosure(false);
    const {totalCount, asteroids} = useAppSelector(state => state.basket);
    const error = useAppSelector(state => state.app.error);
    const dispatch = useAppDispatch();

    const ths = (
        <tr>
            <th>Name</th>
            <th>Close approach date</th>
            <th>Danger</th>
            <th>Trash</th>
        </tr>
    );

    const rows = asteroids.map((element) => (
        <tr key={element.id}>
            <td>{element.name}</td>
            <td>{element.close_approach_data[0].close_approach_date.toString()}</td>
            <td><Checkbox checked={element.is_potentially_hazardous_asteroid} onChange={() => {
            }} color="red"/></td>
            <td onClick={() => onClickHandler(element.id)} style={{cursor: 'pointer'}}><IconTrash color="red"/></td>
        </tr>
    ));

    const onClickHandler = (id: string) => {
        dispatch(removeFromBasket({id}));
    };

    useEffect(() => {
        error && showNotification({
            title: 'Oooops 🤥',
            message: error,
            id: 'hello-there',
            disallowClose: true,
            onClose: () => dispatch(setError({error: null})),
            autoClose: 2000,
            color: 'red',
            icon: <IconX/>,
            loading: false,
        });
    }, [dispatch, error]);

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
                    <Indicator onClick={open} label={totalCount} showZero={false} dot={false} inline size={16}>
                        <IconShoppingCart size={'36px'}/>
                    </Indicator>
                </div>
            </div>


            <Modal overlayColor={'rgba(45,45,45,0.44)'}
                   opened={opened}
                   centered
                   onClose={close}
                   overlayBlur={3}
                   size="auto"
                   title="Objects for destruction"
                   overflow="inside">
                <Table striped highlightOnHover withBorder>
                    <thead>{ths}</thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Modal>
        </div>
    );
};

export default Header;