import React from 'react'
import { Container } from 'tabler-icons-react';
import { NavbarSimpleColored } from '../Components/NavbarSimpleColored'
import { CategoryPanel } from '../Components/CategoryPanel';
import Login from './Login';
import '../css/Tools.css' ;
import { QualificationsPanel } from '../Components/QualificationsPanel';

type Props = {}

export default function qualifications({ }: Props) {    
    return(     
        <>
            <div className='rowC'>
                <NavbarSimpleColored />
                <QualificationsPanel/>
            </div>
        </>
              
    )}