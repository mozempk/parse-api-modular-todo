import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.js'
import todo from './todo.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    user: user,
    todo: todo
  }
})
