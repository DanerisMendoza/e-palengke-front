import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/windows/Login.vue'
import Requirement from '@/views/windows/Requirement.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: { name: 'Login' } // Redirect to the named route
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Requirement',
        name: 'Requirement',
        component: Requirement
    },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
