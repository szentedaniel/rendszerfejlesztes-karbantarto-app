import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface TableSelectionProps {
    data: {id: string; name: string; description: string; identifier: string; Location: string; Building: string;  }[];
  }

interface UserState {
    id: number | null
    Name: string | null
    Description: string | null
    Identifier: string | null
    Location: string | null
    roleId: number | null
    active: boolean | null
    Role: RoleData | null
}

// Define the initial state using that type

const initialState: UserState = {
    id: null,
    name: null,
    createdAt: null,
    updatedAt: null,
    username: null,
    roleId: null,
    active: null,
    Role: null
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserState>) => {
            // state.id = action.payload.id
            // state.name = action.payload.name
            // state.createdAt = action.payload.createdAt
            // state.updatedAt = action.payload.updatedAt
            // state.username = action.payload.username
            // state.roleId = action.payload.roleId
            // state.active = action.payload.active
            // state.Role = action.payload.Role

            return { ...state, ...action.payload }
        },
        logout: (state) => {
            state = initialState
        },
    },
})

export const { login, logout } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default userSlice.reducer