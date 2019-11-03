import VueRouter from 'vue-router'
import Vue from 'vue';
import App from '../App.vue'
import Login from '../components/Login.vue'
Vue.use(VueRouter);
export default new VueRouter({
    routes: [
        {
            path:'/',
            component: App
        },
        {
            name: "Login",
            path:'/login',
            component: Login
        },
    ],
  });
  