/* eslint-disable no-console */
import api from '../services/api'
export default {
    state: {
        todos: [],
        todoCount: 0,
        creating: false,
        editing: false,
        fetching: false,
        deleting: false,
        updating: false
    },
    mutations: {
        SET_TODOS(state,payload){
            state.todos=payload,
            state.todoCount = payload.length
        },
        ADD_TODO(state,payload){
            state.todos.unshift(payload) //<-- THIS!!!!
            state.todoCount = payload.length
        },
        DELETE_TODO(state,payload){
            state.todos.splice(state.todos.indexOf(payload),1)
            state.todoCount = state.todos.length
        },
        EDIT_TODO(state,payload){
            const i = state.todos.indexOf(payload.todo)
            state.todos[i][payload.prop] = payload.value
        },
        SET_CREATING(state,payload){
            state.creating=payload
        },
        SET_EDITING(state,payload){
            state.editing=payload
        },
        SET_FETCHING(state,payload){
            state.fetching=payload
        },
        SET_UPDATING(state,payload){
            state.updating=payload
        },
        SET_DELETING(state,payload){
            state.deleting = payload
        }

    },
    actions: {
        get({commit}){
            commit('SET_FETCHING',true)
            api.todo.getAll()
                .then(data => {
                    commit('SET_TODOS',data)
                    commit('SET_FETCHING',false)
                })
                .catch(e=>{
                    commit('SET_ERROR',e)
                    setTimeout(() => {
                        commit('SET_ERROR',undefined)
                    },api.errorTimeout)
                    commit('SET_FETCHING',false)
                })
        },
        new({commit},payload){
            commit('SET_CREATING',true)
            commit('SET_UPDATING',{todo:{id:0}})
            api.todo.create({title: payload.title, complete:payload.complete})
                .then(todo => {
                    //add new todo to array, faster display
                    api.todo.getOne(todo.id)
                    .then(t => {
                        commit('ADD_TODO',t)
                    })
                    commit('SET_SUCCESS',{message: "todo succesfully created: "+todo.get('title')})
                    setTimeout(() => {
                        commit('SET_SUCCESS',undefined)
                    },api.successTimeout)
                    commit('SET_CREATING',false)
                    commit('SET_UPDATING',undefined)
                })
                .catch(e => {
                    commit('SET_ERROR',e)
                    setTimeout(() => {
                        commit('SET_ERROR',undefined)
                    },api.errorTimeout)
                    commit('SET_CREATING',false)
                    commit('SET_UPDATING',undefined)
                })
        },
        edit({commit},payload){
            commit('SET_EDITING',true)
            commit('SET_UPDATING',payload)
            api.todo.update(payload)
                .then(() => {
                    commit('EDIT_TODO',payload)
                    commit('SET_SUCCESS',{message: "todo: " + payload.todo.get('title') + " succesfully updated"})
                    setTimeout(() => {
                        commit('SET_SUCCESS',undefined)
                    },api.successTimeout)
                    commit('SET_UPDATING',undefined)
                    commit('SET_EDITING',false)
                })
                .catch(e => {
                    commit('SET_ERROR',e)
                    setTimeout(() => {
                        commit('SET_ERROR',undefined)
                    },api.errorTimeout)
                    commit('SET_EDITING',false)
                    commit('SET_UPDATING',undefined)
                })

        },
        delete({commit},payload){
            commit('SET_DELETING',payload)
            api.todo.delete(payload)
                .then( t => {
                    commit('DELETE_TODO',t)
                    commit('SET_SUCCESS',{message: "todo succesfully deleted: "+t.get('title')})
                    commit('SET_DELETING',undefined)
                })
                .catch(e => {
                    commit('SET_ERROR',e)
                    setTimeout(() => {
                        commit('SET_ERROR',undefined)
                    },api.errorTimeout)
                    commit('SET_DELETING',undefined)
                })
        },
        setCreating({commit},payload){
            commit('SET_CREATING',payload)
        },
        setEditing({commit},payload){
            commit('SET_EDITING',payload)
        }

        
    },
    getters: {
        todos: state => state.todos,
        creating: state => state.creating,
        editing: state => state.editing,
        todoCount: state => state.todoCount,
        fetching: state => state.fetching,
        updating: state => state.updating,
        deleting: state => state.deleting


    }
}