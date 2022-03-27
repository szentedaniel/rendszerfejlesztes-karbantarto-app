import React, { useEffect, useMemo, useState } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, Group, Avatar, Text } from '@mantine/core';
import axios from 'axios';
import { DeviceState } from '../types';
const useStyles = createStyles((theme) => ({
    rowSelected: {
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
                : theme.colors[theme.primaryColor][0],
    },
}));
export function ToolsTable({ id }: DeviceState) {    
    const [tool, setTool] = useState<any[]>([]);
    useEffect(() => {
        axios.get('/devices')
        .then(res => {
            console.log(res.data)
            setTool(res.data)
        })
    }, [])    
    return (
        <ScrollArea>
            <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
                <thead>
                    <tr>
                        <th>Eszköz</th>
                        <th>Leirás</th>
                        <th>Azonosító</th>
                        <th>Helyzet</th>
                        <th>Épület</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tool.map((item)=>(
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.identifier}</td>
                        <td>{item.location.name}</td>
                        <td>{item.location.building.name}</td>                        
                    </tr>
))}
                </tbody>
            </Table>
        </ScrollArea>
    );
}