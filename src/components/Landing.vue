<template>
<v-container>
    <v-row class="mt-12" justify="center" align="center">
        <v-col cols="12" xs="12" sm="12" md="12" lg="8" xl="8">
            <v-card raised class="mx-8 mt-12" style="border-radius: 10px">
                <div class="display-3 font-weight-bold text-center text-uppercase mt-12 pt-4 px-2" style="text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;">Todo App</div>
                <v-row justify="center" class="mt-2 px-2">
                    <v-col cols="10">
                        <router-link to="/signup">
                            <v-btn large block color="secondary">Sign Up</v-btn>
                        </router-link>
                    </v-col>
                </v-row>
                <v-row justify="center" class="px-2">
                    <v-col cols="10" class="mb-6">
                        <router-link to="/login">
                            <v-btn large block color="primary">Login</v-btn>
                        </router-link>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
/* eslint-disable no-console */
import {mapGetters} from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'user'
        ])
    },

    created(){
        if(this.user) this.$router.push('/todos')
    } 
}
</script>

<style>
.textOutline {
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
}
</style>