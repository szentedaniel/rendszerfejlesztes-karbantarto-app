import {
    AddressBook, DeviceDesktop, Receipt2, Door, HeartRateMonitor, Error404, Users, Template, Briefcase
} from 'tabler-icons-react';
import NotFoundTitle from '../Components/NotFoundTitle'
import Dashboard from '../Pages/Dashboard'
import Tools from '../Pages/Tools'
import Login from '../Pages/Login'
import { RoutesType } from '../types'
import Category from '../Pages/Category';
import Qualifications from '../Pages/Qualifications';
import Admin from '../Pages/Admin';
import Maintainers from '../Pages/Maintainers';
import Tasks from '../Pages/Tasks';
import PersonalTasks from '../Pages/PersonalTasks';

const routes: RoutesType[] = [
    {
        path: "/",
        label: 'Login',
        icon: HeartRateMonitor,
        element: <Login />,
        hide: true,
        roleId: []
    },
    {
        path: "/login",
        label: 'Login',
        icon: Door,
        element: <Login />,
        hide: true,
        roleId: []
    },
    {
        path: "/dashboard",
        label: 'Dashboard',
        icon: HeartRateMonitor,
        element: <Dashboard />,
        hide: true,
        roleId: []
    },
    {
        path: "/tools",
        label: 'Eszközök',
        icon: HeartRateMonitor,
        element: <Tools />,
        roleId: [1,2]
    },
    {
        path: '/category',
        label: 'Kategóriák',
        icon: Template,
        element: <Category />,
        roleId: [1,2]
    },
    {
        path: '/qualifications',
        label: 'Végzettségek',
        icon: Briefcase,
        element: <Qualifications />,
        roleId: [1]
    },
    {
        path: '/maintainers',
        label: 'Karbantarók',
        icon: Users,
        element: <Maintainers />,
        roleId: [1]
    },
    {
        path: '/tasks',
        label: 'Feladatok',
        icon: AddressBook,
        element: <Tasks />,
        roleId: [1,3]
    },
    {
        path: '/personaltasks',
        label: 'Feladataim',
        icon: AddressBook,
        element: <PersonalTasks />,
        roleId: [4]
    },
    {
        path: '/admin',
        label: 'Adminpanel',
        icon: DeviceDesktop,
        element: <Admin />,
        roleId: [1]
    },
    
    {
        path: "*",
        label: 'NotFound',
        icon: Error404,
        element: <NotFoundTitle />,
        hide: true,
        roleId: []
    },
];

export default routes