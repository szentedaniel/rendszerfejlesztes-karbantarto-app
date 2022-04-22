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
import '../css/Tools.css' ;
import { useLocalStorage } from '@mantine/hooks';
import { UserState } from '../types';
import { useNavigate } from 'react-router-dom';
import { initialState } from '../Components/LoginPanel';
import axios from 'axios';
import "../css/Category.css"

export function TaskPanel() {

    const [task, setTask] = useState<any[]>([]); 
    useEffect(() => {
        axios.get('/tasks/details')
            .then(res => {
                console.log(res.data)
                setTask(res.data)                
            })
    }, [])
    const [devices, setDevices] = useState<any[]>([]); 
    useEffect(() => {
        axios.get('/devices')
            .then(res => {
                console.log(res.data)
                setDevices(res.data)                
            })
    }, [])
    const [category, setCategory] = useState<any[]>([]);
    useEffect(() => {
        axios.get('/categories')
            .then(res => {
                console.log(res.data)
                setCategory(res.data)
                category.map((item) => (console.log(item.children.length != 0 ? item.children : null)))
            })
    }, [])
    const [specMaintenance, setSpecMaintenance] = useState<any[]>([]);
    useEffect(() => {
        axios.get('/specialMaintenances')
            .then(res => {
                console.log(res.data)
                setSpecMaintenance(res.data)
            })
    }, [])

    const [user, setUser] = useLocalStorage<UserState>({ key: 'user', defaultValue: initialState });
    const [device_selected, setDevice_selected] = useState('')
    const [maintenance_selected, setMaintenance_selected] = useState('')
    const [due, setDue] = useState('')

    const [addTask, setAddTask] = useState(true);

    const addTaskHandler = () => (
        setAddTask(false)
    );

    const addSpecialTaskHandler = () => (
        console.log(user.id),
        console.log(due),
        console.log(maintenance_selected),
        device_selected != null ?
        axios.post('/task',
            {                
                specialMaintenanceId:Number(maintenance_selected),
                due:due,
                createdByUserId: user.id

            }).then(res => {
                console.log(res)
                window.location.reload()
            }).catch(error => {
                console.log(error);

            })
        : console.log("Error")
    )



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
                            task.map((item) => (
                                <tr key={item.id}>
                                    <th>{item.id}</th>
                                    <th>{item.scheduledMaintenance != null ? category.filter(category => category.id == item.scheduledMaintenance.categoryId).map((cat) => (cat.name)) : devices.filter(devices => devices.id == item.specialMaintenance.deviceId).map((dev) => (dev.name))}</th>
                                    <th>{item.due}</th>
                                    <th>{item.scheduledMaintenance != null ? item.scheduledMaintenance.name : " "}</th>
                                    <th>{item.specialMaintenance != null ? item.specialMaintenance.name : " "}</th>
                                    <th>{item.status.name}</th>
                                </tr>
                            ))
                        }
                                                   
                    </tbody>
                </Table>
                <Group className="gp" grow spacing={0}>
                    <Button className="buttons" variant="default" onClick={() => addTaskHandler()}>
                        Rendkívüli feladat hozzáadása
                    </Button>                    
                </Group>
                <Group>
                    <div className="add" hidden={addTask}>
                        <div >
                            <div className="gp">
                                Eszköz:	&nbsp;	&nbsp;
                                <select className="select" defaultValue={"Válassz egyet"} onChange={(e) => setDevice_selected(e.target.value)}>
                                    { }
                                    <option>Válassz egyet</option>{devices.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                </select>
                                Feladat:	&nbsp;	&nbsp;
                                <select className="select"  onChange={(e) => setMaintenance_selected(e.target.value)}>
                                    { }
                                    <option>Válassz egyet</option>{specMaintenance.filter(specMaintenance => specMaintenance.deviceId == device_selected).map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                </select>
                                <TextInput className="text" placeholder="Határidő"  required onChange={(e) => setDue(e.target.value)}/>
                                <Group className="gp" position="center">
                                    <Button onClick={addSpecialTaskHandler}>Beállítás</Button>
                                </Group>
                            </div>
                        </div>
                    </div>
                </Group>
            </ScrollArea>
        </>
    );
}