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

export function QualificationsPanel() {
    
    const [category, setCategory] =  useState<any[]>([]);   
    useEffect(() => {
        axios.get('/categories')
            .then(res => {
                console.log(res.data)
                setCategory(res.data)               
            })
    }, [])
    const [qualifications, setQualifications] = useState<any[]>([]);
    const [maintenance, setMaintenance] = useState<any[]>([]);
    const [category_selected, setCategory_selected] = useState('')
    const [Qualif_selected, setQualif_selected] = useState('')
    const [name, setName] = useState('')
    useEffect(() => {
        axios.get('/qualifications')
            .then(res => {
                console.log(res.data)
                setQualifications(res.data)                
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
    const addQualifHandler = () => {        
        axios.post('/qualification',
            {
                name: name,   
            }).then(res => {
                console.log(res)
            }).catch(error => {
                console.log(error);

            })

    }
    useEffect(() => {
        axios.get('/scheduledMaintenances',
            ).then(res => {
                console.log(res)
                setMaintenance(res.data)
            }).catch(error => {
                console.log(error);

            })
    }, [])
    
    const upmainhandler = () => {        
        axios.patch('/scheduledMaintenances/'+Qualif_selected,
            {
                categoryId: Number(category_selected),   
            }).then(res => {
                console.log(res)
            }).catch(error => {
                console.log(error);

            })

    }
    //<th>{item.children.map((ch) => (item.children.length != 0 ? ch.name + ", " : "Nincs"))}</th>
    //<th>{item.parent != null ? item.parent.name : "Nincs"}</th>   
    return(
        <>
        <ScrollArea className="table">
                <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
                    <thead>
                        <tr>
                            <th>Végzettség ID</th>
                            <th>Végzettség</th>                            
                            <th>Rendszeres Karbantartási művelet</th>
                            <th>Speciális karbantartási művelet</th>
                            <th>Képesített szakember</th>
                        </tr>
                    </thead>  
                    <tbody>
                        {
                            qualifications.map((item) => (
                                <tr key={item.id}>
                                    <th>{item.id}</th>
                                    <th>{item.name}</th>
                                    <th>{item.ScheduledMaintenanceQualification.map((ch) =>
                                     item.ScheduledMaintenanceQualification.length != 0 ? ch.maintenance.name + " " : "Nincs")}</th>
                                     <th>{item.SpecialMaintenanceQualification.map((ch) =>
                                     item.SpecialMaintenanceQualification.length != 0 ? ch.maintenance.name + " " : "Nincs")}</th>
                                     <th>{item.UserQualification.map((ch) =>
                                     item.UserQualification.length != 0 ? ch.user.name + " " : "Nincs")}</th>                                                                    
                                </tr>
                            ))}
                    </tbody>                 
                </Table>         
                <Group className="gp" grow spacing={0}>
                    <Button className="buttons" variant="default" onClick={() => addcatHandler()}>
                        Végzettség hozzáadása
                    </Button>
                    <Button className="buttons" variant="default" onClick={() => PcatHandler()}>
                        Eszköz kategóriához rendelés
                    </Button>
                </Group>
                < Group>
                    <div className="add" hidden={addcat}>
                        <div className="gp">                            
                            <TextInput className="text" placeholder="Új végzettség" required onChange={(e) => setName(e.target.value)} />
                            <Group className="gp" position="center">
                                <Button onClick={addQualifHandler}>Hozzáadás</Button>
                            </Group>
                        </div>
                    </div>
                    <div className="add" hidden={pcat}>
                        <div >
                            <div className="gp">
                                <table>
                                    <tr>
                                        <td>Feladat:	&nbsp;	&nbsp;</td>
                                        <td><select className="select" onChange={(e) => setQualif_selected(e.target.value)}>
                                            { }
                                            {maintenance.map((item) =><option value={item.id}>{item.id + ": " + item.name}</option>)}
                                        </select></td>
                                    </tr>
                                    <tr>
                                        <td>Kategória:	&nbsp;	&nbsp;</td>
                                        <td>
                                            <select className="select" onChange={(e) => setCategory_selected(e.target.value)}>
                                                { }
                                                {category.map((item) => (<option value={item.id}>{item.id + ": " + item.name}</option>))}
                                            </select>
                                        </td>
                                    </tr>
                                </table>

                            </div>
                            <Group className="gp" position="center">
                                <Button onClick={upmainhandler}>Hozzáadás</Button>
                            </Group>
                        </div>
                    </div>
                </Group>       
            </ScrollArea>
        </>
    );
}