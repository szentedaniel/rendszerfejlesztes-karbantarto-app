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

export function CategoryPanel() {
    const [category, setCategory] = useState<any[]>([]);
    const [category_selected, setCategory_selected] = useState('')
    const [name, setName] = useState('')
    useEffect(() => {
        axios.get('/categories')
            .then(res => {
                console.log(res.data)
                setCategory(res.data)
                category.map((item) => (console.log(item.children.length != 0 ? item.children : null)))
            })
    }, [])
    const [addcat, setAddcat] = useState(true);
    const [pcat, setPcat] = useState(false);
    const addcatHandler = () => (
        setPcat(true),
        setAddcat(false)
    );
    const PcatHandler = () => (
        setAddcat(true),
        setPcat(false)

    );
    const addCategoryHandler = () => {
        axios.post('/category',
            {
                name: name,
                parentId: Number(category_selected),

            }).then(res => {
                console.log(res)
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
                            <th>Kategória</th>
                            <th>Szülő ID</th>
                            <th>Al kategória</th>
                            <th>Szülő</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            category.map((item) => (
                                <tr key={item.id}>
                                    <th>{item.id}</th>
                                    <th>{item.name}</th>
                                    <th>{item.parentId}</th>
                                    <th>{item.children.map((ch) => (item.children.length != 0 ? ch.name + ", " : "Nincs"))}</th>
                                    <th>{item.parent != null ? item.parent.name : "Nincs"}</th>
                                </tr>
                            ))}
                    </tbody>
                </Table>
                <Group className="gp" grow spacing={0}>
                    <Button className="buttons" variant="default" onClick={() => addcatHandler()}>
                        Kategória hozzáadása
                    </Button>
                    <Button className="buttons" variant="default" onClick={() => PcatHandler()}>
                        Szülő kategória beállítása
                    </Button>
                </Group>
                < Group>
                    <div className="add" hidden={addcat}>
                        <div className="gp">
                            Szülőkategória:	&nbsp;	&nbsp;
                            <select className="select" onChange={(e) => setCategory_selected(e.target.value)}>
                                { }
                                {category.map((item) => (item.id == 0 ? <option selected value={item.id}>{item.id + ": " + item.name}</option> : <option value={item.id}>{item.id + ": " + item.name}</option>))}
                            </select>
                            <TextInput className="text" placeholder="Új kategória" required onChange={(e) => setName(e.target.value)} />
                            <Group className="gp" position="center">
                                <Button onClick={addCategoryHandler}>Hozzáadás</Button>
                            </Group>
                        </div>
                    </div>
                    <div className="add" hidden={pcat}>
                        <div >
                            <div className="gp">
                                <table>
                                    <tr>
                                        <td>Szülőkategória:	&nbsp;	&nbsp;</td>
                                        <td><select className="select" onChange={(e) => setCategory_selected(e.target.value)}>
                                            { }
                                            {category.map((item) => (item.id == 0 ? <option selected value={item.id}>{item.id + ": " + item.name}</option> : <option value={item.id}>{item.id + ": " + item.name}</option>))}
                                        </select></td>
                                    </tr>
                                    <tr>
                                        <td>Alkategória:	&nbsp;	&nbsp;</td>
                                        <td>
                                            <select className="select" onChange={(e) => setCategory_selected(e.target.value)}>
                                                { }
                                                {category.map((item) => (item.id == 0 ? <option selected value={item.id}>{item.id + ": " + item.name}</option> : <option value={item.id}>{item.id + ": " + item.name}</option>))}
                                            </select>
                                        </td>
                                    </tr>
                                </table>

                            </div>
                            <Group className="gp" position="center">
                                <Button onClick={addCategoryHandler}>Hozzáadás</Button>
                            </Group>
                        </div>
                    </div>
                </Group>
            </ScrollArea>
        </>
    );
}