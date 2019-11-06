<template>
    <v-container>
        <v-col cols="12" xs="12" class="mt-12">
            <v-row justify="center">
                <v-col cols="12" xs="12" sm="12" md="12" lg="8" xl="8">
                    <v-card tile outlined style="border-radius: 10px" class="pa-8">
                        <v-form ref="form" autocomplete="off">
                            <div class="display-1 font-weight-bold text-center">Sign Up</div>
                            <v-divider class="mt-2"/>
                            <v-text-field
                                placeholder="Choose a name"
                                v-model="username"
                                @keyup.enter="signup"
                                :error="error && error.message == 'Username must be a string.'"
                                />
                            <v-text-field
                                placeholder="Choose a password"
                                type="password"
                                autocomplete="off"
                                v-model="password"
                                @keyup.enter="signup"
                                :error="error && error.message == 'Password must be a string.'"
                                />
                            <v-btn block color="secondary" @click.stop="signup">
                                <v-progress-circular indeterminate v-if="loading"/>
                                <div v-if="!loading">Signup</div>
                            </v-btn>
                        </v-form>
                        <v-alert class="mt-2" v-if="error || success" outlined border="left" :type="error ? 'error' : 'success'">{{error ? error.message : success.message}}</v-alert>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
import store from '../store'
import {mapGetters} from 'vuex'
export default {
    data: () => ({
        username: undefined,
        password: undefined
    }),
    methods: {
        signup(){
            store.dispatch('signUp',{username: this.username, password: this.password})
        }
        
    },
    computed: {
        ...mapGetters([
            'error',
            'success',
            'loading',
            'user'
        ])
    },
    watch: {
        user() {
            if (this.user) {
                this.$router.push('/todos')
            }
        }
    }
}
</script>

<style>

</style>