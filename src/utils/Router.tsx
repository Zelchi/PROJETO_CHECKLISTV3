import { RouterProvider, createRootRoute, createRoute, createRouter, redirect } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import Home from '../pages/Home.tsx'
import Login from '../pages/Login.tsx'

// Verifico se o token do usuario está no coockie e transformo em Booleano real.
const isAuthenticated = () => Boolean(Cookies.get('token'));

// Rota raiz
const rootRoute = createRootRoute();

// Rota Home com verificação de autenticação
const routeHome = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
    beforeLoad: () => {
        if (!isAuthenticated()) throw redirect({ to: '/login' })
    },
})

// Rota Login sem verificação de autenticação
const routeLogin = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: Login,
})

// Adiciona as rotas filhas à rota raiz
const routeTree = rootRoute.addChildren([routeHome, routeLogin])

// Cria o roteador com a árvore de rotas
const router = createRouter({ routeTree })

export default () => <RouterProvider router={router} />