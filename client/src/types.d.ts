import { RouteObject } from "react-router-dom"
import { Icon } from "tabler-icons-react"

interface RoleData {
    id: number
    name: string
}
interface CategoryData {
    id: number,
    name: string,
    parentId: number
}
 interface BuildingData {
    id:number,
    name: string
} 
interface LocationData {
        id: number,
        name: string,
        buildingId: number,
        building: BuildingData
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

interface DeviceState {
    id: number | null
    name: string | null
    description: string | null
    identifier: string | null
    locationId: number | null
    categoryId: number | null
    category: CategoryData | null
    location: LocationData | null
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