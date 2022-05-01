import React, { useEffect } from 'react'
import { Container } from 'tabler-icons-react';
import { NavbarSimpleColored } from '../Components/NavbarSimpleColored'
import { PersonalTaskPanel } from '../Components/PersonalTaskPanel';
import Login from './Login';
import '../css/Tools.css' ;
import { useLocalStorage } from '@mantine/hooks';
import { UserState } from '../types';
import { useNavigate } from 'react-router-dom';
import { initialState } from '../Components/LoginPanel';

type Props = {}

export default function task({ }: Props) {    
    const [user, setUser] = useLocalStorage<UserState>({ key: 'user', defaultValue: initialState });
    const nav = useNavigate();
    if(user.name == null)
    {
        useEffect(() => {
            nav('/login')
        }, [])
        
    }
    return(     
        <>
            <div className='rowC'>
                <NavbarSimpleColored />
                <PersonalTaskPanel/>
            </div>
        </>
              
    )}