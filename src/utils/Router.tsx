import { RouterProvider, createRootRoute, createRoute, createRouter, redirect } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import API, { ENDPOINT } from './API'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Welcome from '../pages/Welcome'

// Verifico se o token do usuario está no coockie e transformo em Booleano real.
const isAuthenticated = () => Boolean(Cookies.get('token'));

const isNameChanged = async () => {
    const res = await API.GET(`${ENDPOINT.AUTH_ACCOUNT}/${1}`)

    const nome = res.data.username
    const email = res.data.email.split("@")[0]

    if (nome === email) return false
    return true;
}

// Rota raiz
const rootRoute = createRootRoute();

// Rota Home com verificação de autenticação
const routeHome = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
    beforeLoad: async () => {
        if (!isAuthenticated()) throw redirect({ to: '/login' })
        if (!(await isNameChanged())) throw redirect({ to: '/welcome' })
    },
})

// Rota Login sem verificação de autenticação
const routeLogin = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: Login,
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

// Adiciona as rotas filhas à rota raiz
const routeTree = rootRoute.addChildren([routeHome, routeLogin, routeWelcome])

// Cria o roteador com a árvore de rotas
const router = createRouter({ routeTree })

export default () => <RouterProvider router={router} />