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
        hide: true

    },
    {
        path: "/login",
        label: 'Login',
        icon: Door,
        element: <Login />,
        hide: true
    },
    {
        path: "/dashboard",
        label: 'Dashboard',
        icon: HeartRateMonitor,
        element: <Dashboard />,
        hide: true
    },
    {
        path: "/tools",
        label: 'Eszközök',
        icon: HeartRateMonitor,
        element: <Tools />,
    },
    {
        path: '/category',
        label: 'Kategóriák',
        icon: Template,
        element: <Category />,
    },
    {
        path: '/qualifications',
        label: 'Végzettségek',
        icon: Briefcase,
        element: <Qualifications />,
    },
    {
        path: '/maintainers',
        label: 'Karbantarók',
        icon: Users,
        element: <Maintainers />,
    },
    {
        path: '/tasks',
        label: 'Feladatok',
        icon: AddressBook,
        element: <Tasks />,
    },
    {
        path: '/personaltasks',
        label: 'Feladataim',
        icon: AddressBook,
        element: <PersonalTasks />,
    },
    {
        path: '/admin',
        label: 'Adminpanel',
        icon: DeviceDesktop,
        element: <Admin />,
    },
    
    {
        path: "*",
        label: 'NotFound',
        icon: Error404,
        element: <NotFoundTitle />,
        hide: true
    },
];

export default routes