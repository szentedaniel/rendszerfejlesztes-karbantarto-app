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
import Moment from 'moment';
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
                // console.log(res.data)
                setDevices(res.data)                
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
    const [priority, setPriority] = useState<any[]>([]);
    useEffect(() => {
        axios.get('/priority')
            .then(res => {
                // console.log(res.data)
                setPriority(res.data)
            })
    }, [])
    const [specMaintenance, setSpecMaintenance] = useState<any[]>([]);
    useEffect(() => {
        axios.get('/specialMaintenances')
            .then(res => {
                // console.log(res.data)
                setSpecMaintenance(res.data)
            })
    }, [])
    const [users, setUsers] = useState<any[]>([]);
    useEffect(() => {
        axios.get('/users')
            .then(res => {
                console.log(res.data)
                setUsers(res.data)                
            })
    }, [])
    const [userQualifications, setUserQualifications] = useState<any[]>([]);    
    useEffect(() => {
        axios.get('/userQualifications')
            .then(res => {
                console.log(res.data)
                setUserQualifications(res.data)                
            })
    }, [])

    const [activeUser, setActiveUser] = useLocalStorage<UserState>({ key: 'user', defaultValue: initialState });
    const [device_selected, setDevice_selected] = useState('')
    const [maintenance_selected, setMaintenance_selected] = useState('')
    const [priority_selected, setPriority_selected] = useState('')
    const [due, setDue] = useState('')
    const [norm, setNorm] = useState('')
    const [maintainer_selected, setMaintainer_selected] = useState('')

    const [addMaintenance, setAddMaintenance] = useState(true);
    const [addTask, setAddTask] = useState(true);
    const [giveTask, setGiveTask] = useState(true);

    const addMaintenanceHandler = () => (
        setAddTask(false),
        setAddMaintenance(true),
        setGiveTask(true)
    );
    const addTaskHandler = () => (
        setAddTask(true),
        setAddMaintenance(false),
        setGiveTask(true)
    )

    const giveTaskHandler = () =>(
        setAddTask(true),
        setAddMaintenance(true),
        setGiveTask(false)
    )

    const checkUserQualification = (qualifId) => (
        userQualifications.filter(userQualifications =>
             userQualifications.userId == Number(maintainer_selected)
        ).map((ch) => ch.qualificationId).includes(Number(qualifId))
    )

    const addSpecTaskHandler = () => (
        device_selected != null ?
        axios.post('/task',
            {                
                specialMaintenanceId:Number(maintenance_selected),
                due:due,
                createdByUserId: activeUser.id,
                statusId: 6

            }).then(res => {
                console.log(res)
                window.location.reload()
            }).catch(error => {
                console.log(error);

            })
        : null
    )

    const addSpecMaintenanceHandler = () => (
        device_selected != null ?
        axios.post('/specialMaintenance',
            {                
                name: maintenance_selected,
                normaInMinutes: Number(norm),
                deviceId: Number(device_selected),
                priorityId: Number(priority_selected)

            }).then(res => {
                console.log(res)
                window.location.reload()
            }).catch(error => {
                console.log(error);

            })
        : null
    )
    const giveMaintenanceHandler = () => (
        axios.post('/task/' + Number(maintenance_selected) + '/assignToUser',
            {                
                userId: Number(maintainer_selected),
                operatorId: 3 //activeUser.id

            }).then(res => {
                console.log(res)
                window.location.reload()
            }).catch(error => {
                console.log(error);

            })
    )


    return (
        <>
            <ScrollArea className="table">
                <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Eszk??z</th>
                            <th>Hat??rid??</th>
                            <th>Rendszeres karbantart??si instrukci??k</th>
                            <th>Rendk??v??li karbantart??si instrukci??k</th>
                            <th>??llapot</th>
                            <th>Priorit??s</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            task.map((item) => (
                                <tr key={item.id}>
                                    <th>{item.id}</th>
                                    <th>{item.scheduledMaintenance != null ? category.filter(category => category.id == item.scheduledMaintenance.categoryId).map((cat) => (cat.name)) : devices.filter(devices => devices.id == item.specialMaintenance.deviceId).map((dev) => (dev.name))}</th>
                                    <th>{Moment(item.due).format('YYYY-MM-DD HH:mm:ss')}</th>
                                    <th>{item.scheduledMaintenance != null ? item.scheduledMaintenance.name : " "}</th>
                                    <th>{item.specialMaintenance != null ? item.specialMaintenance.name : " "}</th>
                                    <th>{item.status.name}</th>
                                    <th>{item.scheduledMaintenance != null ? item.scheduledMaintenance.priority.name : item.specialMaintenance.priority.name}</th>
                                </tr>
                            ))
                        }
                                                   
                    </tbody>
                </Table>
                <Group className="gp" grow spacing={0}>
                    <Button className="buttons" variant="default" onClick={() => addTaskHandler()}>
                        Rendk??v??li feladat hozz??ad??sa
                    </Button>   
                    <Button className="buttons" variant="default" onClick={() => addMaintenanceHandler()}>
                        Rendk??v??li feladat hozz??rendel??se
                    </Button>
                    {((activeUser.roleId == 3) || (activeUser.roleId == 1)) &&<Button className="buttons" variant="default" onClick={() => giveTaskHandler()}>
                        Feladat kioszt??sa
                    </Button>}        
                </Group>
                <Group>
                    <div className="add" hidden={addTask}>
                        <div className="gp">
                            <tr>
                                <td>Eszk??z:	&nbsp;	&nbsp;</td>
                                <td><select className="select" defaultValue={"V??lassz egyet"} onChange={(e) => setDevice_selected(e.target.value)}>
                                    <option>V??lassz egyet</option>{devices.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                </select></td>
                            </tr>
                            <tr>
                                <td>Feladat:	&nbsp;	&nbsp;</td>
                                <td><select className="select"  onChange={(e) => setMaintenance_selected(e.target.value)}>
                                    <option>V??lassz egyet</option>{specMaintenance.filter(specMaintenance =>specMaintenance.deviceId == device_selected
                                        ).map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                </select></td>
                            </tr>
                            <tr>
                                <td>Hat??rid??:	&nbsp;	&nbsp;</td>
                                <td><TextInput className="text" placeholder="Hat??rid??"  required onChange={(e) => setDue(e.target.value)}/></td>
                            </tr>
                            <Group className="gp" position="center">
                                <Button onClick={addSpecTaskHandler}>Be??ll??t??s</Button>
                            </Group>
                        </div>
                    </div>
                    <div className="add" hidden={addMaintenance}>
                        <div className="gp">
                            <tr>
                                <td>Eszk??z:	&nbsp;	&nbsp;</td>
                                <td><select className="select" defaultValue={"V??lassz egyet"} onChange={(e) => setDevice_selected(e.target.value)}>
                                    <option>V??lassz egyet</option>{devices.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                </select></td>
                            </tr>
                            <tr>
                                <td>Feladat:	&nbsp;	&nbsp;</td>
                                <td><TextInput className="text" placeholder="Feladat"  required onChange={(e) => setMaintenance_selected(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td>Normaid??:	&nbsp;	&nbsp;</td>
                                <td><TextInput className="text" placeholder="Normaid?? (perc)"  required onChange={(e) => setNorm(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td>Priorit??s:	&nbsp;	&nbsp;</td>
                                <td><select className="select" defaultValue={"V??lassz egyet"} onChange={(e) => setPriority_selected(e.target.value)}>
                                    <option>V??lassz egyet</option>{priority.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                </select></td>
                            </tr>
                            <Group className="gp" position="center">
                                <Button onClick={addSpecMaintenanceHandler}>Hozz??ad??s</Button>
                            </Group>
                        </div>
                    </div>
                    <div className="add" hidden={giveTask}>
                        <div className="gp">
                            <tr>
                                <td>Karbantart??:	&nbsp;	&nbsp;</td>
                                <td><select className="select" defaultValue={"V??lassz egyet"} onChange={(e) => setMaintainer_selected(e.target.value)}>
                                    <option>V??lassz egyet</option>
                                    {users.filter(users => users.roleId == 4).map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                </select></td>
                            </tr>
                            <tr>
                                <td>Feladat:	&nbsp;	&nbsp;</td>
                                <td><select className="select" defaultValue={"V??lassz egyet"} onChange={(e) => setMaintenance_selected(e.target.value)}>
                                    <option>V??lassz egyet</option>
                                    {task.filter(task => (
                                        ((task.statusId == 6) || (task.statusId == 3)) && (task.scheduledMaintenance != null ?
                                            task.scheduledMaintenance.MaintenanceQualification.map((ch) => ch.qualificationId).some(checkUserQualification):
                                            task.specialMaintenance.MaintenanceQualification.map((ch) => ch.qualificationId).some(checkUserQualification)
                                        )
                                    )).map((item) =>(
                                            
                                     <option value={item.id}>{item.id + ": " + (item.scheduledMaintenance != null ?
                                        category.filter(category => category.id == item.scheduledMaintenance.categoryId).map((cat) => (cat.name)) :
                                        devices.filter(devices => devices.id == item.specialMaintenance.deviceId).map((dev) =>

                                             (dev.name))) + " - " + (item.scheduledMaintenance != null ?
                                                 item.scheduledMaintenance.name :
                                                 item.specialMaintenance.name)}</option>)
                                    )}</select></td>
                            </tr>
                            <Group className="gp" position="center">
                                <Button onClick={giveMaintenanceHandler}>Kioszt??s</Button>
                            </Group>
                        </div>
                    </div>
                </Group>
            </ScrollArea>
        </>
    );
}