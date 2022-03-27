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
import { useNavigate } from 'react-router-dom';

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
    axios.post('/login', { username: username, password: password })
      .then(res => {
        console.log(res.data);
        console.log(user);
        setUser(res.data);
        console.log(user);
        nav(`/dashboard`)
      })
      
  }


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
        <TextInput label="Email" placeholder="you@mantine.dev" required onChange={(e) => setUsername(e.target.value)} />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" onChange={(e) => setPassword(e.target.value)} />
        <Group position="apart" mt="md">
          <Checkbox label="Remember me" />
          <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={loginHandler}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}