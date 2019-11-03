<template>
    <v-container>
        <v-col cols="12" xs="12" class="mt-12">
            <v-row justify="center">
                <v-col cols="12" xs="12" sm="12" md="12" lg="8" xl="8">
                    <v-card tile outlined style="border-radius: 10px" class="pa-8">
                        <v-form>
                            <div class="display-1 font-weight-bold text-center">Login</div>
                            <v-divider class="mt-2"/>
                            <v-text-field placeholder="Username" autocomplete="username" v-model="username"></v-text-field>
                            <v-text-field placeholder="Password" type="password" autocomplete="current-password" v-model="password"></v-text-field>
                            <v-btn block color="secondary">Login</v-btn>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
    export default {
        name:"Login",
        data: () => ({
            username: undefined,
            password: undefined
        }),
        watch: {
            username() {
                /*eslint no-console: ["error", { allow: ["warn", "error","info"] }] */
                console.info("Username è: " +this.username)
            }
        }
    }
</script>

<style scoped>

</style>