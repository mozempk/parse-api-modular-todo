/* eslint-disable no-console */
import VueRouter from 'vue-router'
import Vue from 'vue';
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import TodoView from '../components/TodoView'
import Landing from '../components/Landing'
import Signup from '../components/Signup'
import store from '../store'
Vue.use(VueRouter);
export default new VueRouter({
    routes: [
        {
            name:'landing',
            path:'/',
            component: Landing
        },
        {
            name:'signup',
            path:'/signup',
            component: Signup
        },
        {
            name:'todos',
            path:'/todos',
            component: TodoView
        },        
        {
            name: 'Login',
            path:'/login',
            component: Login,
            beforeEnter(to,from,next){
                if (!store.state.userModule.user) next()
                else next('/Dashboard')
            }            
        },
        {
            name: 'Dashboard',
            path:'/dashboard',
            component: Dashboard,
            beforeEnter(to,from,next){
                if (!store.state.userModule.user) next('Login')
                else next()
            }
        }
    ],
  });
  