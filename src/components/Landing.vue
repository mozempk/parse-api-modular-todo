<template>
<v-container>
    <v-row class="mt-12" justify="center" align="center">
        <v-col cols="12" xs="12" sm="12" md="12" lg="8" xl="8">
            <v-card raised class="mx-8 mt-12" style="border-radius: 10px">
                <div class="display-3 font-weight-bold text-center text-capitalize my-12 pt-4 px-2 textOutline">Todo App</div>
                <div class="display-2 font-weight-bold text-center text-capitalize my-12 textOutline1">SignUp for free!</div>
                <v-row justify="center" class="my-12 px-2">
                    <v-col cols="10" class="mb-4">
                        <router-link to="/signup">
                            <v-btn large block color="secondary">Sign Up</v-btn>
                        </router-link>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {

}
</script>

<style>
.textOutline {
    color: #ffeb3b;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
}
.textOutline1{
    color: #ffc107;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
}
</style>