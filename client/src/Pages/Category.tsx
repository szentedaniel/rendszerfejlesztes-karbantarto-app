import React from 'react'
import { Container } from 'tabler-icons-react';
import { NavbarSimpleColored } from '../Components/NavbarSimpleColored'
import { CategoryPanel } from '../Components/CategoryPanel';
import Login from './Login';
import '../css/Tools.css' ;

type Props = {}

export default function category({ }: Props) {    
    return(     
        <>
            <div className='rowC'>
                <NavbarSimpleColored />
                <CategoryPanel/>
            </div>
        </>
              
    )}