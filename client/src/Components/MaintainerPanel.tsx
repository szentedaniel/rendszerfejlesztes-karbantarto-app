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

export function MaintainerPanel() {

    const [user, setUser] = useState<any[]>([]);
    useEffect(() => {
        axios.get('/users')
            .then(res => {
                console.log(res.data)
                setUser(res.data)                
            })
    }, [])
    const [qualifications, setQualifications] = useState<any[]>([]);
    useEffect(() => {
        axios.get('/qualifications')
            .then(res => {
                console.log(res.data)
                setQualifications(res.data)                
            })
    }, [])
    const [userQualif, setUserQualif] = useState<any[]>([]);
    useEffect(() => {
        axios.get('/userQualifications')
            .then(res => {
                console.log(res.data)
                setUserQualif(res.data)                
            })
    }, [])
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

    const [user_selected, setUser_selected] = useState('')
    const [qualification_selected, setQualification_selected] = useState('')

    const [qualification, setQualification] = useState(true);
    const [deleteQualification, setDeletequalification] = useState(true);
    const [assignedTasks, setAssignedTasks] = useState(true);

    const qualificationHandler = () => (
        setQualification(false),
        setDeletequalification(true),
        setAssignedTasks(true)
    );
    const delQualificationHandler = () => (
        setQualification(true),
        setDeletequalification(false),
        setAssignedTasks(true)
    );
    const tasksHandler = () => (
        setQualification(true),
        setDeletequalification(true),
        setAssignedTasks(false)
    )   
    const setQualificationHandler = () => {
        axios.post('/userQualification',
            {
                userId: Number(user_selected),                
                qualificationId: Number(qualification_selected),

            }).then(res => {
                console.log(res)
                window.location.reload()
            }).catch(error => {
                console.log(error);

            })
    }

    const deleteQualificationHandler = () => {
        axios.delete('/userQualification/' + Number(user_selected) + '/' + Number(qualification_selected),
        {

        }).then(res => {
            console.log(res)
            window.location.reload()
        }).catch(error => {
            console.log(error);

        })
    }

    return (
        <>
            <ScrollArea className="table">
                <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>N??v</th>
                            <th>V??gzetts??g</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           user.filter(user => user.roleId == 4).map((item)=>(
                                <tr key={item.id}>
                                    <th>{item.id}</th>
                                    <th>{item.name}</th>
                                    <th>{userQualif.filter(userQualif => userQualif.user.id == item.id).map((item) => (item.qualification.name + ", "))}</th>
                                </tr>
                            ))   
                        }             
                    </tbody>
                </Table>
                <Group className="gp" grow spacing={0}>
                    <Button className="buttons" variant="default" onClick={() => qualificationHandler()}>
                        V??gzetts??g be??ll??t??sa
                    </Button>
                    <Button className="buttons" variant="default" onClick={() => delQualificationHandler()}>
                        V??gzetts??g elt??vol??t??sa
                    </Button>
                    <Button className="buttons" variant="default" onClick={() => tasksHandler()}>
                        Feladatok list??z??sa
                    </Button>                    
                </Group>
                <Group>
                    <div className="add" hidden={qualification}>
                        <div >
                            <div className="gp">
                                <tr>
                                    <td>Karbantart??:	&nbsp;	&nbsp;</td>
                                    <td><select className="select" onChange={(e) => setUser_selected(e.target.value)}>
                                        { }
                                        <option>V??lassz egyet</option>{user.filter(user => user.roleId== 4).map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                    </select></td>
                                </tr>
                                <tr>
                                    <td>V??gzetts??g:	&nbsp;	&nbsp;</td>
                                    <td><select className="select" onChange={(e) => setQualification_selected(e.target.value)}>
                                        { }
                                        <option>V??lassz egyet</option>{qualifications.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                    </select></td>
                                </tr>
                                <Group className="gp" position="center">
                                    <Button onClick={() => setQualificationHandler()}>Hozz??rendel??s</Button>
                                </Group>
                            </div>
                        </div>
                    </div>
                    <div className="add" hidden={deleteQualification}>
                        <div >
                            <div className="gp">
                                <tr>
                                    <td>Karbantart??:	&nbsp;	&nbsp;</td>
                                    <td><select className="select" onChange={(e) => setUser_selected(e.target.value)}>
                                        { }
                                        <option>V??lassz egyet</option>{user.filter(user => user.roleId== 4).map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                    </select></td>
                                </tr>
                                <tr>
                                    <td>V??gzetts??g:	&nbsp;	&nbsp;</td>
                                    <td><select className="select" onChange={(e) => setQualification_selected(e.target.value)}>
                                        { }
                                        <option>V??lassz egyet</option>{userQualif.filter(userQualif => userQualif.userId == Number(user_selected)).map((item) => (<option value={item.qualification.id}>{item.qualification.id + ": " + item.qualification.name}</option>))}
                                    </select></td>
                                </tr>
                                <Group className="gp" position="center">
                                    <Button onClick={() => deleteQualificationHandler()}>Elt??vol??t??s</Button>
                                </Group>
                            </div>
                        </div>
                    </div>
                    <div className="add" hidden={assignedTasks}>
                        <div >
                            <div className="gp">
                                <tr>
                                    <td>Karbantart??:	&nbsp;	&nbsp;</td>
                                    <td><select className="select" onChange={(e) => setUser_selected(e.target.value)}>
                                        { }
                                        <option>V??lassz egyet</option>{user.filter(user => user.roleId== 4).map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                    </select></td>
                                </tr>
                            </div>
                        </div>
                    </div>
                </Group>
                <Table sx={{ minWidth: 800 }} verticalSpacing="sm" hidden={assignedTasks}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Eszk??z</th>
                            <th>Hat??rid??</th>
                            <th>Rendszeres karbantart??si instrukci??k</th>
                            <th>Rendk??v??li karbantart??si instrukci??k</th>
                            <th>??llapot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        task.filter(task => task.userId == Number(user_selected)).map((item) => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <th>{item.scheduledMaintenance != null ? category.filter(category => category.id == item.scheduledMaintenance.categoryId).map((cat) => (cat.name)) : devices.filter(devices => devices.id == item.specialMaintenance.deviceId).map((dev) => (dev.name))}</th>
                                <th>{Moment(item.due).format('YYYY-MM-DD HH:mm:ss')}</th>
                                <th>{item.scheduledMaintenance != null ? item.scheduledMaintenance.name : " "}</th>
                                <th>{item.specialMaintenance != null ? item.specialMaintenance.name : " "}</th>
                                <th>{item.status.name}</th>
                            </tr>
                        ))   
                        }             
                    </tbody>
                </Table>
            </ScrollArea>
        </>
    );
}