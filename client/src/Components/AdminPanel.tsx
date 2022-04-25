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
import "../css/Category.css"
export function AdminPanel() {
    const [user, setUser] = useState<any[]>([]);    
    const [password, setPassword] = useState('')  
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    useEffect(() => {
        axios.get('/users')
            .then(res => {
                console.log(res.data)
                setUser(res.data)               
            })
    }, [])
    const [roles, setRoles] = useState<any[]>([]);
    useEffect(() => {
        axios.get('/roles')
            .then(res => {
                console.log(res.data)
                setRoles(res.data)
                roles.map((item) => (console.log(item.children.length != 0 ? item.children : null)))
            })
    }, [])

    const [newUser, setNewUser] = useState(true)
    const newUserHandler = () => {
        setNewUser(false)
    }
          
    const addUserHandler = () => {
        axios.post('/user',
            {                
                name:name,
                username:name,
                password:password,
                roleId: Number(id),
                active: true

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
                            <th>ID</th>
                            <th>Név</th>
                            <th>Felhasználónév</th>
                            <th>Szerep</th>
                            <th>Állapot</th>
                            <th>Akciók</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((item) => (
                                <tr key={item.id}>
                                    <th>{item.id}</th>
                                    <th>{item.name}</th>
                                    <th>{item.username}</th>
                                    <th>{item.Role.name}</th>
                                    <th>{item.active}</th> 
                                </tr>
                            ))}
                    </tbody>
                </Table>   
                <Group className="gp" grow spacing={0}>
                        <Button className="buttons" variant="default" onClick={() => newUserHandler()}>
                            Új felhasználó felvétele
                        </Button>          
                    </Group>  
                <Group>
                <div className="add" hidden={newUser}>
                        <div className="gp">
                            <tr>
                                <td>Szerepkör: 	&nbsp;	&nbsp;</td>
                                <td><select className="select" onChange={(e) => setId(e.target.value)}>
                                    { }
                                    <option>Válassz egyet</option>{roles.map((item) => (item.id == 0 ? <option selected value={item.id}>{item.id + ": " + item.name}</option> : <option value={item.id}>{item.id + ": " + item.name}</option>))}
                                </select></td>
                            </tr>
                            <tr>
                                <td>Név: 	&nbsp;	&nbsp;</td>
                                <td><TextInput className="text" placeholder="Név" required onChange={(e) => setName(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td>Jelszó:	&nbsp;	&nbsp;</td>
                                <td><PasswordInput label="Password" placeholder="Your password" required mt="md" onChange={(e) => setPassword(e.target.value)} /></td>
                            </tr>
                            <Group className="gp" position="center">
                                <Button onClick={addUserHandler}>Hozzáadás</Button>
                            </Group>
                        </div>
                    </div>
                </Group>          
            </ScrollArea>
        </>
    );
}