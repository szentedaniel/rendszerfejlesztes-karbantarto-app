import React, { useEffect } from 'react'
import { Container } from 'tabler-icons-react';
import { NavbarSimpleColored } from '../Components/NavbarSimpleColored'
import { ToolsTable } from '../Components/ToolsPanel';
import { ToolModal } from '../Components/AddToolModal';
import Login from './Login';
import '../css/Tools.css';
import { useLocalStorage } from '@mantine/hooks';
import { UserState } from '../types';
import { initialState } from '../Components/LoginPanel';
import { useNavigate } from 'react-router-dom';
import { AdminPanel } from '../Components/AdminPanel';

type Props = {}

export default function admin({ }: Props) {
    const [user, setUser] = useLocalStorage<UserState>({ key: 'user', defaultValue: initialState });
    const nav = useNavigate();
    if(user.name == null)
    {
        useEffect(() => {
            nav('/login')
        }, [])
        
    }
    return (
        <>
            <div className='rowC'>
                <NavbarSimpleColored />
                <AdminPanel/>
            </div>

        </>


    )
}