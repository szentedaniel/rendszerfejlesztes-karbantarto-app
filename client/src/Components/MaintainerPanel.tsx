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
    const [password, setPassword] = useState('')  
    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [user_selected, setUser_selected] = useState('')
    const [qualification_selected, setQualification_selected] = useState('')

    const [addMaintainer, setAddMaintainer] = useState(true);
    const [qualification, setQualification] = useState(true);
    const [deleteQualification, setDeletequalification] = useState(true);

    const addMaintainerHandler = () => (
        setAddMaintainer(false),
        setQualification(true),
        setDeletequalification(true)
    );
    const qualificationHandler = () => (
        setAddMaintainer(true),
        setQualification(false),
        setDeletequalification(true)
    );
    const delQualificationHandler = () => (
        setAddMaintainer(true),
        setQualification(true),
        setDeletequalification(false)
    )

    const addUserHandler = () => {
        axios.post('/user',
            {                
                name:name,
                username:userName,
                password:password,
                roleId: 4,
                active: true

            }).then(res => {
                console.log(res)
                window.location.reload()
            }).catch(error => {
                console.log(error);

            })    
    }
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
                            <th>Név</th>
                            <th>Végzettség</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           user.filter(user => user.roleId == 4, user => userQualif.map((item) => (item.user.id)).includes(user.id)).map((item)=>(
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
                    <Button className="buttons" variant="default" onClick={() => addMaintainerHandler()}>
                        Karbantartó hozzáadása
                    </Button>
                    <Button className="buttons" variant="default" onClick={() => qualificationHandler()}>
                        Végzettség beállítása
                    </Button>
                    <Button className="buttons" variant="default" onClick={() => delQualificationHandler()}>
                        Végzettség eltávolítása
                    </Button>                    
                </Group>
                <Group>
                    <div className="add" hidden={addMaintainer}>
                        <div >
                        <div className="gp">
                            <TextInput className="text" placeholder="Név" required onChange={(e) => setName(e.target.value)}/>
                            <TextInput className="text" placeholder="Felhasználónév"  required onChange={(e) => setUserName(e.target.value)}/>
                            <PasswordInput label=" " placeholder="Jelszó" required onChange={(e) => setPassword(e.target.value)}/>
                            <Group className="gp" position="center">
                                <Button onClick={addUserHandler}>Hozzáadás</Button>
                            </Group>
                            </div>
                        </div>
                    </div>
                    <div className="add" hidden={qualification}>
                        <div >
                            <div className="gp">
                                <tr>
                                    <td>Karbantartó:	&nbsp;	&nbsp;</td>
                                    <td><select className="select" onChange={(e) => setUser_selected(e.target.value)}>
                                        { }
                                        <option>Válassz egyet</option>{user.filter(user => user.roleId== 4).map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                    </select></td>
                                </tr>
                                <tr>
                                    <td>Végzettség:	&nbsp;	&nbsp;</td>
                                    <td><select className="select" onChange={(e) => setQualification_selected(e.target.value)}>
                                        { }
                                        <option>Válassz egyet</option>{qualifications.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                    </select></td>
                                </tr>
                                <Group className="gp" position="center">
                                    <Button onClick={() => setQualificationHandler()}>Hozzárendelés</Button>
                                </Group>
                            </div>
                        </div>
                    </div>
                    <div className="add" hidden={deleteQualification}>
                        <div >
                            <div className="gp">
                                <tr>
                                    <td>Karbantartó:	&nbsp;	&nbsp;</td>
                                    <td><select className="select" onChange={(e) => setUser_selected(e.target.value)}>
                                        { }
                                        <option>Válassz egyet</option>{user.filter(user => user.roleId== 4).map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                    </select></td>
                                </tr>
                                <tr>
                                    <td>Végzettség:	&nbsp;	&nbsp;</td>
                                    <td><select className="select" onChange={(e) => setQualification_selected(e.target.value)}>
                                        { }
                                        <option>Válassz egyet</option>{userQualif.filter(userQualif => userQualif.userId == Number(user_selected)).map((item) => (<option value={item.qualification.id}>{item.qualification.id + ": " + item.qualification.name}</option>))}
                                    </select></td>
                                </tr>
                                <Group className="gp" position="center">
                                    <Button onClick={() => deleteQualificationHandler()}>Eltávolítás</Button>
                                </Group>
                            </div>
                        </div>
                    </div>
                </Group>
            </ScrollArea>
        </>
    );
}