<template>
    <v-card tile outlined style="border-radius: 10px" class="pa-8">
        <v-form ref="form">
            <div class="display-1 font-weight-bold text-center">Login</div>
            <v-divider class="mt-2"/>
            <v-text-field
                placeholder="Username"
                autocomplete="username"
                v-model="username"
                @keyup.enter="login"
                :error="error && error.message == 'Username must be a string.'"
                />
            <v-text-field
                placeholder="Password"
                type="password"
                autocomplete="current-password"
                v-model="password"
                @keyup.enter="login"
                :error="error && error.message == 'Password must be a string.'"
                />
            <v-btn block color="primary" @click.stop="login">
                <v-progress-circular indeterminate v-if="loading"/>
                <div v-if="!loading">Login</div>
            </v-btn>
        </v-form>
    </v-card>
</template>

<script>
/* eslint-disable no-console */
import store from '../store'
import {mapGetters} from 'vuex'
export default {
    name:"Login",
    data: () => ({
        username: undefined,
        password: undefined
    }),
    computed: {
        ...mapGetters([
            'user',
            'loading',
            'error',
            'success'
        ])
    },
    methods: {
        login() {
            store.dispatch('login',{username: this.username, password: this.password})
            this.$refs.form.reset()
        }
    },
    watch: {
        user() {
            if (this.user) {
                this.$router.push('/Todos')
            }
        }
    },
    created(){
        if(this.user) this.$router.push('/todos')
    } 
}
</script>

<style scoped>

</style>