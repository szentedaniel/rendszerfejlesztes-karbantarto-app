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
import axios from 'axios';
import "../css/Category.css"

export function QualificationsPanel() {
    
    const [maintenance, setMaintenance] =  useState<any[]>([]);   
    useEffect(() => {
        axios.get('/scheduledMaintenances')
            .then(res => {
                console.log(res.data)
                setMaintenance(res.data)               
            })
    }, [])
    const [specMaintenance, setSpecMaintenance] =  useState<any[]>([]);   
    useEffect(() => {
        axios.get('/specialMaintenances')
            .then(res => {
                console.log(res.data)
                setSpecMaintenance(res.data)               
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

    const [maintenance_selected, setMaintenance_selected] = useState('')
    const [specMaintenance_selected, setSpecMaintenance_selected] = useState('')
    const [Qualif_selected, setQualif_selected] = useState('')
    const [name, setName] = useState('')
    const [scheduled, setScheduled] = useState('')

    const [addcat, setAddcat] = useState(true);
    const [pcat, setPcat] = useState(true);
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
                window.location.reload()
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
        maintenance_selected != "" ?
        axios.post('/scheduledMaintenanceQualification',
            {
                qualificationId: Number(Qualif_selected),
                maintenanceId: Number(maintenance_selected)
            }).then(res => {
                console.log(res)
            }).catch(error => {
                console.log(error);

            })
        : null, 
        specMaintenance_selected != "" ?
        axios.post('/specialMaintenanceQualification',
            {
                qualificationId: Number(Qualif_selected),
                maintenanceId: Number(specMaintenance_selected)
            }).then(res => {
                console.log(res)
            }).catch(error => {
                console.log(error);

            })
        : null
        window.location.reload()

    }
    //<th>{item.children.map((ch) => (item.children.length != 0 ? ch.name + ", " : "Nincs"))}</th>
    //<th>{item.parent != null ? item.parent.name : "Nincs"}</th>   
    return(
        <>
        <ScrollArea className="table">
                <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
                    <thead>
                        <tr>
                            <th>V??gzetts??g ID</th>
                            <th>V??gzetts??g</th>                            
                            <th>Rendszeres Karbantart??si m??velet</th>
                            <th>Speci??lis karbantart??si m??velet</th>
                            <th>K??pes??tett szakember</th>
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
                                     item.SpecialMaintenanceQualification.length != 0 ? ch.maintenance.name + ". " : "Nincs")}</th>
                                     <th>{item.UserQualification.map((ch) =>
                                     item.UserQualification.length != 0 ? ch.user.name + " " : "Nincs")}</th>                                                                    
                                </tr>
                            ))}
                    </tbody>                 
                </Table>         
                <Group className="gp" grow spacing={0}>
                    <Button className="buttons" variant="default" onClick={() => addcatHandler()}>
                        V??gzetts??g hozz??ad??sa
                    </Button>
                    <Button className="buttons" variant="default" onClick={() => PcatHandler()}>
                        Eszk??z kateg??ri??hoz rendel??s
                    </Button>
                </Group>
                < Group>
                    <div className="add" hidden={addcat}>
                        <div className="gp">                            
                            <TextInput className="text" placeholder="??j v??gzetts??g" required onChange={(e) => setName(e.target.value)} />
                            <Group className="gp" position="center">
                                <Button onClick={addQualifHandler}>Hozz??ad??s</Button>
                            </Group>
                        </div>
                    </div>
                    <div className="add" hidden={pcat}>
                        <div >
                            <div className="gp">
                                <table>
                                    <tr>
                                        <td>V??gzetts??g:	&nbsp;	&nbsp;</td>
                                        <td><select className="select" onChange={(e) => setQualif_selected(e.target.value)}>
                                            <option>V??lassz egyet</option>{qualifications.map((item) =><option value={item.id}>{item.id + ": " + item.name}</option>)}
                                        </select></td>
                                    </tr>
                                    <tr>
                                        <td>Feladat t??pusa:	&nbsp;	&nbsp;</td>
                                        <td><select className="select" onChange={(e) => setScheduled(e.target.value)}>
                                                <option>V??lassz egyet</option>
                                                <option value={1}>Id??z??tett feladat</option>
                                                <option value={0}>Rendk??v??li feladat</option>
                                            </select>	&nbsp;	&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td>Feladat	&nbsp;	&nbsp;</td>
                                        <td>{Number(scheduled) == 1? 
                                            <select className="select" onChange={(e) => setMaintenance_selected(e.target.value)}>
                                                <option>V??lassz egyet</option>{maintenance.map((item) => (<option value={item.id}>{item.name}</option>))}
                                            </select>
                                            :<select className="select" onChange={(e) => setSpecMaintenance_selected(e.target.value)}>
                                                <option>V??lassz egyet</option>{specMaintenance.map((item) => (<option value={item.id}>{item.name}</option>))}
                                            </select>}
                                        </td>
                                    </tr>
                                </table>

                            </div>
                            <Group className="gp" position="center">
                                <Button onClick={upmainhandler}>Hozz??ad??s</Button>
                            </Group>
                        </div>
                    </div>
                </Group>       
            </ScrollArea>
        </>
    );
}