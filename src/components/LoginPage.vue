<template>
    <v-container>
        <v-col cols="12" xs="12" class="mt-12">
            <v-row justify="center">
                <v-col cols="12" xs="12" sm="12" md="12" lg="8" xl="8">
                    <Login/>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
import Login from './Login'
export default {
    name:"LoginPage",
    components: {
        Login
    },
    data: () => ({

    })
}
</script>

<style scoped>

</style>