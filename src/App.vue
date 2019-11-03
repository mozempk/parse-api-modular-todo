<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/">todo</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>
        <router-link to="Login">Login</router-link>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data: () => ({

  }),
  computed: {},
  methods:{},
};
</script>
