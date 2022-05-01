import React, { useEffect, useState } from 'react';
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    createStyles,
    ScrollArea,
    Table,
} from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../Store/hooks'
import axios from 'axios';
import "../css/Category.css"
import { useLocalStorage } from '@mantine/hooks';
import { UserState } from '../types';
import Moment from 'moment';
import { initialState } from '../Components/LoginPanel';

export function PersonalTaskPanel() {

    const [task, setTask] = useState<any[]>([]); 
    useEffect(() => {
        axios.get('/tasks/details')
            .then(res => {
                console.log(res.data)
                setTask(res.data)                
            })
    }, [])
    const [category, setCategory] = useState<any[]>([]);
    useEffect(() => {
        axios.get('/categories')
            .then(res => {
                // console.log(res.data)
                setCategory(res.data)
            })
    }, [])
    const [devices, setDevices] = useState<any[]>([]); 
    useEffect(() => {
        axios.get('/devices')
            .then(res => {
                // console.log(res.data)
                setDevices(res.data)                
            })
    }, [])
    const [statuses, setStatuses] = useState<any[]>([]); 
    useEffect(() => {
        axios.get('/status')
            .then(res => {
                // console.log(res.data)
                setStatuses(res.data)                
            })
    }, [])

    const [activeUser, setActiveUser] = useLocalStorage<UserState>({ key: 'user', defaultValue: initialState });

    return (
        <>
            <ScrollArea className="table">
                
                <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Eszköz</th>
                            <th>Határidő</th>
                            <th>Rendszeres karbantartási instrukciók</th>
                            <th>Rendkívüli karbantartási instrukciók</th>
                            <th>Állapot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        task.filter(task => task.userId == Number(activeUser.id)).map((item) => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <th>{item.scheduledMaintenance != null ? category.filter(category => category.id == item.scheduledMaintenance.categoryId).map((cat) => (cat.name)) : devices.filter(devices => devices.id == item.specialMaintenance.deviceId).map((dev) => (dev.name))}</th>
                                <th>{Moment(item.due).format('YYYY-MM-DD HH:mm:ss')}</th>
                                <th>{item.scheduledMaintenance != null ? item.scheduledMaintenance.name : " "}</th>
                                <th>{item.specialMaintenance != null ? item.specialMaintenance.name : " "}</th>
                                <th><select className="select" onChange={(e) => console.log(e.target.value)}>{ }
                                        <option>{item.status.id + ": " + item.status.name}</option>{statuses.filter(statuses => (statuses.id != item.status.id) && (statuses.id != 6)).map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                    </select></th>
                            </tr>
                        ))   
                        }             
                    </tbody>
                </Table>
                <Group className="gp" grow spacing={0}>
                    <Button className="buttons" variant="default" onClick={() => console.log("saved")}>
                        Állapotok mentése
                    </Button>                   
                </Group>
            </ScrollArea>
        </>
    );
}