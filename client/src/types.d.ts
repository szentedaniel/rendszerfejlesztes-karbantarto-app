import { RouteObject } from "react-router-dom"
import { Icon } from "tabler-icons-react"

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

interface RoutesType {
    caseSensitive?: boolean;
    children?: RouteObject[];
    element?: React.ReactNode;
    index?: boolean;
    path?: string;
    label: string
    icon: Icon
    hide?: boolean
}