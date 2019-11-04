<template>
    <v-container>
        <v-row>
            <v-col cols="6" xs="12">
                <v-row justify="center">
                    <div class="headline font-weight-bold">
                        STUFF TO DO
                    </div>
                </v-row>
            </v-col>
            <v-col cols="6" xs="12">
                <v-row justify="center">
                    <div class="headline font-weight-bold">
                        STUFF TO DO
                    </div>
                </v-row>                
            </v-col>            
        </v-row>
        <v-row justify="end" class="mt-12 mr-8">
            <v-btn color="secondary" @click.stop="logout">Logout</v-btn>
        </v-row>
    </v-container>
</template>

<script>
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
        logout() {
            store.dispatch('logout')
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>

</style>