import React, { useState } from 'react';
import { createStyles, Navbar, Group, Code } from '@mantine/core';

import { useLocalStorage } from '@mantine/hooks';
import { initialState } from './LoginPanel';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SwitchHorizontal, Logout, Tool } from 'tabler-icons-react';
import { UserState } from '../types';
import routerConfig from '../Config/routerConfig'

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
        navbar: {
            backgroundColor: theme.colors[theme.primaryColor][6],
        },

        version: {
            backgroundColor: theme.colors[theme.primaryColor][7],
            color: theme.white,
            fontWeight: 700,
        },

        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${theme.colors[theme.primaryColor][7]}`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${theme.colors[theme.primaryColor][7]}`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.white,
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor: theme.colors[theme.primaryColor][5],
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.white,
            opacity: 0.75,
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            '&, &:hover': {
                backgroundColor: theme.colors[theme.primaryColor][7],
                [`& .${icon}`]: {
                    opacity: 0.9,
                },
            },
        },
    };
});



export function NavbarSimpleColored() {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Dashboard');
    const navigate = useNavigate()
    const [user, setUser] = useLocalStorage<UserState>({ key: 'user' });


    const logoutHandler = () => {
        setUser(initialState)
        navigate(`/`)
    }

    const links = routerConfig.map((item, index) => (
        (!(item.hide) &&
            <Link
            to={item.path!}
            
                className={cx(classes.link, { [classes.linkActive]: item.label === active })}
                key={index}
                onClick={(event) => {
                    event.preventDefault();
                    setActive(item.label);
                    navigate(`${item.path}`)
                }}
            >
                <div>
                <item.icon className={classes.linkIcon} />
                <span>{item.label}</span>

                </div>
            </Link>
        )

    ));

    return (
        <Navbar height={'100%'} width={{ sm: 300 }} p="md" className={classes.navbar}>
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    <h4 style={{ color: 'white', display: 'flex', alignItems: 'center' }}><Tool style={{ padding: '4px' }} /> Karbantartó applikáció</h4>
                    <Code className={classes.version}>v0.1.0</Code>
                </Group>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <SwitchHorizontal className={classes.linkIcon} />
                    <span>Felhasználó váltás</span>
                </a>

                <a href="#" className={classes.link} onClick={(event) => { event.preventDefault(); logoutHandler() }}>
                    <Logout className={classes.linkIcon} />
                    <span>Kilépés</span>
                </a>
            </Navbar.Section>
        </Navbar>
    );
}