<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link :to="user ? '/todos':'/'">todo</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>
        <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
        <router-link v-if="displayLogin" to="Login">Login</router-link>
        <router-link v-if="displayLogout" to="Dashboard">{{user.get('username')}}</router-link>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import store from './store/'
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  components: {},
  data: () => ({

  }),
  computed: {
    ...mapGetters([
      'loading',
      'error',
      'success',
      'displayLogin',
      'displayLogout',
      'user'
    ])
  },
  methods:{},
  mounted(){},
  created() {
    store.dispatch('restore')
  }
};
</script>
