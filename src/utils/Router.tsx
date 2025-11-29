import { RouterProvider, createRootRoute, createRoute, createRouter, redirect } from '@tanstack/react-router'
import { Outlet } from "@tanstack/react-router";

import Cookies from 'js-cookie'
import API, { ENDPOINT } from './API'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Welcome from '../pages/Welcome'
import Settings from '../pages/Settings'
import Tasks from '../pages/Tasks'
import Exit from '../pages/Exit'
import NotFound from '../pages/NotFound'

// helpers
const isAuthenticated = () => Boolean(Cookies.get('token'));

const isNameChanged = async () => {
    const res = await API.GET(`${ENDPOINT.AUTH_ACCOUNT}/${1}`)
    const nome = res.data.username
    const email = res.data.email.split("@")[0]
    return nome !== email
}

// root route
const rootRoute = createRootRoute({
    component: () => <Outlet />,
});

const routeHome = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
    beforeLoad: async () => {
        if (!isAuthenticated()) throw redirect({ to: '/login' })
        if (!(await isNameChanged())) throw redirect({ to: '/welcome' })
    },
})

const routeLogin = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: Login,
    beforeLoad: async () => {
        if (isAuthenticated()) throw redirect({ to: '/' })
    },
})

const routeWelcome = createRoute({
    getParentRoute: () => rootRoute,
    path: '/welcome',
    component: Welcome,
    beforeLoad: async () => {
        if (!isAuthenticated()) throw redirect({ to: '/login' })
        if (await isNameChanged()) throw redirect({ to: '/' })
    },
})

const routeDashboard = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: () => <div>Dashboard</div>,
    beforeLoad: async () => {
        if (!isAuthenticated()) throw redirect({ to: '/login' })
    },
})

const routeSettings = createRoute({
    getParentRoute: () => rootRoute,
    path: '/settings',
    component: Settings,
    beforeLoad: async () => {
        if (!isAuthenticated()) throw redirect({ to: '/login' })
    },
})

const routeTasks = createRoute({
    getParentRoute: () => rootRoute,
    path: '/tasks',
    component: Tasks,
    beforeLoad: async () => {
        if (!isAuthenticated()) throw redirect({ to: '/login' })
    },
})

const routeExit = createRoute({
    getParentRoute: () => rootRoute,
    path: '/exit',
    component: Exit,
    beforeLoad: async () => {
        if (!isAuthenticated()) throw redirect({ to: '/login' })
    },
})

// route tree
const routeTree = rootRoute.addChildren([
    routeHome,
    routeLogin,
    routeWelcome,
    routeDashboard,
    routeSettings,
    routeTasks,
    routeExit,
]);

// router instance
const router = createRouter({
    routeTree,
    defaultNotFoundComponent: () => <NotFound />
})

export default () => <RouterProvider router={router} />