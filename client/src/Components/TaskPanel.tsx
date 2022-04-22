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
    const [device_selected, setDevice_selected] = useState('')
    const [due, setDue] = useState('')
    const [description, setDescription] = useState('')

    const [addTask, setAddTask] = useState(true);

    const addTaskHandler = () => (
        setAddTask(false)
    );

    const addSpecialTaskHandler = () => (
        console.log(device_selected),
        console.log(due),
        console.log(description)
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
                                    <th>{item.device != undefined ? item.device.name : "nincs"}</th>
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
                                <select className="select"  onChange={(e) => setDevice_selected(e.target.value)}>
                                    { }
                                    {devices.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                </select>
                                <TextInput className="text" placeholder="Határidő"  required onChange={(e) => setDue(e.target.value)}/>
                                <TextInput className="text" placeholder="Leírás"  required onChange={(e) => setDescription(e.target.value)}/>
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