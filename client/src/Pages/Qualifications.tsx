import React, { useEffect } from 'react'
import { Container } from 'tabler-icons-react';
import { NavbarSimpleColored } from '../Components/NavbarSimpleColored'
import { CategoryPanel } from '../Components/CategoryPanel';
import Login from './Login';
import '../css/Tools.css' ;
import { QualificationsPanel } from '../Components/QualificationsPanel';
import { useLocalStorage } from '@mantine/hooks';
import { UserState } from '../types';
import { initialState } from '../Components/LoginPanel';
import { useNavigate } from 'react-router-dom';

type Props = {}

export default function qualifications({ }: Props) {    
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
                <QualificationsPanel/>
            </div>
        </>
              
    )}