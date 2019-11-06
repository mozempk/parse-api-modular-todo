/* eslint-disable no-console */
import api from '../services/api'
export default {
    state: {
        user: undefined,
        loading: false,
        success: undefined,
        error: undefined,
        displayLogin: true,
        displayLogout: false,

    },
    mutations: {
        SET_USER(state, payload) {
            state.user = payload
        },
        SET_LOADING(state, payload) {
            state.loading = payload
        },
        SET_ERROR(state, payload) {
            state.error = payload
        },
        SET_SUCCESS(state, payload) {
            state.success = payload
        },
        SET_DISPLAY_LOGIN(state,payload){
            state.displayLogin = payload
        },
        SET_DISPLAY_LOGOUT(state,payload){
            state.displayLogout = payload
        },
    },
    actions: {
        signUp({commit},payload){
            commit('SET_LOADING',true)
            api.user.signUp(payload)
                .then(u=>{
                    commit('SET_USER',u)
                    commit('SET_LOADING',false)
                    commit('SET_SUCCESS',{ message: "Welcome "+ u.get('username') +"!" })
                    setTimeout(()=> {
                        commit('SET_SUCCESS',undefined)
                    },api.successTimeout)
                    commit('SET_DISPLAY_LOGIN',false)
                    commit('SET_DISPLAY_LOGOUT',true)                    
                })
                .catch(e => {
                    commit('SET_ERROR',e)
                    setTimeout(()=> {
                        commit('SET_ERROR',undefined)
                    },api.errorTimeout) 
                    commit('SET_LOADING',false)                    
                })
        },

        login({commit},payload) {
            commit('SET_LOADING',true)
            api.user.login(payload.username,payload.password)
                .then(u => {
                    commit('SET_USER',u)
                    commit('SET_LOADING',false)
                    commit('SET_SUCCESS',{ message: "Welcome "+ u.get('username') +"!" })
                    setTimeout(()=> {
                        commit('SET_SUCCESS',undefined)
                    },api.successTimeout)
                    commit('SET_DISPLAY_LOGIN',false)
                    commit('SET_DISPLAY_LOGOUT',true)
                })
                .catch(e => {
                    commit('SET_ERROR',e)
                    setTimeout(()=> {
                        commit('SET_ERROR',undefined)
                    },api.errorTimeout) 
                    commit('SET_LOADING',false)
                });
        },

        logout({commit}){
            commit('SET_LOADING',true)
            api.user.logout()
                .then(() => {
                    commit('SET_LOADING',false)
                    commit('SET_USER',undefined)
                    commit('SET_SUCCESS',{ message: "Bye!" })
                    setTimeout(()=> {
                        commit('SET_SUCCESS',undefined)
                    },api.successTimeout)    
                    commit('SET_DISPLAY_LOGIN',true)
                    commit('SET_DISPLAY_LOGOUT',false)
                })
                .catch(e => {
                    commit('SET_ERROR',e)
                    setTimeout(()=> {
                        commit('SET_ERROR',undefined)
                    },api.errorTimeout) 
                    commit('SET_LOADING',false)                    
                })
            },
           
            restore({commit}){
                const u = api.user.restore()
                if (u) {
                    commit('SET_USER',u)
                    commit('SET_LOADING',false)
                    commit('SET_SUCCESS',{ message: "Welcome "+ u.get('username') +"!" })
                    setTimeout(()=> {
                        commit('SET_SUCCESS',undefined)
                    },api.successTimeout)
                    commit('SET_DISPLAY_LOGIN',false)
                    commit('SET_DISPLAY_LOGOUT',true)                    
                }
                else {
                    commit('SET_DISPLAY_LOGIN',true)
                    commit('SET_DISPLAY_LOGOUT',false)
                }
            }
        },
    getters: {
        user: state => state.user,
        loading: state => state.loading,
        error: state => state.error,
        success: state => state.success,
        displayLogin: state => state.displayLogin,
        displayLogout: state => state.displayLogout,
    }
}