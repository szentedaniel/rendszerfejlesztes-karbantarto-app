import { useLocalStorage } from '@mantine/hooks';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { initialState } from '../Components/LoginPanel';
import { NavbarSimpleColored } from '../Components/NavbarSimpleColored'
import { ToolsTable } from '../Components/ToolsPanel';
import { UserState } from '../types';
import Login from './Login';

type Props = {}



export default function Dashboard({ }: Props) {
    const [user, setUser] = useLocalStorage<UserState>({ key: 'user', defaultValue: initialState });
    const nav = useNavigate();
    if(user.name == null)
    {
        useEffect(() => {
            nav('/login')
        }, [])
        
    }
    return (
        <NavbarSimpleColored />
    )

}

