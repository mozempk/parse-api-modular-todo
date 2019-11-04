/* eslint-disable no-console */
import api from '../services/api'
export default {
    state: {
        todos: []
    },
    mutations: {
        SET_TODOS(state,payload){
            state.todos=payload
        }

    },
    actions: {
        get({commit}){
            api.todo.get(this.state.userModule.user)
                .then(data => {
                    console.info("[store][todo][get] "+JSON.stringify(data))
                    commit('SET_TODOS',data)
                })
                .catch(e=>{
                    console.error("[store][todo][get] error: "+e)
                })
        },
        new({commit},payload){
            api.todo.create({title: payload.title, complete:payload.complete})
                .then(todo => {
                    commit('SET_SUCCESS',{message: "todo succesfully created: "+todo.get('title')})
                })
                .catch(e => {
                    commit('SET_ERROR',e)
                })
        }
        
    },
    getters: {
        todos: state => state.todos
    }
}