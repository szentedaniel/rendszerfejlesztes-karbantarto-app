interface RoleData {
    id: number
    name: string
}

interface UserState {
    id: number | null
    name: string | null
    createdAt: string | null
    updatedAt: string | null
    username: string | null
    roleId: number | null
    active: boolean | null
    Role: RoleData | null
}