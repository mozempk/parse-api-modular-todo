<template>
    <v-col cols="12">
        <v-row justify="center">
            <div class="display-2">
                New Todo
            </div>
        </v-row>
        <v-form @keyup.enter="send">
            <v-row>
                <v-col cols="10">
                    <v-text-field v-model="title" placeholder="What needs to be done?" @keyup.enter="send"></v-text-field>
                </v-col>
                <v-col cols="2" class="pl-2">
                    <v-row justify="center">
                        <v-switch color="accent" inset v-model="complete" persistent-hint hint="Already done?"></v-switch>
                    </v-row>
                </v-col>              
            </v-row>
            <v-row class="pl-1">
                <v-col cols="10">
                    <v-btn block large color="primary" @click.stop="send">
                        <v-progress-circular indeterminate v-if="updating"></v-progress-circular>
                        <v-icon large v-if="!updating">mdi-send</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="2" class="pl-1">
                    <v-btn block large color="accent" @click.stop="cancel" :disabled="updating? true: false">
                        <v-icon large>mdi-close-circle</v-icon>
                    </v-btn>                  
                </v-col>
            </v-row>
        </v-form>
    </v-col>
</template>

<script>
/* eslint-disable no-console */
import store from "../store"
import { mapGetters } from "vuex"
export default {
    props: [
        't',
        'c'
    ],
    data: () => ({
        title: undefined,
        complete: false
    }),
    methods: {
        send(){
            const payload = {
                title: this.title,
                complete: this.complete
            }
            if (this.creating){
                store.dispatch('new',payload)
                this.title = undefined
                this.complete = false
            }
        },
        cancel(){
            if (this.creating) store.dispatch('setCreating',false)
        }
    },
    computed: {
        ...mapGetters([
            'loading',
            'error',
            'success',
            'creating',
            'updating'
        ]),
    },
    created() {
        if (this.editing) {
            this.title = this.t
            this.complete = this.c
        }
    }

}
</script>

<style>

</style>