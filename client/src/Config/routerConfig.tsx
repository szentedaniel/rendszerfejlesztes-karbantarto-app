import {
    BellRinging, Fingerprint, Key, Settings, TwoFA, DatabaseImport, Receipt2, SwitchHorizontal, Logout, Door, HeartRateMonitor, Error404,
} from 'tabler-icons-react';
import NotFoundTitle from '../Components/NotFoundTitle'
import Dashboard from '../Pages/Dashboard'
import Login from '../Pages/Login'
import { RoutesType } from '../types'


const routes: RoutesType[] = [
    {
        path: "/",
        label: '',
        icon: HeartRateMonitor,
        element: <Dashboard />,
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
    },
    {
        path: '',
        label: 'Notifications',
        icon: BellRinging
    },
    {
        path: '',
        label: 'Billing',
        icon: Receipt2
    },
    {
        path: '',
        label: 'Security',
        icon: Fingerprint
    },
    {
        path: '',
        label: 'SSH Keys',
        icon: Key
    },
    {
        path: '',
        label: 'Databases',
        icon: DatabaseImport
    },
    {
        path: '',
        label: 'Authentication',
        icon: TwoFA
    },
    {
        path: '',
        label: 'Other Settings',
        icon: Settings
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