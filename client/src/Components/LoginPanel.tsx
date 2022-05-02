import React, { useState } from 'react';
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
} from '@mantine/core';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useAppSelector, useAppDispatch } from '../Store/hooks'
import { login } from '../Store/slices/userSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Store/store';
import { useLocalStorage } from '@mantine/hooks';
import { UserState } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import routerConfig from '../Config/routerConfig';

export const initialState: UserState = {
  id: null,
  name: null,
  createdAt: null,
  updatedAt: null,
  username: null,
  roleId: null,
  active: null,
  Role: null
}

export function LoginPanel() {
  const [user, setUser] = useLocalStorage<UserState>({ key: 'user', defaultValue: initialState });  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')  
  const nav = useNavigate();

  const loginHandler = () => {
    let auth = false;
    axios.post('/login', { username: username, password: password })
      .then(res => {
        console.log(res.data);
        console.log(user);
        setUser(res.data);
        console.log(user);  
        auth = true;
      }).catch(error => {
        setHidden(false);  
        auth=false;
    }      
    ).then(res => {
      if(auth)
      {
        auth = false;  
        nav('/dashboard');
      }
    })
   
  } 
  const [hidden, setHidden] = useState(true)

  return (
    <Container size={420} my={40}>

      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <div hidden={hidden}>Rossz adatokat adott meg</div>
        <TextInput label="Felhasználónév" placeholder="felhasznalonev" required onChange={(e) => setUsername(e.target.value)} />
        <PasswordInput label="Jelszó" placeholder="jelszo" required mt="md" onChange={(e) => setPassword(e.target.value)} />
        <Button fullWidth mt="xl" onClick={loginHandler}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}

function useStyles(): { classes: any; cx: any; } {
  throw new Error('Function not implemented.');
}
