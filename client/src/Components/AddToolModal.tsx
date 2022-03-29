import { useEffect, useState } from 'react';
import { Modal, Button, Group, TextInput, Select } from '@mantine/core';
import axios from 'axios';
import '../css/Tools.css';

export function ToolModal() {
    const [opened, setOpened] = useState(false);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [identifier, setIdentifier] = useState('')
    const [location_selected, setLocation_selected] = useState('')
    const [category_selected, setCategory_selected] = useState('')
    const [location, setLocation] = useState<any[]>([]);
    const [category, setCategory] = useState<any[]>([]);
    const json = JSON.stringify({name: name,
        description: description,
        identifier: identifier,
        locationId: location_selected,
        categoryId: category_selected});
    useEffect(() => {
        axios.get('/categories')
            .then(res => {
                console.log(res.data)
                setCategory(res.data)
            })
        axios.get('/locations')
            .then(res => {
                console.log(res.data)
                setLocation(res.data)
            })
    }, [])
    const addToolHandler = () => {
        axios.post('/device',
            {
                name: name,
                description: description,
                identifier: identifier,
                locationId: Number(location_selected),
                categoryId: Number(category_selected)
            }).then(res => {
                console.log(res)
                window.location.reload()
            }).catch(error => {
                console.log(error);
                
            })
          
        setOpened(false)
    }
    return (

        <>

            <Modal centered
                opened={opened}
                onClose={() => setOpened(false)}
                title="Eszköz hozzáadása"
            >
                <TextInput label="Name" placeholder="Új eszköz" required onChange={(e) => setName(e.target.value)} />
                <TextInput label="Leírás" placeholder="Új leírás" required onChange={(e) => setDescription(e.target.value)} />
                <TextInput label="Azonosító" placeholder="NEW001" required onChange={(e) => setIdentifier(e.target.value)} />
                <Group className="gp" position="center">
                    <select className="select" onChange={(e) => setCategory_selected(e.target.value)}>
                        { }
                        <option value="Válassz egyet"> Kategória </option>
                        {category.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>
                </Group>
                <Group className="gp" position="center">
                    <select className="select" onChange={(e) => setLocation_selected(e.target.value)}>
                        { }
                        <option value="Válassz egyet"> Helyzet </option>
                        {location.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>
                </Group>
                <Group className="gp" position="center">
                    <Button onClick={addToolHandler}>Hozzáadás</Button>
                </Group>

            </Modal>

            <Group position="center">
                <Button onClick={() => setOpened(true)}>Új eszközt felvétele</Button>
            </Group>
        </>
    );
}