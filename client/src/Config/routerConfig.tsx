import {
    BellRinging, Fingerprint, Key, Settings, TwoFA, DatabaseImport, Receipt2, SwitchHorizontal, Logout, Door, HeartRateMonitor, Error404,
} from 'tabler-icons-react';
import NotFoundTitle from '../Components/NotFoundTitle'
import Dashboard from '../Pages/Dashboard'
import Tools from '../Pages/Tools'
import Login from '../Pages/Login'
import { RoutesType } from '../types'
import Category from '../Pages/Category';
import qualifications from '../Pages/Qualifications'
import Qualifications from '../Pages/Qualifications';


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
        icon: Receipt2,
        element: <Category />,
    },
    {
        path: '/qualifications',
        label: 'Végzettségek',
        icon: Receipt2,
        element: <Qualifications />,
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