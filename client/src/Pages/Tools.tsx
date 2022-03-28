import React from 'react'
import { Container } from 'tabler-icons-react';
import { NavbarSimpleColored } from '../Components/NavbarSimpleColored'
import { ToolsTable } from '../Components/ToolsPanel';
import { ToolModal } from '../Components/AddToolModal';
import Login from './Login';
import '../css/Tools.css';

type Props = {}

export default function tools({ }: Props) {
    return (
        <>
            <div className='rowC'>
                <NavbarSimpleColored />
                <ToolsTable id={null} name={null} description={null} identifier={null} locationId={null} categoryId={null} category={null} location={null} />
            </div>

        </>


    )
}