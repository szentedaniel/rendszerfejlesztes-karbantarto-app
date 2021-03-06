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
    const [normTime, setNormTime] = useState('')
    const [period_selected, setPeriod_selected]  = useState('')
    const [description, setDescription] = useState('')
    const [maintenance_selected, setMaintenance_selected] = useState('')
    const [modMaintenance, setModMaintenance] = useState(false)
    
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
            Number(category_selected) == 1 ?
            {                
                parentId: null

            }:
            {
                parentId: Number(category_selected)
            }
            ).then(res => {
                console.log(res)
                window.location.reload()
            }).catch(error => {
                console.log(error);

            })
    }

    const setMaintenanceHandler = () => {
        Number(normTime) > 0 ?
        axios.patch('/scheduledMaintenance/'+Number(maintenance_selected),
        {   
            normaInMinutes: Number(normTime)

        }).then(res => {
            console.log(res)
            setModMaintenance(true)
        }).catch(error => {
            console.log(error);

        })
        : null

        Number(period_selected) > 0 ?
        axios.patch('/scheduledMaintenance/'+Number(maintenance_selected),
        {            
            periodId: Number(period_selected)

        }).then(res => {
            console.log(res)
            setModMaintenance(true)
        }).catch(error => {
            console.log(error);

        })
        : null

        description != "" ?
        axios.patch('/scheduledMaintenance/'+Number(maintenance_selected),
        {   
            name: description

        }).then(res => {
            console.log(res)
            setModMaintenance(true)
        }).catch(error => {
            console.log(error);

        })
        :null
        modMaintenance ? window.location.reload() : null
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
                            <th>Kateg??ria</th>
                            <th>Sz??l?? ID</th>
                            <th>Al kateg??ria</th>
                            <th>Sz??l??</th>
                            <th>Normaid?? (perc)</th>
                            <th>Peri??dus</th>
                            <th>Instrukci??k</th>
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
                        Kateg??ria hozz??ad??sa
                    </Button>
                    <Button className="buttons" variant="default" onClick={() => PcatHandler()}>
                        Sz??l?? kateg??ria be??ll??t??sa
                    </Button>
                    <Button className="buttons" variant="default" onClick={() => setmtHandler()}>
                        Karbantart??si adatok be??ll??t??sa
                    </Button>
                    <Button className="buttons" variant="default" onClick={() => addmtHandler()}>
                        Karbantart??s hozz??ad??sa
                    </Button>
                </Group>
                < Group>
                    <div className="add" hidden={addcat_}>
                        <div className="gp">
                            Sz??l??kateg??ria:	&nbsp;	&nbsp;
                            <select className="select" onChange={(e) => setCategory_selected(e.target.value)}>
                                { }
                                <option>V??lassz egyet</option>{category.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                            </select>
                            <TextInput className="text" placeholder="??j kateg??ria" required onChange={(e) => setName(e.target.value)} />
                            <Group className="gp" position="center">
                                <Button onClick={addCategoryHandler}>Hozz??ad??s</Button>
                            </Group>
                        </div>
                    </div>
                    <div className="add" hidden={pcat_}>
                        <div >
                            <div className="gp">
                                <table>
                                    <tr>
                                        <td>Sz??l??kateg??ria:	&nbsp;	&nbsp;</td>
                                        <td><select className="select" onChange={(e) => setCategory_selected(e.target.value)}>
                                            { }
                                            <option>V??lassz egyet</option>{category.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                        </select></td>
                                    </tr>
                                    <tr>
                                        <td>Alkateg??ria:	&nbsp;	&nbsp;</td>
                                        <td>
                                            <select className="select" onChange={(e) => setCategory__selected(e.target.value)}>
                                                { }
                                                <option>V??lassz egyet</option>{category.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                            </select>
                                        </td>
                                    </tr>
                                </table>

                            </div>
                            <Group className="gp" position="center">
                                <Button onClick={updateCategoryHandler}>Sz??l?? be??ll??t??sa</Button>
                            </Group>
                        </div>
                    </div>

                    <div className="add" hidden={setmt}>
                        <div >
                            <div className="gp">
                                <tr>
                                    <td>Kateg??ria:	&nbsp;	&nbsp;</td>
                                    <td>
                                        <select className="select" onChange={(e) => setMaintenance_selected(e.target.value)}>
                                            { }
                                            <option>V??lassz egyet</option>{category.map((item) =>(item.Maintenance.length > 0 ? <option value={item.Maintenance.map((mt) => (mt.id))}>{item.id + ": " + item.name}</option> : null))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Peri??dus:	&nbsp;	&nbsp;</td>
                                    <td>
                                        <select className="select" onChange={(e) => setPeriod_selected(e.target.value)}>
                                            { }
                                            <option value = "">V??lassz egyet</option>{period.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Karbantart??si feladat:	&nbsp;	&nbsp;</td>
                                    <td><TextInput className="text" placeholder="Karbantart??si feladat" required onChange={(e) => setDescription(e.target.value)}/></td>
                                </tr>
                                <tr>
                                    <td>Normaid??:	&nbsp;	&nbsp;</td>
                                    <td><TextInput className="text" placeholder="Normaid?? (s)" required onChange={(e) => setNormTime(e.target.value)}/></td>
                                </tr>
                            </div>
                            
                            <Group className="gp" position="center">
                                <Button onClick={setMaintenanceHandler}>Be??ll??t??s</Button>
                            </Group>
                        </div>
                    </div>

                    <div className="add" hidden={addmt}>
                        <div >
                            <div className="gp">
                                <tr>
                                    <td>Kateg??ria:	&nbsp;	&nbsp;</td>
                                    <td>
                                        <select className="select" onChange={(e) => setCategory__selected(e.target.value)}>
                                            { }
                                            <option>V??lassz egyet</option>{category.map((item) =>(item.Maintenance.length == 0 && item.id != 1 ? <option value={item.id}>{item.id + ": " + item.name}</option> : null))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Peri??dus:	&nbsp;	&nbsp;</td>
                                    <td>
                                        <select className="select" onChange={(e) => setPeriod_selected(e.target.value)}>
                                            { }
                                            <option value = "">V??lassz egyet</option>{period.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Karbantart??si feladat:	&nbsp;	&nbsp;</td>
                                    <td><TextInput className="text" placeholder="Karbantart??si feladat" required onChange={(e) => setDescription(e.target.value)}/></td>
                                </tr>
                                <tr>
                                    <td>Normaid??:	&nbsp;	&nbsp;</td>
                                    <td><TextInput className="text" placeholder="Normaid?? (s)" required onChange={(e) => setNormTime(e.target.value)}/></td>
                                </tr>
                            </div>
                            
                            <Group className="gp" position="center">
                                <Button onClick={addMaintenanceHandler}>Be??ll??t??s</Button>
                            </Group>
                        </div>
                    </div>
                </Group>
            </ScrollArea>
        </>
    );
}