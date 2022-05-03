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
    const [status_selected, setStatus_selected] = useState('')
    const [task_selected, setTask_selected] = useState('')
    const [reason, setReason] = useState('')

    const [status_hidden, setStatus_hidden] = useState(true)
    const [insrtuctions_hidden, setInsrtuctions_hidden] = useState(true)

    const status_hiddenHandler = () => {
        setStatus_hidden(false),
        setInsrtuctions_hidden(true)
    }
    const insrtuctions_hiddenHandler = () => {
        setStatus_hidden(true),
        setInsrtuctions_hidden(false)
    }

    const setStatusHandler = () => (
        console.log('/task/' + Number(task_selected) + '/' + status_selected),
        axios.post('/task/' + Number(task_selected) + '/' + status_selected,
        reason == '' ?
        {                
            userId: activeUser.id

        }: 
        {                
            userId: activeUser.id,
            description: reason
        }
        ).then(res => {
            console.log(res)
            window.location.reload()
        }).catch(error => {
            console.log(error);

        })
    )

    const setStatus = (statusId) => (
        console.log(status_selected),
        Number(statusId) == 2 ? setStatus_selected('accept') : null,
        Number(statusId) == 3 ? setStatus_selected('decline') : null,
        Number(statusId) == 4 ? setStatus_selected('start') : null,
        Number(statusId) == 5 ? setStatus_selected('finish') : null,
        console.log(status_selected)
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
                        task.filter(task => task.userId == Number(activeUser.id)).map((item) => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <th>{item.scheduledMaintenance != null ?
                                     category.filter(category =>category.id == item.scheduledMaintenance.categoryId).map((cat) => (cat.name)):
                                     devices.filter(devices => devices.id == item.specialMaintenance.deviceId).map((dev) => (dev.name))}</th>
                                <th>{Moment(item.due).format('YYYY-MM-DD HH:mm:ss')}</th>
                                <th>{item.scheduledMaintenance != null ? item.scheduledMaintenance.name : " "}</th>
                                <th>{item.specialMaintenance != null ? item.specialMaintenance.name : " "}</th>
                                <th>{item.status.name}</th>
                            </tr>
                        ))   
                        }             
                    </tbody>
                </Table>
                <Group className="gp" grow spacing={0}>
                    <Button className="buttons" variant="default" onClick={() => status_hiddenHandler()}>
                        Állapotok módosítása
                    </Button>   
                    <Button className="buttons" variant="default" onClick={() => insrtuctions_hiddenHandler()}>
                        Részletes instrukciók megjelenítése    
                    </Button>  
                </Group>
                <Group className="gp" grow spacing={0}>
                    <div className="add" hidden={status_hidden}>
                        <div className="gp">
                            <tr>
                                <td>Feladat:	&nbsp;	&nbsp;</td>
                                <td><select className="select" defaultValue={"Válassz egyet"} onChange={(e) => setTask_selected(e.target.value)}>
                                    <option>Válassz egyet</option>
                                    {task.filter(task => ((task.userId == Number(activeUser.id)) &&
                                        (Number(task.statusId) != 3) && (Number(task.statusId) != 5))
                                    ).map((item) => (
                                        <option value={item.id}>{item.id + ": " + (item.scheduledMaintenance != null ?
                                            category.filter(category => category.id == item.scheduledMaintenance.categoryId).map((cat) => (cat.name)) :
                                            devices.filter(devices => devices.id == item.specialMaintenance.deviceId).map((dev) =>
                                                 (dev.name))) + " - " + (item.scheduledMaintenance != null ?
                                                     item.scheduledMaintenance.name :
                                                     item.specialMaintenance.name)}</option>)
                                    )}</select></td>
                            </tr>
                            <tr>
                                <td>Állapot:	&nbsp;	&nbsp;</td>
                                <td><select className="select"  onChange={(e) => setStatus(e.target.value)}>
                                    <option>Válassz egyet</option>
                                    {task.filter(task => task.id == Number(task_selected)).map((t) => (
                                        t.statusId == 1 ?
                                        statuses.filter(statuses => ((statuses.id == 2) || (statuses.id == 3))).map((s) =>
                                            (<option value={s.id}>{s.id + ": " + s.name}</option>)):

                                            (t.statusId == 2 ?
                                                statuses.filter(statuses => statuses.id == 4).map((s) =>
                                                (<option value={s.id}>{s.id + ": " + s.name}</option>)):

                                                statuses.filter(statuses => ((statuses.id == t.statusId + 1) && (statuses.id != 6))).map((s) =>
                                                (<option value={s.id}>{s.id + ": " + s.name}</option>))
                                            )
                                        ))}
                                </select></td>
                            </tr>
                            {(status_selected == 'decline') && <tr>
                                <td>Indoklás:	&nbsp;	&nbsp;</td>
                                <td><TextInput className="text" placeholder="Indoklás"  required onChange={(e) => setReason(e.target.value)}/></td>
                            </tr>}
                            <Button className="buttons" variant="default" onClick={() => setStatusHandler()}>
                                Állapotok mentése
                            </Button>  
                        </div>
                    </div>
                    <div className="add" hidden={insrtuctions_hidden}>
                        <div className="gp">
                            <tr>
                                <td>Feladat:	&nbsp;	&nbsp;</td>
                                <td><select className="select" defaultValue={"Válassz egyet"} onChange={(e) => setTask_selected(e.target.value)}>
                                    <option>Válassz egyet</option>
                                    {task.filter(task => ((task.userId == Number(activeUser.id)) && (Number(task.statusId) == 4))
                                    ).map((item) => (
                                        <option value={item.id}>{item.id + ": " + (item.scheduledMaintenance != null ?
                                            category.filter(category => category.id == item.scheduledMaintenance.categoryId).map((cat) => (cat.name)) :
                                            devices.filter(devices => devices.id == item.specialMaintenance.deviceId).map((dev) =>
                                                 (dev.name))) + " - " + (item.scheduledMaintenance != null ?
                                                     item.scheduledMaintenance.name :
                                                     item.specialMaintenance.name)}</option>)
                                    )}</select></td>
                            </tr>
                            <tr>
                                <td>Instrukciók:	&nbsp;	&nbsp;</td>
                                <td>{task.filter(task => task.id == task_selected).map((item) =>
                                    item.scheduledMaintenance != null ?
                                        (item.scheduledMaintenance.Instruction.length > 0 ?
                                            item.scheduledMaintenance.Instruction.map((i) => 
                                                i.body)
                                            : null)
                                        : (item.specialMaintenance.Instruction.length > 0 ?
                                            item.specialMaintenance.Instruction.map((i) => 
                                                i.body)
                                            : null)
                                )}</td>
                            </tr>  
                        </div>
                    </div>         
                </Group>
            </ScrollArea>
        </>
    );
}