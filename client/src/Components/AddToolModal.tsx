import { useEffect, useState } from 'react';
import { Modal, Button, Group, TextInput, Select } from '@mantine/core';
import axios from 'axios';

function ToolModal() {
    const [opened, setOpened] = useState(false);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [identifier, setIdentifier] = useState('')
    const [location_selected, setLocation_selected] = useState('')
    const [category_selected, setCategory_selected] = useState('')
    const [location, setLocation] = useState<any[]>([]);
    const [category, setCategory] = useState<any[]>([]);

    useEffect(() => {
        axios.get('/categories')
        .then(res => {
            console.log(res.data)
            setLocation(res.data)
        })
    }, [])    
    return (
        
        <>
        
            <Modal centered
                opened={opened}
                onClose={() => setOpened(false)}
                title="Eszköz hozzáadása"
            >
                <TextInput label="Name" placeholder="Új eszköz" required onChange={ } />
                <TextInput label="Leírás" placeholder="Új leírás" required onChange={ } />
                <TextInput label="Azonosító" placeholder="NEW001" required onChange={ } />
                <Select
                    style={{ marginTop: 20, zIndex: 2 }}
                    data={['React', 'Angular', 'Svelte', 'Vue']}
                    placeholder="Válassz egyet"
                    label="Kategória"                    
                />
                <Select
                    style={{ marginTop: 20, zIndex: 2 }}
                    data={['React', 'Angular', 'Svelte', 'Vue']}
                    placeholder="Válassz egyet"
                    label="Helyzet"                    
                />

            </Modal>

            <Group position="center">
                <Button onClick={() => setOpened(true)}>Open Modal</Button>
            </Group>
        </>
    );
}