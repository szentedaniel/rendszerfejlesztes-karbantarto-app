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
    const [category__selected, setCategory__selected] = useState('')
    const [name, setName] = useState('')
    useEffect(() => {
        axios.get('/categories/details')
            .then(res => {
                console.log(res.data)
                setCategory(res.data)
                category.map((item) => (console.log(item.children.length != 0 ? item.children : null)))
            })
    }, [])
    const [normTime, setNormTime] = useState('')
    const [priod_selected, setPeriod_selected]  = useState('')
    const [description, setDescription] = useState('')
    
    const [addcat_, setAddcat_] = useState(true);
    const [pcat_, setPcat_] = useState(true);
    const [norm_, setNorm_] = useState(true);
    const [period_, setPeriod_] = useState(true);
    const [instr_, setInstr_] = useState(true);

    const PcatHandler = () => (
        setPcat_(false),
        setAddcat_(true),
        setNorm_(true),
        setPeriod_(true),
        setInstr_(true)
    );
    const addcatHandler = () => (
        setPcat_(true),
        setAddcat_(false),
        setNorm_(true),
        setPeriod_(true),
        setInstr_(true)
    );
    const normHandler = () => (
        setPcat_(true),
        setAddcat_(true),
        setNorm_(false),
        setPeriod_(true),
        setInstr_(true)
    );
    const periodHandler = () => (
        setPcat_(true),
        setAddcat_(true),
        setNorm_(true),
        setPeriod_(false),
        setInstr_(true)
    );
    const instrHandler = () => (
        setPcat_(true),
        setAddcat_(true),
        setNorm_(true),
        setPeriod_(true),
        setInstr_(false)
    );

    const addCategoryHandler = () => {
        axios.post('/category',
            {
                name: name,
                parentId: Number(category_selected),

            }).then(res => {
                console.log(res)
                window.location.reload()
            }).catch(error => {
                console.log(error);

            })

    }
    const updateCategoryHandler = () => {
        axios.patch('/categories/'+Number(category__selected),
            {                
                parentId: Number(category_selected),

            }).then(res => {
                console.log(res)
                window.location.reload()
            }).catch(error => {
                console.log(error);

            })
    }
    const normTimeHandler = () => {
        console.log(normTime)
    }
    const PeriodHandler = () => {
        console.log(priod_selected)
    }
    const DescriptionHandler = () => {
        console.log(description)
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
                            <th>Normaidő (perc)</th>
                            <th>Periódus</th>
                            <th>Instrukciók</th>
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
                                    <th>{item.Maintenance.map((ch) => (item.Maintenance.length != 0 ? ch.normaInMinutes : ""))}</th>
                                    <th>{item.Maintenance.map((ch) => (item.Maintenance.length != 0 ? ch.period.name : ""))}</th>
                                    <th>{item.Maintenance.map((ch) => (item.Maintenance.length != 0 ? ch.name : ""))}</th>
                                </tr>
                            ))
                        }
                                                   
                    </tbody>
                </Table>
                <Group className="gp" grow spacing={0}>
                    <Button className="buttons" variant="default" onClick={() => addcatHandler()}>
                        Kategória hozzáadása
                    </Button>
                    <Button className="buttons" variant="default" onClick={() => PcatHandler()}>
                        Szülő kategória beállítása
                    </Button>
                    <Button className="buttons" variant="default" onClick={() => normHandler()}>
                        Normaidő beállítása
                    </Button>
                    <Button className="buttons" variant="default" onClick={() => periodHandler()}>
                        Karbantartási periódus beállítása
                    </Button>
                    <Button className="buttons" variant="default" onClick={() => instrHandler()}>
                        Karbantartási instukciók beállítása
                    </Button>
                </Group>
                < Group>
                    <div className="add" hidden={addcat_}>
                        <div className="gp">
                            Szülőkategória:	&nbsp;	&nbsp;
                            <select className="select" onChange={(e) => setCategory_selected(e.target.value)}>
                                { }
                                {category.map((item) => (item.id == 1 ? <option selected value={item.id}>{item.id + ": " + item.name}</option> : <option value={item.id}>{item.id + ": " + item.name}</option>))}
                            </select>
                            <TextInput className="text" placeholder="Új kategória" required onChange={(e) => setName(e.target.value)} />
                            <Group className="gp" position="center">
                                <Button onClick={addCategoryHandler}>Hozzáadás</Button>
                            </Group>
                        </div>
                    </div>
                    <div className="add" hidden={pcat_}>
                        <div >
                            <div className="gp">
                                <table>
                                    <tr>
                                        <td>Szülőkategória:	&nbsp;	&nbsp;</td>
                                        <td><select className="select" onChange={(e) => setCategory_selected(e.target.value)}>
                                            { }
                                            {category.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                        </select></td>
                                    </tr>
                                    <tr>
                                        <td>Alkategória:	&nbsp;	&nbsp;</td>
                                        <td>
                                            <select className="select" onChange={(e) => setCategory__selected(e.target.value)}>
                                                { }
                                                {category.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                            </select>
                                        </td>
                                    </tr>
                                </table>

                            </div>
                            <Group className="gp" position="center">
                                <Button onClick={updateCategoryHandler}>Szülő beállítása</Button>
                            </Group>
                        </div>
                    </div>
                    <div className="add" hidden={norm_}>
                        <div >
                            <div className="gp">
                                Kategória:	&nbsp;	&nbsp;
                                <select className="select" onChange={(e) => setCategory_selected(e.target.value)}>
                                    { }
                                    {category.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                </select>
                                <TextInput className="text" placeholder="Normaidő (perc)" required onChange={(e) => setNormTime(e.target.value)}/>
                                <Group className="gp" position="center">
                                    <Button onClick={normTimeHandler}>Beállítás</Button>
                                </Group>
                            </div>
                        </div>
                    </div>
                    <div className="add" hidden={period_}>
                        <div >
                        <div className="gp">
                                Kategória:	&nbsp;	&nbsp;
                                <select className="select" onChange={(e) => setCategory_selected(e.target.value)}>
                                    { }
                                    {category.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                </select>
                                Periódus:	&nbsp;	&nbsp;
                                <select className="select" onChange={(e) => setPeriod_selected(e.target.value)}>
                                    { }
                                    {}
                                </select>
                                <Group className="gp" position="center">
                                    <Button onClick={PeriodHandler}>Beállítás</Button>
                                </Group>
                            </div>
                        </div>
                    </div>
                    <div className="add" hidden={instr_}>
                        <div >
                        <div className="gp">
                                Kategória:	&nbsp;	&nbsp;
                                <select className="select" onChange={(e) => setCategory_selected(e.target.value)}>
                                    { }
                                    {category.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                </select>
                                <TextInput className="text" placeholder="Leírás" required onChange={(e) => setDescription(e.target.value)}/>
                                <Group className="gp" position="center">
                                    <Button onClick={DescriptionHandler}>Beállítás</Button>
                                </Group>
                            </div>
                        </div>
                    </div>
                </Group>
            </ScrollArea>
        </>
    );
}