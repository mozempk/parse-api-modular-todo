/* eslint-disable no-console */
import VueRouter from 'vue-router'
import Vue from 'vue';
import LoginPage from '../components/LoginPage.vue'
import TodoView from '../components/TodoView'
import Landing from '../components/Landing'
import Signup from '../components/Signup'
// import store from '../store'
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
            name: 'login',
            path:'/login',
            component: LoginPage           
        }
        // {
        //     name: 'Dashboard',
        //     path:'/dashboard',
        //     component: Dashboard,
        //     beforeEnter(to,from,next){
        //         if (!store.state.userModule.user) next('Login')
        //         else next()
        //     }
        // }
    ],
  });
  