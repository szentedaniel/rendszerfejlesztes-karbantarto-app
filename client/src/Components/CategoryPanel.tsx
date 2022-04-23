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
            })
    }, [])
    const [period, setPeriod] = useState<any[]>([]);
    useEffect(() => {
        axios.get('/period')
            .then(res => {
                console.log(res.data)
                setPeriod(res.data)
            })
    }, [])
    const [maintenance, setMaintenance] = useState<any[]>([]);
    useEffect(() => {
        axios.get('/scheduledMaintenances')
            .then(res => {
                console.log(res.data)
                setMaintenance(res.data)
            })
    }, [])
    const [normTime, setNormTime] = useState('')
    const [period_selected, setPeriod_selected]  = useState('')
    const [description, setDescription] = useState('')
    const [maintenance_selected, setMaintenance_selected] = useState('')
    
    const [addcat_, setAddcat_] = useState(true);
    const [pcat_, setPcat_] = useState(true);
    const [setmt, setSetmt] = useState(true);
    const [addmt, setAddmt] = useState(true);

    const PcatHandler = () => (
        setPcat_(false),
        setAddcat_(true),
        setSetmt(true),
        setAddmt(true)
    );
    const addcatHandler = () => (
        setPcat_(true),
        setAddcat_(false),
        setSetmt(true),
        setAddmt(true)
    );
    const setmtHandler = () => (
        setPcat_(true),
        setAddcat_(true),
        setSetmt(false),
        setAddmt(true)
    );
    const addmtHandler = () => (
        setPcat_(true),
        setAddcat_(true),
        setSetmt(true),
        setAddmt(false)
    );

    const addCategoryHandler = () => {
        axios.post('/category',
            {
                name: name,
                parentId: Number(category_selected) == 1 ? null :Number(category_selected),

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

    const setMaintenanceHandler = () => {
        axios.patch('/scheduledMaintenance/'+Number(maintenance_selected),
        {   
            normaInMinutes: Number(normTime),           
            periodId: Number(period_selected),
            name: description

        }).then(res => {
            console.log(res)
            window.location.reload()
        }).catch(error => {
            console.log(error);

        })
    }
    const addMaintenanceHandler = () => {
        axios.post('/scheduledMaintenance',
            {                
                periodId: Number(period_selected),
                normaInMinutes: Number(normTime),
                categoryId: Number(category__selected),
                name: description,

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
                    <Button className="buttons" variant="default" onClick={() => setmtHandler()}>
                        Karbantartási adatok beállítása
                    </Button>
                    <Button className="buttons" variant="default" onClick={() => addmtHandler()}>
                        Karbantartás hozzáadása
                    </Button>
                </Group>
                < Group>
                    <div className="add" hidden={addcat_}>
                        <div className="gp">
                            Szülőkategória:	&nbsp;	&nbsp;
                            <select className="select" onChange={(e) => setCategory_selected(e.target.value)}>
                                { }
                                <option>Válassz egyet</option>{category.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
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
                                            <option>Válassz egyet</option>{category.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                        </select></td>
                                    </tr>
                                    <tr>
                                        <td>Alkategória:	&nbsp;	&nbsp;</td>
                                        <td>
                                            <select className="select" onChange={(e) => setCategory__selected(e.target.value)}>
                                                { }
                                                <option>Válassz egyet</option>{category.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
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

                    <div className="add" hidden={setmt}>
                        <div >
                            <div className="gp">
                                <tr>
                                    <td>Kategória:	&nbsp;	&nbsp;</td>
                                    <td>
                                        <select className="select" onChange={(e) => setMaintenance_selected(e.target.value)}>
                                            { }
                                            <option>Válassz egyet</option>{category.map((item) =>(item.Maintenance.length > 0 ? <option value={item.Maintenance.map((mt) => (mt.id))}>{item.id + ": " + item.name}</option> : null))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Periódus:	&nbsp;	&nbsp;</td>
                                    <td>
                                        <select className="select" onChange={(e) => setPeriod_selected(e.target.value)}>
                                            { }
                                            <option value = "">Válassz egyet</option>{period.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Karbantartási feladat:	&nbsp;	&nbsp;</td>
                                    <td><TextInput className="text" placeholder="Karbantartási feladat" required onChange={(e) => setDescription(e.target.value)}/></td>
                                </tr>
                                <TextInput className="text" placeholder="Normaidő (perc)" required onChange={(e) => setNormTime(e.target.value)}/>
                            </div>
                            
                            <Group className="gp" position="center">
                                <Button onClick={setMaintenanceHandler}>Beállítás</Button>
                            </Group>
                        </div>
                    </div>

                    <div className="add" hidden={addmt}>
                        <div >
                            <div className="gp">
                                <tr>
                                    <td>Kategória:	&nbsp;	&nbsp;</td>
                                    <td>
                                        <select className="select" onChange={(e) => setCategory__selected(e.target.value)}>
                                            { }
                                            <option>Válassz egyet</option>{category.map((item) =>(item.Maintenance.length == 0 && item.id != 1 ? <option value={item.id}>{item.id + ": " + item.name}</option> : null))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Periódus:	&nbsp;	&nbsp;</td>
                                    <td>
                                        <select className="select" onChange={(e) => setPeriod_selected(e.target.value)}>
                                            { }
                                            <option value = "">Válassz egyet</option>{period.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Karbantartási feladat:	&nbsp;	&nbsp;</td>
                                    <td><TextInput className="text" placeholder="Karbantartási feladat" required onChange={(e) => setDescription(e.target.value)}/></td>
                                </tr>
                                <TextInput className="text" placeholder="Normaidő (perc)" required onChange={(e) => setNormTime(e.target.value)}/>
                            </div>
                            
                            <Group className="gp" position="center">
                                <Button onClick={addMaintenanceHandler}>Beállítás</Button>
                            </Group>
                        </div>
                    </div>
                </Group>
            </ScrollArea>
        </>
    );
}